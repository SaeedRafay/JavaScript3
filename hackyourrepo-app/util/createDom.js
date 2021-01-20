function createDom(dom) {
  // append elements
  document.body.append(dom.container);
  dom.container.append(
    dom.header,
    dom.errorDisplay,
    dom.details,
    dom.contributors,
  );
  dom.header.append(dom.headerTitle, dom.headerSelector);
  dom.contributors.append(dom.contributorsHead, dom.contributorsPages);
  dom.contributorsHead.append(dom.contributorsTitle);

  // set attributes
  document.body.setAttribute('id', 'hyRepo');
  dom.container.setAttribute('class', 'container');
  dom.header.setAttribute('class', 'header');
  dom.errorDisplay.setAttribute('class', 'errors');
  dom.details.setAttribute('class', 'details');
  dom.contributors.setAttribute('class', 'contributors');
  dom.contributorsHead.setAttribute('class', 'card');
  dom.contributorsPages.setAttribute('class', 'pagination card');

  // provide text
  dom.headerTitle.textContent = 'HYF Repositories';
  dom.contributorsTitle.textContent = 'Contributors';
}
