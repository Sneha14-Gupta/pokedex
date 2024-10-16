import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import data from "./data.json";

import { Pokemon } from "./interface/pokemon";

// Import main.scss file
import "../scss/main.scss";
import PokemonCard from "./components/PokemonCard";


// DOM targeting
const inputEl = document.querySelector("input") as HTMLInputElement;
const dataRow = document.querySelector("[data-row]") as HTMLDivElement;

renderPokemon(shuffle(data));

// Function for rendering Pokemon cards
function renderPokemon(list: Pokemon[]): void {
  dataRow.textContent = "";

  if (!list.length) {
    const pokemon = PokemonCard({
      image:
        "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/Ash-Pokemon.jpg",
      name: "Not Found",
      description: "Try another search",
    });
    dataRow.appendChild(pokemon);
    return;
  }
  const fragment = document.createDocumentFragment();

  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    fragment.appendChild(pokemon);
  });
  dataRow.appendChild(fragment);
}

// Function to perform search
function performSearch(input: string): Pokemon[] {
  const options = {
    keys: ["name", "abilities"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  if (!input) return data;

  const searched = fuse.search(input);
  return searched.map((obj) => obj.item);
}

// Debounce logic
let debounceTimer: ReturnType<typeof setTimeout>;

inputEl.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const filteredPokemon = performSearch(target.value.trim().toLowerCase());
    renderPokemon(filteredPokemon);
  }, 600);
});

// For keyboard accessibility
document.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "/") {
    inputEl.focus();
  }
});
