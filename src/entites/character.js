// BaseCharacter Class
import { AnimatedObject, Vec, playerSpeed } from '/src/engine/engine.js';

export class BaseCharacter extends AnimatedObject{
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