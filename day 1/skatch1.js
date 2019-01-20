var Weatherdata;
var button, input;
var api = "http://api.openweathermap.org/data/2.5/weather?q="
var apiKey = "&APPID=9f6f82f52b23082a46bfbda61527040a";
var units = "&units=metric"
function preload(){

}

function setup(){
    createCanvas(700,630);
    button = select("#submit");
    input = select("#city");

    button.mousePressed(askWeatherCity);
    function askWeatherCity(){
      var url = api + input.value() + apiKey + units;
      loadJSON(url,gotData);

      function gotData(data){
        Weatherdata = data;
      }
    }
}

function draw(){
  background(0);
  if(Weatherdata){
    var temp = Weatherdata.main.temp;
    var humid = Weatherdata.main.humidity;
    ellipse(250,300,temp,temp);
    ellipse(500,300,humid,humid)
  }
}
