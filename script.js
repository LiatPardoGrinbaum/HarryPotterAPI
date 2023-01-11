const input = document.querySelector("#input-search");
const button = document.querySelector("#button-search");
const cardsContainer = document.querySelector(".cardsContainer");
const spinner = document.querySelector(".spinner");
const error = document.querySelector(".error");
const allCharacters = document.querySelector(".allCharacters");

let dataArr = [];

window.addEventListener("load", loadCharecters);

allCharacters.addEventListener("click", () => {
  cardsContainer.innerHTML = "";
  error.textContent = "";
  loadCharecters();
});

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    getCharacter(e);
  }
});

button.addEventListener("click", getCharacter);

async function loadCharecters() {
  spinner.style.display = "block";

  try {
    const res = await axios.get("https://hp-api.onrender.com/api/characters");
    spinner.style.display = "none";
    creatCards(res.data.slice(0, 25));
    console.log(res.data.slice(0, 25));
    dataArr = [...res.data.slice(0, 25)];
  } catch (error) {
    console.log(error);
  }
}

//all characters on first loading
function creatCards(data) {
  insertCards(data);
}

//get characters when entering input
function getCharacter(e) {
  cardsContainer.innerHTML = "";
  error.textContent = "";
  e.preventDefault();
  if (input.value) {
    characterSearched = dataArr.filter((character) => character.name.toLowerCase().includes(input.value.toLowerCase()));
    if (characterSearched.length === 0) {
      error.textContent = "There is no such a character. Try again.";
      error.style.display = "block";
    }
    insertCards(characterSearched);
  }
  input.value = "";
}

function insertCards(data) {
  data.map((character) => {
    let cardContainer = document.createElement("div");
    let imageContainer = document.createElement("div");
    let detailsContainer = document.createElement("div");
    let img = document.createElement("img");
    img.src = character.image;
    cardContainer.classList.add("cardContainer");
    imageContainer.classList.add("imgContainer");
    detailsContainer.classList.add("detailsContainer");
    imageContainer.appendChild(img);
    cardContainer.appendChild(imageContainer);
    cardContainer.appendChild(detailsContainer);
    detailsContainer.innerHTML = `
    <p class="name"><strong>${character.name || "unknown"}</strong> </p>
    <p><strong>Played by: </strong><span>${character.actor || "unknown"}</span> </p>
    <p><strong>House: </strong><span>${character.house || "unknown"}</span> </p>
    <p><strong>Species: </strong><span>${character.species || "unknown"}</span> </p>
    <p><strong>Ancestry: </strong><span>${character.ancestry || "unknown"}</span> </p>
    <p><strong>Date of Birth: </strong><span>${character.dateOfBirth || "unknown"}</span> </p>
    `;
    cardsContainer.appendChild(cardContainer);
    //create details
  });
}
