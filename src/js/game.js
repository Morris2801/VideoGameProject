/*
Script Name
- game.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Handles game logic, including player movement, collision detection, and level transitions.
- Manages game state and interactions between player and game objects.
- Implements game mechanics like torch damage, and handles current actors to be shown based on their state.
- Music management 
*/

class Game {
    constructor(state, level, trees) {
        this.state = state;
        this.level = level;

        const startTime = new Date();
        this.startTime = startTime;
        console.log("Game started at:", startTime);
        this.run_start = formatDateForMySQL(new Date()); /// wtf por qué se pone la hora rara
        //this.run_end = null; 
        this.run_duration = null;

        this.trees = trees;
        this.currentTreeIndex = 0;
        this.currentTree = this.trees[this.currentTreeIndex];
        this.currentRoom = this.currentTree.root;
        this.enteredThroughDir = null;
        this.hasJustSwitchedRooms = false; // a ver si así no se brinca rooms
        this.roomsSwitchCooldown = 0; //antiroomsalto2.0


        this.player = this.level.player;
        this.actors = level.actors;
        this.attackEffects = [];
        this.selectedCardIndex = null;

        this.isActive = true;
        this.bossDefeated = false;

        this.levelTimeLimit = 300;  // max timer lev1 sec <------------------------ tbd
        this.levelTimeLimit2 = 400; // max timer lev2 sec <---------------------------------tbd
        this.levelTimer = this.levelTimeLimit;  // currentTimer

        this.player = this.level.player;
        this.actors = level.actors;
        this.attackEffects = []; // lista de efectos de ataque 

        //camara
        this.camera = new Camera(this.player.position.x, this.player.position.y);
        this.camera.x = this.player.position.x;
        this.camera.y = this.player.position.y;

        this.isActive = true;
        // torch damage things
        this.torchDamageTimer = 0;
        this.torchDamageInterval = 1000; // 1 sec 
        this.torchContact = false;
        this.doorCooldown = 0; // ms

        this.updateDoorSprites();
    }
    // handles effects in list


    addAttackEffect(effect) {
        this.attackEffects.push(effect);
    }
    update(deltaTime) {
        if (!this.isActive || this.isGameOver) return; // No aactualizar si pasusado
        this.levelTimer -= deltaTime / 1000;
        if ((this.levelTimer <= 0)) {
            console.log("Time's up");
            this.gameOver();
            this.isGameOver = true;
            //this.isGameOver = true;
            return;
        }
        for (let actor of this.actors) {
            // update functions
            if (typeof actor.update === "function") {
                actor.update(this.level, deltaTime);
            }
        }
        this.player.update(this.level, deltaTime);
        this.camera.follow(this.player.position.x, this.player.position.y);
        for (let i = this.attackEffects.length - 1; i >= 0; i--) {
            const effect = this.attackEffects[i];
            effect.update(this.level, deltaTime);
            //eliminar animacion inactivas
            if (effect.shouldRemove) {
                this.attackEffects.splice(i, 1);
            }
        }
        let currentActors = this.actors;
        // Detect collisions


        for (let actor of currentActors) {
            if (actor.type == "boss" && actor.alive == false) {
                this.bossDefeated = true;
                console.log("Bossbeat");
            }
            if (actor.type != 'floor' && boxOverlap(this.player, actor)) {
                //console.log(`Collision of ${this.player.type} with ${actor.type}`);
                /*if (actor.type == 'wall') {
                    console.log("Hit a wall");
                } 
                    */
                if (actor.type == 'card') {
                    if (this.player.inventory.items.length != this.player.inventory.max) {
                        // player picks up card
                        this.player.inventory.push(actor);
                        pickup.play();
                        this.player.lastCardPickedUp = actor;
                        this.player.cardPickupCount++;
                        this.player.score += 70;
                        this.actors = this.actors.filter(item => item !== actor);
                        // console.log("Picked up a card");
                    }
                    // console.log(this.player);
                }
                else if (actor.type == 'torch') {
                    // player receives damage from torch
                    if (!this.torchContact) {
                        this.player.health -= 1;
                        applyScreenFlash("red", 0.5, 0.5);
                        if (soundEffectsEnabled) {
                            burn.play();
                        }
                        console.log("Fireburns start", this.player.health);

                        this.torchDamageTimer = 0;
                    }
                    this.torchContact = true;
                    this.torchDamageTimer += deltaTime;
                    if (this.torchDamageTimer >= this.torchDamageInterval) {
                        this.player.health -= 1;
                        if (soundEffectsEnabled) {
                            burn.play();
                        }
                        applyScreenFlash("red", 0.5, 0.5);
                        this.torchDamageTimer = 0;
                        console.log("Fireburns", this.player.health);
                    }
                }
            }
            /* !!!!!!!!!!!!!!!!!!!!!!!! esto medio funcionaba cuando actor.type dependia de '*', no lo borren por si lo necesito
            if(actor.type == "door" && this.level.contact(this.player.innerHitbox, this.player.size, "door")){
                console.log("Doorpos:", actor.position.x, actor.position.y, "\nPlayerpos:", this.player.position.x, this.player.position.y);
                console.log("\nFloored\nDoorpos:", Math.floor(actor.position.x), Math.floor(actor.position.y), "\nPlayerpos:", Math.floor(this.player.position.x), Math.floor(this.player.position.y));
                
                if(actor.position.x < this.player.position.x && Math.floor(this.player.position.y) == Math.floor(actor.position.y)){
                    this.changeRoom("left");
                    console.log("leftctive");
                }
                else if(actor.position.x > this.player.position.x && Math.floor(this.player.position.y) == Math.floor(actor.position.y)){
                    this.changeRoom("right");
                    console.log("irghtactive");
                }
                else if(actor.position.y < this.player.position.y && Math.floor(this.player.position.x) == Math.floor(actor.position.x)){
                    this.changeRoom("up");
                    console.log("upactive");
                }
                else if(actor.position.y > this.player.position.y && Math.floor(this.player.position.x) == Math.floor(actor.position.x)){
                    this.changeRoom("downParent");
                    console.log("donwactive");
                }       
            }
            */
            // individual door handles
            if (actor.type == "updoor" && this.level.contact(this.player.innerHitbox, this.player.size, "updoor")) {
                console.log(`[DOOR] In room ${this.currentRoom.roomNum}, touching UP door. EnteredThroughDir: ${this.enteredThroughDir}`);
                if (this.hasJustSwitchedRooms) {
                    console.log("hasJustSwitched es TRUE");
                    return;
                }; // A VER SI YA DEJA DE BRINCARSE HABITACIONES
                if (this.enteredThroughDir === "down") {
                    console.log(`[DOOR] Returning to parent from room ${this.currentRoom.roomNum} through UP door`);
                    this.changeRoom("back");
                    this.enteredThroughDir = null;
                } else {
                    console.log(`[DOOR] Going UP from room ${this.currentRoom.roomNum}`);
                    this.changeRoom("up");
                    this.enteredThroughDir = "up";
                }
            }
            if (actor.type == "downdoor" && this.level.contact(this.player.innerHitbox, this.player.size, "downdoor")) {
                console.log(`[DOOR] In room ${this.currentRoom.roomNum}, touching DOWN door. EnteredThroughDir: ${this.enteredThroughDir}`);
                if (this.enteredThroughDir === "up") {
                    console.log(`[DOOR] Returning to parent from room ${this.currentRoom.roomNum} through DOWN door`);
                    this.changeRoom("back");
                    this.enteredThroughDir = null;
                } else {
                    console.log(`[DOOR] Going DOWN from room ${this.currentRoom.roomNum}`);
                    this.changeRoom("down");
                    this.enteredThroughDir = "down";
                }
            }
            if (actor.type == "leftdoor" && this.level.contact(this.player.innerHitbox, this.player.size, "leftdoor")) {
                console.log(`[DOOR] In room ${this.currentRoom.roomNum}, touching LEFT door. EnteredThroughDir: ${this.enteredThroughDir}`);
                if (this.enteredThroughDir === "right") {
                    console.log(`[DOOR] Returning to parent from room ${this.currentRoom.roomNum} through LEFT door`);
                    this.changeRoom("back");
                    this.enteredThroughDir = null;
                } else {
                    console.log(`[DOOR] Going LEFT from room ${this.currentRoom.roomNum}`);
                    this.changeRoom("left");
                    this.enteredThroughDir = "left";
                }
            }
            if (actor.type == "rightdoor" && this.level.contact(this.player.innerHitbox, this.player.size, "rightdoor")) {
                console.log(`[DOOR] In room ${this.currentRoom.roomNum}, touching RIGHT door. EnteredThroughDir: ${this.enteredThroughDir}`);
                if (this.enteredThroughDir === "left") {
                    console.log(`[DOOR] Returning to parent from room ${this.currentRoom.roomNum} through RIGHT door`);
                    this.changeRoom("back");
                    this.enteredThroughDir = null;
                } else {
                    console.log(`[DOOR] Going RIGHT from room ${this.currentRoom.roomNum}`);
                    this.changeRoom("right");
                    this.enteredThroughDir = "right";
                }
            }
            if (actor.type == "exit" && this.level.contact(this.player.innerHitbox, this.player.size, "exit") && this.bossDefeated == true) {
                console.log("Exit active");
                this.changeLevel(this.currentTreeIndex + 1); // Aquí se cambia el árbol/nivel
            }
            /*
            if (actor.type.endsWith("door") && this.level.contact(this.player.innerHitbox, this.player.size, actor.type)) {
                const dir = actor.type.replace("door", "");
                if (this.currentRoom.doors[dir]) {
                    this.changeRoom(dir);
                    this.enteredThroughDir = dir;
                }
            }
                */
        }

        // Eliminates defeated enemies
        this.actors = this.actors.filter(actor => actor.alive != false);
        // Eliminates "opened" vases
        this.actors = this.actors.filter(actor => actor.isOpened !== true);

        if (!this.torchContact) {
            this.torchDamageTimer = 0;
        }
    }


    draw(ctx, scale) {
        ctx.save();

        // Apply camera transformation
        const zoomScale = scale * this.camera.zoomLevel;
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        const cameraOffsetX = -this.camera.x * zoomScale + canvasWidth / 2;
        const cameraOffsetY = -this.camera.y * zoomScale + canvasHeight / 2;

        ctx.translate(cameraOffsetX, cameraOffsetY);

        const visibleLeft = this.camera.x - (canvasWidth / 2 / zoomScale) - 5;
        const visibleRight = this.camera.x + (canvasWidth / 2 / zoomScale) + 5;
        const visibleTop = this.camera.y - (canvasHeight / 2 / zoomScale) - 5;
        const visibleBottom = this.camera.y + (canvasHeight / 2 / zoomScale) + 5;

        for (let actor of this.actors) {
            if (actor.type == 'floor' || actor.type == 'door' || actor.type == "wall") {
                if (actor.position.x + actor.size.x >= visibleLeft &&
                    actor.position.x <= visibleRight &&
                    actor.position.y + actor.size.y >= visibleTop &&
                    actor.position.y <= visibleBottom) {
                    actor.draw(ctx, zoomScale);
                }
            }
        }

        for (let actor of this.actors) {
            if (actor.type != 'floor') {
                if (actor.position.x + actor.size.x >= visibleLeft &&
                    actor.position.x <= visibleRight &&
                    actor.position.y + actor.size.y >= visibleTop &&
                    actor.position.y <= visibleBottom) {
                    actor.draw(ctx, zoomScale);
                }
            }
        }
        this.player.draw(ctx, zoomScale);

        ctx.restore();
        this.drawPlayerHUD(ctx);
    }

    // testTransit
    changeRoom(direction) {
        this.doorCooldown = 300; // 300ms cooldown
        const nextRoom = this.currentRoom.doors[direction];
        console.log(`[ROOM TRANSITION] Attempting to go from room ${this.currentRoom.roomNum} to direction "${direction}"`);
        if (nextRoom) {
            console.log(`[ROOM TRANSITION] Exiting room ${this.currentRoom.roomNum} through door "${direction}" to room ${nextRoom.roomNum}`);
            this.currentRoom = nextRoom;
            changeRoomSound.play(); this.level = new Level(this.currentRoom.levelStringValue, this.currentTreeIndex);
            this.actors = this.level.actors;
            this.updateDoorSprites(); // a ver si sale
            const doorPositions = {
                up: { x: this.level.width / 2, y: 1.5 },
                down: { x: this.level.width / 2, y: this.level.height - 2.5 },
                left: { x: 1.5, y: this.level.height / 2 },
                right: { x: this.level.width - 2.5, y: this.level.height / 2 },
            };
            const oppositeDoorPositions = {
                up: { x: Math.floor(this.level.width / 2), y: this.level.height - 3.5 }, // Down door
                down: { x: Math.floor(this.level.width / 2), y: 3.5 }, // Up door
                left: { x: this.level.width - 3.5, y: Math.floor(this.level.height / 2) }, // Right door
                right: { x: 3.5, y: Math.floor(this.level.height / 2) }, // Left door
            };
            const newPosition = oppositeDoorPositions[direction];
            this.player.position.x = newPosition.x;
            this.player.position.y = newPosition.y;
            this.camera.x = this.player.position.x;
            this.camera.y = this.player.position.y;

            this.hasJustSwitchedRooms = true;
            setTimeout(() => {
                this.hasJustSwitchedRooms = false;
                console.log("Timeout para transicionRoom");
            }, this.doorCooldown);

            if (this.currentRoom.isBossRoom) {
                const bossTrack = this.currentTreeIndex == 0 ? "bossMusic1" : "bossMusic2";
                GameMusic.changeMusic(bossTrack);

            } else {
                const levelTrack = this.currentTreeIndex == 0 ? "levelMusic1" : "levelMusic2";
                GameMusic.changeMusic(levelTrack);
            }

            if (this.currentRoom.isBossRoom) {
                const bossTrack = this.currentTreeIndex == 0 ? "bossMusic1" : "bossMusic2";
                GameMusic.changeMusic(bossTrack);

            } else {
                const levelTrack = this.currentTreeIndex == 0 ? "levelMusic1" : "levelMusic2";
                GameMusic.changeMusic(levelTrack);


            }
            this.doorCooldown = 300;
            console.log(`[ROOM TRANSITION] Room ${this.currentRoom.roomNum}. Player position:`, this.player.position);
        } else {
            console.log(`[ROOM TRANSITION] No room "${direction}" from ${this.currentRoom.roomNum}`);
        }
    }
    changeLevel(treeIndex) {
        if (treeIndex >= 0 && treeIndex < this.trees.length) {
            if (this.bossDefeated == false) {
                console.log("defeat boss first");
                return;
            }
            console.log("Siwtch arbol");
            this.currentTreeIndex = treeIndex;
            levelUpSound.play();
            this.currentTree = this.trees[treeIndex];
            this.currentRoom = this.currentTree.root;
            this.level = new Level(this.currentRoom.levelStringValue, this.currentTreeIndex);

            const oldPlayer = this.player;
            let newPlayer = this.level.player;
            this.player = oldPlayer;
            console.log("OldplayerInfo", oldPlayer);
            this.player.position = newPlayer.position;
            console.log("NewPlayerInfo", this.player);

            this.actors = this.level.actors;
            this.bossDefeated = false; // flag reset supposedly ------------------------------
            if (treeIndex == 0) {
                this.player.score += 1000; //bonus por pasar de nivel
                this.levelTimeLImit = this.levelTimeLimit;
            }
            else if (treeIndex == 1) {
                this.player.score += 1250; //bonus por pasar de nivel
                this.levelTimeLimit = this.levelTimeLimit2;
            }
            this.levelTimer = this.levelTimeLimit;
            this.updateDoorSprites(); // a ver si sale

        }
        else {
            console.log("No hay siguiente arbol");
            this.showVictoryScreen();
        }
    }


    async gameOver() {
        console.log("Game Over");
        if (this.isGameOver) return;
        document.getElementById("flashCanvas").style.display = "flex";
        gameOverSound.play();
        this.isGameOver = true;
        //inicio de cosas para el API
        let mostUsedCard = this.player.mostUsedCard();
        this.run_end = new Date(); // endTime, a mysql no le gustó el datatype
        let player_runstats = {
            player_id: this.player.player_id, // checar por qué se queja con el FK constraint 
            run_start: this.run_start, //startTime, a mysql no le gustó el datatype
            score: this.player.score,
            run_end: formatDateForMySQL(new Date()), //endTime, a mysql no le gustó el datatype
            run_duration: time,

            finished: false,
            enemies_killed: this.player.killCount,
            cards_collected: this.player.cardPickupCount,
            cards_used: this.player.cardsUsed,
            vases_broken: this.player.vasesBroken,
            most_used_card: mostUsedCard.cardId,
            eliminated_by: this.player.lastHitBy,
            last_level: this.currentTreeIndex + 1, //+1 porque empieza en 0
            last_room: this.currentRoom.roomNum, //roomNum
        };
        console.log(player_runstats);
        try {
            const response = await fetch('http://localhost:5000/api/player_runstats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(player_runstats)
            });
            console.log("\nResponse", response);
            if (response.ok) {
                const result = await response.json();
                console.log("Run stats sending", result);
            }
            else {
                const error = await response.json();
                console.log('Error sending Gameover data:', error);
            }
        }
        catch (err) {
            console.error('Error during GameOver transmitting:', err);

        }
        let playertime = {
            player_id: this.player.player_id,
            runTime: time,
            recordScore: Math.floor(this.player.score),
        }
        try {
            const response = await fetch('http://localhost:5000/api/playertime', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(playertime)
            });
            console.log("\nResponse", response);
            if (response.ok) {
                const result = await response.json();
                console.log("Olayertime sending", result);
            }
            else {
                const error = await response.json();
                console.log('Error sending playertime data:', error);
            }
        }
        catch (err) {
            console.error('Error during playertime transmitting:', err);
        }



        // Stop game activity
        this.isActive = false;
        document.getElementById("flashCanvas").style.display = "none";
        document.getElementById("canvas").style.display = "none";
        document.getElementById("uiCanvas").style.display = "none";
        // show the game over menu
        document.getElementById("gameOverMenu").style.display = "flex";
    }
    async showVictoryScreen() {
        this.player.score += 15 * (this.levelTimer);
        this.isActive = false;
        victorySound.play();
        document.getElementById("canvas").style.display = "none";
        document.getElementById("uiCanvas").style.display = "none";
        document.getElementById("victoryScreen").style.display = "flex";
        //inicio de cosas para el API
        let mostUsedCard = this.player.mostUsedCard();
        this.run_end = new Date(); // endTime, a mysql no le gustó el datatype
        let player_runstats = {
            player_id: player_id, // checar por qué se queja con el FK constraint 
            run_start: this.run_start, //startTime, a mysql no le gustó el datatype
            score: this.player.score,
            run_end: formatDateForMySQL(new Date()), //endTime, a mysql no le gustó el datatype
            run_duration: time,

            finished: true,
            enemies_killed: this.player.killCount,
            cards_collected: this.player.cardPickupCount,
            cards_used: this.player.cardsUsed,
            vases_broken: this.player.vasesBroken,
            most_used_card: mostUsedCard.cardId,
            eliminated_by: this.player.lastHitBy,
            last_level: this.currentTreeIndex + 1, //+1 porque empieza en 0
            last_room: this.currentRoom.roomNum, //roomNum
        };
        console.log(player_runstats);
        try {
            const response = await fetch('http://localhost:5000/api/player_runstats', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(player_runstats)
            });
            console.log("\nResponse", response);
            if (response.ok) {
                const result = await response.json();
                console.log("Run stats sending", result);
            }
            else {
                const error = await response.json();
                console.log('Error sending Game Victory data:', error);
            }
        }
        catch (err) {
            console.error('Error during Game Victory transmitting:', err);
        }
        let runRes = {
            player_id: player_id,
            recordScore: Math.floor(this.player.score),
            recordTime: time
        }
        try {
            const response = await fetch('http://localhost:5000/api/player', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(runRes)
            });
            console.log("\nResponse", response);
            if (response.ok) {
                const result = await response.json();
                console.log("Run stats sending", result);
            }
            else {
                const error = await response.json();
                console.log('Error sending runRes data:', error);
            }
        }
        catch (err) {
            console.error('Error during runRes transmitting:', err);
        }
        let playertime = {
            player_id: this.player.player_id,
            runTime: time,
            recordScore: Math.floor(this.player.score),
        }
        try {
            const response = await fetch('http://localhost:5000/api/playertime', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(playertime)
            });
            console.log("\nResponse", response);
            if (response.ok) {
                const result = await response.json();
                console.log("Run stats sending", result);
            }
            else {
                const error = await response.json();
                console.log('Error sending playertime data:', error);
            }
        }
        catch (err) {
            console.error('Error during playertime transmitting:', err);
        }
    }
    exitToMainMenu() {
        document.getElementById("gameOverMenu").style.display = "none";
        document.getElementById("startMenu").style.display = "block";
    }

    restartGame() {
        console.log("Restarting game...");

        // Stop the current game loop
        this.isActive = false;
        cancelAnimationFrame(this.animationFrameId);
        window.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("keyup", this.keyupHandler);

        this.currentTreeIndex = 0;
        this.currentTree = this.trees[this.currentTreeIndex];
        this.currentRoom = this.currentTree.root;
        this.level = new Level(this.currentRoom.levelStringValue, this.currentTreeIndex);

        // Reset player
        this.player = this.level.player;
        this.player.health = this.player.basehealth;
        this.player.stamina = this.player.baseStamina;
        this.player.isDead = false;

        this.actors = this.level.actors;
        this.attackEffects = [];
        this.isActive = true;
        this.bossDefeated = false;
        this.torchDamageTimer = 0;
        this.torchContact = false;

        // Reset UI
        document.getElementById("gameOverMenu").style.display = "none";
        document.getElementById("canvas").style.display = "flex";
        document.getElementById("uiCanvas").style.display = "flex";

        this.animationFrameId = requestAnimationFrame(drawScene);

        console.log("Game restarted successfully.");
    }


    drawPlayerHUD(ctx) {
        if (!this.player) return;

        //Valores de las medidadas
        const barWidth = 200;
        const barHeight = 20;
        const barSpacing = 5;
        const barX = 30;
        const barY = 30;

        // barra de vida fondo
        // dibuja un rectangulo gris base
        ctx.fillStyle = "#333333";
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // barra de vida relleno rojo
        // Calcula la proporcion de vida actual del jugador (valor entre 0 y 1)
        // healthPercent = vidaActual / vidaMaxima
        const healthPercent = this.player.health / this.player.basehealth;
        const healthBarFillWidth = barWidth * healthPercent; //se calcula la proporcion de relleno
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(barX, barY, healthBarFillWidth, barHeight);

        // texto de vida
        ctx.font = "15px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(`HP: ${this.player.health}/${this.player.basehealth}`, barX + 10, barY + barHeight / 2 + 3);

        //posicion d ela barra de stamina
        const staminaY = barY + barHeight + barSpacing;

        // color de fondo de la barra destamina
        ctx.fillStyle = "#333333";
        ctx.fillRect(barX, staminaY, barWidth, barHeight);

        // relleno de la brra de estamina
        const staminaPercent = this.player.stamina / this.player.baseStamina;
        const staminaBarFillWidth = barWidth * staminaPercent;
        ctx.fillStyle = "#0066ff";
        ctx.fillRect(barX, staminaY, staminaBarFillWidth, barHeight);

        // Stexto de estamina
        ctx.fillStyle = "white";
        ctx.fillText(`SP: ${this.player.stamina}/${this.player.baseStamina}`, barX + 10, staminaY + barHeight / 2 + 3);

        // Times de tranformacion en el hud del player
        if (this.player.isTransformed && this.player.transformationTimer > 0) {
            const transformY = staminaY + barHeight + barSpacing + 5;
            const secondsLeft = Math.ceil(this.player.transformationTimer / 1000);
            ctx.fillStyle = "white";
            ctx.fonto = "50px Arial"
            ctx.fillText(`${this.player.transformationType}: ${secondsLeft}s`, barX, transformY + 10);
        }
    }
    updateDoorSprites() {
        for (let actor of this.actors) {
            if (actor.type.endsWith("door")) {
                const direction = actor.type.replace("door", "");
                const connectedRoom = this.currentRoom.doors[direction];
                if (connectedRoom) {
                    actor.setSprite('../assets/mapElements/doorOpen.png', new Rect(0, 0, 52, 52));
                } else {
                    actor.setSprite('../assets/mapElements/door.png', new Rect(0, 0, 52, 52));
                }
            }
        }
    }

}



// -------------------------------------------------

// Algo iba aquí

// music
const GameMusic = (() => {
    const audioFiles = {
        levelMusic1: new Audio("../assets/sound/Nivel1.mp3"),
        levelMusic2: new Audio("../assets/sound/Nivel2.mp3"),
        bossMusic1: new Audio("../assets/sound/Boss1.mp3"),
        bossMusic2: new Audio("../assets/sound/Boss2.mp3"),
    };

    let currentMusic = audioFiles.levelMusic1;
    currentMusic.loop = true;

    document.addEventListener('click', () => {
        if (currentMusic.paused) {
            currentMusic.play().catch(error => {
                console.log("Audio playback failed: ", error);
            });
        }
    }, { once: true });

    return {
        startMusic: function () {
            if (currentMusic.paused) {
                currentMusic.play().catch(error => {
                    console.log("Error when starting music:", error);
                });
            }
        },
        stopMusic: function () {
            currentMusic.pause();
            currentMusic.currentTime = 0;
        },
        changeMusic(track) {
            const newTrack = audioFiles[track];
            if (!newTrack) return console.log("Audio not found:", track);

            currentMusic.pause();
            currentMusic = newTrack;
            currentMusic.loop = true;
            currentMusic.play().catch(err => console.log("Error changing music:", err));
        },
        setVolume: function (volume) {
            currentMusic.volume = volume;
        }
    };
})();
// setTimeout(() => switchMusic(audioFiles.levelMusic2), 10000); 



// -------------------------------------------------
// Functions


// Overlap cuadrados
function boxOverlap(obj1, obj2) {
    return obj1.position.x + obj1.size.x > obj2.position.x &&
        obj1.position.x < obj2.position.x + obj2.size.x &&
        obj1.position.y + obj2.size.y > obj2.position.y &&
        obj1.position.y < obj2.position.y + obj2.size.y;
}


//adapt "time" for mysql because i dont know why it works differently in the game constructor and when i send the end date in query
// but i have been with this for 15 minutes and i dont want to waste more "time" on it
function formatDateForMySQL(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function applyScreenFlash(color, duration, opacity) {
    const canvas = document.getElementById("flashCanvas");
    const ctx = canvas.getContext("2d");
    let flashActive = true;

    function drawFlash() {
        if (!flashActive || game.isGameOver || !game.isActive) return;
        document.getElementById("flashCanvas").style.display = "flex";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const timeoutId = setTimeout(() => {
        if (!game.isGameOver) {
            flashActive = false;
            document.getElementById("flashCanvas").style.display = "none";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }, duration * 1000);

    function flashLoop() {
        if (flashActive && !game.isGameOver) {
            drawFlash();
            requestAnimationFrame(flashLoop);
        }
    }
    flashLoop();
    if (game.isGameOver) {
        clearTimeout(timeoutId); // Cancelar
        flashActive = false;
        document.getElementById("flashCanvas").style.display = "none";
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clearear
    }
}

const oppositeDirections = {
    up: "down",
    down: "up",
    left: "right",
    right: "left"
};