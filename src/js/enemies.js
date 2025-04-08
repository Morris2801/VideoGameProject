/*
Script Name
- enemies.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Defines enemy and boss classes for the game.
- Manages enemy behavior, including movement, attacks, animations, and interactions with the player.
- Provides reusable and extensible components for creating different types of enemies and bosses.

Classes
- BaseEnemy: Manage movement, attack logic, animations, and health in general.
- Mariachi
- Tlaxcalteca
- MayanWarrior
- Devil
- BaseBoss
- Quetzalcoatl
- AhPuch
*/

class BaseEnemy extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        // Basic attributes 
        this.speed = 0.00009; //TBD
        this.attackSpeed = 0.5; //TBD
        this.detectionDistance = 4; //TBD
        this.attackRange = 0.5; //TBD
        this.state = "wander";
        this.lastDirection = "down";
        this.wanderTime = 0;
        this.alive = true; 
        this.health = 10;
        this.damage = 1;
        // Frame animation properties
        this.frameTime = 0; 
        this.currentFrameIndex = 0; 
        this.frameDuration = 10000; 

        // Set movement frames // TEsting from mariachispritesheet
        this.setMovementFrames('right', [7, 8, 9, 10, 11], [11,11]);
        this.setMovementFrames('left', [0, 1, 2, 3, 4, 5], [0,0]);
        this.setMovementFrames('up', [7, 8, 9, 10, 11], [11,11]);
        this.setMovementFrames('down', [0, 1, 2, 3, 4, 5], [0,0]);

        // Attack variables
        this.attacking = false;
        this.attackTimer = 0;
        this.attackCooldown = 5000; // 5 seconds between attacks
        this.lastAttackTime = 0;
        this.attackDuration = 0;
        this.attackMaxDuration = 700; // 700ms to complete attack
        this.hasHitPlayer = false;

        this.usesAttackSprite = false;

        this.minAttackInterval = 8000; // Minimum time between attacks
        this.recoveryTime = 3000; // Time needed to recover after attack
        this.consecutiveAttacks = 0;
        this.lastStateChange = Date.now();
        this.forcedWanderTime = 0;
        this.lastAttackEndTime = 0;
        this.isRecovering = false;

        this.attackBoxes = {
            right: {
                xOffset: this.size.x, 
                yOffset: this.size.y / 2 - 0.5,
                width: 1,
                height: 1
            },
            left: {
                xOffset: -1, 
                yOffset: this.size.y / 2 - 0.5, 
                width: 1, 
                height: 1  
            },
            up: {
                xOffset: this.size.x / 2 - 0.5,
                yOffset: -1, 
                width: 1, 
                height: 1 
            },
            down: {
                xOffset: this.size.x / 2 - 0.5,
                yOffset: this.size.y,
                width: 1, 
                height: 1 
            }
        };

        this.attackFrames = {
            right: [7, 9],
            left: [0, 2],
            up: [7, 9],
            down: [0, 2]
        };
        
        //attackspritesheet props.
        this.frameWidth = 112;
        this.frameHeight = 64;
        this.sheetCols = 6; 
        this.attackSpriteWidth = 112;
        this.attackSpriteHeight = 64;
        this.attackSheetWidth = 672;
        this.attackSheetHeight = 128;
        this.attackSheetCols = 6;
        
        this.attackingSpriteSheet = null;
        this.normalSpriteSheet = this.spriteImage;
        this.spriteSheetLoaded = false;
    }

    initAttackSpriteSheet(spritePath) {
        if (!this.usesAttackSprite) return;
        
        this.attackingSpriteSheet = new Image();
        this.attackingSpriteSheet.onerror = () => {
            console.error(`Failed to load ${this.constructor.name} attack sprite sheet`);
            this.attackingSpriteSheet = this.spriteImage;
            this.spriteSheetLoaded = true;
        };
        this.attackingSpriteSheet.onload = () => {
            console.log(`${this.constructor.name} attack sprite sheet loaded successfully`);
            this.spriteSheetLoaded = true;
        };
        this.attackingSpriteSheet.src = spritePath || "../assets/charSpritesheets/defaultAttackSprite.png";
        
        this.normalSpriteSheet = this.spriteImage;
    }

    setMovementFrames(direction, moveFrames, idleFrames) {
        this.movement[direction].moveFrames = moveFrames;
        this.movement[direction].idleFrames = idleFrames;
    }

    update(level, deltaTime) {
        const currentTime = Date.now();
        let distanceToPlayer = this.position.distanceTo(game.player.position);
        
        if (this.usesAttackSprite) {
            if (this.isRecovering && currentTime - this.lastAttackEndTime > this.recoveryTime) {
                this.isRecovering = false;
            }    
            // Force wandering after multiple attacks
            if (this.forcedWanderTime > 0) {
                this.forcedWanderTime -= deltaTime;
                this.state = "wander";
                this.wander(level, deltaTime);
                return;
            }
            
            // Reset attack counter after enough time
            if (currentTime - this.lastStateChange > 15000) {
                this.consecutiveAttacks = 0;
            }
            
            // Clear states if player is far away and not in recovery
            if (distanceToPlayer > this.attackRange * 1.5 && !this.attacking && !this.isRecovering) {
                if (this.state === "attack") {
                    this.state = distanceToPlayer > this.detectionDistance ? "wander" : "chase";
                    this.lastStateChange = currentTime;
                }
            }
        }
        
        // State machine logic for behavior 
        if (this.attacking) {
            // Continue current attack until its finished
            this.updateAttack(deltaTime);
        } 
        else if (distanceToPlayer > this.detectionDistance) {
            this.state = "wander";
            this.wander(level, deltaTime);
        } 
        else if (distanceToPlayer <= this.attackRange) {
            // Advanced attack logic for enemies with attack sprites
            if (this.usesAttackSprite) {
                if (!this.isRecovering && currentTime - this.lastAttackTime > this.attackCooldown && this.consecutiveAttacks < 2) {
                    if (this.state !== "attack") {
                        this.lastStateChange = currentTime;
                        this.state = "attack";
                    }
                    this.stopMovement(this.lastDirection);
                    
                    // Only start new attack if conditions are met
                    if (!this.attacking && currentTime - this.lastAttackTime > this.minAttackInterval) {
                        this.startAttack();
                        this.lastAttackTime = currentTime;
                        this.consecutiveAttacks++;
                        
                        // Force wander after multiple consecutive attacks
                        if (this.consecutiveAttacks >= 2) {
                            this.forcedWanderTime = 10000;
                        }
                    }
                }
            } else {
                // Simple attack logic for basic enemies
                this.state = "attack";
                this.stopMovement(this.lastDirection);
                
                const currentTime = Date.now();
                if (currentTime - this.lastAttackTime > this.attackCooldown) {
                    this.startAttack();
                    this.lastAttackTime = currentTime;
                }
            }
        } 
        else if (this.usesAttackSprite && this.isRecovering) {
            // Do nothing while recovering
        }
        else {
            // Chase state
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
            if (!level.contact(this.innerHitbox, this.size, 'wall') && !level.contact(this.innerHitbox, this.size, "updoor") && !level.contact(this.innerHitbox, this.size, 'leftdoor')&& !level.contact(this.innerHitbox, this.size, 'downdoor')&& !level.contact(this.innerHitbox, this.size, 'rightdoor') && !level.contact(this.innerHitbox, this.size, 'exit')) {
                this.position = newPos;
                this.startMovement(dir);
            }
        }

        this.updateFrame(deltaTime);
    }
    // random movement function with a predisposition of 70% to the old direction for consistency
    wander(level, deltaTime) {
        let bias = 0.7; 
        let randomDir = new Vec(
            (Math.random() * 2 - 1) * (1 - bias) + this.velocity.x * bias,
            (Math.random() * 2 - 1) * (1 - bias) + this.velocity.y * bias
        ).direction();
        if (this.wanderTime <= 0) {
            this.velocity = randomDir.times(this.speed * deltaTime);
            this.wanderTime = 1000* Math.random() * 2 + 1; //1 to 3 seconds
        } else {
            this.wanderTime -= deltaTime;
        }
        let newPos = this.position.plus(this.velocity.times(deltaTime));
        this.innerHitbox = new Rect(
            newPos.x + this.charMargin,
            newPos.y + this.charMargin,
            this.size.x - 2 * this.charMargin,
            this.size.y - 2 * this.charMargin
        );
        // collision checking
        if (!level.contact(this.innerHitbox, this.size, 'wall') && !level.contact(this.innerHitbox, this.size, "updoor") && !level.contact(this.innerHitbox, this.size, 'leftdoor')&& !level.contact(this.innerHitbox, this.size, 'downdoor')&& !level.contact(this.innerHitbox, this.size, 'rightdoor') && !level.contact(this.innerHitbox, this.size, 'exit')) {
            this.position = newPos;
            this.lastDirection = this.normDir(this.velocity);
            this.startMovement(this.lastDirection);
        } 
        else {
            this.wanderTime = 0;
            this.velocity = new Vec(0, 0);
        }
    }
    // vector normalization function to determine the direction of movement
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

    startAttack() {
        if (this.attacking) return;
        
        console.log(`${this.constructor.name} attacking`);
        this.attacking = true;
        this.attackDuration = 0;
        this.hasHitPlayer = false;
        
        // Advanced sprites handling for enemies with attack sprites
        if (this.usesAttackSprite && this.attackingSpriteSheet) {
            // Store current sprite before switching
            if (!this.normalSpriteSheetBackup) {
                this.normalSpriteSheetBackup = this.spriteImage;
            }
            
            // Only use attack sprite if loaded successfully
            if (this.spriteSheetLoaded) {
                this.spriteImage = this.attackingSpriteSheet;
            }
        }
        
        // Set attack direction based on player position   
        let dir = game.player.position.minus(this.position);
        this.lastDirection = this.normDir(dir);
        
        // Set attack animation frames
        const attackFrameRange = this.attackFrames[this.lastDirection];
        // Use slower animation for advanced enemies
        const animationSpeed = this.usesAttackSprite ? 600 : 200;
        this.setAnimation(attackFrameRange[0], attackFrameRange[1], false, animationSpeed);
    }
    
    updateAttack(deltaTime) {
        this.attackDuration += deltaTime;
        // Check for collision with player at mid-point of animation
        if (!this.hasHitPlayer && this.attackDuration > this.attackMaxDuration / 2) {
            const attackBox = {
                position: {
                    x: this.position.x + this.attackBoxes[this.lastDirection].xOffset,
                    y: this.position.y + this.attackBoxes[this.lastDirection].yOffset
                },
                size: {
                    x: this.attackBoxes[this.lastDirection].width,
                    y: this.attackBoxes[this.lastDirection].height
                },
                type: "enemyAttackBox"
            };
            
            if (boxOverlap(attackBox, game.player)) {
                // Deal damage to player
                game.player.health -= this.damage;
                console.log(`Player hit! Health: ${game.player.health}`);
                this.hasHitPlayer = true;
            }
        }
        
        // End attack animation
        if (this.attackDuration >= this.attackMaxDuration) {
            this.attacking = false;
            this.attackDuration = 0;
            this.hasHitPlayer = false;
            
            // Enhanced recovery for advanced enemies
            if (this.usesAttackSprite) {
                this.lastAttackEndTime = Date.now();
                this.isRecovering = true;
                console.log(`${this.constructor.name} attack finished, entering recovery`);
            }
            
            this.switchBackToIdleState();
        }
    }
    
    switchBackToIdleState() {
        if (this.attacking) {
            this.attacking = false;
        }
        
        // Restore sprite sheet for advanced enemies
        if (this.usesAttackSprite) {
            if (this.normalSpriteSheetBackup) {
                this.spriteImage = this.normalSpriteSheetBackup;
            } else if (this.normalSpriteSheet) {
                this.spriteImage = this.normalSpriteSheet;
            }
        }
        
        // Go back to idle animation
        switch (this.lastDirection) {
            case 'right':
                this.setAnimation(...this.movement.right.idleFrames, true, 100);
                break;
            case 'left':
                this.setAnimation(...this.movement.left.idleFrames, true, 100);
                break;
            case 'up':
                this.setAnimation(...this.movement.up.idleFrames, true, 100);
                break;
            case 'down':
                this.setAnimation(...this.movement.down.idleFrames, true, 100);
                break;
        }
    }
    
    // Override draw method to handle attack sprite rendering
    draw(ctx, scale) {
        if (this.usesAttackSprite && this.attacking && this.spriteSheetLoaded) {
            // Calculate the current frame based on attack progress
            const attackProgress = this.attackDuration / this.attackMaxDuration;
            const attackFrameCount = this.attackFrames[this.lastDirection][1] - this.attackFrames[this.lastDirection][0] + 1;
            const currentFrame = Math.min(Math.floor(attackProgress * attackFrameCount), attackFrameCount - 1);
            
            // Calculate frame position in the sprite sheet
            const frameToUse = this.attackFrames[this.lastDirection][0] + currentFrame;
            const spriteX = (frameToUse % this.attackSheetCols) * this.attackSpriteWidth;
            const spriteY = Math.floor(frameToUse / this.attackSheetCols) * this.attackSpriteHeight;
            
            // Draw at the proper scale
            const scaledX = this.position.x * scale;
            const scaledY = this.position.y * scale;
            const scaledWidth = this.size.x * scale;
            const scaledHeight = this.size.y * scale;
            
            ctx.drawImage(
                this.spriteImage,
                spriteX, spriteY,
                this.attackSpriteWidth, this.attackSpriteHeight,
                scaledX, scaledY,
                scaledWidth, scaledHeight
            );
        } else {
            // Use normal drawing for non-attack states
            super.draw(ctx, scale);
        }

        
    }
    takeDamage(damage) {
        this.health -= damage;
        console.log(this.health);
        if (this.health <= 0) {
            this.alive = false;
            game.player.killCount += 1;
            console.log("KillCount ", game.player.killCount);
        }
    } 
}

// Mariachi enemy class
class Mariachi extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.damage = 1;
        this.usesAttackSprite = true; 
        this.attackMaxDuration = 1500;
        
        this.attackFrames = {
            right: [0, 5], 
            left: [6, 11], 
            up: [0, 5], 
            down: [0, 5] 
        };
        this.initAttackSpriteSheet("../assets/charSpritesheets/SpriteSheetPeleandoMariachiEsqueloEnemy.png");
    }
}

// Tlaxcalteca enemy class
class Tlaxcalteca extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 15;
        this.damage = 2;
        this.setMovementFrames('right', [27,26,25,24,23,22,21], [21, 21]);
        this.setMovementFrames('left', [0,1,2,3,4,5,6],[0,0]);
        this.setMovementFrames('up', [27,26,25,24,23,22,21], [21, 21]);
        this.setMovementFrames('down', [0,1,2,3,4,5,6],[0,0]);
        this.attackFrames = {
            right: [7,13], 
            left: [14,20], 
            up: [7,13], 
            down: [14,20] 
        };
    }
}

// Mayan Warrior enemy class
class MayanWarrior extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 20;
        this.damage = 3;
        this.setMovementFrames('down', [0,1,2,3],[1,1]);
        this.setMovementFrames('up', [0,1,2,3], [1,1]);
        this.setMovementFrames('left', [6,7,8,9,10,11],[6,6]);
        this.setMovementFrames('right', [12,13,14,15,16,17], [12,12]);

        this.initAttackSpriteSheet("../assets/charSpritesheets/warriorFightSidesSpriteSheet.png");
        this.attackFrames = {
            right: [6,11], 
            left: [0,5], 
            up: [0,5], 
            down: [6,11] 
        };
    }
}

// Devil enemy class
class Devil extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 35;
        this.damage = 4;

        this.setMovementFrames('right', [8, 9,10, 11], [10, 10]);
        this.setMovementFrames('left', [12,13,14,15], [13, 13]);
        this.setMovementFrames('up', [4,5,6,7], [4,4]);
        this.setMovementFrames('down', [0,1,2,3], [0,0]);
        this.initAttackSpriteSheet("../assets/charSpritesheets/devilAttack.png");
    
        this.attackFrames = {
            right: [8,11], 
            left: [12,15], 
            up: [4,7], 
            down: [0,3] 
        };
    }
}

// Bosses


class Quetzalcoatl extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width*1, height*1, x, y, _type);
        this.health = 50; // Initial health for Quetzalcoatl
        this.damage = 5;
        this.frameWidth = 120;
        this.frameHeight = 100;
        this.sheetCols = 6; 
        this.attackSpriteWidth = 120;
        this.attackSpriteHeight = 100;
        this.attackSheetWidth = 482;
        this.attackSheetHeight = 800;
        this.attackSheetCols = 4;  
        this.usesAttackSprite = true;
        this.type = "boss";
        
        // Custom sprite dimensions
        this.frameWidth = 80;
        this.frameHeight = 64;
        this.sheetCols = 3;
        
        
        this.initAttackSpriteSheet("../assets/charSpritesheets/SpriteSheetQuetzacoaltPeleando.png");
    
    }
    
}

class AhPuch extends BaseEnemy{
    constructor(_color, width, height, x, y, _type) {
        super(_color, width*1, height*1, x, y, _type);
        this.health = 50; // Initial health for Quetzalcoatl
        this.damage = 5;
        this.frameWidth = 64;
        this.frameHeight = 112;
        this.sheetCols = 4; 
        this.attackSpriteWidth = 64;
        this.attackSpriteHeight = 812;
        this.attackSheetWidth = 256;
        this.attackSheetHeight = 177;
        this.attackSheetCols = 4;  
        this.usesAttackSprite = true;
        this.type = "boss";
        
        // Custom sprite dimensions
        this.frameWidth = 64;
        this.frameHeight = 124;
        this.sheetCols = 8;
        
        this.attackFrames = {
            right: [0,7], 
            left: [15,8], 
            up: [0,7], 
            down: [15,8] 
        };
        
        this.initAttackSpriteSheet("../assets/charSpritesheets/AttackBossAhPunch.png");
    
    }
}