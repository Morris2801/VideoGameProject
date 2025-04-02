class Game {
    constructor(state, level) {
        this.state = state;
        this.level = level;
        this.player = this.level.player;
        this.actors = level.actors;
        this.attackEffects = []; // lista de efectos de ataque 
        
        this.isActive = true;  
        
        this.torchDamageTimer = 0;
        this.torchDamageInterval = 4000;
        this.torchContact = false; 
    
    }



    addAttackEffect(effect)
    {
        this.attackEffects.push(effect);
    }    
    update(deltaTime) {     
        if(this.isActive == false) return; // No aactualizar si pasusado
        else {

            
            for (let actor of this.actors) {
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
            this.actors = this.actors.filter(actor => actor.alive !== false);
            this.actors = this.actors.filter(actor => actor.isOpened !== true);
            let currentActors = this.actors;
            // Detect collisions
            for (let actor of currentActors) {
                if (actor.type != 'floor' && boxOverlap(this.player, actor)) {
                    //console.log(`Collision of ${this.player.type} with ${actor.type}`);
                    if (actor.type == 'wall') {
                        console.log("Hit a wall");
                    } 
                    else if (actor.type == 'card') {
                        if(this.player.inventory.items.length != this.player.inventory.max){
                            this.player.inventory.push(actor);
                            this.player.cardPickupCount++;
                            this.actors = this.actors.filter(item => item !== actor);
                            // console.log("Picked up a card");
                        }
                        // console.log(this.player);
                    }
                    else if(actor.type == 'torch'){
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
            }
        }
        if(!this.torchContact){
            this.torchDamageTimer = 0;
        }
    }
    
    draw(ctx, scale) {
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
}


// -------------------------------------------------

// Algo iba aquí

// music
const GameMusic = (() => {
    const audioFiles = {
        levelMusic1: new Audio("Nivel1.mp3"),
        levelMusic2: new Audio("Nivel2.mp3"),
        bossMusic1: new Audio("Boss1.mp3"),
        bossMusic2: new Audio("Boss2.mp3"),
    };

    let currentMusic = audioFiles.levelMusic1;
    currentMusic.loop = true;

    // Add user interaction requirement for audio playback to comply with browser policies
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
// setTimeout(() => switchMusic(audioFiles.levelMusic2), 10000); USE THIS FOR SIMULATION




// -------------------------------------------------
// Functions


// Overlap cuadrados
function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.size.x > obj2.position.x &&
    obj1.position.x < obj2.position.x + obj2.size.x &&
    obj1.position.y + obj2.size.y > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.size.y;
}
