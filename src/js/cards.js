
// BaseCard
class BaseCard extends GameObject{
    constructor(color, width, height, x, y, type){
        super("yellow", width, height, x, y, type);
        this.healthBuff = 0;
        this.healthRegenBuff = 0; 
        this.staminaBuff = 0;
        this.staminaRegenBuff = 0; 
        this.damageBuff = 0;
    }
}