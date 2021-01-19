function showRepo(dom) {
  // get the basic repo data stored previously in the HTML data attribute
  const repoData = JSON.parse(
    dom.headerSelector.options[dom.headerSelector.selectedIndex].dataset
      .repoInfo,
  );

  // reset DOM or hide previous repo data
  resetDom(dom);

  // create a card to display basic repo information
  repoCard(dom, repoData);

  // fetch contributors data and create list
  listContributors(dom, repoData);
}
