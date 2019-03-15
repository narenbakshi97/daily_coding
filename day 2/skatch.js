var mapImage;
var arrt= []  ;
var zoom = 1;
var clat = 0;
var clon = 0;
var colors = [[0,0,128],[0,0,255],[0,255,0],[0,255,255],[128,0,128],[255,105,180],[255,255,0],[255,0,0]];
// 31.2304° N, 121.4737° E
// 49.2827° N, 123.1207° W
var lat = 49.2827;
var lon = -123.1207;
var earthquakes;

function preload(){
  mapImage = loadImage("https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,"+zoom+",0,0/1024x512?access_token=pk.eyJ1IjoibnJiOTciLCJhIjoiY2pyNHNxb2N6MDkweTN4cG54Y2M4ZGlyaiJ9.DOFqa3NvWAFmWZI1ag3GQQ");
  earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv");
}

function mercX(lon){
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat){
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup(){
  createCanvas(1024, 512);
  image(mapImage, 0, 0);
  translate(width / 2, height / 2);
  imageMode(CENTER);


  for(var  i = 0; i < earthquakes.length; i++){
    var data = earthquakes[i].split(/,/);
    //console.log(data);

    var lat = data[1];
    var lon = data[2];
    var mag = data[4];

    var cx = mercX(clon);
    var cy = mercY(clat);

    var x = mercX(lon) - cx;
    var y = mercY(lat) - cy;

    mag = pow(10, mag);

    var magmax = pow(10,10);
    console.log(magmax);
    var d = map(mag, 0 ,magmax, 15,150);
    arrt.push(Math.floor(mag));
    //stroke(255, 0, 255);
    var hue = {r:0, g:0, b:0};
    if(Math.floor(mag) > 30000){
      hue.r = 25;
      hue.g = 25;
      hue.b = 112;
    }
    else if(Math.floor(mag) > 10000){
      hue.r = 0;
      hue.g = 0;
      hue.b = 139;
    }
    else if(Math.floor(mag) > 5000){
      hue.r = 0;
      hue.g = 0;
      hue.b = 255;
    }
    else if(Math.floor(mag) > 1000){
      hue.r = 70;
      hue.g = 130;
      hue.b = 180;
    }
    else if(Math.floor(mag) > 500){
      hue.r = 30;
      hue.g = 144;
      hue.b = 255;
    }
    else if(Math.floor(mag) > 50){
      hue.r = 135;
      hue.g = 206;
      hue.b = 235;
    }
    else if(Math.floor(mag) > 5){
      hue.r = 176;
      hue.g = 224;
      hue.b = 230;
    }
    else{
      hue.r = 230;
      hue.g = 230;
      hue.b = 250;
    }
    noStroke();
    fill(hue.r,hue.g,hue.b, 85);
    textSize(25);
    ellipse(x, y, d, d);
    text("Earthquake Data",-300,230)
    fill(176,224,230);
    rect(-50,210,20,20);

    fill(135,206,235);
    rect(-30,210,20,20);

    fill(30,144,255);
    rect(-10,210,20,20);

    fill(70,130,180);
    rect(10,210,20,20);

    fill(0,0,255);
    rect(30,210,20,20);

    fill(0,0,139);
    rect(50,210,20,20);

    fill(25,25,112);
    rect(70,210,20,20);

    fill("white");
    textSize(15);
    text("Magnitude low to high", -50, 250);
  }
}

function draw(){

}
