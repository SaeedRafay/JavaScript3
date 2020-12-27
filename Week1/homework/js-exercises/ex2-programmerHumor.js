const url = "https://xkcd.now.sh/?comic=latest";

function programmerHumorHttp() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send();

    // on success
    xhr.onload = function() {
        if(xhr.status === 200) {
            const programmerHumor = JSON.parse(xhr.responseText);
            console.log(programmerHumor);
            const progHumorImg = document.createElement("img");
            progHumorImg.setAttribute("src", programmerHumor.img);
            document.body.appendChild(progHumorImg);
        } else {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        }
    }

    // on error
    xhr.onerror = function() {
        console.log("Request Failed");
    }
}

function programmerHumorAxios() {
    axios.get(url)
    .then(function (response) {
        // handle success
        console.log(response.data);
        const progHumorImg = document.createElement("img");
        progHumorImg.setAttribute("src", response.data.img);
        document.body.appendChild(progHumorImg);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
}

programmerHumorHttp();
programmerHumorAxios();
