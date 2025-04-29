/*
Script Name
- animatedObjects.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Imagined as a centralized file for all animated but basic objects in the game.
- Definition of Torch class to be instantiated in the game as an object that is animated.
*/

class Torch extends AnimatedObject{
    constructor(_color, width, height, x, y, _type) {
        super("orange", width, height, x, y, "torch");
    }
    update(_level, deltaTime) {
        this.updateFrame(deltaTime);
        if(soundEffectsEnabled){
            fire.play();
        }
    }
}