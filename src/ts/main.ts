
import shuffle from "array-shuffle";
import Fuse from "fuse.js";
import data from "./data.json";

// Import main.scss file
import "../src/scss/main.scss";
import PokemonCard from "./components/PokemonCard";

// Custom type representing a Pokemon card
interface Pokemon {
  id: number;
  name: string;
  image: string;
  description: string;
  link: string;
  abilities: string[];
}

// DOM targeting
const inputEl = document.querySelector("input") as HTMLInputElement;
const dataRow = document.querySelector("[data-row]") as HTMLDivElement;

// Initial render with shuffled data
renderPokemon(shuffle(data));

// Function for rendering Pokemon cards
function renderPokemon(list: Pokemon[]): void {
  dataRow.textContent = "";

  if (!list.length) {
    const pokemon = PokemonCard({
      image: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/08/Ash-Pokemon.jpg",
      name: "Not Found",
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

// Function to perform search using Fuse.js
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

// Debounce logic to handle input with a delay
let debounceTimer: ReturnType<typeof setTimeout>;

inputEl.addEventListener("input", (e: Event) => {
  const target = e.target as HTMLInputElement;
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    const filteredPokemon = performSearch(target.value.trim().toLowerCase());
    renderPokemon(filteredPokemon);
  }, 1000);
});

// For keyboard accessibility
document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "/") {
    e.preventDefault();
    inputEl.focus();
  }
});
