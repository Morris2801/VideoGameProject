import { boxOverlap } from '../engine/engine.js';


console.log("Game module loaded");

// Game Class
export class Game {
    constructor(state, level) {
        this.state = state;
        this.level = level;
        this.player = this.level.player;
        this.actors = level.actors;
        
    }

    update(deltaTime) {     
        this.player.update(this.level, deltaTime);

        for (let actor of this.actors) {
            actor.update(this.level, deltaTime);
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
