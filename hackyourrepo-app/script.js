"use strict";

/*
  Write here your JavaScript for HackYourRepo!
*/

// main function where all variables are declared and from where all functions are executed
function main() {
  // create DOM elements
  document.body.setAttribute("id", "hyRepo");

  const domContainer = document.createElement("div");
  domContainer.setAttribute("class", "container");

  const domHeader = document.createElement("section");
  domHeader.setAttribute("class", "header");
  domContainer.appendChild(domHeader);

  const domHeaderTitle = document.createElement("strong");
  domHeaderTitle.textContent = "HYF Repositories";
  domHeader.appendChild(domHeaderTitle);

  const domHeaderSelector = document.createElement("select");
  domHeaderSelector.style.visibility = "hidden";
  domHeader.appendChild(domHeaderSelector);

  const domErrorDisplay = document.createElement("div");
  domErrorDisplay.setAttribute("class", "errors");
  domErrorDisplay.style.display = "none";
  domContainer.appendChild(domErrorDisplay);

  const domDetails = document.createElement("section");
  domDetails.setAttribute("class", "details");
  domContainer.appendChild(domDetails);

  const domContributors = document.createElement("section");
  domContributors.setAttribute("class", "contributors");
  domContributors.style.visibility = "hidden";
  domContainer.appendChild(domContributors);

  const domContributorsHead = document.createElement("div");
  domContributorsHead.setAttribute("class", "card");
  domContributors.appendChild(domContributorsHead);

  const domContributorsTitle = document.createElement("strong");
  domContributorsTitle.textContent = "Contributors";
  domContributorsHead.appendChild(domContributorsTitle);

  document.body.appendChild(domContainer);


  // function #1: to fetch anything from server and return json
  async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
  }

  // function #2: to show a repository data upon selection of a repository
  function displayError(err) {
    domErrorDisplay.style.display = "block";
    domErrorDisplay.textContent = err;
  }

  // function #3: to show error messages
  function showRepo() {  
    // hide any previous errors
    domErrorDisplay.style.display = "none";

    // remove the data of previously selected repo
    if (domDetails.hasChildNodes()) {
      domDetails.removeChild(domDetails.childNodes[0]);
    }

    // remove the contributors of previously selected repo
    const allContributors = document.querySelectorAll("#hyRepo .contributors .contributor");
    allContributors.forEach(contributor => contributor.parentNode.removeChild(contributor));
  
    // create a card to display basic repo information
    const domRepoDL = document.createElement("dl");
    domRepoDL.setAttribute("class", "card");
    // get the basic repo data stored previously in the HTML data attribute
    const repoData = JSON.parse(domHeaderSelector.options[domHeaderSelector.selectedIndex].dataset.repoInfo);
    // loop through the data from HTML data attribute and create a list
    for (let [key, value] of Object.entries(repoData)) {
      // don't write the repo URL
      if(key !== "html_url") {
        const domRepoDT = document.createElement("dt")
        const domRepoDD = document.createElement("dd");
        domRepoDT.textContent = key;
        // if looping through repo name then make it a link with repo URL
        if(key === "name") {
          const domRepoLink = document.createElement("a");
          domRepoLink.textContent = value;
          domRepoLink.href = repoData.html_url;
          domRepoLink.setAttribute("target", "_blank");
          domRepoDD.appendChild(domRepoLink);
        } else {
          domRepoDD.textContent = value;
        }
        domRepoDL.appendChild(domRepoDT);
        domRepoDL.appendChild(domRepoDD);
      }
    }
    domDetails.appendChild(domRepoDL);
  
    // fetch contributors data
    const contributorsURL = `https://api.github.com/repos/HackYourFuture/${repoData.name}/contributors`;
    fetchData(contributorsURL)
      .then(
        (data) => {
          data.forEach((contributor) => {
            // create a card for contributor
            const domContributor = document.createElement("div");
            domContributor.setAttribute("class", "contributor card");
            domContributors.appendChild(domContributor);
            // add contributor image
            const domContributorImg = document.createElement("img");
            domContributorImg.src = contributor.avatar_url;
            domContributorImg.width = "50";
            domContributor.appendChild(domContributorImg);
            // add contibutor name with URL
            const domContributorLink = document.createElement("a");
            domContributorLink.textContent = contributor.login;
            domContributorLink.href = contributor.html_url;
            domContributorLink.target = "_blank";
            domContributor.appendChild(domContributorLink);
            // add the number of contributions
            const domContributions = document.createElement("span");
            domContributions.setAttribute("class", "commits");
            domContributions.textContent = contributor.contributions;
            domContributor.appendChild(domContributions);
          });
        },
        (err) => {
          // if there is any error then call the function to display error
          displayError(err);
        }
      )
  }

  // fetch list of repos
  const url = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";
  fetchData(url)
    .then(
      (data) => {
        data.forEach((repo, index) => { // create a list of repos in select menu
          const domHeaderSelectorOpt = document.createElement("option");
          domHeaderSelectorOpt.textContent = repo.name;
          domHeaderSelectorOpt.value = index; // storing the index just in case if needed somewhere
          const repoInfo = {
            "name": repo.name,
            "html_url": repo.html_url,
            "description": repo.description,
            "forks": repo.forks,
            "updated_at": repo.updated_at,
          }
          // stored repo related basic data in HTML data attribute to avoid a server request
          domHeaderSelectorOpt.dataset.repoInfo = JSON.stringify(repoInfo);
          domHeaderSelector.appendChild(domHeaderSelectorOpt);
          domHeaderSelector.style.visibility = "visible";
          domContributors.style.visibility = "visible";
        });
        
        // show the repo selected by default in the select menu
        showRepo();
      },
      (err) => {
        // if there is any error then call the function to display error
        displayError(err);
      }
    );
  
    // upon selection of a repository from the list of repos
    domHeaderSelector.addEventListener("change", function() {
      showRepo();
    });
}

// execute main function when the window has finished loading
window.onload = main();