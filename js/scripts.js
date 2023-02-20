//organized array to be more readable
let pokemonRepository = (function(){

let pokemonList = [
  {
    pokemonName: 'Articuno',
    pokemonHeight: 1.7,
    pokemonType: ['Ice', 'Flying']
  },
  {
    pokemonName: 'Zapdos',
    pokemonHeight: 1.6,
    pokemonType: ['Electric', 'Flying']
  },
  {
    pokemonName: 'Moltres',
    pokemonHeight: 2,
    pokemonType: ['Fire', 'Flying']
  },
  {
    pokemonName: 'Bulbasaur',
    pokemonHeight: 0.7,
    pokemonType: ['Grass', 'Poison']
  },
  {
    pokemonName: 'Ivysaur',
    pokemonHeight: 1,
    pokemonType: ['Grass', 'Poison']
  },
  {
    pokemonName: 'Venusaur',
    pokemonHeight: 2,
    pokemonType: ['Grass', 'Poison']
  },
  {
    pokemonName: 'Charmander',
    pokemonHeight: 0.6,
    pokemonType: 'Fire'
  },
  {
    pokemonName: 'Charmeleon',
    pokemonHeight: 1.1,
    pokemonType: 'Fire'},
  {
    pokemonName: 'Charizard',
    pokemonHeight: 1.7,
    pokemonType: ['Fire', 'Flying']
  },
  {
    pokemonName: 'Squirtle',
    pokemonHeight: 0.5,
    pokemonType: 'Water'
  },
  {
    pokemonName: 'Wartortle',
    pokemonHeight: 1,
    pokemonType: 'Water'
  },
  {
    pokemonName: 'Blastoise',
    pokemonHeight: 1.6,
    pokemonType: 'Water'
  },
  {
    pokemonName: 'Pikachu',
    pokemonHeight: 0.4,
    pokemonType: 'Electric'
  },
  {
    pokemonName: 'Raichu',
    pokemonHeight: 0.8,
    pokemonType: 'Electric'
  }
];

  function getAll() {
    return pokemonList;
  }
  function add (item) {
    pokemonList.push(item);
  }
  function addListItem(pokemon) {
    let pokedexList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.pokemonName;
    button.classList.add('pokemon-name-list');
    listItem.appendChild(button);
    pokedexList.appendChild(listItem);
    button.addEventListener('click', showDetails)
  }

  function showDetails(pokemon) {
    console.log(pokemon.pokemonName);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    showDetails: showDetails
  }

})();

//for loop that runs the length of the pokemonList array - added in text
/* don't want to delete until assignment is approved
for (let i = 0; i < pokemonList.length; i++) 
{
  if (pokemonList[i].pokemonHeight < 1) { 
    document.write(pokemonList[i].pokemonName + " (height: " + pokemonList[i].pokemonHeight + ") - This is a tiny Pokemon" + "<br>");
  }
  else if (pokemonList[i].pokemonHeight > 1 && pokemonList[i].pokemonHeight < 1.7) {
    document.write(pokemonList[i].pokemonName + " (height: " + pokemonList[i].pokemonHeight + ") - This is an average sized Pokemon" + "<br>");
  }
  else {
    document.write(pokemonList[i].pokemonName + " (height: " + pokemonList[i].pokemonHeight + ") - Wow, that's a big Pokemon!" + "<br>");
  }
}
*/

//new loop using forEach
/* pokemonRepository.getAll().forEach(function(pokemon){
  if (pokemon.pokemonHeight < 1) { 
    document.write(pokemon.pokemonName + " (height: " + pokemon.pokemonHeight + ") - This is a tiny Pokemon" + "<br>");
  }
  else if (pokemon.pokemonHeight > 1 && pokemon.pokemonHeight < 1.7) {
    document.write(pokemon.pokemonName + " (height: " + pokemon.pokemonHeight + ") - This is an average sized Pokemon" + "<br>");
  }
  else {
    document.write(pokemon.pokemonName + " (height: " + pokemon.pokemonHeight + ") - Wow, that's a big Pokemon!" + "<br>");
  }
})
*/

pokemonRepository.getAll().forEach(function(pokemon){
  
  pokemonRepository.addListItem(pokemon);

})
