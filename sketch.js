var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, ground;
var obstacleGroup, bananaGroup;
var survivalTime;
var gameState = 0;
var PLAY = 0;
var END = 1;

function preload() {
  monkey_running = loadAnimation(  "sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png","sprite_7.png","sprite_8.png");
  monkeyTouching = loadAnimation("sprite_0.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 250);

  monkey = createSprite(40, 200, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("touching",monkeyTouching);
  monkey.scale = 0.1;

  ground = createSprite(300, 245, 600, 15);

  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,200,monkey.height);
  obstacleGroup.setColliderEach("rectangle",0,0,100,100);
  monkey.debug=true;
  obstacleGroup.debug=true;
}

function draw() {
  background("lightblue");
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
   monkey.velocityY = monkey.velocityY + 0.8; 

  spawnBanana();
  spawnObstacles();

  if (keyDown("space") && monkey.y > 200) {
    monkey.velocityY = -14;
  }
  ground.velocityX = -3;
    
  stroke("black");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount /   frameRate())
  text("survivalTime:" + survivalTime, 250, 50);
    
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
  }
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  if(gameState === END){
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.setVelocity=0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    monkey.changeAnimation("touching",monkeyTouching)
  }
  ground.shapeColor = "green";

  if (ground.x > 0) {
    ground.x = ground.width/2;
  }
  
  drawSprites();
}

function spawnBanana() {
  if (frameCount % 200 === 0) {
    banana = createSprite(610, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.y = Math.round(random(50, 100));
    bananaGroup.add(banana);
    }
}

function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(610, 220, 20, 20);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
}