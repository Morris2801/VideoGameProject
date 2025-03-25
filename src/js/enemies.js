// BaseEnemies
class BaseEnemy extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, _type);
        this.speed = 0.001;
        this.attackSpeed = 0.5;
        this.detectionDistance = 5;
        this.attackRange = 1;
        this.state = "idle";
        this.lastDirection = "down";

        // Movement variables to define directions and animations
        this.movement = {
            right: { status: false,
                     axis: "x",
                     sign: 1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [7,8,9,10],
                     idleFrames: [6,11] },
            left:  { status: false,
                     axis: "x",
                     sign: -1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [1, 2, 3, 4],
                     idleFrames: [0, 5] },
            up:    { status: false,
                     axis: "y",
                     sign: -1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [13, 15],
                     idleFrames: [12, 14] },
            down:  { status: false,
                     axis: "y",
                     sign: 1,
                     repeat: true,
                     duration: 100,
                     moveFrames: [13, 15],
                     idleFrames: [12, 14] },
        };
    }

    update(level, deltaTime) {
        let distanceToPlayer = this.position.distanceTo(game.player.position);
        if (distanceToPlayer > this.detectionDistance) {
            this.state = "idle";
            this.stopMovement(this.lastDirection);
        } else if (distanceToPlayer < this.attackRange) {
            this.state = "attack";
            this.stopMovement(this.lastDirection);
            // Implement attack logic here
        } else {
            this.state = "chase";
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
        }
    }

    stopMovement(direction) {
        const dirData = this.movement[direction];
        dirData.status = false;
        this.velocity[dirData.axis] = 0;
        this.setAnimation(...dirData.idleFrames, dirData.repeat, dirData.duration);
    }
}

class Mariachi extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, "mariachi");
        this.health = 10;
        this.damage = 1;
    }
}

class Tlaxcalteca extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, "tlaxcalteca");
        this.health = 15;
        this.damage = 2;
    }
}

class MayanWarrior extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, "mayanWarrior");
        this.health = 20;
        this.damage = 3;
    }
}

class Devil extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, "devil");
        this.health = 35;
        this.damage = 4;
    }
}

// Bosses
class BaseBoss extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, _type);
        // Attributes
        this.attack1 = 0;
        this.attack2 = 0;
    }
}

class Quetzalcoatl extends BaseBoss {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, "quetzalcoatl");
        this.health = 85;
        this.damage = Math.floor(Math.random() * (6 - 4)) + 4;
    }
}

class AhPuch extends BaseBoss {
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, "ahPuch");
        this.health = 110;
        this.damage = Math.floor(Math.random() * (7 - 5)) + 5;
    }
}