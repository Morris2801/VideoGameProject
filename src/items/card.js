import { GameObject } from '/src/engine/engine.js';

export class BaseCard extends GameObject{
    constructor(color, width, height, x, y, type){
        super("yellow", width, height, x, y, type);
        this.healthBuff = 0;
        this.healthRegenBuff = 0; 
        this.staminaBuff = 0;
        this.staminaRegenBuff = 0; 
        this.damageBuff = 0;
    }
}
// Crear más subclases por carta o instanciar la base con distintas cosas? idk
