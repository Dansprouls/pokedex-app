//organized array to be more readable
//IIFE to manage scope
let pokemonRepository = (function(){ 
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  let modalContainer = document.querySelector('#pokemon-modal-container');

  //extra validation when adding new pokemon to the array
  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon 
    ) {
      pokemonList.push(pokemon);
    }else {
      console.log('pokemon is not correct');
    } 
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokedexList = document.querySelector('.pokemon-list'); //pokedexList = UL in html
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-name-list');
    listItem.appendChild(button);
    pokedexList.appendChild(listItem);
    button.addEventListener('click', function(event){
      showDetails(pokemon); //what is the event param?
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

  /* struggling here */
  function showPokemonModal(pokemon){
    const { name, height, types, imageUrl } = pokemon;
    /* let modalContainer = document.querySelector('#pokemon-modal-container'); */
    modalContainer.innerHTML = '';
    let pokemonModal = document.createElement('div');
    pokemonModal.classList.add('pokemon-modal');

    let closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.innerText = 'X';
    closeButton.addEventListener('click', hideModal);

    let modalTitle = document.createElement('h1');
    modalTitle.classList.add('modal-content', 'modal-title');
    modalTitle.innerText = name;

    let modalHeight = document.createElement('p');
    modalHeight.classList.add('modal-content', 'modal-list-item');
    //modalHeight.innerText = height;
    modalHeight.innerText = 'Height: ' + height;

    let modalTypes = document.createElement('p');
    modalTypes.classList.add('modal-content', 'modal-list-item');
    modalTypes.innerText = 'Type(s): ' + types;

    let modalImg = document.createElement('img');
    modalImg.classList.add('modal-content', 'modal-img');
    modalImg.src = imageUrl;

    pokemonModal.appendChild(closeButton);
    pokemonModal.appendChild(modalTitle);
    pokemonModal.appendChild(modalHeight);
    pokemonModal.appendChild(modalTypes);
    pokemonModal.appendChild(modalImg);
    modalContainer.appendChild(pokemonModal);



    modalContainer.classList.add('is-visible');
    }

    function hideModal() {
      /* let modalContainer = document.querySelector('#pokemon-modal-container'); */
      modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e) => {
      /* let modalContainer = document.querySelector('#pokemon-modal-container'); */
      if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();
      }
    });

    /* let modalContainer = document.querySelector('#pokemon-modal-container'); */
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showPokemonModal: showPokemonModal //do i need?
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});

