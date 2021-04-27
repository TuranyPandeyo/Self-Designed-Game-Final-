var PlayerCar, PlayerCarImage, ExplodedPlayerCarImage, ExplodedPlayerCarSound;
var NonPlayerCar, NonPlayerCarImage, NonPlayerCarGroup;
var BG, bgSprite, gameOver, gameOverImg;
var coin, coinGroup, coinImage, coinCollect;
var gameState = "storyLine";
var  score = 0



function preload(){

  PlayerCarImage = loadAnimation("PlayerCarImage.png");
  BG = loadImage("bg.png");
  coinImage = loadImage("coin.png");
  NonPlayerCarImage = loadImage("NonPlayerCarImage.png");
  ExplodedPlayerCarImage = loadAnimation("ExplodedPlayerCarImage.png");
  gameOverImg = loadImage("gameOver.png");
  coinCollect = loadSound("coin.mp3");
  ExplodedPlayerCarSound = loadSound("crash.mp3");

  
}
function setup() {
  createCanvas(2000,500);

  bgSprite = createSprite(1000, 250, 2000, 500)
  bgSprite.addImage(BG);
  bgSprite.scale = 3;

  PlayerCar = createSprite(200, 300, 50, 50);
  PlayerCar.addAnimation(" PlayerCarImage" , PlayerCarImage);
  PlayerCar.addAnimation("ExplodedPlayerCarImage", ExplodedPlayerCarImage);
  PlayerCar.scale = 0.20;    

  coinGroup = new Group();
  NonPlayerCarGroup = new Group();

      
  gameOver = createSprite(1000, 250, 50, 50);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

}

function draw() {

  background("black");

  bgSprite.velocityX = -8;
  if (keyDown("l")){

    gameState = "play";

  }
  

  if (coinGroup.isTouching(PlayerCar)){

    score += 1;
    coinGroup[0].destroy();
    coinCollect.play();

  }  
  
  if (NonPlayerCarGroup.isTouching(PlayerCar)){

    gameState = "end";
    ExplodedPlayerCarSound.play();

  }

  if(keyDown("r")){

    reset();

  }


  
  drawSprites();


  if (gameState === "storyLine"){

    fill("red");
    textSize(28);
    text("You are devoting your whole life, ", 900, 250);
    text("for the people in need", 900, 290);
    text("Collect as many coins you can for the funds", 900, 330);

    bgSprite.velocityX = 0;
    console.log("story");
    PlayerCar.visible = false;

  }

  if (gameState === "play"){

    if (bgSprite.x < 0){
      bgSprite.x = bgSprite.width/2;
    }
    fill("white");
    textSize(28);
    text("CoinCollected: " + score, 1000, 50)
    
    console.log("PLAY");
    PlayerCar.visible = true;

    if (keyDown(UP_ARROW)){

      PlayerCar.y -= 5; 
  
    }  
    if (keyDown(DOWN_ARROW)){
  
      PlayerCar.y += 5; 
  
    }
  

    spawnCoins();
    spawnNonPlayerCar();

  }

  if(gameState === "end"){
    
    gameOver.visible = true ;
    bgSprite.velocityX = 0;
    NonPlayerCarGroup.setVelocityEach(0);
    coinGroup.setVelocityEach(0);

    PlayerCar.changeAnimation("ExplodedPlayerCarImage", ExplodedPlayerCarImage);

    
    NonPlayerCarGroup.setLifetimeEach(-1);
    coinGroup.setLifetimeEach(-1);


  }
}

function spawnCoins(){

  if (frameCount % 100 === 0){

    coin = createSprite(2000, 250, 40, 10);
    coin.addImage(coinImage);
    coin.scale = 0.3;
    coin.velocityX = -15; 
    coin.lifetime = 500;
    coin.y = Math.round(random(0, 500));
    coinGroup.add(coin);

  }

}

function spawnNonPlayerCar(){
   
  if (frameCount % 250 === 0){

    NonPlayerCar = createSprite(2000 , 250, 50, 50);
    NonPlayerCar.addImage(NonPlayerCarImage);
    NonPlayerCar.scale = 0.28;
    NonPlayerCar.velocityX = -11; 
    NonPlayerCar.lifetime = 500;
    NonPlayerCar.y = Math.round(random(0, 500));
    NonPlayerCarGroup.add(NonPlayerCar);

  }
}

function reset(){

  gameState = "play";
  score = 0;

  coinGroup.destroyEach();
  NonPlayerCarGroup.destroyEach();
  gameOver.visible = false;
  PlayerCar.addAnimation("PlayerCarImage", PlayerCarImage);
  PlayerCar.changeAnimation(" PlayerCarImage" , PlayerCarImage);

}