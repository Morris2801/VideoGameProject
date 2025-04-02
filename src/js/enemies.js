// BaseEnemies
class BaseEnemy extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.speed = 0.0001;
        this.attackSpeed = 0.5;
        this.detectionDistance = 4;
        this.attackRange = 0.5;
        this.state = "wander";
        this.lastDirection = "down";
        this.wanderTime = 0;
        this.alive = true; 

        // Algo iba a hacer con esto
        this.frameTime = 0; 
        this.currentFrameIndex = 0; 
        this.frameDuration = 100; 

        // Movement variables to define directions and animations
        this.movement = {
            right: { status: false,
                     axis: "x",
                     sign: 1,
                     repeat: true,
                     duration: this.frameDuration,
                     moveFrames: [7, 8, 9, 10, 11],
                     idleFrames: [11] },
            left:  { status: false,
                     axis: "x",
                     sign: -1,
                     repeat: true,
                     duration: this.frameDuration,
                     moveFrames: [0, 1, 2, 3, 4, 5],
                     idleFrames: [0] },
            up:    { status: false,
                     axis: "y",
                     sign: -1,
                     repeat: true,
                     duration: this.frameDuration,
                     moveFrames: [7, 8, 9, 10],
                     idleFrames: [11] },
            down:  { status: false,
                     axis: "y",
                     sign: 1,
                     repeat: true,
                     duration: this.frameDuration,
                     moveFrames: [1, 2, 3, 4, 5],
                     idleFrames: [0] },
        };

        // Set movement frames
        this.setMovementFrames('right', [7, 8, 9, 10, 11], [11,11]);
        this.setMovementFrames('left', [0, 1, 2, 3, 4, 5], [0,0]);
        this.setMovementFrames('up', [7, 8, 9, 10, 11], [11,11]);
        this.setMovementFrames('down', [0, 1, 2, 3, 4, 5], [0,0]);
    }

    setMovementFrames(direction, moveFrames, idleFrames) {
        this.movement[direction].moveFrames = moveFrames;
        this.movement[direction].idleFrames = idleFrames;
    }

    update(level, deltaTime) {
        super.update(level, deltaTime);
        let distanceToPlayer = this.position.distanceTo(game.player.innerHitbox);
        if (distanceToPlayer > this.detectionDistance) {
            this.state = "wander";
            this.wander(level, deltaTime);
        } else if (distanceToPlayer <= this.attackRange) {
            this.state = "attack";
            this.stopMovement(this.lastDirection);
            // Implement attack logic here
        } else {
            this.state = "chase";
            this.speed = 0.00025;
            let dir = game.player.position.minus(this.position).direction();
            this.velocity = dir.times(this.speed * deltaTime);
            let newPos = this.position.plus(this.velocity.times(deltaTime));
            this.innerHitbox = new Rect(
                newPos.x + this.charMargin, 
                newPos.y + this.charMargin, 
                this.size.x - 2 * this.charMargin, 
                this.size.y - 2 * this.charMargin
            );
            if (!level.contact(this.innerHitbox, this.size, 'wall') && !level.contact(this.innerHitbox, this.size, 'door')) {
                this.position = newPos;
                this.startMovement(dir);
            }
        }

        this.updateFrame(deltaTime);
    }

    wander(level, deltaTime) {
        let bias = 0.7; 
        let randomDir;
        if (this.wanderTime <= 0) {
            randomDir = new Vec(
                (Math.random() * 2 - 1) * (1 - bias) + this.velocity.x * bias,
                (Math.random() * 2 - 1) * (1 - bias) + this.velocity.y * bias
            ).direction();

            this.velocity = randomDir.times(this.speed);
            this.wanderTime = 1000 * Math.random() * 2 + 1000; // 1 to 3 sec
        }
        else {
            this.wanderTime -= deltaTime;
        }
        let newPos = this.position.plus(this.velocity.times(deltaTime));
        this.innerHitbox = new Rect(
            newPos.x + this.charMargin,
            newPos.y + this.charMargin,
            this.size.x - 2 * this.charMargin,
            this.size.y - 2 * this.charMargin
        );
        if (!level.contact(this.innerHitbox, this.size, "wall") && !level.contact(this.innerHitbox, this.size, "door")) {
            this.position = newPos;
            this.lastDirection = this.normDir(this.velocity);
            this.startMovement(this.lastDirection);
        } 
        else {
            this.wanderTime = 0;
            this.velocity = new Vec(0, 0);
        }
    }

    normDir(direction){
        if(Math.abs(direction.x) > Math.abs(direction.y)){
            return direction.x > 0 ? "right" : "left";
        }
        else {
            return direction.y > 0 ? "down" : "up";
        }
    }
    startMovement(direction) {
        let normalizedDirection = this.normDir(direction); 
        let dirInfo = this.movement[normalizedDirection];

        if(!dirInfo.status){
            dirInfo.status = true; 
            this.lastDirection = normalizedDirection;
            this.velocity[dirInfo.axis] = dirInfo.sign * this.speed; 
            this.setAnimation(...dirInfo.moveFrames, dirInfo.repeat, dirInfo.duration);
            //console.log(`Enemy moving: ${normalizedDirection}, Frames: ${dirInfo.moveFrames}`); 
        }
    }

    stopMovement(direction) {
        let dirData = this.movement[direction];
        if (dirData) {
            dirData.status = false;
            this.velocity[dirData.axis] = 0;
            this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
            //console.log(`Enemy stopped moving ${direction}`);
        }
    }
    takeDamage(damage) {
        this.health -= damage;
        console.log(this.health);
        if (this.health <= 0) {
            this.alive = false;
            game.player.killCount += 1;
            this.dropCard(this.position);
            console.log("KillCount ", game.player.killCount);
        }
    }
}

class Mariachi extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.damage = 1;
    }
}

class Tlaxcalteca extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 15;
        this.damage = 2;
    }
}

class MayanWarrior extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 20;
        this.damage = 3;
        this.setMovementFrames('right', [12, 13, 14, 15, 16,17], [12,12]);
        this.setMovementFrames('left', [6,7,8,9,10,11], [6,6]);
        this.setMovementFrames('up', [0,1,2], [0,0]);
        this.setMovementFrames('down', [0,1,2], [0,0]);
    }
}

class Devil extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 35;
        this.damage = 4;

        this.setMovementFrames('right', [8, 9,10, 11], [10, 10]);
        this.setMovementFrames('left', [12,13,14,15], [13, 13]);
        this.setMovementFrames('up', [4,5,6,7], [4,4]);
        this.setMovementFrames('down', [0,1,2,3], [0,0]);
    }
}

// Bosses
class BaseBoss extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        // Attributes
        this.attack1 = 0;
        this.attack2 = 0;
    }
}

class Quetzalcoatl extends BaseBoss {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 85;
        this.damage = Math.floor(Math.random() * (6 - 4)) + 4;
    }
}

class AhPuch extends BaseBoss {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 110;
        this.damage = Math.floor(Math.random() * (7 - 5)) + 5;
    }
}