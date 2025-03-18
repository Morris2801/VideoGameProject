import { GameObject } from './engine.js';

// Base Interactable (cofrecito)
export class BaseInteractable extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}
