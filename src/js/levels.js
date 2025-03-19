let maxCols = 26;
let minCols = 19;
let maxRows = 17;
let minRows = 12;
let cols = Math.floor(Math.random() * (maxCols - minCols) + maxCols);
let rows = Math.floor(Math.random() * (maxRows - minRows) + minRows); 


function levGen(width, height, numEnemies, numCards){
    let level = [];
    let cells = width * height; 
    let perim = 2*width + 2*height;
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
    //enemiesTest
    /*
    for (let i = 0; i < numEnemies; i++){
        placeX("e");
    }
    */
    //cardsTest
    for (let i = 0; i < numCards; i++){
        placeX("$");
    }

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
let stringLev = levGen(cols, rows, 3, 2);
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