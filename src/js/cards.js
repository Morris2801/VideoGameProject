
// BaseCard
class BaseCard extends GameObject {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.maxUses = -1;
        this.duration = undefined;
        this.healthBuff = 0;
        this.healthRegenBuff = 0;
        this.staminaBuff = 0;
        this.staminaRegenBuff = 0;
        this.damageBuff = 0;
    }

    applyEffect(target) {
        if (!target) {
            console.error("No hay un objetivo válido para aplicar el efecto.");
            return;
        }
        console.log(`Aplicando efectos de la carta a ${target.type}`);

        // Aplica los buffs a los atributos del objetivo dependiendo la carta usada
        target.health += this.healthBuff;
        target.healthRegen += this.healthRegenBuff;
        target.stamina += this.staminaBuff;
        target.staminaRegen += this.staminaRegenBuff;
        target.damage += this.damageBuff;

        // Print de los stat buffs y cuanto tiempo le resta
        this.printStatus(target, this.duration);
        if (this.duration !== undefined && this.duration > 0) {
            let remainingTime = this.duration;
            let interval = setInterval(() => {
                remainingTime -= 1;
                if (remainingTime > 0) {
                    this.printStatus(target, remainingTime);
                } else {
                    clearInterval(interval);
                }
            }, 1000);
        }

        // Revertir efectos cuando el tiempo es igual a 0
        if (this.duration !== undefined && this.duration > 0) {
            setTimeout(() => {
                target.health -= this.healthBuff;
                target.healthRegen -= this.healthRegenBuff;
                target.stamina -= this.staminaBuff;
                target.staminaRegen -= this.staminaRegenBuff;
                target.damage -= this.damageBuff;
                console.log(`El efecto de la carta en ${target.type} ha terminado.`);
            }, this.duration * 1000);
        }
    }

    printStatus(target, timeLeft) {
        console.log(`Estado de ${target.type}:`);
        console.log(`Vida: ${target.health}`);
        console.log(`Regen Vida: ${target.healthRegen}`);
        console.log(`Stamina: ${target.stamina}`);
        console.log(`Regen Stamina: ${target.staminaRegen}`);
        console.log(`Daño: ${target.damage}`);
        console.log(`Tiempo restante: ${timeLeft} segundos`);
    }
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
