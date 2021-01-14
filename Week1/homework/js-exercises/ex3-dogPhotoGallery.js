const buttonXML = document.createElement("button");
buttonXML.innerText = "XML";

const buttonAxios = document.createElement("button");
buttonAxios.innerText = "Axios";

const listDogs = document.createElement("ul");

const body = document.body;
body.appendChild(buttonXML);
body.appendChild(buttonAxios);
body.appendChild(listDogs);

function showPhoto(photo, border) {
    const dogPhotoLi = document.createElement("li");
    const dogPhotoImg = document.createElement("img");
    dogPhotoImg.setAttribute("src", photo.message);
    dogPhotoImg.setAttribute("width", "150");
    dogPhotoImg.style.border = "2px solid " + border;
    dogPhotoLi.appendChild(dogPhotoImg);
    body.appendChild(dogPhotoLi);
}

const url = "https://dog.ceo/api/breeds/image/random";

buttonXML.addEventListener("click", function() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    // on success
    xhr.onload = function() {
        if(xhr.status === 200) {
            const dogPhotoXML = JSON.parse(xhr.responseText);
            showPhoto(dogPhotoXML, "red");
        } else {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }

    // on error
    xhr.onerror = function() {
        console.log(xhr.responseText);
    }
});

buttonAxios.addEventListener("click", function() {
    axios.get(url)
    .then(function (response) {
        // handle success
        const dogPhotoAxios = response.data;
        showPhoto(dogPhotoAxios, "green");
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
});