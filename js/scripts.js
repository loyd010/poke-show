//Wrapped the pokemonList array in IIFE
let pokemonRepository = (function(){
  let pokemonList = [];

//Added link to API for pokemon data
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

//addListItem added and function inside forEach changed to create buttons for each pokemon; event listener added for button clicks

    function addListItem(pokemon){
      let newPokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      listItem.classList.add('list-group-item', 'list-unstyled');
      button.innerText = pokemon.name;
      button.classList.add('btn', 'btn-info', 'btn-block');
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#pokemonModal');
      listItem.appendChild(button);
      newPokemonList.appendChild(listItem);
      button.addEventListener('click', () => {
        showDetails(pokemon);
      });
  }

//updated showDetails function to show details retrieved via API
  function showDetails(pokemon){
    loadDetails(pokemon).then(function (){
    showModal(pokemon);
    });
  }

//added loadList and loadDetails functions to pokemon repository

  function loadList(){
    return fetch(apiUrl).then(function (response){
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
      item.imageUrlFront = details.sprites.front_default;
      item.imageUrlBack = details.sprites.back_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = [];
      details.types.forEach(function(element){
        item.types.push(element.type.name);
      });
    }).catch(function (e){
      console.error(e);
    });
  }

/*global $*/
  function showModal(pokemon){
  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');

  modalTitle.empty();
  modalBody.empty();

  let nameElement = $('<h1>' + pokemon.name + '</h1>');

  let imageElementFront = $('<img class = "modal-img" style="width:50%">');
  imageElementFront.attr('src', pokemon.imageUrlFront);
  let imageElementBack = $('<img class = "modal-img" style="width:50%">');
  imageElementBack.attr('src', pokemon.imageUrlBack);

  let heightElement = $('<p>' + 'height : ' + pokemon.height + '\'' + '</p>');

  let weightElement = $('<p>' + 'weight : ' + pokemon.weight + '</p>');

  let typesElement = $('<p>' + 'type(s) : '+ pokemon.types + ' </p>');

  modalTitle.append(nameElement);
	modalBody.append(imageElementFront);
	modalBody.append(imageElementBack);
	modalBody.append(heightElement);
	modalBody.append(weightElement);
	modalBody.append(typesElement);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
