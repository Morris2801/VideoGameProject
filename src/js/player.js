const PLAYER_SCALE = 1.5;  // Escala para el personaje
const WEAPON_SCALE = 2.5;  // Escala para el arma
const ATTACK_EFFECT_SCALE = 1.5;
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


class AttackAnimation extends AnimatedObject {
  constructor(x, y, damage, sprite) {
    // Tamaño base con ATTACK_EFFECT_SCALE
    const size = 4 * ATTACK_EFFECT_SCALE;
    super("red", size, size, x, y, "attackEffect");
    this.damage = damage;
    this.hitEnemies = []; // Para evitar golpear enemigos multiples veces
    this.active = true;
    
    if (sprite) {
      this.setSprite(sprite, new Rect(0, 64, 64, 64));
      this.sheetCols = 6;
      this.setAnimation(0, 5, false, 100);
    }
  }
  
  draw(ctx, scale) {
    // Calcular dimensiones escaladas
    const scaledX = this.position.x * scale;
    const scaledY = this.position.y * scale;
    const scaledWidth = this.size.x * scale * ATTACK_EFFECT_SCALE;
    const scaledHeight = this.size.y * scale * ATTACK_EFFECT_SCALE;
    
    if (this.spriteImage) {
      // Dibujar el sprite con escala
      if (this.spriteRect) {
        ctx.drawImage(
          this.spriteImage,
          this.spriteRect.x * this.spriteRect.width,
          this.spriteRect.y * this.spriteRect.height,
          this.spriteRect.width, this.spriteRect.height,
          scaledX, scaledY,
          scaledWidth, scaledHeight
        );
      } else {
        ctx.drawImage(
          this.spriteImage,
          scaledX, scaledY,
          scaledWidth, scaledHeight
        );
      }
    } else {
      // Dibujar rectangulo de color si no hay sprite
      ctx.fillStyle = this.color;
      ctx.fillRect(
        scaledX, scaledY,
        scaledWidth, scaledHeight
      );
    }
  }
  
  update(level, deltaTime) {
    super.update(level, deltaTime);
    
    // Manejar colisiones con enemigos
    if (this.active && game) {
      for (const enemy of game.actors.filter(actor => actor.type === "enemy")) {
        if (boxOverlap(this, enemy) && !this.hitEnemies.includes(enemy)) {
          enemy.takeDamage(this.damage);
          this.hitEnemies.push(enemy);
        }
      }
    }
    
    // Marcar para eliminación cuando se completa la animación
    if (this.frame >= this.maxFrame) {
      this.active = false;
      this.shouldRemove = true;
    }
  }
}




// Jugador


let rescale = 0.9;
class BasePlayer extends BaseCharacter {
  constructor(_color, width, height, x, y, _type) {
    super(_color, width*rescale, height*rescale, x, y, _type);
    this.health = 10;
    this.stamina = 5;
    this.damage = 3;
    this.inventory = new Inventory();

    //stats?
    this.killCount = 0; 
    this.cardPickupCount = 0;
    this.cardsUsed = 0; 


    //Arma base stadisticas
    this.basehealth = 10;
    this.baseStamina = 5;
    this.baseDamage = 3;
    
    // Variables de estado de ataque
    this.attacking = false;
    this.attackTimer = 0;
    this.attackCooldown = 100;
    this.attackDuration = 0;
    this.attackMaxDuration = 700; // 500ms para completar el ataque
    this.lastDirection = "right"; //  por defecto
    this.hasHitEnemy = false;

    // Cajas de colision de ataque (para detectar golpes)
    this.attackBoxes = {
      right: {
        xOffset: this.size.x, 
        yOffset: 3+this.size.y / 2 - (5 * PLAYER_SCALE) / 2,
        width: PLAYER_SCALE, 
        height: PLAYER_SCALE+0.5  
      },
      left: {
        xOffset: -this.size.x-0.5 , 
        yOffset: 3+this.size.y / 2 - (5 * PLAYER_SCALE) / 2, 
        width: PLAYER_SCALE, 
        height: PLAYER_SCALE+0.5  
      },
      up: {
        xOffset: -this.size.x+0.5,
        yOffset: -2*this.size.y - 0.1, 
        width: PLAYER_SCALE+0.5, 
        height: PLAYER_SCALE 
      },
      down: {
        xOffset: -this.size.x+0.5,
        yOffset: this.size.y - 0.1,
        width: PLAYER_SCALE+0.5, 
        height: PLAYER_SCALE 
      }
    };
    
    // Personaje
    this.normalSprite = new Image(); // AÑADIDO: definir normalSprite
    this.normalSprite.src = "../assets/Prueba_SpritePeleando.png";
    this.normalSprite.onload = () => console.log("Normal sprite loaded");
  
    this.normalAttackingSprite = new Image();
    this.normalAttackingSprite.src = "../assets/Prueba_SpritePeleando.png";
    this.normalAttackingSprite.onload = () => console.log("Attack sprite loaded");
  
  // Sprites para armas
    this.weaponSprite = new Image();
    this.weaponSprite.src = "../assets/Prueba_SpritePeleando.png";
    this.weaponSprite.onload = () => console.log("Weapon loaded");

    //sprites de todas las tranformaciones & weapon 
    this.transformationSprites = {
      "default":{
        main: "../assets/Prueba_SpritePeleando.png",
        attacking: "../assets/Prueba_SpritePeleando.png"
      },
      "mariachi":{
        main:  "../assests/mariachi_sprite.png",
        attacking: " "
      }
      // agregar para cada sprite de tranformacion
    }
    this.weaponSprites ={
      "default":{
        main: "../assets/Prueba_SpritePeleando.png",
        attacking: "../assets/Prueba_SpritePeleando.png"
      }
    }

    //sprite activos
    this.currentSprite = this.normalSprite;
    this.currentAttackingSprite = this.normalAttackingSprite;
    
    // Estados Actuales
    this.activeWeaponType = "default";
    this.transformationType = "default";
    this.isTransformed = false;
    this.transformationTimer = 0;

    // Establecer frames de movimiento
    this.setMovementFrames('right', [6, 11], [8, 7, 9, 10]);
    this.setMovementFrames('left', [12, 15], [16, 14, 13]);
    this.setMovementFrames('up', [19, 21], [18, 17]);
    this.setMovementFrames('down', [1, 3], [0, 0]);
    
    // Frames de de animacion
    this.attackFrames = {
      right: [0, 5],
      left: [24, 27],
      up: [28, 31],
      down: [32, 35]
    };
    
    this.hasHitEnemy = false;
  }

  useCard(index){
    if(index >=0 && index < this.inventory.size()){
      let card = this.inventory.items[index];
      card.applyEffect(this);
      this.cardsUsed++;

      if(card.maxUses > 0){
        card.maxUses--;
        console.log(`Card ${card.type} uses: ${card.maxUses}`);
        if(card.maxUses == 0){
          this.inventory.items.splice(index, 1);
        }
       
      }
      console.log(`Card used: ${card.cardType}`);
    }
  }
  
  update(level, deltaTime) {
    // Llamar al metodo update para el movimiento y direcicon
    super.update(level, deltaTime);
    
    // Actualizar direccion segun la velocidad
    if (this.velocity.x > 0) this.lastDirection = "right";
    else if (this.velocity.x < 0) this.lastDirection = "left";
    else if (this.velocity.y < 0) this.lastDirection = "up";
    else if (this.velocity.y > 0) this.lastDirection = "down";
    
    // cooldown de ataque
    if (this.attackCooldown > 0) {
      this.attackCooldown -= deltaTime;
      if (this.attackCooldown < 0) this.attackCooldown = 0;
    }
    
    
    if (this.attacking) {
      this.attackDuration += deltaTime;
      
      
      // Comprobar colisiones con enemigos usando la hitbox de ataque
      if (game && game.actors && !this.hasHitEnemy) {
        const attackBox = {
          position: {
            x: this.position.x + this.attackBoxes[this.lastDirection].xOffset,
            y: this.position.y + this.attackBoxes[this.lastDirection].yOffset
          },
          size: {
            x: this.attackBoxes[this.lastDirection].width,
            y: this.attackBoxes[this.lastDirection].height
          },
          type: "attackBox"
        };
        
        for (const actor of game.actors) {
          if (actor.type === "enemy" && boxOverlap(attackBox, actor)) {
            // Aplicar daño al enemigo
            if (actor.takeDamage) {
              const damageBonus = this.inventory.getDamageBonus() || 0;
              actor.takeDamage(this.damage + damageBonus);
              this.hasHitEnemy = true;
            }
          }
        }
      }
      
      // Finalizar ataque
      if (this.attackDuration >= this.attackMaxDuration) {
        this.attacking = false;
        this.attackDuration = 0;
        this.hasHitEnemy = false;
        
        // Volver a animacion de idle
        this.switchBackToIdleState();
      }
    }

    //actualizar timer si esta tranformado
    if(this.isTransformed && this.transformationTimer>0){
      this.transformationTimer -= deltaTime;

      if(this.transformationTimer<= 0){
        this.revertTrasformation();
      }
    }
  }

  equipWeapon(weaponType){
    this.activeWeaponType = weaponType;

    if(!this.isTransformed){
      this.updateCurrentSprites();
    }

    console.log('weapon equipped: ${weaponType}');
  }

  //metodo para tranformarse
  applyTransformation(transformationType, duration){
    this.isTransformed = true;
    this.transformationType = transformationType;
    this.transformationTimer = duration * 1000; //convertir segundos a milisegundos

    this.updateCurrentSprites();
     
    console.log('Tranformation applied: ${tranformationType} for ${duration} seconds ');
  }

  revertTransformation() {
    this.isTransformed = false;
    this.transformationType = "default";
    
    // Actualizar sprites - volver a los del arma activa si hay alguna
    this.updateCurrentSprites();
    
    // Restaurar estadísticas base
    this.health = this.baseHealth;
    this.stamina = this.baseStamina;
    this.damage = this.baseDamage;
    
    console.log("Transformation reverted to normal");
  }
  
  switchBackToIdleState() {
    switch (this.lastDirection) {
      case 'right':
        this.setAnimation(...this.movement.right.idleFrames, true, 100);
        break;
      case 'left':
        this.setAnimation(...this.movement.left.idleFrames, true, 100);
        break;
      case 'up':
        this.setAnimation(...this.movement.up.idleFrames, true, 100);
        break;
      case 'down':
        this.setAnimation(...this.movement.down.idleFrames, true, 100);
        break;
    }
  }
  
  startAttack() {
    if (this.attackCooldown > 0 || this.attacking) return;
    
    console.log("Starting attack");
    this.attacking = true;
    this.attackDuration = 0;
    this.attackCooldown = 300; // 300ms de cooldown
    this.hasHitEnemy = false;
    
    // Establecer frames de ataque basada en direccion
    const attackFrameRange = this.attackFrames[this.lastDirection];
    this.setAnimation(attackFrameRange[0], attackFrameRange[1], false, 100);
    
    // Crear efecto de ataque
    this.createAttackEffect();  
  }
  
  createAttackEffect() {
    const direction = this.lastDirection;
    
    // Calcular posicion del efecto basado en direccion y posicion del jugador
    let effectX = this.position.x*2;
    let effectY = this.position.y*2;
    const effectSize = 5 * ATTACK_EFFECT_SCALE;
    
    switch(direction) {
      case "right":
        effectX = this.position.x + this.size.x;
        effectY = this.position.y + (this.size.y / 2) - (effectSize / 2);
        break;
      case 'left':
        effectX = this.position.x - effectSize;
        effectY = this.position.y + (this.size.y / 2) - (effectSize / 2);
        break;
      case 'up':
        effectX = this.position.x + (this.size.x / 2) - (effectSize / 2);
        effectY = this.position.y - effectSize;
        break;
      case 'down':
        effectX = this.position.x + (this.size.x / 2) - (effectSize / 2);
        effectY = this.position.y + this.size.y;
        break;
    }
    
    // Obtener sprite de arma y daño del inventario
    let weaponSprite = this.inventory.getAttackSprite();
    let damageBonus = this.inventory.getDamageBonus() || 0;
    let totalDamage = this.damage + damageBonus;
    
    // Crear efecto de ataque
    const attackEffect = new AttackAnimation(
      effectX, effectY, totalDamage, weaponSprite || this.weaponSprite.src
    );
    
    if(game) {
      game.addAttackEffect(attackEffect);
    }
  }
  
  draw(ctx, scale) {
    if (this.attacking) {
      
      this.drawAttackingPlayer(ctx, scale);
      this.drawWeapon(ctx, scale);
      this.drawAttackHitbox(ctx, scale); //Dibujar hitbox 

    } else {
      // Dibujar jugador normal
      super.draw(ctx, scale);
    }
  }
  
  drawAttackingPlayer(ctx, scale) {
    const direction = this.lastDirection;
    
    // Calcular frame de ataque basado en progreso
    const attackProgress = this.attackDuration / this.attackMaxDuration;
    const attackFrameCount = this.attackFrames[direction][1] - this.attackFrames[direction][0] + 1;
    const attackFrame = Math.min(Math.floor(attackProgress * attackFrameCount), 
                              attackFrameCount - 1);
    
    // Aplicar escala del jugador
    const scaledX = this.position.x * scale;
    const scaledY = this.position.y * scale;
    const scaledWidth = this.size.x * scale*1.8;
    const scaledHeight = this.size.y * scale*1.8;
    
    // Configurar transformación para dirección
    ctx.save();
    if (direction === 'left') {
      ctx.translate(scaledX + scaledWidth, scaledY);
      ctx.scale(-1, 1);
    } else {
      ctx.translate(scaledX, scaledY);
    }
    
    // Dimensiones del personaje en la hoja de sprites
    const characterWidth = 112;
    const characterHeight = 128;
    const frameToUse = this.attackFrames[direction][0] + attackFrame;
    
    // Dibujar el personaje
    const spriteX = (frameToUse % this.sheetCols) * characterWidth;
    const spriteY = Math.floor(frameToUse / this.sheetCols) * characterHeight;
    
    ctx.drawImage(
      this.currentAttackingSprite,
      spriteX, spriteY,
      characterWidth, characterHeight,
      0, 0,
      scaledWidth, scaledHeight
    );
    
    ctx.restore();
  }
  
  drawWeapon(ctx, scale) {
    const direction = this.lastDirection;
    
    
    const attackProgress = this.attackDuration / this.attackMaxDuration;
    const attackFrame = Math.min(Math.floor(attackProgress * 6), 5);
    
    // Posición y escala
    const scaledX = this.position.x * scale;
    const scaledY = this.position.y * scale;
    const scaledWidth = this.size.x * scale;
    const scaledHeight = this.size.y * scale;
    
    // Set de posicionamiento del arma
    let offsetX = 0;
    let offsetY = 0;
    let angle = 0;
    
    // Ajustar posicion y rotacion del arma segun la direccion
    switch (direction) {
      case 'right':
        offsetX = scaledWidth+ (10 * WEAPON_SCALE);
        offsetY = scaledHeight * -.3;
        angle = 0;
        break;
      case 'left':
        offsetX = -(10 * WEAPON_SCALE);
        offsetY = scaledHeight * 0.4;
        angle = Math.PI;
        break;
      case 'up':
        offsetX = scaledWidth * 0.5;
        offsetY = -(10 * WEAPON_SCALE);
        angle = -Math.PI / 2;
        break;
      case 'down':
        offsetX = scaledWidth * 0.5;
        offsetY = scaledHeight + (5 * WEAPON_SCALE);
        angle = Math.PI / 2;
        break;
    }
    
    // Dibujar el arma
    ctx.save();
    ctx.translate(scaledX + offsetX, scaledY + offsetY);
    ctx.rotate(angle);
    
    // Dimensiones del arma y recortes de los sprites
    const weaponWidth = 112 / 6;
    const weaponHeight = 64;
    const weaponSize = 10.0 * WEAPON_SCALE;
    
    // Dibujar arma con escala
    ctx.drawImage(
      this.weaponSprite,
      attackFrame * weaponWidth * 2, 128,
      weaponWidth, weaponHeight * 2,
      -weaponWidth * weaponSize / 2, -weaponHeight * weaponSize / 2,
      weaponWidth * weaponSize, weaponHeight * weaponSize
    );
    
    ctx.restore();
  }
  
  drawAttackHitbox(ctx, scale) {
    // Obtener hitbox para la direccion actual
    const hitbox = this.attackBoxes[this.lastDirection];
    
    // Calcular posicion escalada
    const scaledX = (this.position.x + hitbox.xOffset) * scale;
    const scaledY = (this.position.y + hitbox.yOffset) * scale;
    const scaledWidth = hitbox.width * scale;
    const scaledHeight = hitbox.height * scale;
    
    // Dibujar hitbox
    ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
    ctx.fillRect(scaledX, scaledY, scaledWidth, scaledHeight);
  }

}
