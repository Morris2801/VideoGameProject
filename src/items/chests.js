import { GameObject } from '../engine/engine.js';

// Base Interactable (cofrecito)
export class BaseInteractable extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}
