const buttonXML = document.createElement("button");
buttonXML.innerText = "XML";

const buttonAxios = document.createElement("button");
buttonAxios.innerText = "Axios";

const listDogs = document.createElement("ul");

const body = document.body;
body.appendChild(buttonXML);
body.appendChild(buttonAxios);
body.appendChild(listDogs);

const url = "https://dog.ceo/api/breeds/image/random";

buttonXML.addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    // on success
    xhr.onload = function() {
        if(xhr.status === 200) {
            const dogPhoto = JSON.parse(xhr.responseText);
            const dogPhotoLi = document.createElement("li");
            const dogPhotoImg = document.createElement("img");
            dogPhotoImg.setAttribute("src", dogPhoto.message);
            dogPhotoImg.setAttribute("width", "150");
            dogPhotoImg.style.border = "2px solid #ff0000";
            dogPhotoLi.appendChild(dogPhotoImg);
            body.appendChild(dogPhotoLi);
        } else {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }

    // on error
    xhr.onerror = function() {
        console.log("Request Failed");
    }
});

buttonAxios.addEventListener("click", function() {
    axios.get(url)
    .then(function (response) {
        // handle success
        const dogPhoto = response.data;
        const dogPhotoLi = document.createElement("li");
        const dogPhotoImg = document.createElement("img");
        dogPhotoImg.setAttribute("src", dogPhoto.message);
        dogPhotoImg.setAttribute("width", "150");
        dogPhotoImg.style.border = "2px solid #00ff00";
        dogPhotoLi.appendChild(dogPhotoImg);
        body.appendChild(dogPhotoLi);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
});