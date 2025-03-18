import { BaseCharacter } from './character.js';

class BaseBoss extends BaseCharacter{
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, _type);
        //Atributes
        this.attack1 = 0;
        this.attack2 = 0;
    }
}
