// intro
var request = new XMLHttpRequest();
var pokeballs_thrown = 0;
var intro_music;
var battleSound;
var myMoney = 100;
var currentPokemonIndex = 0;
var battle = false;
var my_lvls = {max:5,min:5};
var enemy_current_lvl = 100;
var my_current_lvl = 100;
function intro(){
  document.getElementById("daily").pause();

  intro_music = new Audio("sounds/opening.mp3");
  intro_music.play();
  battleSound = new Audio("sounds/battle.mp3");
}

var my_pokemon = 0;
var enemy_pokemon;
var enemy_hp;
// flag variable to determine whose turn is this?
current_turn = turn[0];

function resume_game(){
  pokeballs_thrown = 0;
  enemy_current_lvl = 100;
  my_current_lvl = 100;
  battle = false;
  current_turn = turn[0];
  battleSound.pause();
  document.getElementById("myMoney").innerHTML = "Money: "+myMoney;
  document.getElementById("enemy").style.display = "none";
  document.getElementById("self_health").innerHTML = null;
  document.getElementById("self_hp").innerHTML = null;
  document.getElementById("self_attacks").innerHTML = null;
  document.getElementById("daily").play();
}

function start_game(){
  pokeballs_thrown = 0;
  setInterval(wildTurn, 1500);
  battle = false;
  document.getElementById("myMoney").innerHTML = "Money: "+myMoney;
  showBag();
  document.getElementById("shop").innerHTML = "<h3>Shop</h3><form><div><label for='pokeball-number'></label><input type='number' id='pokeball-number'/></div><div>1 pokeball = 50 Bucks</div><div><input type='button' onclick='shopPokeball()' value='shop'/></div></form>";
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
    newEntry.hp = 50;
    newEntry.exp = newEntry.base_experience;
    myAttacks(newEntry);
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


// run
var data;
function run(){
  showBag();
  showMyPokemons();
  pokeballs_thrown = 0;
  enemy_current_lvl = 100;
  my_current_lvl = 100;
  battle = true;
  data = null;
  battleSound.pause();
  battleSound.currentTime = 0;
  document.getElementById("daily").pause();
  battleSound.play();
  var random = Math.floor(Math.random() * 150) + 1;
  //console.log(random);
//  console.log(pokemon[random-1]);


if(my_lvls.max < pokemons_caught[currentPokemonIndex].hp/10){
  my_lvls.max = pokemons_caught[currentPokemonIndex].hp/10;
}
else if(my_lvls.min > pokemons_caught[currentPokemonIndex].hp/10){
  my_lvls.min = pokemons_caught[currentPokemonIndex].hp/10;
}


  //**************************************************************************************************
  // wild pokemon
  // accessing that pokemon through API
  // Open a new connection, using the GET request on the URL endpoint

request.open('GET', 'https://pokeapi.co/api/v2/pokemon/'+random+'/', true);
request.onload = function () {
  data = JSON.parse(this.response);
  if(data){
    enemy_hp = (Math.floor(Math.random() * (my_lvls.max+4) ) + 1 ) * 10;
    statusUpdate("Look, a wild "+ data.name + " has appeared!");
    document.getElementById("wild_appearance").innerHTML = "<h4>" + data.name + "</h4>";
    // padding  0 to fetch the image
    enemy_pokemon = data;
    enemyAttacks(data);
    var enemy_image_str = ""+random;
    while(enemy_image_str.length < 3){
      enemy_image_str = ("0"+enemy_image_str);
    }
    // loading sound of that wild pokemon
    var enemy_snd_file = data.name[0].toUpperCase().concat(data.name.substring(1));
    //console.log(enemy_snd_file);
    var snd = new Audio("sounds/"+enemy_image_str+" - "+enemy_snd_file+".wav");
    snd.play();
    // show
    document.getElementById("enemy_image").src = "pokemon/front/"+enemy_image_str+".gif";

    updatePokemonStats();

  document.getElementById("enemy").style.display = "block";
  // load the attacks from both sides
// PcMoves = enemyAttacks();
// UserMoves = myAttacks();
 }
}
request.send();
current_turn = turn[0];
showMyAttacks();


  // the hpof the enemy Pokemon will be between 10 and 100 in pultiple of 10
  // var atcks_enmy = "";
  // for(i = 0; i < pokemon[random-1].moves.length; i ++){
  //   atcks_enmy += "<li>"+pokemon[random-1].moves[i].name+"</li>";
  // }
  // document.getElementById("enemy_attacks").innerHTML = "<br><br><ul>"+atcks_enmy+"</ul>";

}


function statusUpdate(str){
  document.getElementById("status").innerHTML = str;
}


function updatePokemonStats(){
  let enemy_lvl = enemy_hp / 10;
  document.getElementById("enemy_hp").innerHTML = "<strong>HP:"+ enemy_hp +"</strong>";
  document.getElementById("self_hp").innerHTML = "<strong>HP:"+ pokemons_caught[currentPokemonIndex].hp + "</strong>";

  document.getElementById("enemy_health").innerHTML = "<strong>Health:"+ enemy_current_lvl +"/100</strong>";
  document.getElementById("self_health").innerHTML = "<strong>Health:"+ (my_current_lvl)+ "/100</strong>";
}
