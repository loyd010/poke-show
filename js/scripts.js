//Wrapped the pokemonList array in IIFE
let pokemonRepository = (function(){
  let pokemonList = [
  {name: 'Jigglypuff', height: 2, type: ['normal','fairy']},
  {name: 'Squirtle', height: 2, type: 'water'},
  {name: 'Dugtrio', height: 2, type: 'ground'},
  {name: 'Butterfree', height: 4, type: ['bug','flying']},
  {name: 'Ivysaur', height: 3, type: ['grass','poison']}
];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  }
})();

//This forEach() function is replacing the previously used for loop; also updated to refer to IIFE getAll function
pokemonRepository.getAll().forEach(function(pokemon){
  let newPokemonList = document.querySelector('ul');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = pokemon.name;
  button.classList.add('newStyle');
  listItem.appendChild(button);      newPokemonList.appendChild(listItem);
});
