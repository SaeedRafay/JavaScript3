function pageContributors(dom, data) {
  removeContributors();
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
}
