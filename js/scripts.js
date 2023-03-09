//organized array to be more readable
//IIFE to manage scope
let pokemonRepository = (function(){ 
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1200';

  //extra validation when adding new pokemon to the array
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon 
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log('pokemon is not correct');
    } 
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokedexList = $('.pokemon-list');
    let listItem = $('<li class="group-list-item"></li>');
    let button = $(`<button type="button" class="pokemon-button btn btn-primary" data-toggle="modal" data-target="#pokemon-modal">${pokemon.name}</button>`);
    listItem.append(button);
    pokedexList.append(listItem);
    button.on('click', function() {
      showDetails(pokemon);
    });

  }

  //loads list of pokemon from API - uses JSON to communicate with API
  //may need some walkthrough on this section
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function(e) {
      console.error(e);
    })
  }

  //telling which details to load in?
  //uses promises 
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types.map((type) => type.type.name); //may need some help understanding this
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showPokemonModal(item);
    })
  }

  /* need to figure out bootstrap */
  function showPokemonModal(pokemon) {
    let modalTitle = $(`.modal-title`);
    let modalBody = $(`.modal-body`);
    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(pokemon.name);
    modalBody.append(`<img class="modal-img" src="${pokemon.imageUrl}">`);
    modalBody.append(`<p>Height: ${pokemon.height}</p>`);
    modalBody.append(`<p>Types: ${pokemon.types}</p>`);
  }
  
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showPokemonModal: showPokemonModal 
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

