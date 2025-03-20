// Base Interactable (cofrecito)
class BaseInteractable extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}


//clase para animar el ataque circular del personaje
class AttackAnimation extends AnimatedObject{
    constructor(x, y, damage, sprite){
        super("red", 1,1,x,y,"attackEffect");
        this.damage = damage;
        this.hitEnemies = []; //para evitar el spameo de ataques
        //se registra que el enemigo esta en el arreglo y cuando termine la animacion se hace pop para poder atacar de nuez
        this.active = true;

        //
        if (sprite){
            this.setSprite(sprite, new Rect(0,0,32,32));
            this.sheetCols = 4; //ajustar para el sprite
            this.setAnimation = (0,3, false, 100); //no repetir la animacion
        }
    }

    update(level, deltaTime){
        super.update(level,deltaTime);

        //colisiones con enemigos
        if(this.active){
            for(const enemy of game.actors.filter(actor => actor.type === "enemy")){
                if(boxOverlap(this, enemy)&& !this.hitEnemies.includes(enemy)){
                    enemy.takeDamage(this.damage);
                    this.hitEnemies.push(enemy);
                }
            }
        }

        if(this.frame >=this.maxFrame){
            this.active = false; //terminar la animacion
        
            this.shouldRemove = true; 
        }
    }
}
