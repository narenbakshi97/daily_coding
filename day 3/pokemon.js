var pokemons_caught = [];
function showMyPokemons(){
  var listPoke = "<h4>My Pokemons</h4><ol>";
  let pic_poke;
  for(var i = 0; i < pokemons_caught.length; i++){
    let poke_id = pokemons_caught[i].id;
    let poke_index = i;
    pic_poke = ""+pokemons_caught[i].id;
    while(pic_poke.length < 3){
      pic_poke = ("0"+pic_poke);
    }
    listPoke += "<li><button onclick='pokemonMain("+poke_id+", "+poke_index+")'>"+"<img src='pokemon/front/"+pic_poke+".gif'/></button></li>";
  }
  listPoke += "</ol>";
  document.getElementById("myPokemons").innerHTML = listPoke;
}

function pokemonMain(id,index){
  if(!battle){
    myAttacks(pokemons_caught[index]);
    my_pokemon = id+"";
    currentPokemonIndex = index;
    let choice = pokemons_caught[index].name[0].toUpperCase()+pokemons_caught[index].name.substring(1);
    while(my_pokemon.length < 3){
      my_pokemon = ("0"+my_pokemon);
    }
    new Audio("sounds/"+my_pokemon+" - "+choice+".wav").play();
    // show my pokemon
    // user part
    document.getElementById("self_appearance").innerHTML = "<b>"+choice+"</b>";
    // padding  0 to fetch the image
    var self_image_str = ""+my_pokemon;
    while(self_image_str.length < 3){
      self_image_str = ("0"+self_image_str);
    }
    updatePokemonStats();
    resume_game();
    document.getElementById("self_image").src = "pokemon/back/"+self_image_str+".gif";
  }
  else{
    alert("You can't change a Pokemon in midst of a battle!");
  }
}
var turnsNumber = 0;
function catchPokemon(){
  //document.getElementById("self_attacks").innerHTML = "";
  if(current_turn == turn[0]){
    current_turn = turn[1];
    if(myBag[0].quantity > 0){
        myBag[0].quantity--;
        showBag();
        statusUpdate("Trainer threw a Pokeball on wild "+ enemy_pokemon.name+", waiting...");
        //a = ((3*HPmax - 2*HPcurrent)*ratemodified*bonusBall)/(3*HPmax)
        let HPmax = enemy_hp;
        let HPcurrent = (enemy_hp  * enemy_current_lvl)/100;
        let ratemodified = (Math.random() * 255 + 1);
        let bonusBall = 1;

        let a = ((3*HPmax - 2*HPcurrent)*ratemodified*bonusBall)/(3*HPmax);
        console.log(a);
        if(a > 100){
          showBag();
          enemy_pokemon.hp = enemy_hp;
          if(my_lvls.max < enemy_pokemon.hp/10){
            my_lvls.max = enemy_pokemon.hp/10;
          }
          else if(my_lvls.min > enemy_pokemon.hp/10){
            my_lvls.min = enemy_pokemon.hp/10;
          }
          pokemons_caught.push(enemy_pokemon);
          statusUpdate("Congratulations trainer! " + enemy_pokemon.name + " is caught!");

          showMyPokemons();
          enemy_pokemon = null;
          resume_game();
        }
        else{
          statusUpdate("You missed the Pokémon!");
        }
      }
      else{
        alert("You don't have Pokeball");
      }
  }
  else{
    statusUpdate("Wait for your turn.")
  }

}
