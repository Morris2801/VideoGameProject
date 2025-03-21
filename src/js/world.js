// Lectura de chars para armar nivel
const levelChars = {
    // Rect defined as offset from the first tile, and size of the tiles
    // Cosas para el mapa
    ".": {objClass: GameObject,
        label: "floor",
        sprite: '../assets/FloorTiles.jpg',
        rect: new Rect(0, 0, 47, 47)},
    "#": {objClass: GameObject ,
        label: "wall",
        sprite: '../assets/brickYellow.png',
        rect: new Rect(0, 0, 64, 32)},
    "*": {objClass: GameObject,
        label: "door",
        sprite: '../assets/door.png',
        rect: new Rect(0, 0, 52, 52)},
    "t": {objClass: Torch,
        label: "torch", 
        sprite: '../assets/torch_anim.png',
        rect: new Rect(0,0, 16, 16),
        sheetCols: 3,
        startFrame: [0,3]},
    "v": {objClass : GameObject,
        label: "vine", 
        sprite : '../assets/Vines.png',
        rect : new Rect(0,0,32,32)},
    
    
    
    // Cartas ($->testing)
    "$": {objClass : BaseCard,
        label: "card",
        sprite: '../assets/heartCard.jpeg',
        rect: new Rect(0, 0, 80, 150)},
    "0": {objClass: MacahuitlCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "1": {objClass: ObsidianKnifeCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "2": {objClass: MacheteCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "3": {objClass: MariachiCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "4": {objClass: DiabloCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "5": {objClass: MayanWarriorCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "6": {objClass: CorazonCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "7": {objClass: ValienteCard,
        label: "card", 
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "8": {objClass: TacoCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    "9": {objClass: CalaveraCard,
        label: "card",
        sprite: '',
        rect: new Rect(0, 0, 80, 150)},
    
    
    // Personajes
    "@": {objClass: BasePlayer,
        label: "player",
        sprite: '../assets/testSpriteSheet.png',
        rect: new Rect(0, 0, 65, 76),
        sheetCols: 6,
        startFrame: [0, 0]},
    
    
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

                } else if (actor.type == "wall") {
                    // Randomize sprites for each wall tile
                    item.rect = this.randomTile(31, 10, 17);
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "wall";
                } else if (actor.type == "floor") {
                    // Randomize sprites for each wall tile
                    item.rect = this.randomTile(0, 47, 0);
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "floor";
                }
                else if(actor.type == "door"){
                    actor.setSprite(item.sprite, item.rect);
                    this.actors.push(actor);
                    cellType = "door";
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
                    this.addBackgroundFloor(x, y);
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
                return cellType;
            });
        });
    }
    addBackgroundFloor(x, y) {
        let floor = levelChars['.'];
        let floorActor = new GameObject("grey", 1, 1, x, y, floor.label);
        floor.rect = this.randomTile(0, 47, 0);
        floorActor.setSprite(floor.sprite, floor.rect);
        this.actors.push(floorActor);
    }
    // Randomize sprites for each wall tile
    randomTile(xStart, xRange, y) {
        let tile = Math.floor(Math.random() * xRange + xStart);
        return new Rect(tile, y, 32, 32);
    }
    // Detect when the player touches a wall
    contact(playerPos, playerSize, type) {
        // Determine which cells the player is occupying
        let xStart = Math.floor(playerPos.x);
        let xEnd = Math.ceil(playerPos.x + playerSize.x);
        let yStart = Math.floor(playerPos.y);
        let yEnd = Math.ceil(playerPos.y + playerSize.y);
        // Check each of those cells
        for (let y=yStart; y<yEnd; y++) {
            for (let x=xStart; x<xEnd; x++) {
                // Anything outside of the bounds of the canvas is considered
                // to be a wall, so it blocks the player's movement
                let isOutside = x < 0 || x >= this.width ||
                                y < 0 || y >= this.height;
                let here = isOutside ? 'wall' : this.rows[y][x];
                // Detect if an object of type specified is being touched
                if (here == type) return true;
            }
        }
        return false;
    }
}

// Para qué era esto?
class BaseLevel{
    constructor(levelName, levelNumber){
        this.levelName = levelName;
        this.levelNumber = levelNumber;
        this.rooms = [];
    }

}


