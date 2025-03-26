// BaseEnemies
class BaseEnemy extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.speed = 0.00009;
        this.attackSpeed = 0.5;
        this.detectionDistance = 4;
        this.attackRange = 1;
        this.state = "wander";
        this.lastDirection = "down";
        this.wanderTime = 0;

        // Movement variables to define directions and animations
        this.movement = {
            right: { status: false,
                     axis: "x",
                     sign: 1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [7, 8, 9, 10, 11],
                     idleFrames: [11] },
            left:  { status: false,
                     axis: "x",
                     sign: -1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [0, 1, 2, 3, 4, 5],
                     idleFrames: [0] },
            up:    { status: false,
                     axis: "y",
                     sign: -1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [7, 8, 9, 10],
                     idleFrames: [11] },
            down:  { status: false,
                     axis: "y",
                     sign: 1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [1, 2, 3, 4, 5],
                     idleFrames: [0] },
        };

        // Set movement frames
        this.setMovementFrames('right', [7, 8, 9, 10, 11], [11]);
        this.setMovementFrames('left', [0, 1, 2, 3, 4, 5], [0]);
        this.setMovementFrames('up', [7, 8, 9, 10], [11]);
        this.setMovementFrames('down', [1, 2, 3, 4, 5], [0]);
    }

    setMovementFrames(direction, moveFrames, idleFrames) {
        this.movement[direction].moveFrames = moveFrames;
        this.movement[direction].idleFrames = idleFrames;
    }

    update(level, deltaTime) {
        let distanceToPlayer = this.position.distanceTo(game.player.position);
        if (distanceToPlayer > this.detectionDistance) {
            this.state = "wander";
            this.wander(level, deltaTime);
        } else if (distanceToPlayer < this.attackRange) {
            this.state = "attack";
            this.stopMovement(this.lastDirection);
            // Implement attack logic here
        } else {
            this.state = "chase";
            this.speed = 0.00025;
            let dir = game.player.position.minus(this.position).direction();
            this.velocity = dir.times(this.speed * deltaTime);
            let newPos = this.position.plus(this.velocity.times(deltaTime));
            if (!level.contact(newPos, this.size, 'wall')) {
                this.position = newPos;
                this.startMovement(dir);
            }
        }

        this.updateFrame(deltaTime);
    }

    wander(level, deltaTime) {
        if (this.wanderTime <= 0) {
            let bias = 0.7; 
            let randomDir = new Vec(
                (Math.random() * 2 - 1) * (1 - bias) + this.velocity.x * bias,
                (Math.random() * 2 - 1) * (1 - bias) + this.velocity.y * bias
            ).direction();
            this.velocity = randomDir.times(this.speed * deltaTime);
            this.wanderTime = 1000* Math.random() * 2 + 1; // Wander for 1 to 3 seconds
            this.startMovement(randomDir);
        } else {
            this.wanderTime -= deltaTime;
            let newPos = this.position.plus(this.velocity.times(deltaTime));
            if (!level.contact(newPos, this.size, 'wall') && !level.contact(newPos, this.size, 'door')) {
                this.position = newPos;
            } else {
                this.wanderTime = 0; // Reset wander time if hitting a wall
                this.stopMovement(this.lastDirection);
            }
        }
    }

    startMovement(direction) {
        let dirData;
        if (Math.abs(direction.x) > Math.abs(direction.y)) {
            dirData = direction.x > 0 ? this.movement.right : this.movement.left;
            this.lastDirection = direction.x > 0 ? "right" : "left";
        } else {
            dirData = direction.y > 0 ? this.movement.down : this.movement.up;
            this.lastDirection = direction.y > 0 ? "down" : "up";
        }

        if (!dirData.status) {
            dirData.status = true;
            this.velocity[dirData.axis] = dirData.sign * this.speed;
            this.setAnimation(...dirData.moveFrames, dirData.repeat, dirData.duration);
            console.log(`Enemy started moving ${this.lastDirection}`);
        }
    }

    stopMovement(direction) {
        const dirData = this.movement[direction];
        if (dirData) {
            dirData.status = false;
            this.velocity[dirData.axis] = 0;
            this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
            console.log(`Enemy stopped moving ${direction}`);
        }
    }
}

class Mariachi extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, "mariachi");
        this.health = 10;
        this.damage = 1;
    }
}

class Tlaxcalteca extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, "tlaxcalteca");
        this.health = 15;
        this.damage = 2;
    }
}

class MayanWarrior extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, "mayanWarrior");
        this.health = 20;
        this.damage = 3;
    }
}

class Devil extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, "devil");
        this.health = 35;
        this.damage = 4;
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
        super(_color, width, height, x, y, "quetzalcoatl");
        this.health = 85;
        this.damage = Math.floor(Math.random() * (6 - 4)) + 4;
    }
}

class AhPuch extends BaseBoss {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, "ahPuch");
        this.health = 110;
        this.damage = Math.floor(Math.random() * (7 - 5)) + 5;
    }
}