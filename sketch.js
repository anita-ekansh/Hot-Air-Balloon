var balloon,balloonImage1;
// create database and position variable here
var position, database;
var coolSound;
var radio,radioImage;
var button;

function preload(){
   bg =loadImage("cityImage.png");
   radioImage = loadImage("radio.png");
   balloonImage1=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
   coolSound = loadSound("cool.mp3");
  
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1150,480);

  button = createButton("Play");
  button.mousePressed(togglePlaying);
  button.position(839,107);
  button.size(47,30)
  button.style("color:red");
  
  balloon=createSprite(250,450,200,200);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  radio=createSprite(860,100,200,200);
  radio.addImage(radioImage);

  //play = createSprite(830,100,200,200);
  //play.addImage(playImage)

  textSize(20); 

  var balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value",readPosition, showError);

}

// function to display UI
function draw() {
  background(bg);

  //balloon.bounceOff("edges");

  if(keyDown(LEFT_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage1);
    //write code to move air balloon in left direction
    updateHeight(-10,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    ///balloon.addAnimation("hotAirBalloon",balloonImage1);
    //write code to move air balloon in right direction
    updateHeight(10,0);
  }
  else if(keyDown(UP_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage1);
    //write code to move air balloon in up direction
    updateHeight(0,-10);
    balloon.scale = balloon.scale -0.01
  }
  else if(keyDown(DOWN_ARROW)){
    //balloon.addAnimation("hotAirBalloon",balloonImage1);
    //write code to move air balloon in down direction
    updateHeight(0,+10);
    balloon.scale = balloon.scale +0.01
  }

  drawSprites();
  fill("orange");
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",20,30);

  fill("orange");
  stroke("white");
  textSize(25);
  text("Press play button below to switch on the stereo!!",600,30);

}
function updateHeight(x, y){
  database.ref('balloon/height').set({
  'x' : height.x + x ,
  'y': height.y + y
  })
}

function readPosition(data) {
  height = data. val();
  balloon.x = height.x;
  balloon.y = height.y;
}  

function showError(){
  console.log("Error in writing to the database");
}


function togglePlaying(){
  if(!coolSound.isPlaying()){  
  coolSound.play();
  button.html("Stop");
  }
  else{
    coolSound.stop();
    button.html("Play");
  }
}