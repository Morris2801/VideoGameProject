"use strict";


function levGen(width, heigth, card, torch, vine, door){
    
}


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

if (typeof module != "undefined" && module.exports && (typeof window == "undefined" || window.exports != exports))
  module.exports = GAME_LEVELS;
if (typeof global != "undefined" && !global.GAME_LEVELS)
  global.GAME_LEVELS = GAME_LEVELS;
