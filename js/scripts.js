//Wrapped the pokemonList array in IIFE
let pokemonRepository = (function(){
  let pokemonList = [];

//Added link to API for pokemon data
  let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

//addListItem added and function inside forEach changed to create buttons for each pokemon; event listener added for button clicks

    function addListItem(pokemon){
      let newPokemonList = document.querySelector('ul');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('newStyle');
      listItem.appendChild(button);
      newPokemonList.appendChild(listItem);
      button.addEventListener('click', () => {
        showDetails(pokemon);
      });
  }

//updated showDetails function to show details retrieved via API
  function showDetails(pokemon){
    loadDetails(pokemon).then(function (){
    console.log(pokemon);
    });
  }

//added loadList and loadDetails functions to pokemon repository

  function loadList(){
    return fetch(apiURL).then(function (response){
      return response.json();
    }).then(function (json){
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e){
      console.error(e);
    })
  }

  function loadDetails(item){
    let url = item.detailsUrl;
    return fetch(url).then(function (response){
      return response.json();
    }).then(function (details){
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e){
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
