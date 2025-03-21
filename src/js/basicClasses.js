/*
Game Classes Development for MayAztec
*/


"use strict";

// Global Variables
const playerSpeed = 0.005;
let level;
let player;
const scale = 32;

// -------------------------------------------------

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
            
            // Verificar si la animación esta por terminar
            let wasLastFrame = (this.frame === this.maxFrame);
            
            this.frame = this.frame < this.maxFrame ? this.frame + 1 : restartFrame;
            this.spriteRect.x = this.frame % this.sheetCols;
            this.spriteRect.y = Math.floor(this.frame / this.sheetCols);
            this.totalTime = 0;
            
            // Señalar cuando la animacion ha completado un ciclo
            this.animationComplete = wasLastFrame && !this.repeat;
        }
    }
}

class BaseCharacter extends AnimatedObject{
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.velocity = new Vec(0.0, 0.0);
        this.health = 0;
        this.damage = 0;

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
