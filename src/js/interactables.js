/*
Script Name
- interactables.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Centralized file for managing interactable objects (vases) in the game.

Classes
- BaseInteractable: Base class for all interactable objects.
- Vase: Represents a vase that can be broken to obtain cards.
*/

class BaseInteractable extends GameObject{
    constructor(position,width,height,color,type){
        super(position,width,height,color,type);
    }
}
//Por si quieren hacer algo interesante con la clase de arriba idk para qué la pensé ^

class Vase extends BaseInteractable {
    constructor(position, width, height, color, type){
        super(position, width, height, color, type);
        this.isOpened = false; 
        this.detectionRange = 1.5;
        this.type = "vase";
        this.status = "closed"
    }
    // check if the vase is near the player
    isNear(player){
        const distance = this.position.distanceTo(player.position);
        return distance < this.detectionRange;
    }
    //opening logic"
    interact(player){
        if(!this.isOpened && this.isNear(player)){
            this.isOpened = true; 
            player.vasesBroken +=1;
            player.score += 50;
            console.log("Vase opened");
            this.dropCard(this.position);
            this.status = "opened";
        }
        else{
            return;
        }
    }
}