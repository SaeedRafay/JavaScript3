function resetDom(dom) {
  // hide any previous errors
  dom.errorDisplay.style.display = 'none';

  // remove the data of previously selected repo
  if (dom.details.hasChildNodes()) {
    dom.details.removeChild(dom.details.childNodes[0]);
  }

  // remove the contributors of previously selected repo
  const allContributors = document.querySelectorAll(
    '#hyRepo .contributors .contributor',
  );
  allContributors.forEach(contributor =>
    contributor.parentNode.removeChild(contributor),
  );
}
