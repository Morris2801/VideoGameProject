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

        this.cardType = '';
        // Aseguramos compatibilidad con el inventario
        this.type = "card";  
    }

    applyEffect(target) {
        if (!target) {
            console.log("No hay un objetivo válido para aplicar el efecto.");
            return;
        }
        console.log(`Aplicando efectos de ${this.type} a ${target.type}`);
        // Apply buffs to the target's attributes
        target.health += this.healthBuff;
        target.healthRegen += this.healthRegenBuff;
        target.stamina += this.staminaBuff;
        target.staminaRegen += this.staminaRegenBuff;
        target.damage += this.damageBuff;

        // Print the buffs and remaining time
        this.printStatus(target, this.duration);

        // Handle duration-based effects
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

            // Revert effects when the duration ends
            setTimeout(() => {
                target.health -= this.healthBuff;
                target.healthRegen -= this.healthRegenBuff;
                target.stamina -= this.staminaBuff;
                target.staminaRegen -= this.staminaRegenBuff;
                target.damage -= this.damageBuff;
                console.log(`El efecto de la carta en ${target.type} ha terminado.`);

                // Remove the card from the inventory
                if (target.inventory) {
                    const index = target.inventory.items.indexOf(this);
                    if (index !== -1) {
                        target.inventory.items.splice(index, 1);
                        console.log(`Carta eliminada del inventario: ${this.cardType}`);
                    }
                }
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
        super(color, width, height, x, y, type);
        this.damageBuff = 5;
        this.maxUses = 10;
        this.cardType = "weaponCard";
        this.weaponType = "macahuitl";
    }
}

class ObsidianKnifeCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.damageBuff = 4;
        this.maxUses = 10;
        this.cardType = "weaponCard";
        this.weaponType = "obsidianKnife";
    }
}

class MacheteCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.damageBuff = 6;
        this.maxUses = 5;
        this.cardType = "weaponCard";
    }
}

class MariachiCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.damageBuff = 4;
        this.healthBuff = 3;
        this.duration = 10;
        this.maxUses = 1;
        this.cardType = "transformationCard"; 
        this.transformationType = "mariachi"; 
    }
}

class DiabloCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.damageBuff = 3;
        this.duration = 10;
        this.healthRegenBuff = 6;
        this.maxUses = 1;
        this.cardType = "transformationCard";
    }
}

class MayanWarriorCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.duration = 10;
        this.staminaBuff = 2;
        this.staminaRegenBuff = 1;
        this.maxUses = 1;
        this.cardType = "transformationCard";
    }
}

class CorazonCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.healthBuff = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}

class ValienteCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        //poner cosas de inmunidad que idk
        this.duration = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}

class TacoCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        //bloqueo de stamina por 10 s
        this.duration = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}

class CalaveraCard extends BaseCard{
    constructor(color, width, height, x, y, type){
        super(color, width, height, x, y, type);
        this.duration = 10;
        this.damageBuff = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}
