// Base Interactable (cofrecito)
class BaseInteractable extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}


//clase para animar el ataque circular del personaje

// Factores de escala globales para ajustar facilmente
// ATTACK_EFFECT_SCALE is already defined in player.js - removing duplicate declaration

// Modificar el constructor de AttackAnimation para usar la escala global
class AttackAnimation extends AnimatedObject {
    constructor(x, y, damage, sprite) {
        // Usar la escala global para el tamaño
        const size = 3 * ATTACK_EFFECT_SCALE;
        super("red", size, size, x*4, y*4, "attackEffect");
        this.damage = damage;
        this.hitEnemies = []; // para evitar el spameo de ataques
        this.active = true;

        if (sprite) {
            this.setSprite(sprite, new Rect(0, 64, 112, 64));
            this.sheetCols = 6;
            this.setAnimation(0, 5, false, 100);
        }
    }

    draw(ctx, scale) {
        // Calcular las dimensiones escaladas
        const scaledX = this.position.x * scale;
        const scaledY = this.position.y * scale;
        const scaledWidth = this.size.x * scale * ATTACK_EFFECT_SCALE;
        const scaledHeight = this.size.y * scale * ATTACK_EFFECT_SCALE;
        
        if (this.spriteImage) {
            // Dibujar el sprite con la escala aplicada
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
            // Dibujar un rectángulo de color
            ctx.fillStyle = this.color;
            ctx.fillRect(
                scaledX, scaledY,
                scaledWidth, scaledHeight
            );
        }
    }
        

    update(level, deltaTime) {
        super.update(level, deltaTime);

        // Colisiones con enemigos
        if (this.active) {
            for (const enemy of game.actors.filter(actor => actor.type === "enemy")) {
                if (boxOverlap(this, enemy) && !this.hitEnemies.includes(enemy)) {
                    enemy.takeDamage(this.damage);
                    this.hitEnemies.push(enemy);
                }
            }
        }

        if (this.frame >= this.maxFrame) {
            this.active = false;
            this.shouldRemove = true;
        }
    }
}