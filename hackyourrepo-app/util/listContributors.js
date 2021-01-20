function listContributors(dom, repoData) {
  const contributorsURL = `https://api.github.com/repos/HackYourFuture/${repoData.name}/contributors`;
  fetchData(contributorsURL)
  .then(
    data => {
      if(data.length < 1) {
        throw "No Contributors found for this repository.";
      }

      // creating pages of 5 contributors each
      const dataPages = [];
      for (let i = 0; i < data.length; i += 5) {
        dataPages.push(data.slice(i, i+5));
      }

      // creating pagination
      if(dataPages.length > 1) {
        dom.contributorsPages.style.display = 'block';
        dataPages.forEach((dataPage, index) => {
          const pageNum = document.createElement('span');
          pageNum.setAttribute('class', 'pageBtn');
          pageNum.addEventListener('click', function() {
            pageContributors(dom, dataPage);
            dom.contributorsPages.childNodes.forEach(e => {
              e.classList.remove('active');
            });
            this.classList.toggle('active');
          });
          pageNum.textContent = index + 1;
          dom.contributorsPages.appendChild(pageNum);
        });
        dom.contributorsPages.childNodes[0].classList.add('active');
      }
      
      // populating contributors list
      pageContributors(dom, dataPages[0]);
    }
  )
  .catch(
    err => {
      // if there is any error then call the function to display error
      displayError(err, dom);
    }
  );
}
