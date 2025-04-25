/*
Script Name
- world.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Defines the Level class to manage the structure and behavior of individual game levels
- Maps chars in the level layout string (".", "#", "@", ...) to corresponding game objects, such as floors, walls, doors, enemies, and the player
- Dynamically generates and initializes game objects based on the level layout
- Handles the placement and rendering of environmental elements (torches, vases, vines) and interactive objects (e.g., cards, doors)
- Provides methods for:
  - Adding background floor tiles.
  - Randomizing wall and floor tile sprites for visual variety
  - Detecting collisions between the player and specific objects (e.g., walls, doors)
- Integrates with the game's sprite system to assign animations and sprites to objects
- Supports the creation of boss rooms and special elements like room/level exit doors
*/

// Lectura de chars para armar nivel
const levelChars = {
    // Rect defined as offset from the first tile, and size of the tiles
    // Map elements
    ".": {objClass: GameObject,
        label: "floor",
        sprite: '../assets/mapElements/FloorTiles.jpg',
        rectParams: [0, 0, 193, 394]},
    "#": {objClass: GameObject ,
        label: "wall",
        //sprite: '../assets/mapElements/brickYellow.png',
        rectParams: [0, 0, 64, 32]},
    //acabé haciendo puertitas únicas porque se confunde
    "u": {objClass: GameObject, // -------------------upDoor
        label: "updoor",
        sprite: '../assets/mapElements/door.png',
        rectParams: [0, 0, 52, 52]},
    "s": {objClass: GameObject, //-------------------downDoor /south
        label: "downdoor",
        sprite: '../assets/mapElements/door.png',
        rectParams: [0, 0, 52, 52]},
    "l": {objClass: GameObject, //-------------------leftDoor
        label: "leftdoor",
        sprite: '../assets/mapElements/door.png',
        rectParams: [0, 0, 52, 52]},
    "r": {objClass: GameObject, //-------------------rightDoor
        label: "rightdoor",
        sprite: '../assets/mapElements/door.png',
        rectParams: [0, 0, 52, 52]},
    "E": {objClass: GameObject, // -------------------exitDoor
        label: "exit",
        sprite: '../assets/mapElements/bossdoor.png',
        rectParams: [0, 0, 52, 52]},
    "t": {objClass: Torch,
        label: "torch", 
        sprite: '../assets/mapElements/torch_anim.png',
        rectParams: [0, 0, 16, 16],
        sheetCols: 3,
        startFrame: [0,3]},
    "v": {objClass : GameObject,
        label: "vine", 
        sprite : '../assets/mapElements/Vines.png',
        rectParams : [0,0,32,32]},

    // Cartas ($->testing)
    
    "$": {objClass : BaseCard, 
        label: "card",
        cardID: 0,
        sprite: '../assets/cards/cardHeart.jpeg',
        rectParams: [0, 0, 80, 150]},
    "0": {objClass: MacahuitlCard,
        label: "card",
        cardId: 0,
        sprite: '../assets/cards/cardBaseweapon.jpeg',
        rectParams: [0, 0, 80, 150]},
    "1": {objClass: ObsidianKnifeCard,
        label: "card",
        cardId: 1,
        sprite: '../assets/cards/cardObsidianKnife.png',
        rectParams: [0, 0, 80, 150]},
    "2": {objClass: MacheteCard,
        label: "card",
        cardId: 2,
        sprite: '../assets/cards/cardMachete.png',
        rectParams: [0, 0, 80, 150]},
    "3": {objClass: MariachiCard,
        label: "card",
        cardId: 3,
        sprite: '../assets/cards/cardMariachi.jpeg',
        rectParams: [0, 0, 80, 150]},
    "4": {objClass: DiabloCard,
        label: "card",
        cardId: 4,
        sprite: '../assets/cards/cardDiablo.png',
        rectParams: [0, 0, 80, 150]},
    "5": {objClass: MayanWarriorCard,
        label: "card",
        cardId: 5,
        sprite: '../assets/cards/cardGuerrero.png',
        rectParams: [0, 0, 80, 150]},
    "6": {objClass: CorazonCard,
        label: "card",
        cardId: 6,
        sprite: '../assets/cards/cardHeart.jpeg',
        rectParams: [0, 0, 80, 150]},
    "7": {objClass: ValienteCard,
        label: "card",
        cardId: 7,
        sprite: '../assets/cards/cardValiente.png',
        rectParams: [0, 0, 80, 150]},
    "8": {objClass: TacoCard,
        label: "card",
        cardId: 8,
        sprite: '../assets/cards/cardTaco.png',
        rectParams: [0, 0, 80, 150]},
    "9": {objClass: CalaveraCard,
        label: "card",
        cardId: 9,
        sprite: '../assets/cards/cardCalavera.png',
        rectParams: [0, 0 , 80, 150]},
    
    "10":{ objClass: QuetzalcoatlCard,
        label: "card",
        cardId: 11,
        sprite: 'C:\Users\Toyan\VideoGameProject\VideoGameProject\src\assets\cards\QuetzacolatCard.png',
        rectParams: [0, 0, 100, 150]},
    
    "j": {objClass: Vase,   // <- j de jarrón 
        label: "vase", 
        sprite: '../assets/mapElements/vase.png', 
        rectParams: [0,0,64,64]},
    
    // Characters
    "@": {objClass: BasePlayer,
        label: "player",
        sprite: '../assets/charSpritesheets/testSpriteSheet.png',
        rectParams: [0, 0, 65, 76],
        sheetCols: 6,
        startFrame: [0, 0]},

    //Enemystest
    "e": {objClass: BaseEnemy,
        label: "enemy",
        sprite: '../assets/charSpritesheets/skelMariachi_SpriteSheet.png',
        rectParams: [0, 0,96,74],
        sheetCols: 6,
        startFrame: [0, 0]},
    "M": {objClass: Mariachi, // enemy id 1
        label: "enemy",
        sprite: '../assets/charSpritesheets/skelMariachi_SpriteSheet.png',
        rectParams: [0, 0,96,74],
        sheetCols: 6,
        startFrame: [0, 0]},
    "T": {objClass: Tlaxcalteca,// enemy id 2
        label: "enemy",
        sprite: '../assets/charSpritesheets/SpriteSheetTlaxcalteca.png',
        rectParams: [0, 0,97,65],
        sheetCols: 7,
        startFrame: [0, 0]},
    "W": {objClass: MayanWarrior, // enemy id 3
        label: "enemy",
        sprite: '../assets/charSpritesheets/warriorWalkSpriteSheet.png',
        rectParams: [0, 0,60,63],
        sheetCols: 6,
        startFrame: [0, 0]},
    "D": {objClass: Devil, // enemy id 4
        label: "enemy",
        sprite: '../assets/charSpritesheets/devilWalk.png',
        rectParams: [0, 0,64,64],
        sheetCols: 4,
        startFrame: [0, 0]},

    "P": {objClass: Quetzalcoatl, // enemy id 5
        label: "boss",
        sprite: "../assets/charSpritesheets/SpriteSheetBossQIDLE.png",
        rectParams: [0, 0, 64, 80],
        sheetCols:3,
        startFrame: [0, 0]},
    "A": {objClass: AhPuch,
        label: "boss",
        sprite: "../assets/charSpritesheets/BossIdleAhPunch.png",
        rectParams :[0, 0, 65, 88.5],
        sheetCols:4,
        startFrame: [0, 0]}
    // Missing boss 2 here // enemy id 6
};

class Level {
    constructor(plan, currentTreeIndex) {
        // Matriz de strs
        this.currentTreeIndex = currentTreeIndex;
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
                let actor = new objClass("white", 1, 1, x, y, item.label);
                if (actor.type == "player") {
                    // Also instantiate a floor tile below the player
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.player = actor;
                    cellType = "empty";

                } 

                // Resumir todo lo que se pueda en los else ifs cuando terminemos
                else if (actor.type == "wall") {
                    item.rectParams = this.randomTile(31, 10, 17);
                    const sprite =  this.currentTreeIndex === 0
                        ? '../assets/mapElements/brickYellow.png'
                        : '../assets/mapElements/brickPurple.png';
                    actor.setSprite(sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "wall";
                } 
                else if (actor.type == "floor") {
                    this.addBackgroundFloor(x,y);
                    item.rectParams = this.randomTile(0, 47, 0);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "floor";
                }
                else if (actor.type == "updoor") {
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "updoor";
                } 
                else if (actor.type == "downdoor") {
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "downdoor";
                } 
                else if (actor.type == "leftdoor") {
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "leftdoor";
                } 
                else if (actor.type == "rightdoor") {
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "rightdoor";
                }
                else if(actor.type == "exit"){
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "exit";
                }
                else if(actor.type == "torch"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if(actor.type == "card"){
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if (actor.type == "vine"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams)); 
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if(actor.type == "vase"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams)); 
                    this.actors.push(actor);
                    cellType = "empty";
                    //console.log("Vase found");
                }
                else if(actor.type == "enemy"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if(actor.type == "boss"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, new Rect(...item.rectParams));
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                }                
                return cellType;
            });
        });
    }
    // Force sprite into floor tiles
    addBackgroundFloor(x, y){
        let floor = levelChars['.']; 
        let floorActor = new GameObject("white", 1, 1, x, y, floor.label);
        let rectParams = this.randomTile(0, 6, 0); // Corrected arguments
        floorActor.setSprite(floor.sprite, new Rect(...rectParams)); 
        this.actors.push(floorActor); 
    }
    // Randomize sprites for each wall tile
    randomTile(xStart, xRange, y) {
        let tile = Math.floor(Math.random() * xRange + xStart);
        return [tile, y, 32, 32];
    }
    // Detect when the player touches a wall
    contact(hitbox, size, type) {
        // Determine which cells the player is occupying
        let xStart = Math.floor(hitbox.x);
        let xEnd = Math.ceil(hitbox.x + hitbox.width);
        let yStart = Math.floor(hitbox.y);
        let yEnd = Math.ceil(hitbox.y + hitbox.height);
        // Check each of those cells
        for (let y=yStart; y<yEnd; y++) {
            for (let x=xStart; x<xEnd; x++) {
                let isOutside = x < 0 || x >= this.width ||
                                y < 0 || y >= this.height;
                let here = isOutside ? 'wall' : this.rows[y][x];
                if (here == type) return true;
            }
        }
        return false;
    }
}
