/*
Script Name
- main.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Initializes and manages main game loop
- Handles most of global variables, canvases and event listeners
- Sets up menus and interaction results
- Initializes game world, trees (levels), and player
- Update calls
- Displays (prototype) UI and stats
*/

"use strict";


// Global variables for canvas dimensions
const canvasWidth = 1200;
const canvasHeight = 550;
const statsCanvasWidth = 365;
const statsCanvasHeight = 300;
const uiCanvasWidth = canvasWidth ;
const uiCanvasHeight = canvasHeight / 3 - 25;
let ctx, uiCtx, statsCtx;

let globUsername = '', password, email, player_id;  // para base de datos chavos

//Game variables
let game;
let oldTime, deltaTime;
let totalElapsedTime = 0; // totaltime 
let time; 
let lastCardPickedUpGlobal = null;

// Level Gens
const numRoomsLvl1 = 5; // <- modify
const numRoomsLvl2 = 7; // <- modify
let treeLevel1 = new Tree(1,numRoomsLvl1);
treeLevel1.treeGen();
let treeLevel2 = new Tree(2,numRoomsLvl2);
treeLevel2.treeGen();
let initialLevel = new Level(treeLevel1.root.levelStringValue);

// ------------------------------------------------------
// Functions y eventlistenersDOM
document.addEventListener('DOMContentLoaded', () => {
    // HTML element extraction
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

    //Open and close sidebar
    statsTrigger.addEventListener('mouseover', () => {
        statsSidebar.classList.add('open');
    });
    statsSidebar.addEventListener('mouseout', (event)=>{
        if(!statsSidebar.contains(event.relatedTarget)){
            statsSidebar.classList.remove('open');
        }
    })
    //Start menu appearance
    let isPaused = false; 
    startGameButton.addEventListener("click", () => {
        //console.log("'Start Game'press");
        startMenu.style.display = "none"; 
        contextScreen.style.display = "flex"; 
        console.log("shoudl appear", contextScreen.style.display);
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
    // Context screen behavior, and game start with init() function
    window.addEventListener("keydown", (event) =>{
        if(isContextScreenActive && (event.key == "Enter" || event.code == "Space")){
            contextScreen.style.display = "none"; 
            canvas.style.display = "flex"; 
            uiCanvas.style.display = "flex"; 
            isContextScreenActive = false; 
            init(); 
        }
    })
    // Options menu (music) and maybe room # control?
    optionsButton.addEventListener("click", () => {
    
    });

    loginButton.addEventListener('click', () => {
        startMenu.style.display = "none"; 
        loginSection.style.display = "flex";
        canvas.style.display = "none";
        uiCanvas.style.display = "none";
    });
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
    
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
    
    /* Esto estorba tantito con el API, ponerlo después
        // Regex validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        let isValid = true;
    
        if (!usernameRegex.test(username)) {
            alert("Invalid username. It must be 3-16 characters long and can only contain letters, numbers, and underscores.");
            isValid = false;
        }
    
        if (!emailRegex.test(email)) {
            alert("Invalid email address.");
            isValid = false;
        }
    
        if (!passwordRegex.test(password)) {
            alert("Invalid password. It must be at least 8 characters long and contain at least one letter and one number.");
            isValid = false;
        }
    
        if (!isValid) {
            return; // Stop execution if validation fails
        }
    */
        // Send the data to the backend using fetch
        try {
            const response = await fetch('http://localhost:5000/api/player/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Login successful:', result);
                player_id = result.player_id;
                globUsername = username;
                console.log("Login Correct: ", player_id, globUsername);
                alert(`Login successful ${username}`);
                loginSection.style.display = "none"; 
                startMenu.style.display = "flex";
            }
            else if(response.status == 401) {
                alert(`Login failed 401`);
            }
            else if(response.status == 404){
                alert(`Login failed 404`);
            }
            else{
                const error = await response.json();
                console.error('Login failed:', error);
                alert('Login failed idk');
            }
        } catch (err) {
            console.error('Error during login:', err);
            alert('Error during log in. Try again.');
        }
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
            // pause game
            if (!isPaused) {
                pauseMenu.style.display = 'flex';
                isPaused = true;
                game.isActive = false; 
                console.log("esc");
                canvas.style.display = "none";
                uiCanvas.style.display = "none";
            } 
            else {
                // Resume game
                pauseMenu.style.display = 'none';
                canvas.style.display = "flex";
                uiCanvas.style.display = "flex";
                isPaused = false;
                game.isActive = true;
                requestAnimationFrame(drawScene); 
            }
        }
    });
    document.getElementById('registerButton').addEventListener('click', async() => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        if (!username || !email || !password) {
            alert('All fields necessary.');
            return;
        }
    
        try {
            // Send a POST request to register the user
            const response = await fetch('http://localhost:5000/api/player', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            if (response.ok) {
                const result = await response.json();
                console.log('Registration successful:', result);
                player_id = result.player_id;
                globUsername = username;
                alert('Registration successful! You can now log in.');
                loginSection.style.display = 'none';
                startMenu.style.display = 'flex';
            } 
            else {
                const error = await response.json();
                console.error('Registration failed:', error);
                alert(`Registration failed: ${error.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error during regs.', err);
            alert('Error during registration. Try again later.');
        }
    });



    loginButton.addEventListener('click', () => {
        startMenu.style.display = "none"; 
        loginSection.style.display = "flex";
    });
/*
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); 
        let username = document.getElementById('username').value;
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        // regex, sirve?
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 
        let counter = 0;
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
    */
    restartButton.addEventListener('click', () => {
        document.getElementById("gameOverMenu").style.display = "none";

        console.log("Restarting game...");
        // Reset total elapsed time
        totalElapsedTime = 0;

        // Save the old player's last card picked up to the global variable
        lastCardPickedUpGlobal = game?.player?.lastCardPickedUp || null;
        treeLevel1 = new Tree(1,numRoomsLvl1);
        treeLevel1.treeGen();
        treeLevel2 = new Tree(2,numRoomsLvl2);
        treeLevel2.treeGen();
        initialLevel = new Level(treeLevel1.root.levelStringValue);
        // Call gameStart directly to reset the game
        game.isGameOver = false;
        gameStart();

        
        const newPlayer = game.player;

        // Initialize the inventory for the new player
        if (!newPlayer.inventory) {
            newPlayer.inventory = { items: [], max: 6 }; // Ensure inventory is properly initialized
        }

        // Reset player properties
        newPlayer.health = newPlayer.basehealth;
        newPlayer.stamina = newPlayer.baseStamina;
        newPlayer.isDead = false;

        // Restore the last card picked up, if any
        if (lastCardPickedUpGlobal) {
            newPlayer.inventory.items.push(lastCardPickedUpGlobal);
            console.log("Respawned with card:", lastCardPickedUpGlobal.cardId);
            console.log("New player inventory:", newPlayer.inventory.items);
        }

        // Reset UI
        document.getElementById("canvas").style.display = "flex";
        document.getElementById("uiCanvas").style.display = "flex";

        console.log("Game restarted successfully.");
        lastCardPickedUpGlobal = null;
    });
    
    exitToMainButton.addEventListener('click', () => {
        location.reload();
    });
}); 

//Game pre-start function
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

// Game creation
async function gameStart() {
    game = new Game('playing', initialLevel, [treeLevel1, treeLevel2]); 
    game.isActive = true;

    // ----- API level test
    /*
    const serializedTree1 = JSON.stringify(treeLevel1.serializeTree());
    const serializedTree2 = JSON.stringify(treeLevel2.serializeTree());
    console.log("Serialized Tree 1:", serializedTree1);
    console.log("Serialized Tree 2:", serializedTree2);
    const levelData = {
        layout1: serializedTree1,
        layout2: serializedTree2
    }
    try {
        const response = await fetch('http://localhost:5000/api/level_layout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(levelData),
        });
        if (response.ok) {
            const result = await response.json();
            console.log('Level layout sent bien:', result);
        } else {
            const error = await response.json();
            console.error('Level sending failed:', error);
        }
    } catch (err) {
        console.error('Error during level layout send:', err);
    }
    */

    console.log(game.level);
    console.log(game.player);
    game.player.player_id = player_id;
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
    // debug
    console.log(`treeInd ${game.currentTreeIndex} R ${game.currentRoom.roomNum} Paths: ${paths}`);

    setEventListeners();
    drawScene(document.timeline.currentTime);
}

//player-character interaction
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

        if(event.key == " "){
            game.player.Dash();
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
//Stats drawing (tbd)
const usernameText = new TextLabel(60, uiCanvasHeight/4-10, "20px Times New Roman", "white");
const HPText = new TextLabel(60, uiCanvasHeight/4 + 20, "20px Times New Roman", "white");
const staminaText = new TextLabel(60, uiCanvasHeight/4 + 50, "20px Times New Roman", "white");
const locationText = new TextLabel(60, uiCanvasHeight/4 + 80, "20px Times New Roman", "white");
const transformText = new TextLabel(60, 3 * uiCanvasHeight/2 + 110, "10px Times New Roman", "yellow"); 
//display inventory, HP, stamina, ... (tbd)
function drawUI(){
    uiCtx.clearRect(0, 0, uiCanvasWidth, uiCanvasHeight);
    let inventory = game.player.inventory.items; 
    let cardWidth = 80; 
    let cardHeight = 150;
    let cardSpacing = 10;
    const xOrigin = uiCanvasWidth/3 + 10;
    const y = uiCanvasHeight/2 - cardHeight/2;
    uiCtx.textAlign = "left";

    usernameText.draw(uiCtx, `Name: ${globUsername}`);
    HPText.draw(uiCtx, `HP: ${game.player.health}`);
    staminaText.draw(uiCtx, `Stamina: ${game.player.stamina}`);

    const timerText = new TextLabel(uiCanvasWidth - 200, 30, "20px Times New Roman", "red");
    const minutes = Math.floor(game.levelTimer / 60);
    const seconds = Math.floor(game.levelTimer % 60);
    timerText.draw(uiCtx, `Time Left\n: ${minutes}:${seconds.toString().padStart(2, '0')}`);
  
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
//Stats canvas text (tbd)
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
    time = `${String(mins).padStart(2,'0')}:${String(secs).padStart(2,'0')}`;
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
    //update time tracking
    deltaTime = newTime - oldTime;

    if(game.isActive){
        totalElapsedTime += deltaTime;
    }
    
    // Clean the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    game.update(deltaTime);
    game.draw(ctx,scale);
    
    drawUI();
    drawStats();

    oldTime = newTime;
    requestAnimationFrame(drawScene);
}

let player_runstats; 
/*{
    player_id : , 
	run_duration :  ,  
    run_date : , 
    enemies_killed : , 
    cards_collected : , 
    most_used_card : , 
	eliminated_by : , 
	last_level : ,
};
*/