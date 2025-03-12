/*
Game Classes Development for MayAztec
*/

// Global Variables
const playerSpeed = 1.25;
const playerSize = 64;
const Lvl1Fric = 0.6;
const Lvl2Fric = 0.8;

// Class for text to be printed out on the screen
class TextLabel{
    constructor(x,y,font,color){
        this.x = x;
        this.y = y;
        this.font = font;
        this.color = color;
    }
    draw(ctx,text){
        ctx.font=this.font;
        ctx.fillStyle = this.color;
        ctx.fillText(text,this.x,this.y);
    }
}

// Class for bounding boxes
class Rect{
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

// Class to manage directions and positions
class Vec {
    constructor(x,y){
        this.x = x; 
        this.y = y; 
    }
    plus(other){
        return new Vec(this.x + other.x, this.y + other.y);
    }
    minus(other){
        return new Vec(this.x - other.x, this.y - other.y);
    }
    times(scalar){
        return new Vec(this.x*scalar, this.y*scalar);
    }
    magnitude(){
        return Math.sqrt(this.x **2 + this.y **2);
    }
}

class GameObject{
    constructor(position, width, height, color, type) {
        // Basic characteristics
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        // Sprite props
        this.spriteImage = undefined;
        this.spriteRect = undefined;
    }
    setSprite(imagePath, rect) {
        this.spriteImage = new Image();
        this.spriteImage.src = imagePath;
        if (rect) {
            this.spriteRect = rect;
        }
    }
    draw(ctx) {
        if (this.spriteImage) {
            ctx.drawImage(this.spriteImage, this.spriteRect.x, this.spriteRect.y, this.spriteRect.width, this.spriteRect.height, this.position.x, this.position.y, this.width, this.height);
                //this.position.x * scale, this.position.y * scale,
                //this.width * scale, this.height * scale);
        } 
        else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
}

// Box class for testing
class Box extends GameObject {
    constructor(position,width,height,color,type){
        super(position,width,height,color, "box");
    }
}

// Function to check if two squared objects are overlapping
function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.width > obj2.position.x && 
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.y + obj1.height > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.height;
}

// BaseCharacter Class
class BaseCharacter extends GameObject{
    constructor(position,width,height,color,type,health){
        super(position,width,height,color, type,health);
        this.velocity = new Vec(0.0,0.0);
        this.acceleration = new Vec(0.0, 0.0);
        this.friction = Lvl1Fric;
        this.attkSpeed = 0.3;
    }
    update(deltaTime){
        this.position = this.position.plus(this.velocity.times(deltaTime));
        if(this.position.x <0){
            this.position.x = 0; 
        }
        else if(this.position.x + this.width > canvasWidth){
            this.position.x = canvasWidth - this.width;
        }
        if(this.position.y < 0){
            this.position.y = 0;
        }
        else if(this.position.y + this.height > canvasHeight){
            this.position.y = canvasHeight - this.height;
        }
        
    }
}
class BasePlayer extends BaseCharacter{
    constructor(position,width,height,color,type){
        //Inheritance
        super(position,width,height,color,type);
        //Atributes
        this.health = 10;
        this.stamina = 5;
        this.damage = 3;
        //"Inventory"
        this.slot1 = undefined;
        this.slot2 = undefined;
        this.slot3 = undefined;
        this.slot4 = undefined;
        this.slot5 = undefined;
        this.slot6 = undefined;
        
    }
}
// Enemies
class BaseEnemy extends BaseCharacter{
    constructor(position,width,height,color,type, health, damage){
        //Inheritance
        super(position,width,height,color, type);
        //Atributes
        this.health = health;
        this.damage = damage;
    }
}

// BaseCard
class BaseCard extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}

// Base Obstacles
class BaseObstacle extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}

// Base Interactable
class BaseInteractable extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}

//Base Room
class BaseRoom{
    constructor(roomNumber, type, enemyCount, chestCount){
        this.roomNumber = roomNumber;
        this.roomName = roomName;
        this.type = type;
        this.enemyCount = enemyCount;
        this.chestCount = chestCount;
    }
}

//Base Level
class BaseLevel{
    constructor(levelName, levelNumber){
        this.levelName = levelName;
        this.levelNumber = levelNumber;
        this.rooms = [];
    }

}





// Game Class
class Game {
    constructor() {
        this.currentLevel = 1;
        this.createEventListeners();
        this.initObjects();
    }
    initObjects() {
        
        //GameObjects Instantiation
        this.playerTest = new BasePlayer(new Vec(canvasWidth/2,canvasHeight/2), playerSize, playerSize, "green", "player");
        this.playerTest.setSprite('../assets/testSpritesheet.png', new Rect(0,0,playerSize,playerSize));
        
        this.enemyTest = new BaseEnemy(new Vec(canvasWidth/3,canvasHeight/3), 64, 64, "red", "enemy");
        this.enemyTest.setSprite('../assets/enemyTest.png', new Rect(0,0,360,360));
        
        this.actors = [this.enemyTest];
    }
    draw(ctx) {
        for (let actor of this.actors) {
            actor.draw(ctx);
        }
        this.playerTest.draw(ctx);
    }
    update(deltaTime) {
        if (this.currentLevel === 1) {
            this.playerTest.friction = Lvl1Fric;
        } else if (this.currentLevel === 2) {
            this.playerTest.friction = Lvl2Fric;
        }
        for (let actor of this.actors) {
            actor.update(deltaTime);
        }
        this.playerTest.update(deltaTime);
    }
    createEventListeners() {
        window.addEventListener('keydown', (event) =>{
            if(event.key == 'a' || event.key == 'A' ||event.code == 'ArrowLeft'){
                this.playerTest.velocity.x = -playerSpeed;
            }
            else if(event.key == 'd' || event.key == 'D' ||event.code == 'ArrowRight'){
                this.playerTest.velocity.x = playerSpeed;
            }
            else if(event.key == 'w' || event.key == 'W' ||event.code == 'ArrowUp'){
                this.playerTest.velocity.y = -playerSpeed;
            }
            else if(event.key == 's' || event.key == 'S' ||event.code == 'ArrowDown'){
                this.playerTest.velocity.y = playerSpeed;
            }
        }); 
        window.addEventListener('keyup', (event) =>{
            if(event.key == 'a' || event.key == 'A' ||event.code == 'ArrowLeft'){
                this.playerTest.velocity.x = 0;
            }
            else if(event.key == 'd' || event.key == 'D' ||event.code == 'ArrowRight'){
                this.playerTest.velocity.x = 0;
            }
            else if(event.key == 'w' || event.key == 'W' ||event.code == 'ArrowUp'){
                this.playerTest.velocity.y = 0;
            }
            else if(event.key == 's' || event.key == 'S' ||event.code == 'ArrowDown'){
                this.playerTest.velocity.y = 0;
            }
        });
    }
}