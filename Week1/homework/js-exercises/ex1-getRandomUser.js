const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const axios = require("axios");

const url = "https://www.randomuser.me/api";

function randomUserXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    // on success
    xhr.onload = function() {
        if(xhr.status === 200) {
            const randomUser = JSON.parse(xhr.responseText);
            console.log(randomUser);
        } else {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }

    // on error
    xhr.onerror = function() {
        console.log(xhr.responseText);
    }
}

function randomUserAxios() {
    axios.get(url)
    .then(function (response) {
        // handle success
        const randomUser = response.data;
        console.log(randomUser);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

randomUserXML();
randomUserAxios();
