function repoCard(dom, repoData) {
  const domRepoDL = document.createElement('dl');
  domRepoDL.setAttribute('class', 'card');
  // loop through the data from HTML data attribute and create a list
  for (let [key, value] of Object.entries(repoData)) {
    // don't write the repo URL
    if (key !== 'html_url') {
      const domRepoDT = document.createElement('dt');
      const domRepoDD = document.createElement('dd');
      domRepoDT.textContent = key;
      // if looping through repo name then make it a link with repo URL
      if (key === 'name') {
        const domRepoLink = document.createElement('a');
        domRepoLink.textContent = value;
        domRepoLink.href = repoData.html_url;
        domRepoLink.setAttribute('target', '_blank');
        domRepoDD.appendChild(domRepoLink);
      } else {
        domRepoDD.textContent = value;
      }
      domRepoDL.appendChild(domRepoDT);
      domRepoDL.appendChild(domRepoDD);
    }
  }
  dom.details.appendChild(domRepoDL);
}
