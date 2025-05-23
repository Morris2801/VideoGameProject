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
const canvasHeight = 600;
const statsCanvasWidth = 365;
const statsCanvasHeight = 300;
const uiCanvasWidth = canvasWidth ;
const uiCanvasHeight = canvasHeight / 3 ;
let ctx, uiCtx, statsCtx;

let globUsername = 'Guest', password, email, player_id = 1;  // para base de datos chavos
let sfxVolume = 1;
let soundEffectsEnabled = true; 
let volume = 0.25; 

//Game variables
let game;
let oldTime, deltaTime;
let totalElapsedTime = 0; // totaltime 
let time; 
let lastCardPickedUpGlobal = null;

// Level Gens
const numRoomsLvl1 = 7; // <- modify si quiere más reto
const numRoomsLvl2 = 9; // <- modify si quiere más reto
let treeLevel1 = new Tree(1,numRoomsLvl1);
treeLevel1.treeGen();
let treeLevel2 = new Tree(2,numRoomsLvl2);
treeLevel2.treeGen();
let initialLevel = new Level(treeLevel1.root.levelStringValue, 0);

// ------------------------------------------------------
// Functions y eventlistenersDOM
document.addEventListener('DOMContentLoaded', () => {
    // HTML element extraction
    const restartButton = document.getElementById("restartButton");
    const exitToMainButton = document.getElementsByClassName(".exitToMainButton");
    const startMenu = document.getElementById("startMenu");
    const pauseMenu = document.getElementById("pauseMenu");
    const startGameButton = document.getElementById("startButton");
    const optionsButton = document.getElementById("optionsButton");
    const loginButton = document.getElementById("loginButton");
    const resumeButton = document.getElementById("resumeButton");
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
            console.log("Volume:", volume);
            GameMusic.setVolume(volume); 
            GameMusic.startMusic();  
        
        } else {
            console.error("GameMusic no está definido.");
        }
    });

    canvas.style.display = "none";
    uiCanvas.style.display = "none";
    startMenu.style.display = "flex";
    // Context screen behavior, and game start + init() 
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
        startMenu.style.display = "none";
        pauseMenu.style.display = "none";
        optionsMenu.style.display = "flex";
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
    
        // Esto estorba tantito con el API, ponerlo después
        // Regex validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/; 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/; 
        let isValid = true;
    
        console.log("Regex Testing");
        if (!usernameRegex.test(username)) {
            alert("Invalid username. It must be 3-16 characters long and can only contain letters, numbers, and underscores.");
            isValid = false;
        }
    
        if (!emailRegex.test(email)) {
            alert("Invalid email address.");
            isValid = false;
        }
    
        if (!passwordRegex.test(password)) {
            alert("Invalid password. 5 characters long and at least one letter and one number.");
            isValid = false;
        }
    
        if (!isValid) {
            return; 
        }
        console.log("RegexTests passed apparently");
        // Send the data to the backend using fetch
        try {
            const response = await fetch('http://localhost:5000/api/player/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });
            console.log(response);
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
                alert('Login failed idk es el else');
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

    document.addEventListener("DOMContentLoaded", () => {
        matchFlashCanvasToCanvas();
    });
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            // ! pause menu during game over /victory
            if (game.isGameOver || !game.isActive) {
                console.log("Pause menu disabled during game over or victory.");
                return;
            }
            if (!isPaused && game) {
                pauseMenu.style.display = 'flex';
                isPaused = true;
                game.isActive = false;
                document.querySelectorAll("#musicVolume").forEach((slider) => {
                    slider.value = volume; 
                });
                document.querySelectorAll("#sfxVolume").forEach((slider) => {
                    slider.value = sfxVolume;
                });
                document.querySelectorAll("#soundEffectsToggle").forEach((toggle) => {
                    toggle.checked = soundEffectsEnabled;
                });
                console.log("Game paused.");
                canvas.style.display = "none";
                uiCanvas.style.display = "none";
            }
            else if (isPaused && game) {
                pauseMenu.style.display = 'none';
                canvas.style.display = "flex";
                uiCanvas.style.display = "flex";
                isPaused = false;
                game.isActive = true;
                requestAnimationFrame(drawScene);
            }
        }
    });
    document.getElementById('registerButton').addEventListener('click', async (event) => {
        event.preventDefault();
    
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        if (!username || !email || !password) {
            alert('All fields are necessary.');
            return;
        }
    
        // Regex validation
        const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    
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
            alert("Invalid password. It must be at least 5 characters long and contain at least one letter and one number.");
            isValid = false;
        }
        if (!isValid) {
            return; 
        }
        console.log("Regex tests passed. Checking if username exists...");
        try {
            // Check if the username exists
            const checkResponse = await fetch(`http://localhost:5000/api/player/check/${username}`);
            const checkResult = await checkResponse.json();
    
            if (checkResult.exists) {
                alert('Username already exists. Please choose a different username.');
                return; // Stop execution if exitsts
            }
    
            console.log('Username is available. Proceeding with registration...');
    
            // POST request to register
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
                alert('Registration successful, logineable.');
                loginSection.style.display = 'none';
                startMenu.style.display = 'flex';
            } else {
                const error = await response.json();
                console.error('Registration failed:', error);
                alert(`Registration failed: ${error.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Error during registration:', err);
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
        let blessingFlag = game.player.hasQuetzBlessing;
        console.log("Restarting game...");
        totalElapsedTime = 0;
        lastCardPickedUpGlobal = game?.player?.lastCardPickedUp || null;
        treeLevel1 = new Tree(1,numRoomsLvl1);
        treeLevel1.treeGen();
        treeLevel2 = new Tree(2,numRoomsLvl2);
        treeLevel2.treeGen();
        initialLevel = new Level(treeLevel1.root.levelStringValue, 0);
        game.currentTreeIndex = 0;
        game.isGameOver = false;
        gameStart();        
        console.log("flag", blessingFlag);
        const newPlayer = game.player;
        if (!newPlayer.inventory) {
            newPlayer.inventory = { items: [], max: 6 }; 
        }
        newPlayer.hasQuetzBlessing = blessingFlag;
        if (newPlayer.hasQuetzBlessing) {
            console.log("Dejando QuetzBless.ing");
            newPlayer.maxHealth = 12;
            newPlayer.maxStamina = 7;
            newPlayer.basehealth = 12;
            newPlayer.baseStamina = 7;
            newPlayer.health = 12;
            newPlayer.stamina = 7;
        } 
        else {
            newPlayer.health = newPlayer.basehealth;
            newPlayer.stamina = newPlayer.baseStamina;
        }
        newPlayer.isDead = false;
        console.log(lastCardPickedUpGlobal);
        if (lastCardPickedUpGlobal) {
            lastCardPickedUpGlobal.maxUses = 1; 
            console.log("restorecarduses:", lastCardPickedUpGlobal);
            newPlayer.inventory.items.push(lastCardPickedUpGlobal);
            newPlayer.inventory.items[0].maxUses = 1;
            console.log(newPlayer.inventory.items[0]);
            console.log("Respawned with card:", lastCardPickedUpGlobal.cardId, lastCardPickedUpGlobal.maxUses);
            console.log("New player inventory:", newPlayer.inventory.items);
        }
        // Reset UI
        document.getElementById("canvas").style.display = "flex";
        document.getElementById("uiCanvas").style.display = "flex";
        respawn.play();
        console.log("Game restarted successfully.");
        lastCardPickedUpGlobal = null;
    });
    
    document.querySelectorAll(".exitToMainButton").forEach((button) => {
        button.addEventListener("click", () => {
            location.reload();
        });
    });
    const optionsMenu = document.getElementById("optionsMenu");
    const backToMenuButton = document.getElementById("backToMenuButton");
    // Open Options Menu from Start or Pause Menu
    /*optionsButton.addEventListener("click", () => {
        console.log("optionsmenubutton");
        startMenu.style.display = "none";
        pauseMenu.style.display = "none";
        optionsMenu.style.display = "flex";
    }); mejor con el query selector porque es el mismo botón muchas veces*/

    // Back to Start or Pause Menu
    backToMenuButton.addEventListener("click", () => {
        optionsMenu.style.display = "none";
        if (game && game.isActive) {
            console.log("pausa o n");
            pauseMenu.style.display = "flex";
        } else {
            startMenu.style.display = "flex";
        }
    });

    document.querySelectorAll("#sfxVolume").forEach((slider) => {
        slider.addEventListener("input", (event) => {
            sfxVolume = parseFloat(event.target.value); 
            console.log("SFXVol", sfxVolume);
            running.volume = sfxVolume;
            attack.volume = sfxVolume;
            breaking.volume = sfxVolume;
            dash.volume = sfxVolume;
            powerup.volume = sfxVolume;
        });
    });

    document.querySelectorAll("#optionsButton").forEach((button) => {
        button.addEventListener("click", () => {
            console.log("Options menu click");
            startMenu.style.display = "none";
            pauseMenu.style.display = "none";
            optionsMenu.style.display = "flex";
        });
    });
    document.querySelectorAll("#soundEffectsToggle").forEach((toggle) => {
        toggle.addEventListener("change", (event) => {
            soundEffectsEnabled = event.target.checked;
            console.log("Sound prendido:", soundEffectsEnabled);
        });
    });
    document.querySelectorAll("#musicVolume").forEach((slider) => {
        slider.addEventListener("input", (event) => {
            volume = parseFloat(event.target.value); 
            GameMusic.setVolume(volume);
            console.log("Music vol:", volume);
        });
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
    game.player.player_id = player_id;
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
    // debug
    console.log(`treeInd ${game.currentTreeIndex} R ${game.currentRoom.roomNum} Paths: ${paths}`);
    setEventListeners();
    drawScene(document.timeline.currentTime);
}

//SFX for running, attacking, breaking, damage taken, and dash

const running = new Audio("../assets/sound/running.wav");
const attack = new Audio("../assets/sound/swing.wav");
const breaking = new Audio("../assets/sound/vase_breaking.wav");
const dash = new Audio("../assets/sound/dash.wav");
const powerup = new Audio("../assets/sound/powerup.mp3");
const fire = new Audio("../assets/sound/fire.wav");
const burn = new Audio("../assets/sound/burn.mp3");
const pickup = new Audio("../assets/sound/pickup.wav");
const damageSound = new Audio("../assets/sound/damage.wav");
const enemyDeath = new Audio("../assets/sound/death-splat.mp3");
const dragonSound = new Audio("../assets/sound/dragon.mp3");
const fireballSound = new Audio("../assets/sound/fireball.mp3");
const gameOverSound = new Audio("../assets/sound/gameover.wav");
const victorySound = new Audio("../assets/sound/fanfare.mp3");
const levelUpSound = new Audio("../assets/sound/levelup.wav");
const changeRoomSound = new Audio("../assets/sound/door.mp3");
const respawn = new Audio("../assets/sound/respawn.mp3");


//player-character interaction
function setEventListeners() {
    window.addEventListener("keydown", event => {
        if (event.key == 'w' || event.key == "W" || event.code == "ArrowUp") {
            game.player.startMovement("up");
            running.play();
        }
        if (event.key == 'a' || event.key == "A" || event.code == "ArrowLeft") {
            game.player.startMovement("left");
            running.play();
        }
        if (event.key == 's' || event.key == "S" || event.code == "ArrowDown") {
            game.player.startMovement("down");
            running.play();
        }
        if (event.key == 'd' || event.key == "D" || event.code == "ArrowRight") {
            game.player.startMovement("right");
            running.play();
        }
        if (event.key >= '1' && event.key <= '6') {
            let index = parseInt(event.key) - 1;
            game.selectedCardIndex = index;
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
            attack.play();
        }

        if(event.key == "shiftkey" || event.key == "Shift"){
            console.log("Dash realizado");
            game.player.dash();
            dash.play();
        }
    });

    window.addEventListener("keyup", event => {
        if (event.key == 'w' || event.key == "W" || event.code == "ArrowUp") {
            game.player.stopMovement("up");
            running.pause();
            running.currentTime = 0;
        }
        if (event.key == 'a' || event.key == "A" || event.code == "ArrowLeft") {
            game.player.stopMovement("left");
            running.pause();
            running.currentTime = 0;
        }
        if (event.key == 's' || event.key == "S" || event.code == "ArrowDown") {
            game.player.stopMovement("down");
            running.pause();
            running.currentTime = 0;
        }
        if (event.key == 'd' || event.key == "D" || event.code == "ArrowRight") {
            game.player.stopMovement("right");
            running.pause();
            running.currentTime = 0;
        }
        if (event.key == "f" || event.key == "F") {
            breaking.currentTime = 0;
        }
        if (event.key == "x" || event.key == "X") {
            attack.currentTime = 0;
            game.player.setAttackKeyReleased()
        }
        if (event.key == " "){
            dash.currentTime = 0;
            dash.pause();
        }
        if(event.key >= "1" && event.key <= "6"){
            let index = parseInt(event.key) - 1;
            game.selectedCardIndex = null;
        }        
    });
}
//Stats drawing (tbd)
const usernameText = new TextLabel(80, uiCanvasHeight/4+10, "15px 'Press Start 2P", "white");
//const HPText = new TextLabel(60, uiCanvasHeight/4 + 20, "20px 'Press Start 2P", "white");
//const staminaText = new TextLabel(60, uiCanvasHeight/4 + 50, "20px 'Press Start 2P", "white");
const locationText = new TextLabel(80, uiCanvasHeight/4 + 45, "13px 'Press Start 2P", "white");
const transformText = new TextLabel(80, 3 * uiCanvasHeight/2 + 110, "10px Times New Roman", "yellow");
const scoreTextUI = new TextLabel(80, uiCanvasHeight/4 + 80, "11px 'Press Start 2P", "white"); 
//display inventory, HP, stamina, ... (tbd)
function drawUI() {
    ctx.font = "10px 'Press Start 2P'";
    uiCtx.clearRect(0, 0, uiCanvasWidth, uiCanvasHeight);
    let inventory = game.player.inventory.items;
    let cardWidth = 80;
    let cardHeight = 150;
    let cardSpacing = 20;
    const xOrigin = uiCanvasWidth / 4;
    const y = uiCanvasHeight / 2 - cardHeight / 2;
    uiCtx.textAlign = "left";
    usernameText.draw(uiCtx, `Name: ${globUsername}`);
    //HPText.draw(uiCtx, `HP: ${game.player.health}`);
    //staminaText.draw(uiCtx, `Stamina: ${game.player.stamina}`);
    const timerText = new TextLabel(uiCanvasWidth - 280, uiCanvasHeight/4 + 45, "14px 'Press Start 2P", "rgb(255, 255, 255)");
    const minutes = Math.floor(game.levelTimer / 60);
    const seconds = Math.floor(game.levelTimer % 60);
    timerText.draw(uiCtx, `Time Left\n: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    scoreTextUI.draw(uiCtx, `Score: ${game.player.score}`);
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
    for (let i = 0; i < game.player.inventory.max; i++) {
        const x = xOrigin + i * (cardWidth + cardSpacing);
        // Highlight  card slot
        if (game.selectedCardIndex === i) {
            uiCtx.strokeStyle = "yellow";
            uiCtx.lineWidth = 4; 
            uiCtx.strokeRect(x - 5, y - 5, cardWidth + 10, cardHeight + 10);
        }
        // Draw the card if
        if (inventory[i]) {
            const card = inventory[i];
            if (card.spriteImage && card.spriteImage.complete) {
                uiCtx.drawImage(card.spriteImage, x, y, cardWidth, cardHeight);
            } 
            else {
                uiCtx.fillStyle = "gray";
                uiCtx.fillRect(x, y, cardWidth, cardHeight);
            }
        } 
        else {
            // Draw empty slot
            uiCtx.fillStyle = "rgba(0, 0, 0, 0.74)";
            uiCtx.fillRect(x, y, cardWidth, cardHeight);
        }
        // Draw slot number
        uiCtx.fillStyle = "white";
        uiCtx.fillText(i + 1, x + cardWidth / 2 - 5, y + cardHeight + 20);
    }
}
//Stats canvas text (tbd)
const elapsedTime = new TextLabel(statsCanvasWidth/2 - 100, statsCanvasHeight/4 , "10px 'Press Start 2P", "white");
const killCount = new TextLabel(statsCanvasWidth/2 - 100, statsCanvasHeight/4 + 30, "10px 'Press Start 2P", "white");
const cardsPickedUp = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/4 + 60, "10px 'Press Start 2P", "white");
const cardsUsed = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/4 + 90, "10px 'Press Start 2P", "white");
const vasesBroken = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/4 + 120, "10px 'Press Start 2P", "white");
const scoreTextStats = new TextLabel (statsCanvasWidth/2 - 100, statsCanvasHeight/4 + 150, "10px 'Press Start 2P", "white"); 

function drawStats(){
    ctx.font = "10px 'Press Start 2P'";
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
    scoreTextStats.draw(statsCtx, `Score: ${game.player.score}`);
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
};*/


function matchFlashCanvasToCanvas() {
    const canvas = document.getElementById("canvas");
    const flashCanvas = document.getElementById("flashCanvas");
    const canvasRect = canvas.getBoundingClientRect();
    flashCanvas.style.width = `${canvasRect.width}px`;
    flashCanvas.style.height = `${canvasRect.height}px`;
    flashCanvas.style.top = `${canvasRect.top}px`;
    flashCanvas.style.left = `${canvasRect.left}px`;
}
window.addEventListener("resize", matchFlashCanvasToCanvas);