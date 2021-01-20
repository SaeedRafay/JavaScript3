function listContributors(dom, repoData) {
  const contributorsURL = `https://api.github.com/repos/HackYourFuture/${repoData.name}/contributors`;
  fetchData(contributorsURL)
    .then(contributors => {
      if (contributors.length < 1) {
        throw 'No Contributors found for this repository.';
      }

      // creating pages of 5 contributors each
      const contributorsPages = [];
      for (let i = 0; i < contributors.length; i += 5) {
        contributorsPages.push(contributors.slice(i, i + 5));
      }

      // creating pagination
      createPagination(dom, contributorsPages);

      // populating contributors list
      pageContributors(dom, contributorsPages[0]);
    })
    .catch(err => {
      // if there is any error then call the function to display error
      displayError(err, dom);
    });
}
