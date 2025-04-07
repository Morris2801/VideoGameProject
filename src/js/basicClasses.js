/*
Script Name
- basicClasses.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Structure the basic classes for the game.
- Provides common reusable and extensible components (through inheritance) for other game objects

Classes
- TextLabel: Class to manage text labels on the screen.
- Rect: Class to manage rectangles for collision detection and bounding boxes.
- Vec: Class to manage directions and positions.
- GameObject: Class to manage game objects, including their position, size, color, and sprite properties.
- AnimatedObject: Class to manage animated objects, including their animation properties and frame updates.
- BaseCharacter: Class to manage characters, including their movement, health, and collision detection.
*/

// ------------------------------------


"use strict";

// Global Variables
const playerSpeed = 0.005;
let level;
let player;
const scale = 57;


// Text
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
    distanceTo(vec2){
        return this.minus(vec2).magnitude();
    }
    direction(){
        return new Vec(this.x/this.magnitude(), this.y/this.magnitude());
    }
}

// Class to manage game objects
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
    draw(ctx, scale, customScale = 1) {
        const scaledX = this.position.x * scale;
        const scaledY = this.position.y * scale;
        const scaledWidth = this.size.x * scale * customScale;
        const scaledHeight = this.size.y * scale * customScale;
        
        if (this.spriteImage) {
            if (this.spriteRect) {
                ctx.drawImage(this.spriteImage,
                          this.spriteRect.x * this.spriteRect.width,
                          this.spriteRect.y * this.spriteRect.height,
                          this.spriteRect.width, this.spriteRect.height,
                          scaledX, scaledY,
                          scaledWidth, scaledHeight);
            } else {
                ctx.drawImage(this.spriteImage,
                          scaledX, scaledY,
                          scaledWidth, scaledHeight);
            }
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(scaledX, scaledY,
                     scaledWidth, scaledHeight);
        }
    }
    // Overridable update method
    update() {

    }
    // Method to enable card drop mechanic through inheritance and loot table 
    dropCard(position){
        const lootTable = [
            { type: null, chance: 0.35, spritePath: null }, //35% chance to drop nothing
            { type: CalaveraCard, chance: 0.07 * 0.65, spritePath: '../assets/cards/cardCalavera.png'}, 
            { type: MacheteCard, chance: 0.07 * 0.65, spritePath: '../assets/cards/cardMachete.png'},
            { type: ObsidianKnifeCard, chance: 0.07 * 0.65, spritePath: "../assets/cards/cardObsidianKnife.png"},
            { type: CorazonCard, chance: 0.16 * 0.65, spritePath: "../assets/cards/cardHeart.jpeg"},
            { type: ValienteCard, chance: 0.16 * 0.65, spritePath: "../assets/cards/cardValiente.png"},
            { type: TacoCard, chance: 0.16 * 0.65, spritePath: "../assets/cards/cardTaco.png"},
            { type: MariachiCard, chance: 0.15 * 0.65, spritePath: "../assets/cards/cardMariachi.jpeg"},
            { type: MayanWarriorCard, chance: 0.15 * 0.65, spritePath: "../assets/cards/cardGuerrero.png"},
        ];
        const rand = Math.random(); 
        let chance = 0; 
        let cardClass = null; 
        for (const item of lootTable) {
            chance += item.chance;
            if (rand <= chance) {
                cardClass = item.type;
                if (cardClass === null) {
                    console.log("No card dropped");
                    return;
                }
                cardClass.spritePath = item.spritePath;
                break;
            }
        }
        if(cardClass){
            const card = new cardClass("white", 1, 1, position.x, position.y, "card"); 
            card.setSprite(cardClass.spritePath, new Rect(0, 0, 80, 150));
            game.actors.push(card);
            // Agregar a fuerza bruta la carta a invnetario game.player.inventory.items.push(card);
            //card.draw(ctx, scale, 1);
            console.log(card);
            console.log(`Dropped ${cardClass.name} @ ${position.x}, ${position.y}`);
        }
    }    
}

// Class to manage animated objects
class AnimatedObject extends GameObject{
    constructor(color, width, height, x, y, type) {
        super(color, width, height, x, y, type);
        // Animation properties
        this.frame = 0;
        this.minFrame = 0;
        this.maxFrame = 0;
        this.sheetCols = 0;
        this.repeat = true;
        // Delay ms
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
            let restartFrame = (this.repeat ? this.minFrame : this.frame);
            let wasLastFrame = (this.frame === this.maxFrame);
            
            this.frame = this.frame < this.maxFrame ? this.frame + 1 : restartFrame;
            this.spriteRect.x = this.frame % this.sheetCols;
            this.spriteRect.y = Math.floor(this.frame / this.sheetCols);
            this.totalTime = 0;
            this.animationComplete = wasLastFrame && !this.repeat;
        }
    }
}

// Class to manage characters
class BaseCharacter extends AnimatedObject{
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.velocity = new Vec(0.0, 0.0);
        this.health = 0;
        this.damage = 0;
        this.charMargin = 0.2; // Margen de colisión para personajes

        // Default mov. vars.
        this.movement = {
            right: { 
                status: false, 
                axis: "x", 
                sign: 1, 
                repeat: true, 
                duration: 100, 
                moveFrames: [0, 0], 
                idleFrames: [0, 0] 
            },
            left:  { 
                status: false, 
                axis: "x",
                sign: -1, 
                repeat: true, 
                duration: 100, 
                moveFrames: [0, 0], 
                idleFrames: [0, 0] 
            },
            up:    { 
                status: false, 
                axis: "y", 
                sign: -1, 
                repeat: true, 
                duration: 100, 
                moveFrames: [0, 0], 
                idleFrames: [0, 0] 
            },
            down:  { 
                status: false, 
                axis: "y", 
                sign: 1, 
                repeat: true, 
                duration: 100, 
                moveFrames: [0, 0], 
                idleFrames: [0, 0] 
            },
        };
        this.innerHitbox = new Rect(
            this.position.x + this.charMargin, 
            this.position.y + this.charMargin, 
            this.size.x - 2 * this.charMargin, 
            this.size.y - 2 * this.charMargin
        );
    }
    setMovementFrames(direction, moveFrames, idleFrames) {
        if (this.movement[direction]) {
            this.movement[direction].moveFrames = moveFrames;
            this.movement[direction].idleFrames = idleFrames;
        }
    }

    update(level, deltaTime) {
        let newPosition = this.position.plus(this.velocity.times(deltaTime));
        // Move only if the player's inner hitbox does not move inside a wall || door
        this.innerHitbox = new Rect(
            newPosition.x + this.charMargin, 
            newPosition.y + this.charMargin, 
            this.size.x - 2 * this.charMargin, 
            this.size.y - 2 * this.charMargin
        );
        if (!level.contact(this.innerHitbox, this.size, 'wall') && !level.contact(this.innerHitbox, this.size, "updoor") && !level.contact(this.innerHitbox, this.size, 'leftdoor')&& !level.contact(this.innerHitbox, this.size, 'downdoor')&& !level.contact(this.innerHitbox, this.size, 'rightdoor') && !level.contact(this.innerHitbox, this.size, 'exit')) {
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
            //console.log("Started movement");
        }
    }
    stopMovement(direction) {
        const dirData = this.movement[direction];
        dirData.status = false;
        this.velocity[dirData.axis] = 0;
        this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
        // console.log("Stopped movement");
    }
}
