/*
Script Name
- cards.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Centralized file for managing card-based mechanics in the game.
- Defines BaseCard class and specialized card types for power-ups, transformations, and weapons.
*/

// Basic class from which all card instances will inherit properties and methods
class BaseCard extends GameObject {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        // Basic common properties to be overwritten
        this.maxUses = 1;
        this.duration = undefined;
        this.healthBuff = 0;
        this.healthRegenBuff = 0;
        this.staminaBuff = 0;
        this.staminaRegenBuff = 0;
        this.damageBuff = 0;
        // powerCard, transformationCard, weaponCard
        this.cardType = '';
        this.type = "card"; 
    }
    // function to apply the effect of the card to player
    applyEffect(target) {
        if (!target) {
            console.log("Error");
            return;
        }
        console.log(`Aplicando efectos de ${this.type} a ${target.type}`);
        

        
        // Apply buffs to the target's attributes
        target.health += this.healthBuff;
        target.healthRegen += this.healthRegenBuff;
        target.stamina += this.staminaBuff;
        target.staminaRegen += this.staminaRegenBuff;
        target.damage += this.damageBuff;

        // Debug effect behavior in console
        this.printStatus(target, this.duration);

        // Duration-based effect mechanics
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
    //debug function 
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

// Specific card classes inheriting from BaseCard with particularities defined 

class MacahuitlCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 1; // Unique card ID
        this.damageBuff = 5;
        this.maxUses = 10;
        this.cardType = "weaponCard";
        this.weaponType = "macahuitl";
    }
}

class ObsidianKnifeCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 2; // Unique card ID
        this.damageBuff = 4;
        this.maxUses = 10;
        this.cardType = "weaponCard";
        this.weaponType = "obsidianKnife";
    }
}

class MacheteCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 3; // Unique card ID
        this.damageBuff = 6;
        this.maxUses = 1;
        this.duration = 10;
        this.cardType = "weaponCard";
    }
}

class MariachiCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 4; // Unique card ID
        this.damageBuff = 5;
        this.healthBuff = 15;
        this.duration = 12;
        this.maxUses = 1;
        this.cardType = "transformationCard";
        this.transformationType = "mariachi";
    }
}

class DiabloCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 5; // Unique card ID
        this.damageBuff = 3;
        this.duration = 10;
        this.healthRegenBuff = 6;
        this.maxUses = 1;
        this.cardType = "transformationCard";
    }
}

class MayanWarriorCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 6; // Unique card ID
        this.duration = 10;
        this.staminaBuff = 2;
        this.staminaRegenBuff = 1;
        this.maxUses = 1;
        this.cardType = "transformationCard";
        this.transformationType = "mayanWarrior";
    }
}

class CorazonCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 7; // Unique card ID
        this.healthBuff = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}

class ValienteCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 8; // Unique card ID
        this.duration = 10;
        this.maxUses = 1;
        this.healthBuff = 10;
        this.cardType = "powerCard";
    }
}

class TacoCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 9; // Unique card ID
        this.duration = 10;
        this.healthBuff = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}

class CalaveraCard extends BaseCard {
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 10; // Unique card ID
        this.duration = 10;
        this.damageBuff = 10;
        this.maxUses = 1;
        this.cardType = "powerCard";
    }
}


class QuetzalcoatlCard extends BaseCard{
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        this.cardId = 11; // Unique card ID
        this.maxUses = 1;
        this.healthBuff = 2;
        this.staminaBuff = 2;
        this.cardType = "benditionCard";
        this.isUnique = true; // Unique card
        this.alreadyUsed = false; 
        this.permanentEffect = true; // Permanent effect
    }

    //sobre escribiendo sobre el applyEffect de la clase base
    //para que la carta haga un efecto permanente
    applyEffect(target){
        if(!target || this.alreadyUsed){
            console.log("Error o carta ya usada");
            return;
        }
        console.log(`Aplicando efectos de ${this.type} a ${target.type}`);

        // cambiar lso valores de los atributos del target
        target.maxHealth = 12;
        target.maxStamina = 12;
        target.basehealth = 12;

        //cambiar el valor de la stamina
        target.maxStamina = 7;
        target.stamina = 7;
        target.baseStamina = 7;

        //vida adicional 
        if(this.healthBuff > 0){
        target.health += this.healthBuff;
    }
    
        //cambiar que ya la uso
        this.alreadyUsed = true;
        

        //remove from inventory
        if(target.inventory){
            const index = target.inventory.items.indexOf(this);
            if(index !== -1 ){
                target.inventory.items.splice(index, 1);
                console.log(`Carta eliminada del inventario: ${this.cardType}`);
            }
        }

        if(game && game.saveState){
            game.saveState.quetzalcoatlBlessing = true; 
            game.saveState.playerHealth = target.health;
            game.saveState.playerMaxHealth = target.maxHealth;
            game.saveState.playerMaxStamina = target.maxStamina;
            game.saveState.playerStamina = target.stamina;
            console.log("Estado de la carta guardado en el juego.");

            game.saveGame();
        }
    }
}