function createPagination(dom, dataPages) {
  if (dataPages.length > 1) {
    dom.contributorsPages.style.display = 'block';

    dataPages.forEach((dataPage, index) => {
      const pageNum = document.createElement('span');
      pageNum.className = 'pageBtn';
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
    prevPage.className = 'pageBtn prevBtn disabled';
    nextPage.className = 'pageBtn nextBtn';
    prevPage.textContent = '❮';
    nextPage.textContent = '❯';
    prevPage.addEventListener('click', function() {
      if (
        this !== dom.contributorsPages.querySelector('.active').previousSibling
      ) {
        dom.contributorsPages.querySelector('.active').previousSibling.click();
      }
    });
    nextPage.addEventListener('click', function() {
      if (this !== dom.contributorsPages.querySelector('.active').nextSibling) {
        dom.contributorsPages.querySelector('.active').nextSibling.click();
      }
    });
    dom.contributorsPages.prepend(prevPage);
    dom.contributorsPages.append(nextPage);

    dom.contributorsPages.childNodes[1].classList.add('active');
  }
}
