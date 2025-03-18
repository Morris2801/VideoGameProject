import { BaseCharacter } from '/src/entities/character.js';
import { Inventory } from '/src/items/inventory.js';
// Jugador
export class BasePlayer extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.stamina = 5;
        this.damage = 3;
        this.inventory = new Inventory();

        // Animation Frames: flow for [a,b],[c,d,e]
        // Ex.Dispaly para right: a->c->b->d->e
        // movementFrames: [a,b]; idleFrames: [c,d,e]
        this.setMovementFrames('right',  [6, 11], [8,7,9,10],);
        this.setMovementFrames('left', [12,15], [16, 14, 13]);
        this.setMovementFrames('up', [19,21], [18,17]);
        this.setMovementFrames('down', [1, 3], [0, 0]);
    }
}