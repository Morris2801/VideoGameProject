/*
Main Script for MayAztec
*/

"use strict";

// Global variables
const canvasWidth = 900;
const canvasHeight = 700;
let ctx;
let game;
let oldTime;
const backgroundImage = new Image();
backgroundImage.src = "../assets/RoomSketch.jpg";

function main() {
    // Get a reference to the object with id 'canvas' in the page
    const canvas = document.getElementById('canvas');
    // Resize the element
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Get the context for drawing in 2D
    ctx = canvas.getContext('2d');
    game = new Game();
    drawScene(0);
}

function drawScene(newTime){
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    let deltaTime = newTime - oldTime;

    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(backgroundImage,0,0,canvasWidth,canvasHeight);

    game.draw(ctx);
    game.update(deltaTime);

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}