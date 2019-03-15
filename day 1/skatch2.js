var lineX = 0;
var issX = 0;
var issY = 0;
var lat, lon;
function setup(){
  createCanvas(700,680);
  setInterval( askIss,1000);
}

function askIss(){
  loadJSON( "http://api.open-notify.org/iss-now.json", gotData);
}

function gotData(data){
  lat = data.iss_position.latitude;
  lon = data.iss_position.longitude;
  issX = map(lat, -90,90, 0, width);
  issY = map(lon, -180, 180, 0, height);
}

function draw(){
  background(51);

  fill(255);
  ellipse(issX, issY, 40, 40);
  textSize(15);
  text("Lat: "+lat+", Lon: "+lon, issX-70, issY+40);
  textSize(30);
  text("International Space Station location", width/5, height/2);
  stroke(255);
  line(lineX,0,lineX,height);
  lineX = lineX + 5;
  if(lineX == width){
    lineX = 0;
  }
}
