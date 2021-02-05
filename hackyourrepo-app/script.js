'use strict';

/*
  Write here your JavaScript for HackYourRepo!
*/

// main function where all variables are declared and from where all functions are executed
function main() {

  // object with all major DOM elements
  const domElem = {
    container: document.createElement('div'),
    header: document.createElement('section'),
    headerTitle: document.createElement('strong'),
    headerSelector: document.createElement('select'),
    errorDisplay: document.createElement('div'),
    details: document.createElement('section'),
    contributors: document.createElement('section'),
    contributorsHead: document.createElement('div'),
    contributorsTitle: document.createElement('strong'),
    contributorsPages: document.createElement('div'),
  };

  // populate DOM elements
  createDom(domElem);

  // fetch list of repos
  listRepos(domElem);

  // upon selection of a repository from the list of repos
  domElem.headerSelector.addEventListener('change', function() {
    showRepo(domElem);
  });

}

// execute main function when the window has finished loading
window.onload = main;
