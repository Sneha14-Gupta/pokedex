import data from "./data.json";
import PokemonCard from "./components/PokemonCard"
import arrayShuffle from "array-shuffle";
// data.forEach(Pokemon);
renderPokemon(data);

function renderPokemon(list){
  list.forEach((pokemonObj)=>{
    PokemonCard(pokemonObj)
  })
}

