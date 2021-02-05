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
  dom.container.className = 'container';
  dom.header.className = 'header';
  dom.errorDisplay.className = 'errors';
  dom.details.className = 'details';
  dom.contributors.className = 'contributors';
  dom.contributorsHead.className = 'card';
  dom.contributorsPages.className = 'pagination card';

  // provide text
  dom.headerTitle.textContent = 'HYF Repositories';
  dom.contributorsTitle.textContent = 'Contributors';
}
