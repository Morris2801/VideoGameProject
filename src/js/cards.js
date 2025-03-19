
// BaseCard
class BaseCard extends GameObject{
    constructor(color, width, height, x, y, type){
        super("yellow", width, height, x, y, type);
        this.maxUses = -1;
        this.duration = undefined;
        this.healthBuff = 0;        
        this.healthRegenBuff = 0; 
        this.staminaBuff = 0;
        this.staminaRegenBuff = 0; 
        this.damageBuff = 0;
    }
    //método para applyEffect?
}

class MacahuitlCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "weaponCard");
        this.damageBuff = 5;
        this.maxUses = 10;
    }
}
class ObsidianKnifeCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "weaponCard");
        this.damageBuff = 4;
        this.maxUses = 10;
    }
}
class MacheteCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "weaponCard");
        this.damageBuff = 6;
        this.maxUses = 5;
    }
}
class MariachiCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "transformationCard");
        this.damageBuff = 4;
        this.healthBuff = 3;
        this.duration = 10;
    }
}
class DiabloCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "transformationCard");
        this.damageBuff = 3;
        this.duration = 10;
        this.healthRegenBuff = 6;
    }
}
class MayanWarriorCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "transformationCard");
        this.duration = 10;
        this.staminaBuff = 2;
        this.staminaRegenBuff = 1;
    }
}
class CorazonCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "powerCard");
        this.healthBuff = 10;
        this.maxUses = 1;
    }
}
class ValienteCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "powerCard");
        //poner cosas de inmunidad que idk
        this.duration = 10;
    }
}
class TacoCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "powerCard");
        //bloqueo de stamina por 10 s
        this.duration = 10;
    }
}
class CalaveraCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, "powerCard");
        this.duration = 10;
        this.damageBuff = 10;
    }
}