let maxCols = 18;
let minCols = 16;
let maxRows = 9;
let minRows = 7;
const cols = Math.floor(Math.random() * (maxCols - minCols) + maxCols);
const rows = Math.floor(Math.random() * (maxRows - minRows) + minRows); 
let maxVases = 5;

// P(x_enemyspawn)
const enemyProbabilitiesLvl1 = [
    {type: "M", prob : 0.4},
    {type: "T", prob : 0.4},
    {type: "W", prob : 0.15},
    {type: "D", prob : 0.05},
    {type: "P", prob : 0.9}
]
const enemyProbabilitiesLvl2 = [
    {type: "M", prob: 0.2}, 
    {type: "T", prob: 0.2},
    {type: "W", prob: 0.4},
    {type: "D", prob: 0.2},
    {type: "P", prob: 0.9}
]

function getRandEnemy(prob){
    const rand = Math.random(); 
    let totProb = 0; 
    for(let enemy of prob){
        totProb += enemy.prob; 
        if(rand < totProb){
            return enemy.type; 
        }
    }
    // Este no sirve para nada: console.log(prob[prob.length -1].type);
    return prob[prob.length -1].type;
}

function floorCross(level,w, h){
    for (let y = 2; y < h-2; y++){
        let posY = y * w + Math.floor(w/2);
        level[posY] = ".";
    }
    for(let x = 2; x < w-2; x++){
        let posX = Math.floor(h/2)*w+x;
        level[posX] = ".";
    } 
}

function levGen(width, height, levelNum, isBossRoom = false){
    let level = [];
    let cells = width * height; 
    let perim = 2*width + 2*height; //por si acaso?
    let maxEnemiesLvl1 = 5;
    let minEnemiesLvl1 = 3; 
    let maxEnemiesLvl2 = 7; 
    let minEnemiesLvl2 =4 ;
    let numEnemiesLvl1 = Math.floor(Math.random() * (maxEnemiesLvl1 - minEnemiesLvl1) + minEnemiesLvl1); 
    let numEnemiesLvl2 = Math.floor(Math.random() * (maxEnemiesLvl2 - minEnemiesLvl2) + minEnemiesLvl2); 

    // Ajuste para borde de .
    width +=2;
    height +=2;

    for (let j = 0; j < height; j++){
        for (let i = 0; i < width; i++){
            // Borde fuera
            if (i == 0 || i == width -1 || j == 0 || j == height -1){
                level.push('.');
            }
            // Borde paredes
            else if (i == 1 || i == width -2 || j == 1 || j == height -2){
                level.push('#');
            }
            // Interior piso
            else {
                level.push('.');
            }
        }
    }

    // Puertas
    level[width + Math.floor(width/2)] = "u"; //up
    level[width * (height - 2)  + Math.floor(width / 2)] = "s"; //south
    level[width * Math.floor(height / 2) + 1] = "l"; //left
    level[width * Math.floor(height / 2) + (width - 2)] = "r"; //right

    //mid cross check
    

    // Poner cosas revisando que esté en bounds
    function placeX(cosa){
        let pos; 
        do{
            pos = [Math.floor(Math.random() * (width - 4) + 2), Math.floor(Math.random() * (height - 4) + 2)];
        }
        while(level[pos[0] + pos[1] * width] != '.' && 
            level[pos[0] + pos[1] * width] != 'l'&& 
            level[pos[0] + pos[1] * width] != 'r'&& 
            level[pos[0] + pos[1] * width] != 's'&& 
            level[pos[0] + pos[1] * width] != 'u' && 
            level[pos[0] + pos[1] * width] != '#'
        );
        level[pos[0] + pos[1] *width] = cosa;
    }
    
    // Poner cosas (jugador, columnas, ....)
    //placeX("@"); //Jugador <- ya no va aquí, mejor que sea lo último que se pone
    //Columnas
    for (let i = 0; i < Math.floor(cells/6); i++){  // Jugar con la división cells/n para mantener ratio
        placeX("#");
    }
    floorCross(level, width, height);
    //Torches
    for (let i = 0; i < Math.floor(cells / 65); i++){// Jugar con la división cells/n para mantener ratio
        placeX("t");
    }
    //Vines
    for (let i = 0; i < Math.floor(cells / 27); i++){// Jugar con la división cells/n para mantener ratio
        placeX("v");
    }

    //EnemySpanw
    /*
        e es para test con BaseEnemy
        "M": {objClass: Mariachi, t1
        "T": {objClass: Tlaxcalteca, t1
        "W": {objClass: MayanWarrior, t2 
        "D": {objClass: Devil, t2
    */
    if (levelNum == 1){
        console.log("NumEnemiesLvl1: " + numEnemiesLvl1);
        for(let i = 0; i < numEnemiesLvl1; i++){
            let enemy = getRandEnemy(enemyProbabilitiesLvl1);
            console.log(enemy);
            placeX(enemy);
        }
    }
    else if (levelNum == 2){
        console.log("NumEnemiesLvl2: " + numEnemiesLvl2);
        for(let i = 0; i < numEnemiesLvl2; i++){
            let enemy = getRandEnemy(enemyProbabilitiesLvl2);
            console.log(enemy);
            placeX(enemy);
        }
    }
    

    //cardsTest
    /*for (let i = 0; i < numCards; i++){
        // Para poner BaseCard
        // placeX("$");
    }
    
    placeX("0");
    placeX("1");
    placeX("2");
    placeX("3");
    placeX("4");
    placeX("5");
    placeX("6");
    placeX("7");
    placeX("8");
    placeX("9");
    */

    //Vase test (j: jarrón porque la v ya está ocupada)
    let vaseProb = levelNum == 1 ? 0.4 : 0.6;
    for (let i = 0; i < maxVases; i++){
        let rand = Math.random(); 
        if(rand < vaseProb){
            placeX("j");
            //console.log("Vase placed");
        }
    }

    if(isBossRoom){
        //puerta de arriba que sea exit de Level/currTree
        level[width + Math.floor(width/2)] = "E";
        /*
        if(levelnum == 1){
            placeboss1
        } 
        else{
        placeboss2
        }
        */
    }


    //Ahora sí poner jugador (llevo unac antidad ridicula de tiempo checando el error y era que a veces no había jugador xd)
    placeX("@");
    
    let levelString = "";
    for (let i = 0; i<height; i++){
        levelString += level.slice(i*width, (i+1)*width).join("")+"\n";
    }
    console.log(levelString)
    return levelString;
}

//Ejemplo de profe
/*
let GAME_LEVELS = [`
................
.##############.
.#............#.
.#............#.
.#......#######.
.#............#.
.#......@.....#.
.#............#.
.##############.
................
`,`
............................
.############*#############.
.#v................v......#.
.#..........$............t#.
.########.......###########.
.#t.............#.........#.
.#......@.......#.........#.
.#........v...........$...*.
.#.......................v#.
.#########......#.........#.
.#t......#......###########.
.#......v.................#.
.#...................$...t#.
.#.......#...............v#.
.###########*##############.
............................
`];

*/

//Test random lev
let stringLev = levGen(cols, rows, 1);
let GAME_LEVELS = [stringLev];


if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = GAME_LEVELS;
if (typeof global != "undefined" && !global.GAME_LEVELS)
  global.GAME_LEVELS = GAME_LEVELS;


/*
function main() {
    for (let i = 0; i < 10; i++) {
        levGen(
            Math.floor(Math.random() * (25 - 15) + 15),
            Math.floor(Math.random() * (15 - 10) + 10),
            3, // torches
            2, // enemies
            2  // cards
        );
        console.log("Test " + i);
    }
}

main();

*/