// BaseEnemies
class BaseEnemy extends BaseCharacter{
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, _type);
    }
}
class Mariachi extends BaseEnemy {
    constructor(_color, width, heigth, x, y, _type){
        super("red", width, heigth,x,y,"mariachi");
        this.health = 10;
        this.damage = 1;
        this.setMovementFrames('right',  [], [],);
        this.setMovementFrames('left', [], []);
        this.setMovementFrames('up', [], []);
        this.setMovementFrames('down', [], []);
    }
}
class Tlaxcalteca extends BaseEnemy{
    constructor(_color, width, heigth, x, y, _type){
        super("red", width, heigth,x,y,"tlaxcalteca");
        this.health = 15;
        this.damage = 2;
        this.setMovementFrames('right',  [], [],);
        this.setMovementFrames('left', [], []);
        this.setMovementFrames('up', [], []);
        this.setMovementFrames('down', [], []);
    }
}
class MayanWarrior extends BaseEnemy{
    constructor(_color, width, heigth, x, y, _type){
        super("red", width, heigth,x,y,"mayanWarrior");
        this.health = 20;
        this.damage = 3;
        this.setMovementFrames('right',  [], [],);
        this.setMovementFrames('left', [], []);
        this.setMovementFrames('up', [], []);
        this.setMovementFrames('down', [], []);
    }
}
class Devil extends BaseEnemy{
    constructor(_color, width, heigth, x, y, _type){
        super("red", width, heigth,x,y,"devil");
        this.health = 35;
        this.damage = 4;
        this.setMovementFrames('right',  [], [],);
        this.setMovementFrames('left', [], []);
        this.setMovementFrames('up', [], []);
        this.setMovementFrames('down', [], []);
    }
}

// Bosses
class BaseBoss extends BaseCharacter{
    constructor(_color, width, height, x, y, _type) {
        super("red", width, height, x, y, _type);
        //Atributes
        this.attack1 = 0;
        this.attack2 = 0;
    }
}
class Quetzalcoatl extends BaseBoss{
    constructor(_color, width, height, x, y, _type){
        super("red", width, height, x, y, "quetzalcoatl");
        this.health = 85;
        this.damage = Math.floor(Math.random() * 6-4) + 4;
        this.setMovementFrames('right',  [], [],);
        this.setMovementFrames('left', [], []);
        this.setMovementFrames('up', [], []);
        this.setMovementFrames('down', [], []);
    }
}
class AhPuch extends BaseBoss{
    constructor(_color, width, height, x, y, _type){
        super("red", width, height, x, y, "ahPuch");
        this.health = 110;
        this.damage = Math.floor(Math.random() * 7-5) + 5;
        this.setMovementFrames('right',  [], [],);
        this.setMovementFrames('left', [], []);
        this.setMovementFrames('up', [], []);
        this.setMovementFrames('down', [], []);
    }
}