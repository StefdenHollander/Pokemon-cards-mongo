const currentCards = [0, 1, 2];
let nummer = 0;

nummer++;

const previousBtn = document.querySelector(".previous-btn");
const nextBtn = document.querySelector(".next-btn");
previousBtn.addEventListener("click", previousCards);
nextBtn.addEventListener("click", nextCards);

fetchAndCreate();

// alle functies

function fetchAndCreate() {
    fetch("http://localhost:3000/Pokemons")
    .then(response => response.json())
    .then(Data => createCards(Data))
}

function createCards(Data) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    for (let i = 0; i < currentCards.length; i++) {
        container.innerHTML +=
            `
        <div class="card">
            <h2>${Data[currentCards[i]].name}</h2>
            <img src="${Data[currentCards[i]].img}" alt="${Data[currentCards[i]].name}">
            <h2>${Data[currentCards[i]].type}</h2>
            <img src="${Data[currentCards[i]].imgShiny}" alt="${Data[currentCards[i]].type}">
        </div>
        `
        
    }
}

function previousCards() {
    while (currentCards.length > 3) {
        currentCards.pop();
    }
    for (let i = 0; i < currentCards.length; i++) {
        currentCards[i] -= 3;
    }
    fetchAndCreate();
}

function nextCards() {
    while (currentCards.length > 3) {
        currentCards.pop();
    }
    for (let i = 0; i < currentCards.length; i++) {
        currentCards[i] += 3;
    }
    fetchAndCreate();
}

// epic fixed search :)

function showResults() {
    fetch("http://localhost:3000/Pokemons")
    .then(response => response.json())
    .then(Data => {
        const searchInput = document.querySelector(".search");
        while(currentCards.length > 0) {
            currentCards.pop();
        }
       
        for (let m = 0; m < Data.length; m++) {
            let dataLetters = "";
            for (let i = 0; i < searchInput.value.length; i++) {
                dataLetters += Data[m].name[i];
            }
            if (dataLetters.toUpperCase() == searchInput.value.toUpperCase() && searchInput.value != "") {
                currentCards.push(m);
            }
        }
        
        for (let m = 0; m < Data.length; m++) {
            let dataLetters = "";
            for (let i = 0; i < searchInput.value.length; i++) {
                dataLetters += Data[m].type[i];
            }
            if (dataLetters.toUpperCase() == searchInput.value.toUpperCase() && searchInput.value != "") {
                currentCards.push(m);
            }
        }
        console.log("b2: " + currentCards);
        console.log("b33: " + currentCards.length);
        console.log("b3: " + searchInput.value.length);
        if (currentCards.length == 0 && searchInput.value.length == 0) {
            currentCards.push(0);
            currentCards.push(1);
            currentCards.push(2);
        }
        fetchAndCreate();
    })

}
