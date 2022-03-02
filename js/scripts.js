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
      listItem.classList.add('list-group-item');
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
  };

  function showModal(pokemon){
  	let modalBody = $('.modal-body');
  	let modalTitle = $('.modal-title');
  	let modalHeader = $('.modal-header');

  	modalTitle.empty();
  	modalBody.empty();

  	let nameElement = $("<h1>" + pokemon.name + "</h1>");

  	let imageElementFront = $('<img class = "modal-img" style="width:50%">');
  	imageElementFront.attr("src", pokemon.imageUrlFront);
  	let imageElementBack = $('<img class = "modal-img" style="width:50%">');
  	imageElementBack.attr("src", pokemon.imageUrlBack);

  	let heightElement = $("<p>" + "height : " + pokemon.height + '\'' + "</p>");

  	let weightElement = $("<p>" + "weight : " + pokemon.weight + "</p>");

  	let typesElement = $("<p>" + "type\(s\) : " + pokemon.types + " </p>");

  	modalTitle.append(nameElement);
  	modalBody.append(imageElementFront);
  	modalBody.append(imageElementBack);
  	modalBody.append(heightElement);
  	modalBody.append(weightElement);
  	modalBody.append(typesElement);
  }

/*added functions to show and hide modal
let modalContainer = document.querySelector('.modal-container');

  function showModal(pokemon){
    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = (pokemon.name);

    let contentElement = document.createElement('p');
    contentElement.innerText = ('Height: ' + pokemon.height + '\'');

    let imageElement = document.createElement('img');
    imageElement.src = (pokemon.imageUrl);

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modal.appendChild(imageElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }

  function hideModal(){
    modalContainer.classList.remove('is-visible');
  }*/

  //added event listeners to close modal if clicking outside of modal or pressing escape
  /*window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if(target === modalContainer){
      hideModal();
    }
  });*/

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
