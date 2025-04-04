// Lectura de chars para armar nivel
const levelChars = {
    // Rect defined as offset from the first tile, and size of the tiles
    // Cosas para el mapa
    ".": {objClass: GameObject,
        label: "floor",
        sprite: '../assets/mapElements/FloorTiles.jpg',
        rect: new Rect(0, 0, 193, 394)},
    "#": {objClass: GameObject ,
        label: "wall",
        sprite: '../assets/mapElements/brickYellow.png',
        rect: new Rect(0, 0, 64, 32)},
        //acabé haciendo puertitas únicas porque se confunde esta ___ cosa
    "u": {objClass: GameObject, // -------------------upDoor
        label: "updoor",
        sprite: '../assets/mapElements/door.png',
        rect: new Rect(0, 0, 52, 52)},
    "s": {objClass: GameObject, //-------------------downDoor /south
        label: "downdoor",
        sprite: '../assets/mapElements/door.png',
        rect: new Rect(0, 0, 52, 52)},
    "l": {objClass: GameObject, //-------------------leftDoor
        label: "leftdoor",
        sprite: '../assets/mapElements/door.png',
        rect: new Rect(0, 0, 52, 52)},
    "r": {objClass: GameObject, //-------------------rightDoor
        label: "rightdoor",
        sprite: '../assets/mapElements/door.png',
        rect: new Rect(0, 0, 52, 52)},
    "E": {objClass: GameObject, // -------------------exitDoor
        label: "exit",
        sprite: '../assets/mapElements/bossdoor.png',
        rect: new Rect(0, 0, 52, 52)},
    "t": {objClass: Torch,
        label: "torch", 
        sprite: '../assets/mapElements/torch_anim.png',
        rect: new Rect(0,0, 16, 16),
        sheetCols: 3,
        startFrame: [0,3]},
    "v": {objClass : GameObject,
        label: "vine", 
        sprite : '../assets/mapElements/Vines.png',
        rect : new Rect(0,0,32,32)},
    
    
    
    // Cartas ($->testing)
    "$": {objClass : BaseCard, 
        label: "card",
        sprite: '../assets/cards/cardHeart.jpeg',
        rect: new Rect(0, 0, 80, 150)},
    "0": {objClass: MacahuitlCard,
        label: "card",
        sprite: '../assets/cards/cardBaseweapon.jpeg',
        rect: new Rect(0, 0, 80, 150)},
    "1": {objClass: ObsidianKnifeCard,
        label: "card",
        sprite: '../assets/cards/cardObsidianKnife.png',
        rect: new Rect(0, 0, 80, 150)},
    "2": {objClass: MacheteCard,
        label: "card",
        sprite: '../assets/cards/cardMachete.png',
        rect: new Rect(0, 0, 80, 150)},
    "3": {objClass: MariachiCard,
        label: "card",
        sprite: '../assets/cards/cardMariachi.jpeg',
        rect: new Rect(0, 0, 80, 150)},
    "4": {objClass: DiabloCard,
        label: "card",
        sprite: '../assets/cards/cardDiablo.png',
        rect: new Rect(0, 0, 80, 150)},
    "5": {objClass: MayanWarriorCard,
        label: "card",
        sprite: '../assets/cards/cardGuerrero.png',
        rect: new Rect(0, 0, 80, 150)},
    "6": {objClass: CorazonCard,
        label: "card",
        sprite: '../assets/cards/cardHeart.jpeg',
        rect: new Rect(0, 0, 80, 150)},
    "7": {objClass: ValienteCard,
        label: "card", 
        sprite: '../assets/cards/cardValiente.png',
        rect: new Rect(0, 0, 80, 150)},
    "8": {objClass: TacoCard,
        label: "card",
        sprite: '../assets/cards/cardTaco.png',
        rect: new Rect(0, 0, 80, 150)},
    "9": {objClass: CalaveraCard,
        label: "card",
        sprite: '../assets/cards/cardCalavera.png',
        rect: new Rect(0, 0 , 80, 150)},

    "j": {objClass: Vase,   // <- j de jarrón 
        label: "vase", 
        sprite: '../assets/mapElements/vase.png', 
        rect: new Rect(0,0,64,64)},
    
    
    // Personajes
    "@": {objClass: BasePlayer,
        label: "player",
        sprite: '../assets/charSpritesheets/testSpriteSheet.png',
        rect: new Rect(0, 0, 65, 76),
        sheetCols: 6,
        startFrame: [0, 0]},

    //Enemystest
    "e": {objClass: BaseEnemy,
        label: "enemy",
        sprite: '../assets/charSpritesheets/skelMariachi_SpriteSheet.png',
        rect: new Rect(0, 0,96,74),
        sheetCols: 6,
        startFrame: [0, 0]},
    "M": {objClass: Mariachi,
        label: "enemy",
        sprite: '../assets/charSpritesheets/skelMariachi_SpriteSheet.png',
        rect: new Rect(0, 0,96,74),
        sheetCols: 6,
        startFrame: [0, 0]},
    "T": {objClass: Tlaxcalteca,
        label: "enemy",
        sprite: '../assets/charSpritesheets/SpriteSheetTlaxcalteca.png',
        rect: new Rect(0, 0,97,65),
        sheetCols: 7,
        startFrame: [0, 0]},
    "W": {objClass: MayanWarrior,
        label: "enemy",
        sprite: '../assets/charSpritesheets/warriorWalkSpriteSheet.png',
        rect: new Rect(0, 0,60,63),
        sheetCols: 6,
        startFrame: [0, 0]},
    "D": {objClass: Devil,
        label: "enemy",
        sprite: '../assets/charSpritesheets/devilWalk.png',
        rect: new Rect(0, 0,64,64),
        sheetCols: 4,
        startFrame: [0, 0]},

    "P": {objClass: Quetzalcoatl,
        label: "boss",
        sprite: "../assets/charSpritesheets/SpriteSheetBossQIDLE.png",
        rect: new Rect(0, 0, 64, 80),
        sheetCols:3,
        startFrame: [0, 0]}
};




// Room Test
class Level {
    constructor(plan) {
        // Matriz de strs
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
                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.player = actor;
                    cellType = "empty";

                } 
                else if (actor.type == "wall") {
                    item.rect = this.randomTile(31, 10, 17);
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "wall";
                } 
                else if (actor.type == "floor") {
                    this.addBackgroundFloor(x,y);
                    item.rect = this.randomTile(0, 47, 0);
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "floor";
                }
                else if (actor.type == "updoor") {
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "updoor";
                } 
                else if (actor.type == "downdoor") {
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "downdoor";
                } 
                else if (actor.type == "leftdoor") {
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "leftdoor";
                } 
                else if (actor.type == "rightdoor") {
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "rightdoor";
                }
                else if(actor.type == "exit"){
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "exit";
                }
                else if(actor.type == "torch"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if(actor.type == "card"){
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if (actor.type == "vine"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, item.rect); 
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if(actor.type == "vase"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, item.rect); 
                    this.actors.push(actor);
                    cellType = "empty";
                    //console.log("Vase found");
                }
                else if(actor.type == "enemy"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                }
                else if(actor.type == "boss"){
                    this.addBackgroundFloor(x, y);
                    actor.setSprite(item.sprite, item.rect);
                    actor.sheetCols = item.sheetCols;
                    actor.setAnimation(...item.startFrame, true, 100);
                    this.actors.push(actor);
                    cellType = "empty";
                }                
                return cellType;
            });
        });
    }
    addBackgroundFloor(x, y) {
        let floor = levelChars['.']; // Get the floor tile definition
        let floorActor = new GameObject("white", 1, 1, x, y, floor.label);
        floorActor.setSprite(floor.sprite, this.randomTile(0, 6, 0, 12)); 
        this.actors.push(floorActor); 
    }
    // Randomize sprites for each wall tile
    randomTile(xStart, xRange, y) {
        let tile = Math.floor(Math.random() * xRange + xStart);
        return new Rect(tile, y, 32, 32);
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
