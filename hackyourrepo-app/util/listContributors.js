function listContributors(dom, repoData) {
  const contributorsURL = `https://api.github.com/repos/HackYourFuture/${repoData.name}/contributors`;
  fetchData(contributorsURL).then(
    data => {
      data.forEach(contributor => {
        // create a card for contributor
        const domContributor = document.createElement('div');
        domContributor.setAttribute('class', 'contributor card');
        dom.contributors.appendChild(domContributor);
        // add contributor image
        const domContributorImg = document.createElement('img');
        domContributorImg.src = contributor.avatar_url;
        domContributorImg.width = '50';
        domContributor.appendChild(domContributorImg);
        // add contibutor name with URL
        const domContributorLink = document.createElement('a');
        domContributorLink.textContent = contributor.login;
        domContributorLink.href = contributor.html_url;
        domContributorLink.target = '_blank';
        domContributor.appendChild(domContributorLink);
        // add the number of contributions
        const domContributions = document.createElement('span');
        domContributions.setAttribute('class', 'commits');
        domContributions.textContent = contributor.contributions;
        domContributor.appendChild(domContributions);
      });
    },
    err => {
      // if there is any error then call the function to display error
      displayError(err, dom);
    },
  );
}
