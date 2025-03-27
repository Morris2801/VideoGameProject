class Game {
    constructor(state, level) {
        this.state = state;
        this.level = level;
        this.player = this.level.player;
        this.actors = level.actors;
        this.attackEffects = []; // lista de efectos de ataque 
        
    }

    addAttackEffect(effect)
    {
        this.attackEffects.push(effect);
    }    
    update(deltaTime) {     
        this.player.update(this.level, deltaTime);
        

        for (let actor of this.actors) {
            if(typeof actor.update === "function"){
                actor.update(this.level, deltaTime);
            }
        }

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
            if (actor.type != 'floor' && boxOverlap(this.player, actor)) {
                console.log(`Collision of ${this.player.type} with ${actor.type}`);
                if (actor.type == 'wall') {
                    console.log("Hit a wall");
                } 
                else if (actor.type == 'card') {
                    this.player.inventory.push(actor);
                    // console.log("Picked up a card");
                    this.player.inv
                    this.actors = this.actors.filter(item => item !== actor);
                    // console.log(this.player);
                }
            }
        }
    }
    
    

    draw(ctx, scale) {
        for (let actor of this.actors) {
            actor.draw(ctx, scale);
        }
        this.player.draw(ctx, scale);
        }
}


// -------------------------------------------------

// Algo iba aquí





// -------------------------------------------------
// Functions


// Overlap cUadrados
function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.size.x > obj2.position.x &&
    obj1.position.x < obj2.position.x + obj2.size.x &&
    obj1.position.y + obj1.size.y > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.size.y;
}