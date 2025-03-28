let maxCols = 21;
let minCols = 18;
let maxRows = 10;
let minRows = 8;
let cols = Math.floor(Math.random() * (maxCols - minCols) + maxCols);
let rows = Math.floor(Math.random() * (maxRows - minRows) + minRows); 

const enemyProbabilitiesLvl1 = [
    {type: "M", prob : 0.4},
    {type: "T", prob : 0.4},
    {type: "W", prob : 0.15},
    {type: "D", prob : 0.05}
]
const enemyProbabilitiesLvl2 = [
    {type: "M", prob: 0.2}, 
    {type: "T", prob: 0.2},
    {type: "W", prob: 0.4},
    {type: "D", prob: 0.2}
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
    // Este no sirve para nada console.log(prob[prob.length -1].type);
    return prob[prob.length -1].type;
}

function levGen(width, height, levelNum, numCards){
    let level = [];
    let cells = width * height; 
    let perim = 2*width + 2*height;
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
    level[width + Math.floor(width/2)] = "*"; //Arriba
    level[width * (height - 2) + 1 + Math.floor(width / 2)] = "*"; //Abajo
    level[width * Math.floor(height / 2) + 1] = "*"; //Izquierda
    level[width * Math.floor(height / 2) + (width - 2)] = "*"; //Derecha

    // Poner cosas revisando que esté en bounds
    function placeX(cosa){
        let pos; 
        do{
            pos = [Math.floor(Math.random() * (width - 4) + 2), Math.floor(Math.random() * (height - 4) + 2)];
        }
        while(level[pos[0] + pos[1] * width] != '.' && level[pos[0] + pos[1] * width] != '*' && level[pos[0] + pos[1] * width] != '#');
        level[pos[0] + pos[1] *width] = cosa;
    }
    
    // Poner cosas (jugador, columnas, ....)
    //placeX("@"); //Jugador <- ya no va aquí, mejor que sea lo último que se pone
    //Columnas
    for (let i = 0; i < Math.floor(cells/7); i++){  // Jugar con la división cells/n para mantener ratio
        placeX("#");
    }
    //Torces
    for (let i = 0; i < Math.floor(cells / 76); i++){// Jugar con la división cells/n para mantener ratio
        placeX("t");
    }
    //Vines
    for (let i = 0; i < Math.floor(cells / 25); i++){// Jugar con la división cells/n para mantener ratio
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
    */
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



    //Forzar que junto a # haya . (floortile)
    level[2* width + Math.floor(width/2)] = "."; //Arriba
    level[width * (height - 3)  + Math.floor(width / 2) +1] = "."; //Abajo 
    level[width * Math.floor(height / 2) + 2] = "."; //Izquierda
    level[width * Math.floor(height / 2) + (width - 3)] = "."; //Derecha
    
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
let stringLev = levGen(cols, rows, 1, 2);
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