//This code creates an array with pokemon names and characteristics
let pokemonList = [
  {name: 'Jigglypuff', height: 2, type: ['normal','fairy']},
  {name: 'Squirtle', height: 2, type: 'water'},
  {name: 'Dugtrio', height: 2, type: 'ground'},
  {name: 'Butterfree', height: 4, type: ['bug','flying']},
  {name: 'Ivysaur', height: 3, type: ['grass','poison']}
];

//This code creates a loop to print the name and height of each pokemon character and adds a condition to identify the tallest pokemon
for (let i=0; i<pokemonList.length; i++){
  if (pokemonList[i].height>3){
    document.write(pokemonList[i].name + ' (' + 'height: ' + pokemonList[i].height + '\'' + ')' + ' - Wow, that\'s big!' + '<br>');
  } else {
  document.write(pokemonList[i].name + ' (' + 'height: ' + pokemonList[i].height + '\'' + ')' + '<br>');
  }
}
