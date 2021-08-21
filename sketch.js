var ball;
var database;
var position;
var ballPos;
function setup(){
    createCanvas(500,500);
    database=firebase.database();
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballPos=database.ref('ball/position');
    ballPos.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if (position!==undefined){
        writePosition(0,0);
    }
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }

    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function readPosition(data){
    position = data.val();
    ballPos.x=position.x;
    ballPos.y=position.y;
}

function showError (){
    console.log ("bruh");
}

function writePosition(x,y){
   database.ref('ball/position').set({
       'x':position.x + x,
       'y':position.y + y
   });
   ball.x = position.x;
   ball.y = position.y;
}