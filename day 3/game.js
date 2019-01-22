var my_pokemon = 0;
var my_pokemon_hp = 50;
// flag variable to determine whose turn is this?
var turn = "user";

function start_game(){
  var choice = "";
  if(document.getElementById("c1").checked){
    choice = "Bulbasaur";
    my_pokemon = 1;
  }
  else if(document.getElementById("c2").checked){
    choice = "Charmander";
    my_pokemon = 4;
  }
  else if(document.getElementById("c3").checked){
    choice = "Squartle";
    my_pokemon = 7;
  }
  //alert("You have choosen "+ choice);
  document.getElementById("choice").style.display = "none";
  document.getElementById("screen").style.display = "block";

}
function run(){
  var random = Math.floor(Math.random() * 9) + 1;
  console.log(random);
  console.log(pokemon[random-1]);

  // wild pokemon
  document.getElementById("wild_appearance").innerHTML = "Look! A wild " + pokemon[random-1].name + " has appeared!";
  // padding  0 to fetch the image
  var enemy_image_str = ""+random;
  while(enemy_image_str.length < 3){
    enemy_image_str = ("0"+enemy_image_str);
  }
  document.getElementById("enemy_image").src = "pokemon/front/"+enemy_image_str+".gif";
  // the hpof the enemy Pokemon will be between 10 and 100 in pultiple of 10
  var enemy_hp = (Math.floor(Math.random() * 10 ) + 1 ) * 10;
  document.getElementById("enemy_health").innerHTML = "<strong>HP:"+ enemy_hp + "</strong>";
  document.getElementById("self_health").innerHTML = "<strong>HP:"+ my_pokemon_hp + "</strong>";
  var atcks_enmy = "";
  for(i = 0; i < pokemon[random-1].moves.length; i ++){
    atcks_enmy += "<li>"+pokemon[random-1].moves[i].name+"</li>";
  }
  document.getElementById("enemy_attacks").innerHTML = "<br><br><ul>"+atcks_enmy+"</ul>";

  // user part
  document.getElementById("self_appearance").innerHTML = "<b>"+pokemon[my_pokemon-1].name+"</b>";
  // padding  0 to fetch the image
  var self_image_str = ""+my_pokemon;
  while(self_image_str.length < 3){
    self_image_str = ("0"+self_image_str);
  }
  document.getElementById("self_image").src = "pokemon/back/"+self_image_str+".gif";
  var self_atcks = "<form>";
  for(i = 0; i < pokemon[my_pokemon - 1].moves.length; i++){
    self_atcks += ("<input type = 'radio' id= 'a"+i+"' name = 'atk' value = '"+pokemon[my_pokemon-1].moves[i].name+"'>"+pokemon[my_pokemon-1].moves[i].name+"</br>");
  }
  self_atcks += "<br><input type='button' value='FIGHT' onclick='attack()'/></form>";
  document.getElementById("self_attacks").innerHTML = self_atcks;
}

function attack(){
  if(document.getElementById("a0").checked){
    choice = "Bulbasaur";
    my_pokemon = 1;
  }
  else if(document.getElementById("a1").checked){
    choice = "Charmander";
    my_pokemon = 4;
  }
  else if(document.getElementById("a2").checked){
    choice = "Squartle";
    my_pokemon = 7;
  }
}
