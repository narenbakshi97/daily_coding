// the attacks are defined here
var myMoves = [];
var enemyMoves = [];
var turn = "user";

function enemyAttacks(wild){
  enemyMoves = [];
  let moves = wild.moves;
  for(let i = 0; i < moves.length; i++){
    let tmp = {};
    tmp.name = moves[i].move.name;
    tmp.url = moves[i].move.url;
    tmp.level = moves[i].version_group_details[0].level_learned_at;
    // checking enemy's level
    if(tmp.level < (enemy_hp/10)){
      let requ = new XMLHttpRequest();
      requ.open('GET', tmp.url, true);
      requ.onload = function () {
        data = JSON.parse(this.response);
        tmp.power = data.power;
        tmp.type = data.type.name;
        enemyMoves.push(tmp);
      }
      requ.send();
    }
  }
  console.log(enemyMoves);
}

function myAttacks(pkmn){
  myMoves = [];
  let moves = pkmn.moves;
  for(let i = 0; i < moves.length; i++){
    let tmp = {};
    tmp.name = moves[i].move.name;
    tmp.url = moves[i].move.url;
    tmp.level = moves[i].version_group_details[0].level_learned_at;
    // checking enemy's level
    if(tmp.level < (pkmn.hp/10)){
      let requ = new XMLHttpRequest();
      requ.open('GET', tmp.url, true);
      requ.onload = function () {
        data = JSON.parse(this.response);
        tmp.power = data.power;
        tmp.type = data.type.name;
        myMoves.push(tmp);
      }
      requ.send();
    }
  }
  console.log(myMoves);
}

// moves = {name:, power:, type:, level: , url:}
function showMyAttacks(){
  document.getElementById("self_attacks").innerHTML = "";
  let str = "";
  let k = Math.floor(Math.random() * myMoves.length);
  for(let i = 0; i < 4; i++){
      //console.log(myMoves[i].name);
      str += "<button onclick='moveChoice("+k+")'>"+myMoves[k].name+"</button><br>";
      k++;
      if(k > myMoves.length){
        k = 0;
      }
  }
  document.getElementById("self_attacks").innerHTML = str;
}

function moveChoice(index){
  let theMove = myMoves[index];
  console.log(theMove);
  // A: attacker's Level
  let A = pokemons_caught[currentPokemonIndex].hp/10;
  // C: attack Power
  let C = theMove.power;

  // my pokemon's type
  pType = pokemons_caught[currentPokemonIndex].types[0].type.name;
  if(pType == "dark"){
    pType = "ghost";
  }
  // my poemon's attack type
  paType = theMove.type;
  if(paType == "dark"){
    paType = "ghost";
  }
  // enemy's type
  eType = enemy_pokemon.types[0].type.name;
  if(eType == "dark"){
    eType = "ghost";
  }
  // B: attacker's Attack or Special
  let B = typeModifier[paType][eType];
  // D: defender's Defense or Special
  let D = typeModifier[eType][paType];
  // Y: typeModifers
  let Y = typeModifier[pType][eType] * 10;
  // X: same-Type attack bonus
  let X = 1;
  if(pType == paType){
    X = 1.5;
  }
  let Z = Math.floor(Math.random() * 255 + 217);
  //((2A/5+2)*B*C)/D)/50)+2)*X)*Y/10)*Z)/255
  //(((((((2 * A / 5 + 2) * B * C) / D) / 50 + 2) * X) * Y / 10) * Z) / 255
  ans = (((((((2 * A / 5 + 2) * B * C) / D) / 50 + 2) * X) * Y / 10) * Z) / 255;

  console.log(ans);
  // let's actually damge that pokemon
  let damage = ans/enemy_hp * 100;
  console.log(damage);
  enemy_current_lvl -= damage;
  enemy_current_lvl = Math.floor(enemy_current_lvl);
  document.getElementById("enemy_health").innerHTML = "<strong>Health:"+ enemy_current_lvl +"/100</strong>";
  if(enemy_current_lvl <= 0){
    alert("You won!");
    enemy_pokemon = null;

    resume_game();
  }
}
