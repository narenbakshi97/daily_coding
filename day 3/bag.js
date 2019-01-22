var myBag = [];
var pokeballs = 3;
myBag.push({name:"pokeball",quantity:pokeballs,image:"items/pokeball.png"});

function showBag(){
  let bagContents = "<ol>";
  for(let i = 0; i < myBag.length; i++){
    bagContents += "<li><a href='#'><img src='"+myBag[i].image+"'/><h3>x"+myBag[i].quantity+"</h3></a></li>";
  }
  bagContents += "</ol>";
  document.getElementById("myBag").innerHTML = "<h4>My Bag</h4>"+bagContents;
}
