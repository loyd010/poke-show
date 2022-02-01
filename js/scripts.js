let pokemonList = [
  {name: 'Jigglypuff', height: 2, type: ['normal','fairy']},
  {name: 'Squirtle', height: 2, type: 'water'},
  {name: 'Dugtrio', height: 2, type: 'ground'},
  {name: 'Butterfree', height: 4, type: ['bug','flying']},
  {name: 'Ivysaur', height: 3, type: ['grass','poison']}
];


for (let i=0; i<pokemonList.length; i++){
  document.write(pokemonList[i].name + ' (' + 'height: ' + pokemonList[i].height + '\'' + ')' + '<br>');
}
