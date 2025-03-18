import { AnimatedObject } from '/src/engine/engine.js';

export class Torch extends AnimatedObject{
    constructor(_color, width, height, x, y, _type) {
        super("orange", width, height, x, y, "torch");
    }
    update(_level, deltaTime) {
        this.updateFrame(deltaTime);
    }
}