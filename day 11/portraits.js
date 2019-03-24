var cnv;
var img_div;
function setup(){
  cnv = createCanvas(1500,800);
  cnv.parent("portrait");
  img_div = createDiv('<img src="images/1.JPG" alt=""><img style="margin-left:500px" src="images/2.JPG" alt=""><img style="margin-left:1000px" src="images/5.JPG" alt="">');
  setInterval(moveCheck, 150);
}

function draw(){
  // the cricles
  img_div.position(10,50);
  // women 1
  fill(255);
  ellipse(182, 248, 10, 10);
  ellipse(230, 248, 10, 10);

  // women 2
  ellipse(692, 215, 10, 10);
  ellipse(732, 215, 10, 10);

  // women 3
  ellipse(1205, 181, 10, 10);
  ellipse(1255, 181, 10, 10);

  // ellipse eye ball
  fill(0);
  noLoop();
}
function moveCheck(){
  draw();
  console.log("move check called");
  // the lady on the left
  moveEyes(182,248);
  moveEyes(230,248);

  // the middle one
  moveEyes(692,215);
  moveEyes(732,215);

  // the davinci lady
  moveEyes(1205,181);
  moveEyes(1255,181);
}
function moveEyes(x,y){
  // first coordinate
  let r = 4;
  if(x > mouseX && y > mouseY){
    ellipse(x- (x - mouseX)%r, y - (y - mouseY)%r, 5, 5);
  }
  // second coord
  else if(x < mouseX && y > mouseY){
    ellipse(x + (mouseX - x)%r, y - (y - mouseY)%r, 5, 5);
  }
  // third
  else if(x < mouseX && y < mouseY){
    ellipse(x + (mouseX - x)%r, y + (mouseY - y)%r, 5, 5);
  }
  // forth
  else{
    ellipse(x - (x - mouseX)%r, y + (mouseY - y)%r, 5, 5);
  }
}
