// Stack DataStruct pero con otro nombre
class Inventory {
    constructor() {
      this.items = []; 
      this.max = 6;
    }
    push(element) {
      if (this.items.length < this.max ){
        this.items.push(element);
        return true;
      }
      console.log("Inventory is full");
      return false;
    }
    pop() {
      if (this.isEmpty()) {
        return "Stack is empty"; 
      }
      return this.items.pop();
    }
    peek() {
      if (this.isEmpty()) {
        return "Stack is empty"; 
      }
      return this.items[this.items.length - 1];
    }
    isEmpty() {
      return this.items.length === 0;
    }
    size() {
      return this.items.length;
    }
    print() {
        for(let i = 0; i < this.items.length; i++){
            console.log(items[i]);
        }
    }
}

// Jugador
class BasePlayer extends BaseCharacter {
    constructor(_color, width, height, x, y, _type) {
        super(_color, width, height, x, y, _type);
        this.health = 10;
        this.stamina = 5;
        this.damage = 3;
        this.inventory = new Inventory();

        // Animation Frames: flow for [a,b],[c,d,e]
        // Ex.Dispaly para right: a->c->b->d->e
        // movementFrames: [a,b]; idleFrames: [c,d,e]
        this.setMovementFrames('right',  [6, 11], [8,7,9,10],);
        this.setMovementFrames('left', [12,15], [16, 14, 13]);
        this.setMovementFrames('up', [19,21], [18,17]);
        this.setMovementFrames('down', [1, 3], [0, 0]);
    }
}