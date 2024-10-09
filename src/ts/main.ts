import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import data from "./data.json";
// import main.scss file
import "../src/scss/main.scss";

import PokemonCard from "./components/PokemonCard";
// custom type representing pokemon card
interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
  abilities: string[];
}
// dom targeting
const inputEl = document.querySelector("input") as HTMLInputElement;
const dataRow = document.querySelector("[data-row]") as HTMLDivElement;
//data.forEach(Pokemon);
renderPokemon(shuffle(data));
// fxn for rendering card
function renderPokemon(list: Pokemon[]): void {
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
function handleSearch(input: string): void {
  const options = {
    keys: ["name", "abilities"],
    threshold: 0.5,
  };
  //
  const fuse = new Fuse(data, options);
  // perform search fxn
  function performSearch(): Pokemon[] {
    if (!input) return data;
    const searched = fuse.search(input);
    return searched.map((obj) => obj.item);
  }
  let debouceTimer: ReturnType<typeof setTimeout>;
  inputEl.addEventListener("input", (e) => {
    clearTimeout(debouceTimer);
    const target = e.target as HTMLInputElement;
    debouceTimer = setTimeout(() => {
      handleSearch(target.value.trim().toLowerCase());
    }, 500);
  });
  const filteredPokemon = performSearch();
  renderPokemon(filteredPokemon);
  // renderPokemon(filteredPokemon);
}
inputEl.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  handleSearch(target.value.trim().toLowerCase());
});
//for keyboard accesibility
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "/") {
    e.preventDefault();
    inputEl.focus();
  }
});
// console.log(data.length);
