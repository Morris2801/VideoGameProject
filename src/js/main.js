/*
Main Script for MayAztec
*/

"use strict";

// Global variables
const canvasWidth = 950;
const canvasHeight = 440;

const statsCanvasWidth = 365;
const statsCanvasHeight = 215;
const uiCanvasWidth = canvasWidth
const uiCanvasHeight = canvasHeight / 3 + 10;
let ctx, uiCtx, statsCtx;
let game;
let oldTime, deltaTime;
let totalElapsedTime = 0; // Variable to track total elapsed time



// ------------------------------------------------------
// Functions


document.addEventListener('DOMContentLoaded', init);


function startMenu(){
    //aquí llamar a gameStart
}


function init(){
    const canvas = document.getElementById('canvas');
    const uiCanvas = document.getElementById('uiCanvas');
    const statsCanvas = document.getElementById('statsCanvas');
    
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    uiCanvas.width = canvasWidth;
    uiCanvas.height = uiCanvasHeight;
    statsCanvas.height = statsCanvasHeight;
    statsCanvas.width = statsCanvasWidth;

    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    uiCtx = uiCanvas.getContext('2d');
    statsCtx = statsCanvas.getContext('2d');

    //Aquí poner función de menú


    gameStart(); //esto va a ir aadentro de menu

}

function gameStart() {
    // Register the game object, which creates all other objects
    game = new Game('playing', new Level(GAME_LEVELS[0]));
    console.log(game.level);
    console.log(game.player);
    
    
    setEventListeners();

    // Call the first frame with the current time
    drawScene(document.timeline.currentTime);
}


function setEventListeners() {
    window.addEventListener("keydown", event => {
        if (event.key == 'w' || event.key == "W" || event.code == "ArrowUp") {
            game.player.startMovement("up");
        }
        if (event.key == 'a' || event.key == "A" || event.code == "ArrowLeft") {
            game.player.startMovement("left");
        }
        if (event.key == 's' || event.key == "S" || event.code == "ArrowDown") {
            game.player.startMovement("down");
        }
        if (event.key == 'd' || event.key == "D" || event.code == "ArrowRight") {
            game.player.startMovement("right");
        }
        if (event.key >= '1' && event.key <= '6') {
            let index = parseInt(event.key) - 1;
            game.player.useCard(index);
            console.log("Key pressed: " + event.key);
        }

        //ataque del player
        if(event.key == "x" || event.key == "X"){
            game.player.startAttack();
            console.log("ataque realizado");
        }
    });

    window.addEventListener("keyup", event => {
        if (event.key == 'w' || event.key == "W" || event.code == "ArrowUp") {
            game.player.stopMovement("up");
        }
        if (event.key == 'a' || event.key == "A" || event.code == "ArrowLeft") {
            game.player.stopMovement("left");
        }
        if (event.key == 's' || event.key == "S" || event.code == "ArrowDown") {
            game.player.stopMovement("down");
        }
        if (event.key == 'd' || event.key == "D" || event.code == "ArrowRight") {
            game.player.stopMovement("right");
        }

    
    });
}


const cardText = new TextLabel(uiCanvasWidth/2, uiCanvasHeight/2, "20px Times New Roman", "white");
const HPText = new TextLabel(60, uiCanvasHeight/4, "20px Times New Roman", "white");
const staminaText = new TextLabel(80, uiCanvasHeight/2, "20px Times New Roman", "white");
function drawUI(){
    uiCtx.clearRect(0, 0, uiCanvasWidth, uiCanvasHeight);
    let inventory = game.player.inventory.items; 
    let cardWidth = 80; 
    let cardHeight = 150;
    let cardSpacing = 10;
    const xOrigin = uiCanvasWidth/3 + 10;
    const y = uiCanvasHeight/2 - cardHeight/2;
    uiCtx.textAlign = "left";
    HPText.draw(uiCtx, `HP: ${game.player.health}`);
    staminaText.draw(uiCtx, `Stamina: ${game.player.stamina}`);
    //console.log("UI Ctx test");
    //console.log(inventory);
    uiCtx.fillStyle = "rgba(55, 34, 9, 0.886)";
    uiCtx.font = "16px Times New Roman";
    /*
    if (inventory.length == 0){
        uiCtx.textAlign = "center";
        cardText.draw(uiCtx, "Press 1-6 to use cards");
    }
        */
    for(let i=0; i<inventory.length; i++){
        let card = inventory[i];
        const x = xOrigin + i * (cardWidth + cardSpacing); // Calculate x position for each card

        // Debugg
        if (!card.spriteImage) {
            console.error(`Card at index ${i} is missing a sprite.`);
        }

        // Draw the card sprite
        if (card.spriteImage && card.spriteImage.complete) {
            uiCtx.drawImage(
                card.spriteImage,
                x,
                y,
                cardWidth,
                cardHeight
            );
        } else {
            // If no sprite is available, draw a placeholder rectangle
            uiCtx.fillStyle = "gray";
            uiCtx.fillRect(x, y, cardWidth, cardHeight);
            console.warn(`Drawing placeholder for card at index ${i}`);
        }
        
        uiCtx.fillText(i+1,xOrigin+cardWidth/2, y+ cardHeight + 20);
    }

}

const elapsedTime = new TextLabel(statsCanvasWidth/2 - 100, statsCanvasHeight/2 , "20px Times New Roman", "white");
const killCount = new TextLabel(statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 30, "20px Times New Roman", "white");
const cardsPickedUp = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 60, "20px Times New Roman", "white");
const cardsUsed = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 90, "20px Times New Roman", "white");
function drawStats(){
    statsCtx.clearRect(0,0, statsCanvasWidth, statsCanvasHeight);
    killCount.draw(statsCtx, `Kill Count: ${game.player.killCount}`);
    let totalSeconds = Math.floor(totalElapsedTime/1000);
    let secs = totalSeconds % 60;
    let mins = Math.floor(totalSeconds / 60);
    let time = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
    elapsedTime.draw(statsCtx, `Elapsed Time: ${time}`);
    cardsPickedUp.draw(statsCtx, `Cards Picked Up: ${game.player.cardPickupCount}`);
    cardsUsed.draw(statsCtx, `Cards Used: ${game.player.cardsUsed}`);
}


// Function to draw the scene
function drawScene(newTime){
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    deltaTime = newTime - oldTime;

    // Increment total elapsed time
    totalElapsedTime += deltaTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx,scale);
    
    drawUI();
    drawStats();


    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
