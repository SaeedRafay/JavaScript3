function listRepos(dom) {
  const url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  fetchData(url).then(
    data => {
      data.forEach((repo, index) => {
        // create a list of repos in select menu
        const domHeaderSelectorOpt = document.createElement('option');
        domHeaderSelectorOpt.textContent = repo.name;
        domHeaderSelectorOpt.value = index; // storing the index just in case if needed somewhere
        const repoInfo = {
          name: repo.name,
          html_url: repo.html_url,
          description: repo.description,
          forks: repo.forks,
          updated_at: repo.updated_at,
        };
        // stored repo related basic data in HTML data attribute to avoid a server request
        domHeaderSelectorOpt.dataset.repoInfo = JSON.stringify(repoInfo);
        dom.headerSelector.appendChild(domHeaderSelectorOpt);
        dom.headerSelector.style.visibility = 'visible';
        dom.contributors.style.visibility = 'visible';
      });

      // show the repo selected by default in the select menu
      showRepo(dom);
    },
    err => {
      // if there is any error then call the function to display error
      displayError(err, dom);
    },
  );
}
