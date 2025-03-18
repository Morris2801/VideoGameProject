/*
Main Script for MayAztec
*/

"use strict";


import { Game } from '/src/world/game.js';
import { Level } from '/src/world/level.js';
import { GAME_LEVELS } from '/src/world/levelGen.js';
import { scale } from '/src/engine/engine.js';

// Global variables
const canvasWidth = 900;
const canvasHeight = 700;
let ctx;
let game;
let oldTime;





// ------------------------------------------------------
// Functions


document.addEventListener('DOMContentLoaded', init);


function init(){
    console.log("iniciando juego..");
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    
    gameStart();

}

function gameStart() {
    // Register the game object, which creates all other objects
    game = new Game('playing', new Level(GAME_LEVELS[1])); //<- Será [2]
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






// Function to draw the scene
function drawScene(newTime){
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx,scale);


    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
