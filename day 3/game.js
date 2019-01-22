// intro
var request = new XMLHttpRequest();
var intro_music;
var battleSound;
function intro(){
  document.getElementById("daily").pause();

  intro_music = new Audio("sounds/opening.mp3");
  intro_music.play();
  battleSound = new Audio("sounds/battle.mp3");
}

var my_pokemon = 0;
var enemy_pokemon;
var my_pokemon_hp = 50;
// flag variable to determine whose turn is this?
var turn = "user";

function start_game(){
  document.getElementById("myMoney").innerHTML = "Money: "+myMoney;
  showBag();
  document.getElementById("daily").play();
  intro_music.pause();
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
    choice = "Squirtle";
    my_pokemon = 7;
  }
  // store to myPokemons
  var newEntry;
  request.open('GET', 'https://pokeapi.co/api/v2/pokemon/'+my_pokemon+'/', true);
  request.onload = function () {
    newEntry = JSON.parse(this.response);
    pokemons_caught.push(newEntry);
    showMyPokemons();
  }
  request.send();
  // play the sound of your Pokemon
  new Audio("sounds/00"+my_pokemon+" - "+choice+".wav").play();
  // show my pokemon
  // user part
  document.getElementById("self_appearance").innerHTML = "<b>"+choice+"</b>";
  // padding  0 to fetch the image
  var self_image_str = ""+my_pokemon;
  while(self_image_str.length < 3){
    self_image_str = ("0"+self_image_str);
  }
  document.getElementById("self_image").src = "pokemon/back/"+self_image_str+".gif";
  // var self_atcks = "<form>";
  // for(i = 0; i < pokemon[my_pokemon - 1].moves.length; i++){
  //   self_atcks += ("<input type = 'radio' id= 'a"+i+"' name = 'atk' value = '"+pokemon[my_pokemon-1].moves[i].name+"'>"+pokemon[my_pokemon-1].moves[i].name+"</br>");
  // }
  // self_atcks += "<br><input type='button' value='FIGHT' onclick='attack()'/></form>";
  // document.getElementById("self_attacks").innerHTML = self_atcks;

  //alert("You have choosen "+ choice);
  document.getElementById("choice").style.display = "none";
  document.getElementById("screen").style.display = "block";

}

function run(){
  battleSound.pause();
  battleSound.currentTime = 0;
  document.getElementById("daily").pause();
  battleSound.play();
  var random = Math.floor(Math.random() * 150) + 1;
  console.log(random);
//  console.log(pokemon[random-1]);


  //**************************************************************************************************
  // wild pokemon
  // accessing that pokemon through API
  // Open a new connection, using the GET request on the URL endpoint
var data;
request.open('GET', 'https://pokeapi.co/api/v2/pokemon/'+random+'/', true);
request.onload = function () {
  data = JSON.parse(this.response);
  statusUpdate("Look, a wild "+ data.name + " just appeared!");
  document.getElementById("wild_appearance").innerHTML = "<h4>" + data.name + "</h4>";
  // padding  0 to fetch the image
  enemy_pokemon = data;
  var enemy_image_str = ""+random;
  while(enemy_image_str.length < 3){
    enemy_image_str = ("0"+enemy_image_str);
  }
  // loading sound of that wild pokemon
  var enemy_snd_file = data.name[0].toUpperCase().concat(data.name.substring(1));
  console.log(enemy_snd_file);
  var snd = new Audio("sounds/"+enemy_image_str+" - "+enemy_snd_file+".wav");
  snd.play();
  // show
  document.getElementById("enemy_image").src = "pokemon/front/"+enemy_image_str+".gif";
}
request.send();


  // // the hpof the enemy Pokemon will be between 10 and 100 in pultiple of 10
  // var enemy_hp = (Math.floor(Math.random() * 10 ) + 1 ) * 10;
  // document.getElementById("enemy_health").innerHTML = "<strong>HP:"+ enemy_hp + "</strong>";
  // document.getElementById("self_health").innerHTML = "<strong>HP:"+ my_pokemon_hp + "</strong>";
  // var atcks_enmy = "";
  // for(i = 0; i < pokemon[random-1].moves.length; i ++){
  //   atcks_enmy += "<li>"+pokemon[random-1].moves[i].name+"</li>";
  // }
  // document.getElementById("enemy_attacks").innerHTML = "<br><br><ul>"+atcks_enmy+"</ul>";
  //
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


function statusUpdate(str){
  document.getElementById("status").innerHTML = str;
}
