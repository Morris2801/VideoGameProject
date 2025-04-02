// Base Interactable (cofrecito)
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
    isNear(player){
        const distance = this.position.distanceTo(player.position);
        return distance < this.detectionRange;
    }
    interact(player){
        if(!this.isOpened && this.isNear(player)){
            this.isOpened = true; 
            player.vasesBroken +=1;  
            console.log("Vase opened");
            this.dropCard(this.position);
            this.status = "opened"; 
        }
        else{
            return;
        }
    }
}