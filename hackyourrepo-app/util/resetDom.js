function removePagination() {
  // remove the pages of previously selected repo
  const allPages = document.querySelectorAll(
    '#hyRepo .contributors .pageBtn',
  );
  allPages.forEach(page =>
    page.parentNode.removeChild(page),
  );
}

function removeContributors() {
  // remove the contributors of previously selected repo
  const allContributors = document.querySelectorAll(
    '#hyRepo .contributors .contributor',
  );
  allContributors.forEach(contributor =>
    contributor.parentNode.removeChild(contributor),
  );
}

function resetDom(dom) {
  // hide any previous errors
  dom.errorDisplay.style.display = 'none';

  // remove the data of previously selected repo
  if (dom.details.hasChildNodes()) {
    dom.details.removeChild(dom.details.childNodes[0]);
  }

  // remove contributors of previously selected repo
  removeContributors();

  // remove pagination of previously selected repo
  dom.contributorsPages.style.display = 'none';
  removePagination();
}
