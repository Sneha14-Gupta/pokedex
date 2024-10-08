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
      link: "https://pokedex.com",
      description: "Try another search",
    });
    dataRow.appendChild(pokemon);
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

//inputEl.addEventListener("click",(e) => {
//   setTimeout((inputEl) => {
//   alert("hey");
//     console.log(e.target.value);
//   }, 2000);
// });

// console.log(data.length);
