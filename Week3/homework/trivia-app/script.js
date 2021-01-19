"use strict";

function main() {
    document.body.id = "triviaApp";

    const domContainer = document.createElement("div");
    domContainer.className = "container";

    const domHeading = document.createElement("h1");
    domHeading.textContent = "Let's play some Trivia!";
    domContainer.appendChild(domHeading);

    const domDescription = document.createElement("p");
    domDescription.textContent = "Try your best to figure out the answer. If you really have no clue, click on the question to reveal the answer...";
    domContainer.appendChild(domDescription);

    const domErrorDisplay = document.createElement("div");
    domErrorDisplay.className = "errors";
    domErrorDisplay.style.display = "none";
    domContainer.appendChild(domErrorDisplay);

    const domTriviaList = document.createElement("div");
    domTriviaList.className = "triviaList";
    domContainer.appendChild(domTriviaList);

    async function fetchData(url) {
        const response = await fetch(url);
        return await response.json();
    }

    // "decodeHtml" function is copied from: https://stackoverflow.com/a/7394787
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    const triviaURL = "https://opentdb.com/api.php?amount=5";
    fetchData(triviaURL)
        .then(response => {
            domErrorDisplay.style.display = "none";

            const triviaItems = response.results;
            triviaItems.forEach(triviaItem => {
                const domTriviaItem = document.createElement("div");
                domTriviaItem.className = "triviaItem";
                domTriviaList.appendChild(domTriviaItem);

                const domTriviaQuestion = document.createElement("h3");
                domTriviaQuestion.textContent = decodeHtml(triviaItem.question);
                domTriviaItem.appendChild(domTriviaQuestion);

                const domTriviaAnswer = document.createElement("p");
                domTriviaAnswer.textContent = decodeHtml(triviaItem.correct_answer);
                domTriviaAnswer.className = "hide";
                domTriviaItem.appendChild(domTriviaAnswer);
                
                domTriviaQuestion.setAttribute("onclick", "this.nextSibling.classList.toggle('hide')");
            });
        })
        .catch(error => {
            domErrorDisplay.textContent = error + ". ";
            domErrorDisplay.style.display = "block";
        });

    document.body.appendChild(domContainer);
}

window.onload = main();
