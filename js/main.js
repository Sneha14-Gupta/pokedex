import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import data from "./data.json";
import PokemonCard from "./components/PokemonCard";
const inputEl = document.querySelector("input");
const dataRow = document.querySelector("[data-row]");
//data.forEach(Pokemon);
renderPokemon(shuffle(data));
function renderPokemon(list) {
  dataRow.textContent = "";
  if (!list.length) {
    const pokemon = PokemonCard({
      image:
        "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/Ash-Pokemon.jpg",
      name: "Not Found",
      // link: "https://pokedex.com",
      description: "Try another search",
    });
    dataRow.appendChild(pokemon);
    return;
  }
  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    dataRow.appendChild(pokemon);
  });
}
function handleSearch(input) {
  const options = {
    keys: ["name", "abilities"],
    threshold: 0.5,
  };
  //
  const fuse = new Fuse(data, options);
  // perform search fxn
  function performSearch() {
    if (!input) return data;
    const searched = fuse.search(input);
    return searched.map((obj) => obj.item);
  }
  let debouceTimer;
  inputEl.addEventListener("input", (e) => {
    clearTimeout(debouceTimer);
    debouceTimer = setTimeout(() => {
      handleSearch(e.target.value.trim().toLowerCase());
    }, 500);
  });
  const filteredPokemon = performSearch();
  renderPokemon(filteredPokemon);
  // renderPokemon(filteredPokemon);
}
inputEl.addEventListener("input", (e) => {
  handleSearch(e.target.value.trim().toLowerCase());
});
//for keyboard accesibility
document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    e.preventDefault();
    inputEl.focus();
  }
});
// console.log(data.length);
const colors = [
  "#433878",
  "#8967B3",
  "#3357FF",
  "#D2E0FB",
  "#7EACB5",
  "#6A9C89",
  "#295F98",
  "#D7C3F1",
  "#704264",
  "#704264",
  "#D1E9F6",
  "#FEFFD2",
  "#FC819E",
  "#674188",
  "#134B70",
  "#921A40",
];
let currentIndex = 0;

setInterval(() => {
  // Change the background color
  document.body.style.backgroundColor = colors[currentIndex];
  currentIndex = (currentIndex + 1) % colors.length;
}, 2000);
