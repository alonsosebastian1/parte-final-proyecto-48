var backgroundImg,platform;
var barcoimg,barco;
var cañonimg,cañon;
var pirataimg,pirata;
var ballimg,ball;
var coin,coinimg;
var mira,miraimg;
var cofre_cerradoimg,cofre,cofre_abiertoimg;
var nubes,nubesimg;
var pirata1img,pirata1;
var pirata2img,pirata2;
var gameOver,gameOverimg;
var barcoSound;
var cañonSound;
var gameState = "serve";

var puntuacion = 0;
 var Barcosdestruidos = 0;
   var coins = 1;

function preload() {
    backgroundImg = loadImage("fondo1.1.png");
    barcoimg = loadImage("barco1.1.png");
    cañonimg = loadImage("cañon1.1.png");
    pirataimg = loadImage("pirata1.1.png");
    coinimg = loadAnimation("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png");
    miraimg = loadImage("mira.png");
    cofre_cerradoimg = loadImage("cofre_cerrado.png");
    cofre_abiertoimg = loadAnimation("cofre_abierto.png");
    nubesimg = loadImage("images.jpeg.jfif");
    pirata1img = loadImage("pirata0.png");
    pirata2img = loadImage("imported piskel.gif");
    ballimg = loadImage("Cannon_Ball.png");
    gameOverimg = loadImage("gameoverimg.png");
    cañonSound = loadSound("Cañon de mano sonido(MP3_320K).mp3");
    barcoSound = loadSound("Efecto de sonido de madera rompiéndose(MP3_320K).mp3");
    }

    function setup(){
        var canvas = createCanvas(1350,400);
           enemyGroup = new Group();
           barcoGroup = new Group();
           ballGroup = new Group();
    
       cañon = createSprite(80,330);
       cañon.addImage(cañonimg);
       cañon.scale = 0.2;
    
       pirata = createSprite(150,360);
   pirata.addImage(pirataimg);
   pirata.scale = 0.2;

   coin = createSprite(28,15);
   coin.addAnimation("moneda",coinimg);
   coin.scale = 0.2;


   mira = createSprite(1,1);
   mira.addImage(miraimg);
   mira.scale = 0.2;

   cofre= createSprite(220,360);
   cofre.addImage(cofre_cerradoimg);
   cofre.scale = 0.2;
   cofre.setCollider("circle",0,0,50);
    cofre.debug = false;


    }
    function draw(){
        background(nubesimg);
            background(backgroundImg);
            
        textSize(20);
        fill("black");
        text("Coins:" + coins,40,22);
        text("Barcos destruidos:" + Barcosdestruidos,300,25);
        text("puntuacion:" +puntuacion ,650,25);
       
        
       if(gameState === "serve"){
           barcoGroup.setVelocityXEach(0);
           enemyGroup.setVelocityXEach(0);
            mira.velocityX = 0;

       if(keyDown("space")){
           gameState = "play";
            }
        }
       
    else if(gameState == "end") {
        drawSprites();
        gameOver = createSprite(600,200);
        gameOver.addImage(gameOverimg);
        fill("aqua");
        text("Coins:" + coins,40,22);
        text("Barcos destruidos:" + Barcosdestruidos,300,25);
        text("puntuacion:" +puntuacion ,650,25);

    }
    else {
      gamePlay();
    }
       
    drawSprites(); 

    }
    function spawnbarco(){
        if(frameCount % 200 === 0){
            barco = createSprite(1100,150);
            barco.addImage(barcoimg);
            barco.scale = 0.3;
            barco.velocityX = -3;
            barco.lifetime = 370;
            barcoGroup.add(barco);
            barco.setCollider("circle",0,0,200);
            barco.debug = false;
        }
    }
    function spawnenemy(){
        if(frameCount % 100 === 0){
            enemy = createSprite(1100,360);
            enemy.addImage(pirata1img);
            enemy.scale = 0.05;
            enemy.velocityX = -3;
            enemy.lifetime = 300;
            enemyGroup.add(enemy);
            enemy.setCollider("circle",0,0,600);
            enemy.debug = true;
        }
    }
    function balas(){
        if(frameCount %5 === 0){
            bala = createSprite(80,360);
            bala.addImage(ballimg);
            bala.y = cañon.y -30;
            bala.x = cañon.x +60;
            bala.scale = 0.2
            bala.velocityX = 12;
           bala.lifetime = 250;
           ballGroup.add(bala);
       }
        
    }
    function gamePlay(){
        mira.x = mouseX;
        mira.y = mouseY;
        cañon.y = mouseY;

        if(mira.isTouching(enemyGroup)){
            balas();   
            cañonSound.play();
          }
          if(mousePressedOver(barco)){
            balas();
            cañonSound.play();
        }

        if(enemyGroup.isTouching(cofre)){
            if(frameCount% 30 === 0){
                coins = coins -1;
            } 
        }
        
        if(ballGroup.isTouching(enemyGroup)){
            enemyGroup.destroyEach();
            puntuacion = puntuacion + 100;
         }
         if(ballGroup.isTouching(barco)){
            barcoGroup.destroyEach();
            barcoSound.play();
            puntuacion = puntuacion + 300;
            Barcosdestruidos = Barcosdestruidos + 1;
            coins = coins + 2
          }

          if(coins === 0 ){
              gameState = "end";
          }
          
        spawnbarco();
       spawnenemy();
       

    }
