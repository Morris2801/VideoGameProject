/*
Main Script for MayAztec
*/

"use strict";


// Global variables
const canvasWidth = 1200;
const canvasHeight = 550;

const statsCanvasWidth = 365;
const statsCanvasHeight = 300;
const uiCanvasWidth = canvasWidth ;
const uiCanvasHeight = canvasHeight / 3 - 25;

let username = '', password, email;  // para base de datos chavos

let ctx, uiCtx, statsCtx;
let game;
let oldTime, deltaTime;
let totalElapsedTime = 0; // totaltime 



// testRoomLevel idfk --------------------------------------------------------------------
const numRoomsLvl1 = 5; 
const numRoomsLvl2 = 7;

let treeLevel1 = new Tree(1,numRoomsLvl1);
treeLevel1.treeGen();
//treeLevel1.bossLoc();
let treeLevel2 = new Tree(2,numRoomsLvl2);
treeLevel2.treeGen();
//treeLevel2.bossLoc();
let initialLevel = new Level(treeLevel1.root.levelStringValue);


// ------------------------------------------------------
// Functions y eventlistenersDOM
document.addEventListener('DOMContentLoaded', () => {
    const restartButton = document.getElementById("restartButton");
    const exitToMainButton = document.getElementById("exitToMainButton");

    const startMenu = document.getElementById("startMenu");
    const pauseMenu = document.getElementById("pauseMenu");
    const startGameButton = document.getElementById("startButton");
    const optionsButton = document.getElementById("optionsButton");
    const loginButton = document.getElementById("loginButton");
    const resumeButton = document.getElementById("resumeButton");
    const exitButton = document.getElementById("exitButton");
    const loginSection = document.getElementById("loginSection");
    const cancelButton = document.getElementById("cancelButton");
    const loginForm = document.getElementById("loginForm");
    
    const statsSidebar = document.getElementById("statsSidebar");
    const statsTrigger = document.getElementById("statsTrigger");

    const canvas = document.getElementById("canvas");
    const uiCanvas = document.getElementById("uiCanvas");
    const contextScreen = document.getElementById("contextScreen");
    let isContextScreenActive = false;

    statsTrigger.addEventListener('mouseover', () => {
        statsSidebar.classList.add('open');
    });
    statsSidebar.addEventListener('mouseout', (event)=>{
        if(!statsSidebar.contains(event.relatedTarget)){
            statsSidebar.classList.remove('open');
        }
    })

    let isPaused = false; 
    startGameButton.addEventListener("click", () => {
        //console.log("'Start Game'press");
        startMenu.style.display = "none"; 
        contextScreen.style.display = "flex"; 
        isContextScreenActive = true;
        
        if (typeof GameMusic !== "undefined") {
            console.log("Iniciando música...");
            GameMusic.startMusic();  
        } else {
            console.error("GameMusic no está definido.");
        }
    });

    canvas.style.display = "none";
    uiCanvas.style.display = "none";
    startMenu.style.display = "flex";

    window.addEventListener("keydown", (event) =>{
        if(isContextScreenActive && (event.key == "Enter" || event.code == "Space")){
            contextScreen.style.display = "none"; 
            canvas.style.display = "flex"; 
            uiCanvas.style.display = "flex"; 
            isContextScreenActive = false; 
            init(); 
        }
    })

    optionsButton.addEventListener("click", () => {
    
    });

    loginButton.addEventListener('click', () => {
        startMenu.style.display = "none"; 
        loginSection.style.display = "flex";
        canvas.style.display = "none";
        uiCanvas.style.display = "none";
    });
    loginForm.addEventListener('submit', (event) =>{
        loginSection.style.display = "flex";
        event.preventDefault();
        username = document.getElementById("username").value;
        password = document.getElementById("password").value;
        console.log("Username: " + username);
        console.log("password: " + password);

        loginSection.style.display = "none"; 
        startMenu.style.display = "flex";
    });
    cancelButton.addEventListener('click', () => {
        loginSection.style.display = "none"; 
        startMenu.style.display = "flex"; 
    });
    resumeButton.addEventListener('click', () => {
        pauseMenu.style.display = 'none';
        isPaused = false;
        game.isActive = true;
        canvas.style.display = "flex";
        uiCanvas.style.display = "flex";
        requestAnimationFrame(drawScene);
    });

    exitButton.addEventListener('click', () => {
        pauseMenu.style.display = 'none';
        location.reload(); 
    });


    window.addEventListener('keydown', (event) => {
        if (event.key == 'Escape') {
            if (!isPaused) {
                pauseMenu.style.display = 'flex';
                isPaused = true;
                game.isActive = false; 
                console.log("esc");
                canvas.style.display = "none";
                uiCanvas.style.display = "none";
            } 
            else {
                pauseMenu.style.display = 'none';
                canvas.style.display = "flex";
                uiCanvas.style.display = "flex";
                isPaused = false;
                game.isActive = true;
                requestAnimationFrame(drawScene); 
            }
        }
    });



    loginButton.addEventListener('click', () => {
        startMenu.style.display = "none"; 
        loginSection.style.display = "flex";
    });

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        // regex, sirve?
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

        if (!usernameRegex.test(username)) {
            alert("Invalid username. It must be 3-16 characters long and can only contain letters, numbers, and underscores.");
        }
        else{
            counter++;
        }

        // 
        if (!emailRegex.test(email)) {
            alert("Invalid email address.");
        }
        else{
            counter++;
        }

        if (!passwordRegex.test(password)) {
            alert("Invalid password. It must be at least 8 characters long and contain at least one letter and one number.");
        }
        else{
            counter++;
        }
        if(counter == 3){
            console.log(`Email: ${email}, \nUsername: ${username}, \nEmail: ${email}, Password: ${password}`);
            loginSection.style.display = "none";
            startMenu.style.display = "flex";
        }
    });

    restartButton.addEventListener('click', () => {
        document.getElementById("gameOverMenu").style.display = "none";
        document.getElementById("contextScreen").style.display = "flex";
        
        // Reset
        totalElapsedTime = 0;
        
        // Create new tree levels
        treeLevel1 = new Tree(1, numRoomsLvl1);
        treeLevel1.treeGen();
        treeLevel2 = new Tree(2, numRoomsLvl2);
        treeLevel2.treeGen();
        initialLevel = new Level(treeLevel1.root.levelStringValue);
        
    
        isContextScreenActive = true;
    });
    
    exitToMainButton.addEventListener('click', () => {
        location.reload();
    });
}); 

function init(){
    const canvas = document.getElementById('canvas');
    const uiCanvas = document.getElementById('uiCanvas');
    const statsCanvas = document.getElementById('statsCanvas');

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    uiCanvas.width = canvasWidth;
    uiCanvas.height = uiCanvasHeight;
    statsCanvas.height = statsCanvasHeight;
    statsCanvas.width = statsCanvasWidth;

    ctx = canvas.getContext('2d');
    uiCtx = uiCanvas.getContext('2d');
    statsCtx = statsCanvas.getContext('2d');

    //Aquí poner función de menú
    const startMenu = document.getElementById("startMenu");
    
    startMenu.style.display = "none"; 
    canvas.style.display = "flex"; 
    uiCanvas.style.display = "flex"; 


    gameStart();

}

function gameStart() {
    game = new Game('playing', initialLevel, [treeLevel1, treeLevel2]);
    game.isActive = true;

    console.log(game.level);
    console.log(game.player);
    let paths = []; 
    if(game.currentRoom.children.up != null){
        paths.push("up", game.currentRoom.children.up.roomNum);
    }
    if(game.currentRoom.children.left != null){
        paths.push("left", game.currentRoom.children.left.roomNum);
    }
    if(game.currentRoom.children.right != null){
        paths.push("right", game.currentRoom.children.right.roomNum);
    }
    if(game.currentRoom.downParent != null){
        paths.push("down");
    }
    console.log(`treeInd ${game.currentTreeIndex} R ${game.currentRoom.roomNum} Paths: ${paths}`);

    setEventListeners();

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
            console.log("Inv.Key pressed: " + event.key);
        }
        //para vasija / chest
        if(event.key == "f" || event.key == "F"){
            for(const actor of game.level.actors){
                if(actor instanceof Vase){
                    actor.interact(game.player);
                    // console.log("interactuar con vase");
                }
            }
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

const usernameText = new TextLabel(60, uiCanvasHeight/4-10, "20px Times New Roman", "white");
const HPText = new TextLabel(60, uiCanvasHeight/4 + 20, "20px Times New Roman", "white");
const staminaText = new TextLabel(60, uiCanvasHeight/4 + 50, "20px Times New Roman", "white");
const locationText = new TextLabel(60, uiCanvasHeight/4 + 80, "20px Times New Roman", "white");
const transformText = new TextLabel(60, 3 * uiCanvasHeight/2 + 110, "20px Times New Roman", "yellow"); 

function drawUI(){
    uiCtx.clearRect(0, 0, uiCanvasWidth, uiCanvasHeight);
    let inventory = game.player.inventory.items; 
    let cardWidth = 80; 
    let cardHeight = 150;
    let cardSpacing = 10;
    const xOrigin = uiCanvasWidth/3 + 10;
    const y = uiCanvasHeight/2 - cardHeight/2;
    uiCtx.textAlign = "left";
    usernameText.draw(uiCtx, `Name: ${username}`);
    HPText.draw(uiCtx, `HP: ${game.player.health}`);
    staminaText.draw(uiCtx, `Stamina: ${game.player.stamina}`);
    let loctext;
    if (game.currentRoom.isBossRoom){
        loctext = "Boss Room"; 
    }
    else{
        loctext = `Room ${game.currentRoom.roomNum}`;
    }
    locationText.draw(uiCtx, `Lvl ${game.currentTreeIndex + 1} - ${loctext}`);
    
    // Add transformation timer display
    if (game.player.isTransformed && game.player.transformationTimer > 0) {
        const secondsLeft = Math.ceil(game.player.transformationTimer / 1000);
        transformText.draw(uiCtx, `Transformation: ${game.player.transformationType} (${secondsLeft}s)`);
    }
    
    for(let i=0; i<inventory.length; i++){
        let card = inventory[i];
        const x = xOrigin + i * (cardWidth + cardSpacing); 

        // Debugg
        if (!card.spriteImage) {
            console.error(`Card at index ${i} is missing a sprite.`);
        }

        if (card.spriteImage && card.spriteImage.complete) {
            uiCtx.drawImage(
                card.spriteImage,
                x,
                y,
                cardWidth,
                cardHeight
            );
        } else {
            //si no hay sprite poner un cuadro gris
            uiCtx.fillStyle = "gray";
            uiCtx.fillRect(x, y, cardWidth, cardHeight);
        }
        uiCtx.fillText(i+1,xOrigin+cardWidth/2, y+ cardHeight + 20);
    }

}

const elapsedTime = new TextLabel(statsCanvasWidth/2 - 100, statsCanvasHeight/2 , "20px Times New Roman", "white");
const killCount = new TextLabel(statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 30, "20px Times New Roman", "white");
const cardsPickedUp = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 60, "20px Times New Roman", "white");
const cardsUsed = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 90, "20px Times New Roman", "white");
const vasesBroken = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/2 + 120, "20px Times New Roman", "white");

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
    vasesBroken.draw(statsCtx, `Vases Broken: ${game.player.vasesBroken}`);
}

// Function to draw the scene
function drawScene(newTime){
    if (oldTime == undefined) {
        oldTime = newTime;
    }
    deltaTime = newTime - oldTime;

    if(game.isActive){
        totalElapsedTime += deltaTime;
    }
    
    // Clean the canvas so we can draw everything again
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx,scale);
    
    drawUI();
    drawStats();

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}
