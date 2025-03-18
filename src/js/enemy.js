import { BaseCharacter } from './character.js';

// Enemies
export class BaseEnemy extends BaseCharacter{
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, _type);
        //Atributes
    }
}