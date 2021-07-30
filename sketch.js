var PLAY = 1
var END = 0
var gameState = 1;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup,obstacleGroup;

var survivalTime=0

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running)
monkey.scale=0.1
monkey.debug=true
  
ground=createSprite(400,350,900,10);
ground.velocityX=-50
ground.X=ground.width/2
console.log(ground.x)  
  
FoodGroup = new Group();
  
obstacleGroup = new Group();  
  
}


function draw() {
background(225);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (keyDown("space")){
     monkey.velocityY=-12 
      }
   
  monkey.velocityY=monkey.velocityY+1
  monkey.collide(ground)
  
  if (gameState===PLAY){
    
      if (FoodGroup.isTouching(monkey)){ 
          FoodGroup.destroyEach();
      }
    
    survivalTime=Math.ceil(frameCount/frameRate())
    
     Fruit();
     Stone();
    
    if (obstacleGroup.isTouching(monkey)){
        gameState=END
      }
    
      }
  
  
  else if (gameState===END){
        
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    monkey.velocityY=0;
    
  }
  
drawSprites();
  
stroke("white");
textSize(20); 
fill("white")
  
  
stroke("black");
textSize(20); 
fill("black")

text("SurvivalTime : "+survivalTime,100,50)
  
}


function Fruit(){
  if (World.frameCount%80===0){
    banana=createSprite(225,175,10,10)
    banana.addImage(bananaImage)
    banana.scale=0.08
    banana.velocityX=-3;
    banana.lifetime=175;
    banana.y=Math.round(random(120,200));
    FoodGroup.add(banana)
    return banana;
  }
}

function Stone(){
  if (World.frameCount%300===0){
    obstacle=createSprite(250,326,10,10);
    obstacle.addImage(obstaceImage)
    obstacle.scale=0.1
    obstacle.velocityX=-3
    obstacle.lifetime=175   
    obstacle.x=Math.round(random(225,300));
    obstacleGroup.add(obstacle)
    return obstacle
  }
}




