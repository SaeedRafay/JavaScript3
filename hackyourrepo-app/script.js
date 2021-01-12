"use strict";

/*
  Write here your JavaScript for HackYourRepo!
*/

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

function showRepo() {
  const repoContainer = document.querySelector("#hyRepo .details");
  const repoContributors = document.querySelector("#hyRepo .contributors");
  const repoSelector = document.querySelector("#hyRepo .header select");
  const repoData = JSON.parse(repoSelector.options[repoSelector.selectedIndex].dataset.repoInfo);

  if (repoContainer.hasChildNodes()) {
    repoContainer.removeChild(repoContainer.childNodes[0]);
  }

  const repoDL = document.createElement("dl");
  repoDL.setAttribute("class", "card");

  for (let [key, value] of Object.entries(repoData)) {
    if(key !== "html_url") {
      const repoDT = document.createElement("dt")
      const repoDD = document.createElement("dd");
      repoDT.textContent = key;

      if(key === "name") {
        const repoLink = document.createElement("a");
        repoLink.textContent = value;
        repoLink.href = repoData.html_url;
        repoLink.setAttribute("target", "_blank");
        repoDD.appendChild(repoLink);
      } else {
        repoDD.textContent = value;
      }

      repoDL.appendChild(repoDT);
      repoDL.appendChild(repoDD);
    }
  }

  repoContainer.appendChild(repoDL);

  const contributorsURL = `https://api.github.com/repos/HackYourFuture/${repoData.name}/contributors`;

  const allContributors = document.querySelectorAll("#hyRepo .contributors .contributor");
  allContributors.forEach(contributor => contributor.parentNode.removeChild(contributor));

  fetchData(contributorsURL)
    .then(
      (data) => {
        data.forEach((contributor) => {
          const domContributor = document.createElement("div");
          domContributor.setAttribute("class", "contributor card");
          repoContributors.appendChild(domContributor);

          const domContributorImg = document.createElement("img");
          domContributorImg.src = contributor.avatar_url;
          domContributorImg.width = "50";
          domContributor.appendChild(domContributorImg);

          const domContributorLink = document.createElement("a");
          domContributorLink.textContent = contributor.login;
          domContributorLink.href = contributor.html_url;
          domContributorLink.target = "_blank";
          domContributor.appendChild(domContributorLink);

          const domContributions = document.createElement("span");
          domContributions.setAttribute("class", "commits");
          domContributions.textContent = contributor.contributions;
          domContributor.appendChild(domContributions);
        });
      }
    )
}

function main() {
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
  domHeader.appendChild(domHeaderSelector);

  const domDetails = document.createElement("section");
  domDetails.setAttribute("class", "details");
  domContainer.appendChild(domDetails);

  const domContributors = document.createElement("section");
  domContributors.setAttribute("class", "contributors");
  domContainer.appendChild(domContributors);

  const domContributorsHead = document.createElement("div");
  domContributorsHead.setAttribute("class", "card");
  domContributors.appendChild(domContributorsHead);

  const domContributorsTitle = document.createElement("strong");
  domContributorsTitle.textContent = "Contributors";
  domContributorsHead.appendChild(domContributorsTitle);

  document.body.appendChild(domContainer);

  const url = "https://api.github.com/orgs/HackYourFuture/repos?per_page=100";

  fetchData(url)
    .then(
      (data) => {
        data.forEach((repo, index) => {
          const domHeaderSelectorOpt = document.createElement("option");
          domHeaderSelectorOpt.textContent = repo.name;
          domHeaderSelectorOpt.value = index;
          const repoInfo = {
            "name": repo.name,
            "html_url": repo.html_url,
            "description": repo.description,
            "forks": repo.forks,
            "updated_at": repo.updated_at,
          }
          domHeaderSelectorOpt.dataset.repoInfo = JSON.stringify(repoInfo);
          domHeaderSelector.appendChild(domHeaderSelectorOpt);
        });
        
        showRepo();
      }
    );
  
    domHeaderSelector.addEventListener("change", function() {
      showRepo();
    });
}

window.onload = main();