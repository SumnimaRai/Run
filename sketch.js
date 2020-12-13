var c;
var bgImage;
var bg;
var invisibleGround;
var ant;


var gameState = "play";

function preload(){
  bgImage = loadImage("background.jpg");
  groundImage = loadImage("ground.png");
 cat1 = loadAnimation("walter the cat/cat1.gif","walter the cat/cat2.gif","walter the cat/cat3.gif",
 "walter the cat/cat4.gif","walter the cat/cat5.gif","walter the cat/cat6.gif","walter the cat/cat7.gif",
 "walter the cat/cat8.gif")
 jumpSound = loadSound("0001.mp3");
 ant1 = loadAnimation("ant/1.gif","ant/2.gif","ant/3.gif","ant/4.gif",
 "ant/5.gif","ant/6.gif","ant/7.gif");
 boxJump = loadAnimation("jumping block/box1.gif","jumping block/box2.gif","jumping block/box3.gif",
 "jumping block/box4.gif","jumping block/box5.gif","jumping block/box6.gif","jumping block/box7.gif");
 rockImg = loadImage("rock.png");
 gi = loadImage("game over.png");
}

function setup() {
  createCanvas(1000, 1000);

    bg = createSprite(1000/2,1000/2,1000,1000);
    bg.addImage(bgImage);
    bg.scale=3.5;


    c = createSprite(200,200,50,50);
    c.addAnimation("running",cat1);
    c.scale=0.1;
 
    gameover = createSprite(500,500);
    gameover.addImage(gi);
    gameover.visible=false;

    invisibleGround = createSprite(1000/2,1000-100,1000,50);
    invisibleGround.visible=false;

    antsGroup = new Group();
    blocksGroup = new Group();
    rocksGroup = new Group();

}

function draw(){
background("black");

if(gameState === "play"){

  bg.velocityX=-2;

  if(bg.x<0){
    bg.x=windowWidth/2;
    }
    
    if(keyDown("space") && c.y>=590){
    c.velocityY=-10;
    }
    
    c.velocityY+=0.8;
    c.collide(invisibleGround);
    
    blocks();
    ants();
    rocks();

    if(antsGroup.isTouching(c) || blocksGroup.isTouching(c) || rocksGroup.isTouching(c)){
      gameState = "end";
    }
}
else if(gameState === "end"){

  antsGroup.setVelocityXEach(0);
  blocksGroup.setVelocityXEach(0);
  rocksGroup.setVelocityXEach(0);

  antsGroup.setLifetimeEach(-1);
  blocksGroup.setLifetimeEach(-1);
  rocksGroup.setLifetimeEach(-1);

  c.velocityY = 0;
  bg.velocityX = 0;

  gameover.visible=true;

}



drawSprites();
}

function ants(){
  if(frameCount%100===0){
    ant=createSprite(1000,Math.round(random(100, 1200)),20,20);
    ant.velocityX=-4;
    ant.addAnimation("running",ant1);
    ant.scale = 0.1;
    ant.lifetime=250;

    antsGroup.add(ant);
  }
}

function blocks(){
  if(frameCount%250===0){
    block=createSprite(1000,Math.round(random(100, 1200)),20,20);
    block.velocityX=-4;
    block.addAnimation("jumping",boxJump);
    block.scale = 0.1;
    block.lifetime=250;

    blocksGroup.add(block);
  }
 
}

function rocks(){
  if(frameCount%340===0){
    rock=createSprite(1000,Math.round(random(100, 1200)),20,20);
    rock.velocityX=-3;
    rock.addImage(rockImg);
    rock.scale = 0.1;
    rock.lifetime = 250;
    
    rocksGroup.add(rock);
  }  
}
