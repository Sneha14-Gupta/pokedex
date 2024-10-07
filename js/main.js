import data from "./data.json";
import PokemonCard from "./components/PokemonCard";
import shuffle from "array-shuffle";
const inputEl = document.querySelector("input");
const dataRow = document.querySelector("[data-row]");

// data.forEach(Pokemon);
renderPokemon(shuffle(data));

function renderPokemon(list) {
  dataRow.textcontent = "";
  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    dataRow.appendChild(pokemon);
  });
}
function handleSearch(input) {
  const filteredPokemon = data.filter((pokemonObj) => {
    pokemonObj.name.toLowerCase().includes(input);
  });
  renderPokemon(filteredPokemon);
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
