"use strict";

/*
  Write here your JavaScript for HackYourRepo!
*/

const placeholderRepos = [
  {
    name: 'SampleRepo1',
    description: 'This repository is meant to be a sample',
    forks: 5,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'AndAnotherOne',
    description: 'Another sample repo! Can you believe it?',
    forks: 9,
    updated: '2020-05-27 12:00:00',
  },
  {
    name: 'HYF-Is-The-Best',
    description:
      "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
    forks: 130,
    updated: '2020-05-27 12:00:00',
  },
];

// DOM elements: repo selector and repo display area
const reposSelector = document.querySelector("#hyRepo .header select");
const reposContainer = document.querySelector("#hyRepo .details");

// Go through each object in the array and list the names of repos in the selector
placeholderRepos.forEach((repo, index) => {
  const repoOption = document.createElement("option");
  repoOption.setAttribute("value", index);
  repoOption.textContent = repo.name;
  reposSelector.appendChild(repoOption);
});

// Get the current selector value and call the function to list the repo
const currentRepo = reposSelector.value;
listRepos(placeholderRepos[currentRepo]);

// When the another repo is selected from the selector
reposSelector.addEventListener("change", function() {
  // Get the selected value and call the function to list the repo
  const selectedRepo = this.value;
  listRepos(placeholderRepos[selectedRepo]);
});

// To list details of a repo
function listRepos(repo) {
  const repoDL = document.createElement("dl");
  repoDL.setAttribute("class", "card");
  for (let [key, value] of Object.entries(repo)) {
    const repoDT = document.createElement("dt")
    const repoDD = document.createElement("dd");
    repoDT.textContent = key;
    repoDD.textContent = value;
    repoDL.appendChild(repoDT);
    repoDL.appendChild(repoDD);
  }
  reposContainer.innerHTML = "";
  reposContainer.appendChild(repoDL);
}