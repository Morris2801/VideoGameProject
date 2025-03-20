// Stack DataStruct pero con otro nombre

class Inventory {
    constructor() {
      this.items = []; 
      this.max = 6;
    }
    push(element) {
      if (this.items.length < this.max ){
        this.items.push(element);
        return true;
      }
      console.log("Inventory is full");
      return false;
    }
    pop() {
      if (this.isEmpty()) {
        return "Stack is empty"; 
      }
      return this.items.pop();
    }
    peek() {
      if (this.isEmpty()) {
        return "Stack is empty"; 
      }
      return this.items[this.items.length - 1];
    }
    isEmpty() {
      return this.items.length === 0;
    }
    size() {
      return this.items.length;
    }
    print() {
        for(let i = 0; i < this.items.length; i++){
            console.log(items[i]);
        }
    }

    activateCard(cardIndex){ //saber que tipo de carta esta activa en el inventario
      const card = this.items[cardIndex];
      if(!card) return false;

      if(card.type === "weaponCard"){
        this.activeWeapon = card;
      }
      
      else if(card.type === "tranformationCard"){
        this.activeTransformation = card;
        // programar lo que va durar, la tranformacion etc
      }
      
      else if(card.type === "powerCard"){
        this.activeBuff = card;
        //programar que haga pop al acabarse el efecto
      }
    }

    getDamageBonus(){
      let bonus = 0;

      if(this.activeWeapon){
        bonus += this.activeWeapon.damageBuff;
      }
      if(this.activeBuff){
        for(const buff of this.activeBuff){
          bonus += buff.damageBonus;
        }
      }
      return bonus;
    }

    getAttackSprite(){
      return this.activeWeapon ? this.activeWeapon.spriteEffect : null;
    }
}

// Jugador
class BasePlayer extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.stamina = 5;
        this.damage = 3;
        this.inventory = new Inventory();
        this.attacking = false;
        this.attackCooldown = 0.3 // sec

        // Animation Frames: flow for [a,b],[c,d,e]
        // Ex.Dispaly para right: a->c->b->d->e
        // movementFrames: [a,b]; idleFrames: [c,d,e]
        this.setMovementFrames('right',  [6, 11], [8,7,9,10],);
        this.setMovementFrames('left', [12,15], [16, 14, 13]);
        this.setMovementFrames('up', [19,21], [18,17]);
        this.setMovementFrames('down', [1, 3], [0, 0]);
    }

    startAttack(){
      if(this.attackCooldown>0) return;

      this.attacking = true;

      const activeWeapon = this.inventory.activeWeapon;
      const damageBonus = this.inventory.getDamageBonus();
      let totalDamage = this.damage + damageBonus;

      this.createAttackEffect(totalDamage);

      this.playAttackAnimation(); //animacion de ataque del personaje

      this.attackCooldown = 0.3;
    }

    createAttackEffect(damage){
      //jalar el sprite del efecto de ataque
      const spriteEffect = this.inventory.getAttackSprite();
    
      //posicion del sprite segun el jugador, (ajustar para que cuadre con su mano)
        const effectX = this.position.x;
        const effectY = this.position.y;

        //instanciar el efecto del ataque (arma y efecto)
        const attackEfect = new AttackAnimation (effectX, effectY, damage, spriteEffect);

        game.addAttackEffect(attackEfect);
    }

    playAttackAnimation() {
      //direccion predeterminada
      let direction = "right"; // Valor predeterminado
      
      // la direccion basado en la velocidad
      if (this.velocity.x > 0) direction = "right";
      else if (this.velocity.x < 0) direction = "left";
      else if (this.velocity.y < 0) direction = "up";
      else if (this.velocity.y > 0) direction = "down";
      
      // ataque segun la animacion
      switch(direction) {
          case "right":
              this.setAnimation(22, 25, false, 100); // ajustar los numeros al sprite sheet
              break;
          case "left":
              this.setAnimation(26, 29, false, 100);
              break;
          case "up":
              this.setAnimation(30, 33, false, 100);
              break;
          case "down":
              this.setAnimation(34, 37, false, 100);
              break;
      }
  }

    updateAttack(deltaTime){
      //restar el deltatime al cooldown para poder atacar de nuevo
      if(this.attackCooldown>0){
        this.attackCooldown -= deltaTime;
        if(this.attackCooldown <= 0){
          this.attackCooldown = 0;
        }
      }

      //finalizar el ataque cunado termine la animacion
      if(this.attacking && this.animationComplete){
        this.attacking = false;
      }
    }
}