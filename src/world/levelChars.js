import { GameObject, Rect } from '/src/engine/engine.js';
import { BasePlayer } from '/src/entities/player.js';
import { BaseCard } from '/src/items/card.js';
import { Torch } from '/src/world/noInteractableObject.js';

// Lectura de chars para armar nivel
export const levelChars = {
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
    
    
    
    // Cartas
    "$": {objClass: BaseCard,
        label: "card",
        sprite: '../assets/heartCard.jpeg',
        rect: new Rect(0, 0, 80, 150)},
    
    
    // Personajes
    "@": {objClass: BasePlayer,
        label: "player",
        sprite: '../assets/testSpriteSheet.png',
        rect: new Rect(0, 0, 65, 76),
        sheetCols: 6,
        startFrame: [0, 0]},
    
    
};
