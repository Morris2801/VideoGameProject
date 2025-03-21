const PLAYER_SCALE = 1;  // Escala para el personaje
const WEAPON_SCALE = 2;  // Escala para el arma
const ATTACK_EFFECT_SCALE = 1;
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
      super(_color, width*2, height*2, x, y, _type);
      this.health = 10;
      this.stamina = 5;
      this.damage = 3;
      this.inventory = new Inventory();
      this.attacking = false;
      this.attackCooldown = 0;
      this.attackDuration = 0;
      this.attackMaxDuration = 750; // 500ms para completar el ataque
      
      // Cargar sprite del arma
      this.weaponSprite = new Image();
      this.weaponSprite.src = "../assets/Prueba_SpritePeleando.png";
      this.weaponSprite.onload = () => console.log("Arma cargada");

      this.attackingSprite = new Image();
      this.attackingSprite.src = "../assets/Prueba_SpritePeleando.png";
      this.attackingSprite.onload = () => console.log("Sprite de ataque cargado");
      
      // Establecer frames de movimiento
      this.setMovementFrames('right', [6, 11], [8, 7, 9, 10]);
      this.setMovementFrames('left', [12, 15], [16, 14, 13]);
      this.setMovementFrames('up', [19, 21], [18, 17]);
      this.setMovementFrames('down', [1, 3], [0, 0]);

      
  }

  //saber a cual fue el ultimo lado al que miro
  update(level, deltaTime) {
    super.update(level, deltaTime);
    
    if (this.velocity.x > 0) this.lastDirection = "right";
    else if (this.velocity.x < 0) this.lastDirection = "left";
    else if (this.velocity.y < 0) this.lastDirection = "up";
    else if (this.velocity.y > 0) this.lastDirection = "down";
}


  
  // Método de ataque
  startAttack() {
      if (this.attackCooldown > 0) return;
      
      console.log("Iniciando ataque");
      this.attacking = true;
      this.attackDuration = 0;
      this.attackCooldown = 300; // 300ms de cooldown
      
      // Elegir sprite de ataque segun direccion
      this.playAttackAnimation();

      this.createAttackEffect();
  }
  

  playAttackAnimation(){
    //determinar la direccion del jugador 
    let direction = this.lastDirection || "right";
    if(this.velocity.x>0) direction = "right";
    else if(this.velocity.x<0) direction = "left";
    else if(this.velocity.y>0) direction = "down";
    else if(this.velocity.y<0) direction = "up";
    switch (direction) {
      case 'right':
          // 
          this.setAnimation(0, 5, false, 100);
          break;
      case 'left':
          // ajustar al sprite sheet
          this.setAnimation(24, 27, false, 100);
          break;
      case 'up':
          // ajustar al sprite sheet
          this.setAnimation(28, 31, false, 100);
          break;
      case 'down':
          // ajustar al sprite sheet
          this.setAnimation(32, 35, false, 100);
          break;
    }
  }

  createAttackEffect(){
    let direction = this.lastDirection || "right";
    if (this.velocity.x > 0) direction = "right";
    else if (this.velocity.x < 0) direction = "left";
    else if (this.velocity.y < 0) direction = "up";
    else if (this.velocity.y > 0) direction = "down";

    let effectX = this.position.x;
    let effectY = this.position.y;

    const effectSize = 4;

    switch(direction){
      case "rigth":
        effectX = this.position.x +this.size.x;
        effectY = this.position.y+(this.size.y/2)-effectSize/2; //centrar el efecto
        case 'left':
          effectX = this.position.x - 3; 
          effectY = this.position.y + (this.size.y / 2)-effectSize/2;
          break;
      case 'up':
          effectX = this.position.x + (this.size.x / 2) - 1.5;
          effectY = this.position.y - 3;
          break;
      case 'down':
          effectX = this.position.x + (this.size.x / 2) - 1.5;
          effectY = this.position.y + this.size.y;
          break;
    }

    //jalar el sprite del arma del inventario
    let weaponSprite = this.inventory.getAttackSprite();
    let damageBonus = this.inventory.getDamageBonus() || 0; //si no obtiene numero almenos que sea 0 el ataque
    let totalDamage = this.damage + damageBonus;

    const attackEffect = new AttackAnimation(
      effectX, effectY, totalDamage, weaponSprite || this.weaponSprite.src);

    if(game){
      game.addAttackEffect(attackEffect);
    }
  }
  
  draw(ctx, scale) {
    if (this.attacking) {
        // Si esta atacando, dibujamos el sprite de ataque en lugar del sprite normal
        this.drawAttackAnimation(ctx, scale);
    } else {
        // Si no esta atacando, usamos el metodo original para dibujar al jugador
        super.draw(ctx, scale);
    }
}

// Metodo para dibujar la animacion de ataque
// Metodo modificado para dibujar la animacion de ataque con escala personalizada
drawAttackAnimation(ctx, scale) {
  // Determinar dirección
  let direction = this.lastDirection || "right";
  
  // Calcular el frame a mostrar
  const attackProgress = this.attackDuration / this.attackMaxDuration;
  const attackFrame = Math.min(Math.floor(attackProgress * 6), 5);
  
  // Guardar el contexto
  ctx.save();
  
  // Usar exactamente las mismas posiciones y tamaños que el personaje normal
  const scaledX = this.position.x * scale;
  const scaledY = this.position.y * scale;
  const scaledWidth = this.size.x * scale;  // Sin multiplicar por PLAYER_SCALE aquí
  const scaledHeight = this.size.y * scale; // Sin multiplicar por PLAYER_SCALE aquí
  
  // Configurar transformación
  if (direction === 'left') {
      ctx.translate(scaledX + scaledWidth, scaledY);
      ctx.scale(-1, 1);
  } else {
      ctx.translate(scaledX, scaledY);
  }
  
  // Dibujar el personaje atacando con el mismo tamaño que el normal
  const characterWidth = 112;
  const characterHeight = 128;
  
  ctx.drawImage(
      this.attackingSprite,
      attackFrame * characterWidth, 0,
      characterWidth, characterHeight,
      0, 0,
      scaledWidth, scaledHeight  // Usar el mismo tamaño que el personaje normal
  );
  
  // Restaurar el contexto
  ctx.restore();
  
  // Dibujar el arma
  this.drawWeapon(ctx, scale, direction, attackFrame);
}

// Metodo modificado para dibujar el arma con escala y posicion controlada
drawWeapon(ctx, scale, direction, attackFrame) {
  // Usar las mismas posiciones base que el personaje
  const scaledX = this.position.x * scale;
  const scaledY = this.position.y * scale;
  const scaledWidth = this.size.x * scale;
  const scaledHeight = this.size.y * scale;
  
  // Variables para la posición del arma que puedes ajustar fácilmente
  let offsetX = 0;
  let offsetY = 0;
  let angle = 0;
  
  switch (direction) {
    case 'right':
      offsetX = scaledWidth + 20;  // Ajusta este valor
      offsetY = scaledHeight * -0.8; // Ajusta este valor
      angle = 0;
      break;
    case 'left':
      offsetX = -10;  // Ajusta este valor negativo para mover a la izquierda
      offsetY = scaledHeight * 0.4;
      angle = Math.PI;
      break;
    case 'up':
      offsetX = scaledWidth * 0.5;
      offsetY = -10;  // Ajusta este valor negativo para mover hacia arriba
      angle = -Math.PI / 2;
      break;
    case 'down':
      offsetX = scaledWidth * 0.5;
      offsetY = scaledHeight + 10;  // Ajusta este valor
      angle = Math.PI / 2;
      break;
  }
  
  // Guardar contexto
  ctx.save();
  
  // Posicionar el arma usando el offset
  ctx.translate(scaledX*2 + offsetX, scaledY*2 + offsetY);
  
  // Rotar según dirección
  ctx.rotate(angle);
  
  // Dibujar el arma con tamaño fijo
  const weaponWidth = 112 / 6;
  const weaponHeight = 64;
  const weaponSize = 10.0;  // Ajusta este valor para cambiar el tamaño del arma
  
  ctx.drawImage(
    this.weaponSprite,
    attackFrame * weaponWidth*2, 128,
    weaponWidth, weaponHeight*2,
    -weaponWidth * weaponSize , -weaponHeight * weaponSize ,
    weaponWidth * weaponSize, weaponHeight * weaponSize
  );
  
  // Restaurar contexto
  ctx.restore();
  
  // Dibujar hitbox
  this.drawAttackHitbox(ctx, scale, direction);
}

// Nuevo metodo separado para dibujar el hitbox del ataque
drawAttackHitbox(ctx, scale, direction) {
  let hitboxX, hitboxY;
  const hitBoxSize = scale * 1.5;
  
  // Posicionar el hitbox segun la direccion
  switch (direction) {
      case 'right':
          hitboxX = this.position.x * scale + this.size.x * scale;
          hitboxY = this.position.y * scale + this.size.y * scale / 2;
          break;
      case 'left':
          hitboxX = this.position.x * scale;
          hitboxY = this.position.y * scale + this.size.y * scale / 2;
          break;
      case 'up':
          hitboxX = this.position.x * scale + this.size.x * scale / 2;
          hitboxY = this.position.y * scale;
          break;
      case 'down':
          hitboxX = this.position.x * scale + this.size.x * scale / 2;
          hitboxY = this.position.y * scale + this.size.y * scale;
          break;
  }
  
  // Dibujar el hitbox
  ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
  ctx.fillRect(
      hitboxX - hitBoxSize/2,
      hitboxY - hitBoxSize/2,
      hitBoxSize,
      hitBoxSize
  );
}

// Metodo modificado para crear el efecto de ataque usando la escala global
createAttackEffect() {
  let direction = this.lastDirection || "right";
  
  // Usar la escala global para el tamano del efecto
  const effectSize = 3 * ATTACK_EFFECT_SCALE;
  let effectX, effectY;

  switch(direction) {
      case "right":
          effectX = this.position.x + this.size.x;
          effectY = this.position.y + (this.size.y / 2) - effectSize / 2;
          break;
      case 'left':
          effectX = this.position.x - effectSize;
          effectY = this.position.y + (this.size.y / 2) - effectSize / 2;
          break;
      case 'up':
          effectX = this.position.x + (this.size.x / 2) - effectSize / 2;
          effectY = this.position.y - effectSize;
          break;
      case 'down':
          effectX = this.position.x + (this.size.x / 2) - effectSize / 2;
          effectY = this.position.y + this.size.y;
          break;
  }

  // Crear el efecto
  let weaponSprite = this.inventory.getAttackSprite();
  let damageBonus = this.inventory.getDamageBonus() || 0;
  let totalDamage = this.damage + damageBonus;

  const attackEffect = new AttackAnimation(
      effectX, effectY, totalDamage, weaponSprite || this.weaponSprite.src
  );

  if(game) {
      game.addAttackEffect(attackEffect);
  }
}
  // Actualizar el estado del ataque
  updateAttack(deltaTime) {
      // Actualizar cooldown
      if (this.attackCooldown > 0) {
          this.attackCooldown -= deltaTime;
          if (this.attackCooldown < 0) this.attackCooldown = 0;
      }
      
      // Actualizar duracion del ataque
      if (this.attacking) {
          this.attackDuration += deltaTime;
          
          // Comprobar colisiones con enemigos
          if (game && game.actors) {
              for (const actor of game.actors) {
                  if (actor.type === "enemy" && boxOverlap(this, actor)) {
                      // Logica de daño al enemigo
                      console.log("¡Golpeó a un enemigo!");
                  }
              }
          }
          
          // Terminar ataque si ha pasado el tiempo maximo
          if (this.attackDuration >= this.attackMaxDuration) {
              this.attacking = false;
              this.attackDuration = 0;
              
              // Volver a animacion normal
              if (this.velocity.x > 0) this.setAnimation(...this.movement.right.idleFrames, true, 100);
              else if (this.velocity.x < 0) this.setAnimation(...this.movement.left.idleFrames, true, 100);
              else if (this.velocity.y < 0) this.setAnimation(...this.movement.up.idleFrames, true, 100);
              else if (this.velocity.y > 0) this.setAnimation(...this.movement.down.idleFrames, true, 100);
              else this.setAnimation(...this.movement.right.idleFrames, true, 100);
          }
      }
  }
}