var lineX = 0;
var issX = 0;
var issY = 0;

function setup(){
  createCanvas(700,680);
  setInterval( askIss,1000);
}

function askIss(){
  loadJSON( "http://api.open-notify.org/iss-now.json", gotData);
}

function gotData(data){
  var lat = data.iss_position.latitude;
  var lon = data.iss_position.longitude;
  issX = map(lat, -90,90, 0, width);
  issY = map(lon, -180, 180, 0, height);
}

function draw(){
  background(51);

  fill(255);
  ellipse(issX, issY, 40, 40);
  stroke(255);
  line(lineX,0,lineX,height);
  lineX = lineX + 5;
  if(lineX == width){
    lineX = 0;
  }
}
