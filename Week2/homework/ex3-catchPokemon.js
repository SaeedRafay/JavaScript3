// function #1: to fetch anything and return json
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

// function #2: to add pokemon image to the DOM
function addPokemonToDOM(pokemon, domElem) {
    domElem.src = pokemon;
    document.body.appendChild(domElem);
}

// function #3: main function where all variables are declared and from where all functions are executed
function main() {
    // paragraph to display error messages
    const errMsg = document.createElement("p");
    errMsg.style.color = "red";
    document.body.appendChild(errMsg);
    
    // button to get a list of pokemon
    const getPokemon = document.createElement("button");
    getPokemon.textContent = "Get Pokemon!";
    document.body.appendChild(getPokemon);

    // select element to display list of pokemon
    const selectPokemon = document.createElement("select");

    // img element to display pokemon picture
    const imgPokemon = document.createElement("img");

    // variable to make sure that the list of pokemon is not already fetched
    let gotListPokemon = false;

    getPokemon.addEventListener("click", function (e) {
        e.preventDefault(); // prevent any default functionality
        errMsg.textContent = ""; // clear any previous error messages
        if (!gotListPokemon) { // if the list of pokemon is not already fetched
            // fetch list of 151 original pokemon
            fetchData("https://pokeapi.co/api/v2/pokemon/?limit=151")
                .then(
                    (data) => { // in case of success
                        const originalPokemon = data.results;
                        originalPokemon.forEach(pokemon => {
                            const optionPokemon = document.createElement("option");
                            optionPokemon.textContent = pokemon.name;
                            optionPokemon.value = pokemon.name;
                            selectPokemon.appendChild(optionPokemon);
                        });
                        document.body.appendChild(selectPokemon);
                        gotListPokemon = true;
                    },
                    (err) => { // in case of error
                        errMsg.textContent = err; 
                    }
                );
        }
    });

    selectPokemon.addEventListener("change", function (e) {
        e.preventDefault(); // prevent any default functionality
        errMsg.textContent = ""; // clear any previous error messages
        const selectedPokemon = this.value; // selected pokemon
        // fetch selected pokemon
        fetchData(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}/`)
            .then(
                (data) => { // in case of success
                    const urlPokemonImg = data.sprites.front_shiny;
                    addPokemonToDOM(urlPokemonImg, imgPokemon); // calling the function to add image on the DOM
                },
                (err) => { // in case of error
                    imgPokemon.remove(); // remove previous image
                    errMsg.textContent = err;
                }
            );
    });
}

// execute main function when the window has finished loading
window.onload = main();