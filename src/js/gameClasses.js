/*
Game Classes Development for MayAztec
*/


"use strict";

// Global Variables
const playerSpeed = 0.005;
let level;
let player;
const scale = 32;

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
    constructor(color, width, height, x, y, type) {
        this.position = new Vec(x, y);
        this.size = new Vec(width, height);
        this.color = color;
        this.type = type;

        // Sprite properties
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

    draw(ctx, scale) {
        if (this.spriteImage) {
            // Draw a sprite if the object has one defined
            if (this.spriteRect) {
                ctx.drawImage(this.spriteImage,
                              this.spriteRect.x * this.spriteRect.width,
                              this.spriteRect.y * this.spriteRect.height,
                              this.spriteRect.width, this.spriteRect.height,
                              this.position.x * scale, this.position.y * scale,
                              this.size.x * scale, this.size.y * scale);
            } else {
                ctx.drawImage(this.spriteImage,
                              this.position.x * scale, this.position.y * scale,
                              this.size.x * scale, this.size.y * scale);
            }
        } else {
            // If there is no sprite asociated, just draw a color square
            ctx.fillStyle = this.color;
            ctx.fillRect(this.position.x * scale, this.position.y * scale,
                         this.size.x * scale, this.size.y * scale);
        }
    }

    update() {

    }
}

class AnimatedObject extends GameObject{
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        // Animation properties
        this.frame = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.sheetCols = 0;

        this.repeat = true;

        // Delay between frames (in milliseconds)
        this.frameDuration = 100;
        this.totalTime = 0;
    }

    setAnimation(minFrame, maxFrame, repeat, duration) {
        this.minFrame = minFrame;
        this.maxFrame = maxFrame;
        this.frame = minFrame;
        this.repeat = repeat;
        this.totalTime = 0;
        this.frameDuration = duration;
    }

    updateFrame(deltaTime) {
        this.totalTime += deltaTime;
        if (this.totalTime > this.frameDuration) {
            // Loop around the animation frames if the animation is set to repeat
            // Otherwise stay on the last frame
            let restartFrame = (this.repeat ? this.minFrame : this.frame);
            this.frame = this.frame < this.maxFrame ? this.frame + 1 : restartFrame;
            this.spriteRect.x = this.frame % this.sheetCols;
            this.spriteRect.y = Math.floor(this.frame / this.sheetCols);
            this.totalTime = 0;
        }
    }
}


// Box class for testing
class Box extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color, "box");
    }
}


// BaseCharacter Class
class BaseCharacter extends AnimatedObject{
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.velocity = new Vec(0.0, 0.0);
        this.health = 0;
        this.damage = 0;

        // Default movement variables to define directions and animations
        this.movement = {
            right: { status: false, axis: "x", sign: 1, repeat: true, duration: 100, moveFrames: [0, 0], idleFrames: [0, 0] },
            left:  { status: false, axis: "x", sign: -1, repeat: true, duration: 100, moveFrames: [0, 0], idleFrames: [0, 0] },
            up:    { status: false, axis: "y", sign: -1, repeat: true, duration: 100, moveFrames: [0, 0], idleFrames: [0, 0] },
            down:  { status: false, axis: "y", sign: 1, repeat: true, duration: 100, moveFrames: [0, 0], idleFrames: [0, 0] },
        };
    }

    setMovementFrames(direction, moveFrames, idleFrames) {
        if (this.movement[direction]) {
            this.movement[direction].moveFrames = moveFrames;
            this.movement[direction].idleFrames = idleFrames;
        }
    }

    update(level, deltaTime) {
        // Find out where the player should end if it moves
        let newPosition = this.position.plus(this.velocity.times(deltaTime));

        // Move only if the player does not move inside a wall
        if (!level.contact(newPosition, this.size, 'wall')) {
            this.position = newPosition;
        }

        this.updateFrame(deltaTime);
    }

    startMovement(direction) {
        const dirData = this.movement[direction];
        if (!dirData.status) {
            dirData.status = true;
            this.velocity[dirData.axis] = dirData.sign * playerSpeed;
            this.setAnimation(...dirData.moveFrames, dirData.repeat, dirData.duration);
            console.log("Started movement");
        }
    }

    stopMovement(direction) {
        const dirData = this.movement[direction];
        dirData.status = false;
        this.velocity[dirData.axis] = 0;
        this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
        console.log("Stopped movement");
    }
}

class BasePlayer extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.stamina = 5;
        this.damage = 3;

        // Configure animation frames for this specific character
        this.setMovementFrames('right', [6, 8], [7, 9,10]);
        this.setMovementFrames('left', [12,15], [16, 14, 13]);
        this.setMovementFrames('up', [19,21], [18,17]);
        this.setMovementFrames('down', [1, 3], [0, 0]);
    }
}
// Enemies
class BaseEnemy extends BaseCharacter{
    constructor(_color, width, height, x, y, _type, health, damage){
        //Inheritance
        super("red", width, height, x, y, "enemy");
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





// Elements
const levelChars = {
    // Rect defined as offset from the first tile, and size of the tiles
    ".": {objClass: GameObject,
          label: "floor",
          sprite: '../assets/FloorTiles.jpg',
          rect: new Rect(0, 0, 32, 32)},
    "#": {objClass: GameObject ,
          label: "wall",
          sprite: '../assets/pyramidWall.png',
          rect: new Rect(0, 0, 32, 32)},
    "@": {objClass: BasePlayer,
          label: "player",
          //sprite: '../assets/sprites/blordrough_quartermaster-NESW.png',
          //rect: new Rect(0, 0, 48, 64),
          //sheetCols: 3,
          //startFrame: [7, 7]},
          sprite: '../assets/testSpriteSheet.png',
          rect: new Rect(0, 0, 65, 76),
          sheetCols: 6,
          startFrame: [0, 0]},
    // "$": {objClass: Coin,
    //       label: "collectible",
    //       sprite: '../assets/sprites/coin_gold.png',
    //       rect: new Rect(0, 0, 32, 32),
    //       sheetCols: 8,
    //       startFrame: [0, 7]},
};










//Base Room
class Level {
    constructor(plan) {
        // Split the plan string into a matrix of strings
        let rows = plan.trim().split('\n').map(l => [...l]);
        this.height = rows.length;
        this.width = rows[0].length;
        this.actors = [];

        // Fill the rows array with a label for the type of element in the cell
        // Most cells are 'empty', except for the 'wall'
        this.rows = rows.map((row, y) => {
            return row.map((ch, x) => {
                let item = levelChars[ch];
                let objClass = item.objClass;
                let cellType = item.label;
                // Create a new instance of the type specified
                let actor = new objClass("grey", 1, 1, x, y, item.label);
                // Configurations for each type of cell
                // TODO: Simplify this code, sinde most of it is repeated
                if (actor.type == "player") {
                    // Also instantiate a floor tile below the player
                    this.addBackgroundFloor(x, y);

                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.player = actor;
                    cellType = "empty";

                // } else if (actor.type == "coin") {
                //     // Also instantiate a floor tile below the player
                //     this.addBackgroundFloor(x, y);

                //     actor.setSprite(item.sprite, item.rect);
                //     actor.sheetCols = item.sheetCols;
                //     actor.setAnimation(...item.startFrame, true, 100);
                //     this.actors.push(actor);
                //     cellType = "empty";
                // 
                } else if (actor.type == "wall") {
                    // Randomize sprites for each wall tile
                    item.rect = this.randomTile(31, 10, 17);     // green broken bricks
                    // item.rect = this.randomTile(2, 3, 19);     // green broken bricks
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "wall";
                } else if (actor.type == "floor") {
                    // Randomize sprites for each wall tile
                    item.rect = this.randomTile(11, 4, 17);     // beige dirt
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "floor";
                }
                return cellType;
            });
        });
    }

    addBackgroundFloor(x, y) {
        let floor = levelChars['.'];
        let floorActor = new GameObject("grey", 1, 1, x, y, floor.label);
        floor.rect = this.randomTile(11, 4, 17);     // beige dirt
        floorActor.setSprite(floor.sprite, floor.rect);
        this.actors.push(floorActor);
    }

    // Randomize sprites for each wall tile
    randomTile(xStart, xRange, y) {
        let tile = Math.floor(Math.random() * xRange + xStart);
        return new Rect(tile, y, 32, 32);
    }

    // Detect when the player touches a wall
    contact(playerPos, playerSize, type) {
        // Determine which cells the player is occupying
        let xStart = Math.floor(playerPos.x);
        let xEnd = Math.ceil(playerPos.x + playerSize.x);
        let yStart = Math.floor(playerPos.y);
        let yEnd = Math.ceil(playerPos.y + playerSize.y);

        // Check each of those cells
        for (let y=yStart; y<yEnd; y++) {
            for (let x=xStart; x<xEnd; x++) {
                // Anything outside of the bounds of the canvas is considered
                // to be a wall, so it blocks the player's movement
                let isOutside = x < 0 || x >= this.width ||
                                y < 0 || y >= this.height;
                let here = isOutside ? 'wall' : this.rows[y][x];
                // Detect if an object of type specified is being touched
                if (here == type) return true;
            }
        }
        return false;
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
    constructor(state, level) {
        this.state = state;
        this.level = level;
        this.player = this.level.player; // Ensure the player is assigned correctly
        this.actors = level.actors;
        console.log("Game initialized. Player:", this.player);
        //console.log(level);
        
    }

    update(deltaTime) {     
        this.player.update(this.level, deltaTime);

        for (let actor of this.actors) {
            actor.update(this.level, deltaTime);
        }

        let currentActors = this.actors;
        // Detect collisions
        for (let actor of currentActors) {
            if (actor.type != 'floor' && boxOverlap(this.player, actor)) {
                //console.log(`Collision of ${this.player.type} with ${actor.type}`);
                if (actor.type == 'wall') {
                    console.log("Hit a wall");
                } else if (actor.type == 'card') {
                    this.actors = this.actors.filter(item => item !== actor);
                }
            }
        }
    }

    draw(ctx, scale) {
        for (let actor of this.actors) {
            actor.draw(ctx, scale);
        }
        this.player.draw(ctx, scale);

        }
}


// -------------------------------------------------







// -------------------------------------------------
// Functions


// Function to check if two squared objects are overlapping
function boxOverlap(obj1, obj2){
    return obj1.position.x + obj1.width > obj2.position.x && 
    obj1.position.x < obj2.position.x + obj2.width &&
    obj1.position.y + obj2.height > obj2.position.y &&
    obj1.position.y < obj2.position.y + obj2.height;
}