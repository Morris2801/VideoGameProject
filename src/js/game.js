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
        this.level =   level;

        //room->level->tree test
        this.trees = trees;
        this.currentTreeIndex = 0; 
        this.currentTree =this.trees[this.currentTreeIndex];
        this.currentRoom= this.currentTree.root;
        //wasd

        this.player=this.level.player;
        this.actors= level.actors;
        this.attackEffects = []; // lista de efectos de ataque 
        
        this.isActive = true;  
        this.bossDefeated=false;
        // torch damage things
        this.torchDamageTimer = 0;
        this.torchDamageInterval = 4000;
        this.torchContact  =   false; 
    }
    // handles effects in list
       
    update(deltaTime) {     
        if(!this.isActive) return; // No aactualizar si pasusado
        else {            
            for (let actor of this.actors) {
                // update functions
                if(typeof actor.update === "function"){
                    actor.update(this.level, deltaTime);
                }
            }
            this.player.update(this.level, deltaTime);

            for(let i = this.attackEffects.length-1; i >= 0; i--){
                const effect = this.attackEffects[i];
                effect.update(this.level, deltaTime);
        
                //eliminar animacion inactivas
                if(effect.shouldRemove){
                    this.attackEffects.splice(i,1);
                }
            }
            let currentActors = this.actors;
            // Detect collisions
            for (let actor of currentActors) {
                if(actor.type == "boss" && actor.alive == false){
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
                        if(this.player.inventory.items.length != this.player.inventory.max){
                            // player picks up card
                            this.player.inventory.push(actor);
                            this.player.cardPickupCount++;
                            this.actors = this.actors.filter(item => item !== actor);
                            // console.log("Picked up a card");
                        }
                        // console.log(this.player);
                    }
                    else if(actor.type == 'torch'){
                        // player receives damage from torch
                        if(!this.torchContact){
                            this.player.health -= 1; 
                            console.log ("Fireburns start", this.player.health);
                            this.torchDamageTimer = 0; 
                        }
                        this.torchContact = true;
                        this.torchDamageTimer += deltaTime;
                        if(this.torchDamageTimer >= this.torchDamageInterval){
                            this.player.health -= 1; 
                            this.torchDamageTimer = 0; 
                            console.log ("Fireburns", this.player.health);
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
                if(actor.type == "updoor" && this.level.contact(this.player.innerHitbox, this.player.size, "updoor")){
                    this.changeRoom("up");
                    console.log("upactive");
                }
                if(actor.type == "downdoor" && this.level.contact(this.player.innerHitbox, this.player.size, "downdoor")){
                    this.changeRoom("down");
                    console.log("donwactive");
                }
                if(actor.type == "leftdoor" && this.level.contact(this.player.innerHitbox, this.player.size, "leftdoor")){
                    this.changeRoom("left");
                    console.log("leftctive");
                }
                if(actor.type == "rightdoor" && this.level.contact(this.player.innerHitbox, this.player.size, "rightdoor")){
                    this.changeRoom("right");
                    console.log("irghtactive");
                }
                if(actor.type == "exit" && this.level.contact(this.player.innerHitbox, this.player.size, "exit")){
                    console.log("Exit active");
                    this.changeLevel(this.currentTreeIndex + 1); // Aquí se cambia el árbol/nivel
                }
            }
            // Eliminates defeated enemies
            this.actors = this.actors.filter(actor => actor.alive !== false);
            // Eliminates "opened" vases
            this.actors = this.actors.filter(actor => actor.isOpened !== true);
            
            
        }
        if(!this.torchContact){
            this.torchDamageTimer = 0;
        }
        
    }
    
    draw(ctx, scale) {

        ctx.save();

        // forzar que primero se actualice el fondo y luego lo demás pero es recorrer todo actors x2
        // (!) checar con el profe a ver si no hay otra cosa que hacer
        for(let actor of this.actors){
            if(actor.type == 'floor' || actor.type == 'door' || actor.type == "wall"){
                actor.draw(ctx, scale);
            }
        }
        for(let actor of this.actors){
            if(actor.type != 'floor'){
                actor.draw(ctx, scale);
            }
        }
        this.player.draw(ctx, scale);
    }

    // testTransit.
    changeRoom(direction){
        let nextRoom;
        if(direction === "down"){
            nextRoom = this.currentRoom.downParent;
            if (!nextRoom) {
                console.log("Cannot move to parent: root room.");
                return;
            }
            console.log("going to parent");
        }
        else{
            nextRoom= this.currentRoom.children[direction];
        }
        if(nextRoom){
            console.log("NextRoom:", nextRoom.roomNum);
            const oldPlayer = this.player;
            this.currentRoom= nextRoom;
            this.level = new Level(nextRoom.levelStringValue);
            //actualizar pos según levGen, no la anterior
            let newPlayer = this.level.player;
            this.player= oldPlayer;
            this.player.position = newPlayer.position;

            this.actors = this.level.actors;
            let paths = []; 
            if(this.currentRoom.children.up != null){
                paths.push("up", this.currentRoom.children.up.roomNum);
            }
            if(this.currentRoom.children.left != null){
                paths.push("left", this.currentRoom.children.left.roomNum);
            }
            if(this.currentRoom.children.right != null){
                paths.push("right", this.currentRoom.children.right.roomNum);
            }
            if(this.currentRoom.downParent != null){
                paths.push("down");
            }
            console.log(`treeInd ${this.currentTreeIndex} R ${this.currentRoom.roomNum} Paths: ${paths}`);
        }
        else{
            console.log("Sike");
        }
    }
    changeLevel(treeIndex){
        if(treeIndex >= 0 && treeIndex < this.trees.length){ 
            if(this.bossDefeated == false){
                return;
            }
            console.log("Siwtch arbol");
            this.currentTreeIndex= treeIndex;
            this.currentTree = this.trees[treeIndex];
            this.currentRoom = this.currentTree.root;
            this.level = new Level(this.currentRoom.levelStringValue);
            this.player = this.level.player;
            this.actors = this.level.actors;
            this.bossDefeated = false; 
        }
        else{
            console.log("No hay siguiente arbol");
            this.showVictoryScreen();
        }
    }

    gameOver(){
        console.log("Game Over");
    
        // Stop game activity
        this.isActive = false;
        
        document.getElementById("canvas").style.display = "none";
        document.getElementById("uiCanvas").style.display = "none";
        // show the game over menu
        document.getElementById("gameOverMenu").style.display = "flex";
    }
    showVictoryScreen(){
        this.isActive = false; 
        document.getElementById("canvas").style.display = "none";
        document.getElementById("uiCanvas").style.display = "none";
        document.getElementById("victoryScreen").style.display = "flex";
    }
    exitToMainMenu(){
        document.getElementById("gameOverMenu").style.display = "none";
        document.getElementById("startMenu").style.display = "block";
        this.restartGame();
    }


    restartGame() {
        console.log("Restarting game...");
        
        // Reset core game state
        this.currentTreeIndex = 0;
        this.currentTree = this.trees[this.currentTreeIndex];
        this.currentRoom = this.currentTree.root;
        this.level = new Level(this.currentRoom.levelStringValue);
        
        // Reset player 
        this.player = this.level.player; // Get anew player
        this.player.health = this.player.basehealth;
        this.player.stamina = this.player.baseStamina;
        this.player.isDead = false;
        
        // Reset game mechanics 
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
    }
}


// -------------------------------------------------

// Algo iba aquí

// music
const GameMusic = (() => {
    const audioFiles = {
        levelMusic1: new Audio("../js/Nivel1.mp3"),
        levelMusic2: new Audio("../js/Nivel2.mp3"),
        bossMusic1: new Audio("../js/Boss1.mp3"),
        bossMusic2: new Audio("../js/Boss2.mp3"),
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
                    console.log("Error al iniciar la música:", error);
                });
            }
        },
        stopMusic: function () {
            currentMusic.pause();
            currentMusic.currentTime = 0;
        },
        changeMusic: function (track) {
            if (audioFiles[track]) {
                currentMusic.pause();
                currentMusic = audioFiles[track];
                currentMusic.loop = true;
                currentMusic.play().catch(error => {
                    console.log("Error al cambiar la música:", error);
                });
            } else {
                console.log("Track no encontrado:", track);
            }
        }
    };
})();
// setTimeout(() => switchMusic(audioFiles.levelMusic2), 10000); 




// -------------------------------------------------
// Functions


// Overlap cuadrados
function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.size.x > obj2.position.x &&
    obj1.position.x < obj2.position.x + obj2.size.x &&
    obj1.position.y + obj2.size.y > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.size.y;
}
