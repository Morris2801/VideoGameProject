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
        this.speed = 0.00005; //TBD
        this.attackSpeed = 0.5; //TBD
        this.detectionDistance = 4; //TBD
        this.attackRange = 0.5; //TBD
        this.state = "wander";
        this.lastDirection = "down";
        this.wanderTime = 0;
        this.alive = true;
        this.health = 10;
        this.damage = 1;
        this.enemyID = 0;
        this.scoreGiven = 0;
        // Frame animation properties
        this.frameTime = 0;
        this.currentFrameIndex = 0;
        this.frameDuration = 150;

        // Set movement frames // TEsting from mariachispritesheet
        this.setMovementFrames('right', [7, 8, 9, 10, 11], [11, 11]);
        this.setMovementFrames('left', [0, 1, 2, 3, 4, 5], [0, 0]);
        this.setMovementFrames('up', [7, 8, 9, 10, 11], [11, 11]);
        this.setMovementFrames('down', [0, 1, 2, 3, 4, 5], [0, 0]);

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
        this.lastStateChange = Date.now(); //wtf hector por qué usas dates
        this.forcedWanderTime = 0;
        this.lastAttackEndTime = 0;
        this.isRecovering = false;

        this.animationUpdateInterval = 500; // Actualizar cada 500ms
        this.lastAnimationUpdate = 0;
        this.animationInProgress = false;
        this.currentAnimationFrame = 0;
        this.totalAnimationFrames = 0;
        this.frameTime = 0;

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

        //trackear si  esta el player en el rango de ataque
        const inPlayerRange = distanceToPlayer <= this.attackRange;

        // Garantizar animaciones completas cuando está persiguiendo o en rango
        if (inPlayerRange && !this.attacking) {
            this.lastAnimationUpdate += deltaTime;
            if (this.lastAnimationUpdate > this.animationUpdateInterval) {
                // Forzar la animación completa en la dirección actual
                const currentDirection = this.lastDirection;
                const moveFrames = this.movement[currentDirection].moveFrames;

                // Si no está en medio de una animación, iniciar una nueva
                if (!this.animationInProgress) {
                    this.animationInProgress = true;
                    this.currentAnimationFrame = 0;
                    this.totalAnimationFrames = moveFrames.length;
                    this.frameTime = 0;
                }

                this.lastAnimationUpdate = 0;
            }
        }

        // Sistema de animación por frames
        if (this.animationInProgress && !this.attacking) {
            this.frameTime += deltaTime;
            if (this.frameTime > 150) { // Duración de cada frame (ajustar según necesidad)
                // Avanzar al siguiente frame
                this.currentAnimationFrame++;
                this.frameTime = 0;

                // Obtener frames de la dirección actual
                const moveFrames = this.movement[this.lastDirection].moveFrames;

                // Si hemos completado la animación, reiniciar
                if (this.currentAnimationFrame >= this.totalAnimationFrames) {
                    this.currentAnimationFrame = 0;

                    // Si ya no está en rango, terminar la animación forzada
                    if (!inPlayerRange) {
                        this.animationInProgress = false;
                    }
                }

                // Configurar el frame actual
                this.frame = moveFrames[this.currentAnimationFrame];
                this.spriteRect.x = this.frame % this.sheetCols;
                this.spriteRect.y = Math.floor(this.frame / this.sheetCols);
            }
        } else {
            // Comportamiento normal de updateFrame
            this.updateFrame(deltaTime);
        }

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
            this.speed = 0.00005;
            let dir = game.player.position.minus(this.position).direction();
            this.velocity = dir.times(this.speed * deltaTime);
            let newPos = this.position.plus(this.velocity.times(deltaTime));
            this.innerHitbox = new Rect(
                newPos.x + this.charMargin,
                newPos.y + this.charMargin,
                this.size.x - 2 * this.charMargin,
                this.size.y - 2 * this.charMargin
            );
            if (!level.contact(this.innerHitbox, this.size, 'wall') && !level.contact(this.innerHitbox, this.size, "player") && !level.contact(this.innerHitbox, this.size, "updoor") && !level.contact(this.innerHitbox, this.size, 'leftdoor') && !level.contact(this.innerHitbox, this.size, 'downdoor') && !level.contact(this.innerHitbox, this.size, 'rightdoor') && !level.contact(this.innerHitbox, this.size, 'exit') && !level.contact(this.innerHitbox, this.size, 'enemy') && !level.contact(this.innerHitbox, this.size, 'boss')) {
                this.position = newPos;
                this.startMovement(dir);
            }
        }
        if (!this.animationInProgress) {
            this.updateFrame(deltaTime);
        }

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
            this.wanderTime = 500 + Math.random() * 2500; //1 to 3 seconds
            this.animationInProgress = true;
            const newDirection = this.normDir(randomDir);
            this.currentAnimationFrame = 0;
            this.totalAnimationFrames = this.movement[newDirection].moveFrames.length;
            this.frameTime = 0;
        } else {
            this.wanderTime -= deltaTime;
        }
        if (this.velocity.x !== 0 || this.velocity.y !== 0) {
            this.frameTime += deltaTime;
            if (this.frameTime > 150) {
                const moveFrames = this.movement[this.lastDirection].moveFrames;
                this.currentAnimationFrame = (this.currentAnimationFrame + 1) % moveFrames.length;
                this.frame = moveFrames[this.currentAnimationFrame];
                this.spriteRect.x = this.frame % this.sheetCols;
                this.spriteRect.y = Math.floor(this.frame / this.sheetCols);
                this.frameTime = 0;
            }
        }
        let newPos = this.position.plus(this.velocity.times(deltaTime));
        this.innerHitbox = new Rect(
            newPos.x + this.charMargin,
            newPos.y + this.charMargin,
            this.size.x - 2 * this.charMargin,
            this.size.y - 2 * this.charMargin
        );
        // collision checking
        if (level.contact(this.innerHitbox, this.size, "player")) {
            this.velocity = new Vec(0, 0); // Stop movement
            return;
        }
        if (!level.contact(this.innerHitbox, this.size, 'wall') && !level.contact(this.innerHitbox, this.size, "player") && !level.contact(this.innerHitbox, this.size, "updoor") && !level.contact(this.innerHitbox, this.size, 'leftdoor') && !level.contact(this.innerHitbox, this.size, 'downdoor') && !level.contact(this.innerHitbox, this.size, 'rightdoor') && !level.contact(this.innerHitbox, this.size, 'exit') && !level.contact(this.innerHitbox, this.size, 'enemy') && !level.contact(this.innerHitbox, this.size, 'boss')) {
            this.position = newPos;
            this.lastDirection = this.normDir(this.velocity);

            // this.frame += deltaTime;
            // if(this.frame > 500){
            //     this.setAnimation(...this.movement[this.lastDirection].moveFrames, true, 150);
            //     this.frame = 0;
            // }
            this.startMovement(this.lastDirection);
        }
        else {
            this.wanderTime = 0;
            this.velocity = new Vec(0, 0);
        }
    }
    normDir(direction) {
        if (Math.abs(direction.x) > Math.abs(direction.y)) {
            return direction.x > 0 ? "right" : "left";
        }
        else {
            return direction.y > 0 ? "down" : "up";
        }
    }
    startMovement(direction) {
        let normalizedDirection = this.normDir(direction);
        let dirInfo = this.movement[normalizedDirection];
        dirInfo.status = true;

        // Establecer la dirección antes de cualquier otra cosa
        this.lastDirection = normalizedDirection;
        if (!this.attacking && !this.isRecovering) {
            if (this.state !== "attack" && (this.lastDirection !== normalizedDirection || !this.animationInProgress)) {
                this.animationInProgress = true;
                this.currentAnimationFrame = 0;
                this.totalAnimationFrames = dirInfo.moveFrames.length;
                this.frameTime = 0;
                this.frame = dirInfo.moveFrames[0];
                this.spriteRect.x = this.frame % this.sheetCols;
                this.spriteRect.y = Math.floor(this.frame / this.sheetCols);
            }
        }

        this.velocity[dirInfo.axis] = dirInfo.sign * this.speed;
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
                game.player.lastHitBy = this.enemyID;
                damage.currentTime = 0;
                damage.play();
                applyScreenFlash("rgba(255,0,0,0.5)", 1.5, 0.5);
                console.log(`Player hit: health: ${game.player.health}`);
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
            const frameToUse = this.attackFrames[this.lastDirection][0] + currentFrame;
            const spriteX = (frameToUse % this.attackSheetCols) * this.attackSpriteWidth;
            const spriteY = Math.floor(frameToUse / this.attackSheetCols) * this.attackSpriteHeight;
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
            super.draw(ctx, scale);
        }

        this.drawHealthBar(ctx, scale);
    }
    takeDamage(damage) {
        this.health -= damage;
        console.log(this.health);
        damageSound.play();
        if (this.health <= 0) {
            this.alive = false;
            game.player.killCount += 1;
            if (soundEffectsEnabled) {
                enemyDeath.play();
            }
            game.player.score += this.scoreGiven;
            console.log("KillCount ", game.player.killCount);
        }
    }

    drawHealthBar(ctx, scale) {
        if (!this.alive) return;

        // Meedidas de la barra de salud 
        const barHeight = 5;
        const barWidth = this.size.x * scale * 0.8;
        const barMargin = 10;  // Espacio entre el enemigo y la barra

        // Posicion 
        const barX = this.position.x * scale + (this.size.x * scale - barWidth) / 2;
        const barY = this.position.y * scale - barHeight - barMargin;

        ctx.fillStyle = "#333333";
        ctx.fillRect(barX, barY, barWidth, barHeight);

        let maxHealth = 10;
        if (this.type === "boss") {
            maxHealth = 50;
        } else if (this instanceof MayanWarrior) { //instanceof permite verificar si un objeto es una instancia de una clase espcifica deuvle true si es o false si no
            maxHealth = 20;  // Vida para guerrero maya
        } else if (this instanceof Tlaxcalteca) {
            maxHealth = 15;  // Vida para tlaxcalteca
        } else if (this instanceof Devil) {
            maxHealth = 35;  // Vida para diablo
        }

        // Calcular porcentaje de vida actual
        const healthPercent = this.health / maxHealth;
        const healthBarWidth = barWidth * healthPercent;

        // Relleno de la barra roja
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(barX, barY, healthBarWidth, barHeight);
    }
}

const damage = new Audio("../assets/sound/damage.wav");
function playDamage() {
    damage.currentTime = 0;
    damage.play();
}

// Mariachi enemy class
class Mariachi extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.damage = 1;
        this.usesAttackSprite = true;
        this.attackMaxDuration = 1500;
        this.enemyID = 1;
        this.scoreGiven = 200;

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
        this.enemyID = 2;
        this.scoreGiven = 250;
        this.setMovementFrames('right', [27, 26, 25, 24, 23, 22, 21], [21, 21]);
        this.setMovementFrames('left', [0, 1, 2, 3, 4, 5, 6], [0, 0]);
        this.setMovementFrames('up', [27, 26, 25, 24, 23, 22, 21], [21, 21]);
        this.setMovementFrames('down', [0, 1, 2, 3, 4, 5, 6], [0, 0]);
        this.attackFrames = {
            right: [7, 13],
            left: [14, 20],
            up: [7, 13],
            down: [14, 20]
        };
    }
}

// Mayan Warrior enemy class
class MayanWarrior extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 20;
        this.damage = 3;
        this.enemyID = 3;
        this.scoreGiven = 300;
        this.usesAttackSprite = true;
        this.setMovementFrames('down', [6, 7, 8, 9, 10, 11], [6, 6]);
        this.setMovementFrames('up', [0, 1, 2, 3], [1, 1]);
        this.setMovementFrames('left', [6, 7, 8, 9, 10, 11], [6, 6]);
        this.setMovementFrames('right', [12, 13, 14, 15, 16, 17], [12, 12]);

        this.attackSpriteWidth = 110;
        this.attackSpriteHeight = 64;
        this.attackSheetWidth = 672;
        this.attackSheetHeight = 343;
        this.attackSheetCols = 6;

        this.initAttackSpriteSheet("../assets/charSpritesheets/MayanPeleandoSpriteSheet.png");
        this.attackFrames = {
            right: [0, 5],
            left: [6, 11],
            up: [12, 17],
            down: [18, 23]
        };
    }
}

// Devil enemy class
class Devil extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 35;
        this.damage = 4;
        this.enemyID = 4;
        this.scoreGiven = 350;

        this.setMovementFrames('right', [8, 9, 10, 11], [10, 10]);
        this.setMovementFrames('left', [12, 13, 14, 15], [13, 13]);
        this.setMovementFrames('up', [4, 5, 6, 7], [4, 4]);
        this.setMovementFrames('down', [0, 1, 2, 3], [0, 0]);
        this.initAttackSpriteSheet("../assets/charSpritesheets/devilAttack.png");

        this.attackFrames = {
            right: [8, 11],
            left: [12, 15],
            up: [4, 7],
            down: [0, 3]
        };
    }

    //sobreescribir el metodo takeDamage para el diablo
    // para que suelte la carta del diablo
    takeDamage(damage) {
        this.health -= damage;
        console.log(this.health);

        if (this.health <= 0 && !this.hasDroppedCard) {
            this.hasDroppedCard = true;
            this.alive = false;
            game.player.killCount += 1;
            game.player.score += this.scoreGiven;

            // 50% probability check
            if (Math.random() < 0.5) {


                // Create the Devil card at the position where Devil was defeated
                const card = new DiabloCard("#800000", 32, 32, this.position.x, this.position.y, "card");
                const spritePath = "../assets/cards/cardDiablo.png";
                card.setSprite(spritePath, new Rect(0, 0, 80, 150));

                // Add the card to the game
                game.actors.push(card);
            }
        }
    }
}

// Bosses


class Quetzalcoatl extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width * 1, height * 1, x, y, _type);
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
        this.enemyID = 5;
        this.scoreGiven = 600;

        // Custom sprite dimensions
        this.frameWidth = 80;
        this.frameHeight = 64;
        this.sheetCols = 3;

        //rate de ataque modificado
        this.attackCooldown = 1000; // Reduced from 5000 to 2000ms
        this.minAttackInterval = 2000; // Reduced from 8000 to 3000ms
        this.recoveryTime = 1200; // Reduced from 3000 to 1200ms


        //drop card flag
        this.hasDroppedCard = false;


        this.initAttackSpriteSheet("../assets/charSpritesheets/SpriteSheetQuetzacoaltPeleando.png");

    }

    takeDamage(damage) {
        this.health -= damage;
        console.log(this.health);
        if (this.health <= 0 && !this.hasDroppedCard) {
            this.hasDroppedCard = true;

            this.alive = false;
            game.player.killCount += 1;
            game.player.score += this.scoreGiven;
            console.log("KillCount ", game.player.killCount);


            // Create the Quetzalcoatl card at the boss position
            const card = new QuetzalcoatlCard("#FFD700", 32, 32, this.position.x, this.position.y, "benditionCard");
            const spritePath = "../assets/cards/QuetzacolatCard.png";
            card.setSprite(spritePath, new Rect(0, 0, 80, 150));

            game.actors.push(card); // Add the card to the game actors
            console.log("Card dropped @ pos ", this.position.x, this.position.y);

        }
    }

    startAttack() {
        if (this.attacking) return;

        // Play sound before calling super
        if (soundEffectsEnabled) {
            dragonSound.currentTime = 0;
            dragonSound.play();
        }

        // Let the parent handle all animation setup
        super.startAttack();

        // Custom logging after parent setup
        console.log("Quetzalcoatl attack");
    }



}

class AhPuch extends BaseEnemy {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width * 1, height * 1, x, y, _type);
        this.health = 50; // Initial health for Ah Puch
        this.damage = 5;

        //Propiedades para la fireball
        this.isAttackingFireball = false;
        this.fireballAttackDuration = 0;
        this.fireballAttackMaxDuration = 2000; // 2 seconds for fireball attack
        this.fireballCooldown = 100; //2 miliseconds 
        this.lastFireballTime = 0;
        this.fireballCount = 0;
        this.maxFireBalls = 16;
        this.fireBallDamage = 2;
        this.fireBallSpeed = 0.002;
        this.fireBalls = [];

        this.frameWidth = 317.5;
        this.frameHeight = 317.5;
        this.sheetCols = 2;
        this.attackSpriteWidth = 216;
        this.attackSpriteHeight = 365;
        this.attackSheetWidth = 1083;
        this.attackSheetHeight = 676;
        this.attackSheetCols = 5;
        this.usesAttackSprite = true;
        this.type = "boss";

        //rate de ataque modificado
        this.attackCooldown = 1000; // Reduced from 5000 to 2000ms
        this.minAttackInterval = 2000; // Reduced from 8000 to 3000ms
        this.recoveryTime = 1200; // Reduced from 3000 to 1200ms

        this.setMovementFrames('right', [0, 1], [0, 4]);
        this.setMovementFrames('left', [0, 1], [0, 0]);
        this.setMovementFrames('up', [0, 1], [1, 1]);
        this.setMovementFrames('down', [0, 1], [0, 0]);


        // Custom sprite dimensions
        this.frameWidth = 66;
        this.frameHeight = 88.5;
        this.sheetCols = 4;

        this.attackFrames = {
            right: [0, 7],
            left: [0, 7],
            up: [0, 7],
            down: [0, 7]
        };

        this.initAttackSpriteSheet("../assets/charSpritesheets/AhPuchNewFigth.png");

        this.enemyID = 6;
        this.scoreGiven = 800;
    }


    updateAttack(deltaTime) {
        this.attackDuration += deltaTime;

        //phase attack normal
        if (!this.isAttackingFireball) {
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
                    game.player.health -= this.damage;
                    game.player.lastHitBy = this.enemyID;
                    this.hasHitPlayer = true;
                }
            }

            if (this.attackDuration >= this.attackMaxDuration) {
                this.isAttackingFireball = true;
                this.attackDuration = 0;
                this.fireballAttackDuration = 0;
                this.lastFireballTime = Date.now();

                //congelar el ultimo frame de ataque
                const attackFrameRange = this.attackFrames[this.lastDirection];
                const lastAttackFrame = attackFrameRange[1];
                this.currentFrameIndex = lastAttackFrame;
            }
        }

        else {
            this.fireballAttackDuration += deltaTime;
            this.updateFireballAttack(deltaTime);

            // finalizar la fase de ataque fireball
            if (this.fireballAttackDuration >= this.fireballAttackMaxDuration) {
                this.isAttackingFireball = false;
                this.attacking = false;
                this.attackDuration = 0;
                this.hasHitPlayer = false;
                this.lastAttackEndTime = Date.now();
                this.isRecovering = true;

                //limpiar cuantas fireball le quedan
                this.fireBalls = [];

                this.switchBackToIdleState();
            }
        }
    }

    updateFireballAttack(deltaTime) {
        const currentTime = Date.now();

        //crear las fireballs
        if (currentTime - this.lastFireballTime > this.fireballCooldown) {
            this.lastFireballTime = currentTime;
            this.spawnFireball();
            if (soundEffectsEnabled) {
                fireballSound.currentTime = 0;
                fireballSound.play();
            }
        }

        //quitar las fireballs que ya se usaron
        for (let i = this.fireBalls.length - 1; i >= 0; i--) {
            const fireball = this.fireBalls[i];
            fireball.update(deltaTime);

            // remover fireballs que ya no existen
            if (fireball.shouldRemove) {
                this.fireBalls.splice(i, 1);
            }
        }
    }

    spawnFireball() {
        //calculo basado en la cantidad de fireballs que quedan
        const angle = (this.fireballCount / this.maxFireBalls) * 2 * Math.PI;
        this.fireballCount = (this.fireballCount + 1) % this.maxFireBalls;

        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);

        //create a new fireball
        const fireball = new Fireball(
            this.position.x + this.size.x / 2,
            this.position.y + this.size.y / 2,
            this.fireBallDamage,
            new Vec(dirX, dirY),
            this.fireBallSpeed
        );

        this.fireBalls.push(fireball);
    }

    draw(ctx, scale) {
        super.draw(ctx, scale);

        //dibujar las fireballs
        for (const fireball of this.fireBalls) {
            fireball.draw(ctx, scale);
        }
    }
}

class Fireball {
    constructor(x, y, damage, direction, speed) {
        this.position = new Vec(x, y);
        this.size = { x: 0.1, y: 0.1 }; // tamaño de la fireball
        this.direction = direction;
        this.speed = speed;
        this.damage = damage;
        this.shouldRemove = false;
        this.lifetime = 0;
        this.maxLifetime = 3000; // 3 seconds

        // Crear hibox de la bola
        this.hitbox = new Rect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );
    }

    update(deltaTime) {

        this.lifetime += deltaTime;
        if (this.lifetime >= this.maxLifetime) {
            this.shouldRemove = true;
            return;
        }
        const movement = this.direction.times(this.speed * deltaTime);
        this.position = this.position.plus(movement);
        this.hitbox = new Rect(
            this.position.x,
            this.position.y,
            this.size.x,
            this.size.y
        );

        // revisar colision con el player
        if (game && game.player && boxOverlap(this, game.player)) {
            game.player.health -= this.damage;
            game.player.lastHitBy = 6; // AhPuch's enemyID
            this.shouldRemove = true;
        }

        if (game && game.level && game.level.contact(this.hitbox, this.size, 'wall')) {
            this.shouldRemove = true;
        }
    }

    draw(ctx, scale) {
        const scaledX = this.position.x * scale;
        const scaledY = this.position.y * scale;
        const scaledSize = this.size.x * scale;
        const gradient = ctx.createRadialGradient(
            scaledX + scaledSize / 2,
            scaledY + scaledSize / 2,
            0,
            scaledX + scaledSize / 2,
            scaledY + scaledSize / 2,
            scaledSize
        );
        gradient.addColorStop(0, "white");
        gradient.addColorStop(0.3, "#ff4500");
        gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(
            scaledX + scaledSize / 2,
            scaledY + scaledSize / 2,
            scaledSize,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }
}