var pokemons_caught = [];
function showMyPokemons(){
  var listPoke = "<h4>My Pokemons</h4><ol>";
  let pic_poke;
  for(var i = 0; i < pokemons_caught.length; i++){
    pic_poke = ""+pokemons_caught[i].id;
    while(pic_poke.length < 3){
      pic_poke = ("0"+pic_poke);
    }
    listPoke += "<li><a href='#'>"+"<img src='pokemon/front/"+pic_poke+".gif'/></a></li>";
  }
  listPoke += "</ol>";
  document.getElementById("myPokemons").innerHTML = listPoke;
}

function catchPokemon(){
  if(myBag[0].quantity > 0){
      statusUpdate("Trainer threw a Pokeball on wild "+ enemy_pokemon.name+", waiting...");
      myBag[0].quantity--;
      showBag();
      pokemons_caught.push(enemy_pokemon);
      statusUpdate("Congratulations trainer! " + enemy_pokemon.name + " is caught!");
      showMyPokemons();
      enemy_pokemon = null;
      resume_game();
  }
  else{
    alert("You don't have Pokeball");
  }
}
