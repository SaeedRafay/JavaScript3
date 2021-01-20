function listContributors(dom, repoData) {
  const contributorsURL = `https://api.github.com/repos/HackYourFuture/${repoData.name}/contributors`;
  fetchData(contributorsURL)
    .then(data => {
      if (data.length < 1) {
        throw 'No Contributors found for this repository.';
      }

      // creating pages of 5 contributors each
      const dataPages = [];
      for (let i = 0; i < data.length; i += 5) {
        dataPages.push(data.slice(i, i + 5));
      }

      // creating pagination
      if (dataPages.length > 1) {
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
            if (this.previousSibling.classList.contains('prevBtn')) {
              this.previousSibling.classList.add('disabled');
            } else {
              this.parentElement.firstChild.classList.remove('disabled');
            }
            if (this.nextSibling.classList.contains('nextBtn')) {
              this.nextSibling.classList.add('disabled');
            } else {
              this.parentElement.lastChild.classList.remove('disabled');
            }
          });
          pageNum.textContent = index + 1;
          dom.contributorsPages.appendChild(pageNum);
        });

        const prevPage = document.createElement('span');
        const nextPage = document.createElement('span');
        prevPage.setAttribute('class', 'pageBtn prevBtn disabled');
        nextPage.setAttribute('class', 'pageBtn nextBtn');
        prevPage.textContent = '❮';
        nextPage.textContent = '❯';
        prevPage.addEventListener('click', function() {
          if (
            this !==
            dom.contributorsPages.querySelector('.active').previousSibling
          ) {
            dom.contributorsPages
              .querySelector('.active')
              .previousSibling.click();
          }
        });
        nextPage.addEventListener('click', function() {
          if (
            this !== dom.contributorsPages.querySelector('.active').nextSibling
          ) {
            dom.contributorsPages.querySelector('.active').nextSibling.click();
          }
        });
        dom.contributorsPages.prepend(prevPage);
        dom.contributorsPages.append(nextPage);

        dom.contributorsPages.childNodes[1].classList.add('active');
      }

      // populating contributors list
      pageContributors(dom, dataPages[0]);
    })
    .catch(err => {
      // if there is any error then call the function to display error
      displayError(err, dom);
    });
}
