/*
Script Name
- treeTest.js

Team members 
- Mauricio Monroy 
- Hector Lugo
- Nicolás Quintana

Purpose
- Implements a tree data structure (randomly, max 3 child nodes / node) to represent the hierarchical layout of rooms within a level
- Identifies and marks the boss room as the deepest room in the tree
- Provides utility methods for traversing, printing, and managing the tree structure

Classes
- TreeNode: Represents a single room in the tree, storing its room number, level data (layout), parent, children, and whether it is the boss room
- Tree: Manages the overall tree structure, including room generation, traversal, and boss room identification
*/


class TreeNode {
    constructor(roomNum, levelStringValue = "", downParent = null){ 
        // key info  
        this.roomNum = roomNum;
        this.levelStringValue = levelStringValue; // stores level data
        //pointers
        this.downParent = downParent;
        this.children = {
            up: null, 
            left: null, 
            right: null
        }    
        this.isBossRoom = false;
    }
    isLeaf(){
        return this.children.up === null && this.children.left === null && this.children.right === null;
    }
    hasChildren(){
        return !this.isLeaf();
    }
    returnRels(){
        let parRoom = this.downParent ? this.downParent.roomNum : "null";
        let upRoom = this.children.up ? this.children.up.roomNum : "null";
        let leftRoom = this.children.left ? this.children.left.roomNum : "null"; 
        let rightRoom = this.children.right ? this.children.right.roomNum : "null"; 
        return `Room ${this.roomNum}, padre: ${parRoom} -> [U: ${upRoom}, L: ${leftRoom}, R: ${rightRoom}]`;
    }
}

class Tree{ // level tree
    constructor(levNum, numRooms){
        //important info 
        this.levNum = levNum;
        this.numRooms = numRooms; // <- how many rooms per level
        this.currentRoomCount = 1; 
        this.root = new TreeNode(1, levGen(cols, rows,1)); // sets root
    }
    treeGen(node =this.root){
        if(this.currentRoomCount >= this.numRooms){
            this.bossLoc(); // when finished generating #Rooms, sets boss room 
            return; 
        }
        const maxPossibleChildren = this.numRooms - this.currentRoomCount;
        const numChildren = Math.min(Math.floor(Math.random()*3)+1, maxPossibleChildren);
        
        console.log(`levNum ${this.levNum} room ${node.roomNum}, NumChildren: ${numChildren}`);
        let availableDirs = ["up", "left", "right"];
        for(let i = 0; i < numChildren && availableDirs.length > 0; i++){
            const dirIndex = Math.floor(Math.random() * availableDirs.length); // random between 1-3
            const dir = availableDirs[dirIndex]; // removes direction to avoid duplicates
            availableDirs.splice(dirIndex, 1);
            this.currentRoomCount++;
            const childRoomNum = this.currentRoomCount;
            
            //console.log(`Vhild #${i+1}/${numChildren} dir: ${dir}, Rnum: ${childRoomNum}`);
            const isBossRoom = this.currentRoomCount === this.numRooms;
            const childNode = new TreeNode(childRoomNum, levGen(cols, rows, this.levNum, isBossRoom), node);
            node.children[dir] = childNode;
        }
        for(let dir of ["up", "left", "right"]){
            if(node.children[dir]){
                this.treeGen(node.children[dir]); // Recursion per room child
            }
        }
    }
    *posOrden(node = this.root){
        if(node.hasChildren()){
            for(let dir of ["up", "left", "right"]){
                if(node.children[dir]){
                    yield* this.posOrden(node.children[dir]); //yield : kind of like a return, según entendí
                }
            }
        }
        yield node;
    }   
    //debug
    printTree(nodo = this.root, profundidad = 0){
        console.log(" ".repeat(profundidad) + nodo.returnRels());
        for(let dir of ["up", "left", "right"]){
            if(nodo.children[dir]){
                this.printTree(nodo.children[dir], profundidad + 1);
            }
        }

    }
    //find deepest node
    traverse(node, depth, maxDepthFound) {
        if (!node) return;
        if (depth > maxDepthFound.maxDepth) {
            maxDepthFound.maxDepth = depth;
            maxDepthFound.bossRoom = node;
        }
        for (let dir of ["up", "left", "right"]) {
            this.traverse(node.children[dir], depth + 1, maxDepthFound);
        }
    }
    //sets boss room "boss location"
    bossLoc(){
        let maxDepthFound = {
            maxDepth: -1, 
            bossRoom: null
        }
        this.traverse(this.root, 0, maxDepthFound);
        if(maxDepthFound.bossRoom){
            maxDepthFound.bossRoom.isBossRoom = true;
            console.log(`Boss room: ${maxDepthFound.bossRoom.roomNum}, depth: ${maxDepthFound.maxDepth}`);
        }
    }
}

//testing
/*
const numRooms = 13; 
const testTree = new Tree(1, numRooms);
testTree.treeGen();

for(let node of testTree.posOrden()){
    console.log(`ROom ${node.roomNum} \n ${node.levelStringValue}`);   
    console.log(`Room ${node.roomNum}`);
}
*/
//console.log("ArbolTest");
//testTree.printTree();






/*Código Victor 3er semestre ref arbol C++
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>

class NodoArbol{
    public: 
        int info; 
        NodoArbol* izq;
        NodoArbol* der; 
 
        NodoArbol(int info){
            this-> info = info; 
            izq = nullptr; 
            der = nullptr; 
        }
        void setInfo(int dato){
            info = dato; 
        }
        void setIzq(NodoArbol* izq){
            this -> izq = izq; 
        }
        void setDer(NodoArbol* der){
            this -> der = der; 
        }
        int getInfo(){
            return info; 
        }
        NodoArbol* getIzq(){
            return izq; 
        }
        NodoArbol* getDer(){
            return der; 
        }
};
class Tree{
    public: 
        NodoArbol* raiz = nullptr; 
        void crearArbol(NodoArbol* &r){
            std::cout << "Ingrese dato: "; 
            int input; 
            std::cin >> input;
            r = new NodoArbol(input);
            char resp; 
            std::cout << "El nodo " << input << " tiene hijo izquierdo? (y/n): "; 
            std::cin>>resp;
            if (resp=='y'){
                crearArbol(r->izq); 
            }
            std::cout << "El nodo " << input << " tiene hijo derecho? (y/n): "; 
            std::cin>>resp;
            if (resp=='y'){
                crearArbol(r->der); 
            }
        }
        NodoArbol* crearArbol(){
            std::cout << "Ingrese dato: "; 
            int input; 
            std::cin >> input;
            NodoArbol *p = new NodoArbol(input);
            char resp; 
            std::cout << "El nodo " << input << " tiene hijo izquierdo? (y/n): "; 
            std::cin>>resp;
            if (resp=='y'){
                p->izq = crearArbol(); 
            }
            std::cout << "El nodo " << input << " tiene hijo derecho? (y/n): "; 
            std::cin>>resp;
            if (resp=='y'){
                p->der = crearArbol(); 
            }
            return p; 
        }
        void preorden(NodoArbol *p){
            if (p != nullptr){
                std::cout << p->info << " "; 
                preorden(p->izq);
                preorden(p->der);
            }
        }
        void inorden(NodoArbol *p){
            if (p!= nullptr){
                inorden(p->izq); 
                std::cout << p->info << " "; 
                inorden(p->der); 
            }
        }
        void posorden(NodoArbol *p){
            if (p!=nullptr){
                posorden(p->izq); 
                posorden(p->der); 
                std::cout << p->info << " " ; 
            }
        }
        NodoArbol* search(NodoArbol* r, int dato){
            if (r!=nullptr){
                if (dato < r->info)
                    r = search(r->izq, dato); 
                else if (dato > r->info)
                    r = search(r->der, dato); 
            }
            return r; 
        }
        void insert(NodoArbol* &r, int dato){
            if (r!= nullptr){
                if (dato < r->info)
                    insert(r->izq, dato);
                else if (dato > r->info)
                    insert(r->der, dato); 
                else
                    std::cout << "Error. No hay duplicados.\n";
            }
            else
                r = new NodoArbol(dato); 
        }
        void eliminar(NodoArbol* &r, int dato){
            if (r!= nullptr){
                if (r->info < dato){
                    eliminar(r->izq, dato); 
                }
                else if (r->info>dato){
                    eliminar(r->der, dato); 
                }
                else {
                    if (r->izq == nullptr && r->der == nullptr){
                        delete r; 
                    }
                    else if (r->izq != nullptr && r->der != nullptr){
                        NodoArbol* ptr = r->izq; 
                        while (ptr != nullptr){
                            ptr = ptr->der;
                        }
                        
                    }
                    else if (r->izq != nullptr || r->der != nullptr){
                        if (r->izq != nullptr){
                            r = r->izq; 
                            delete r->izq; 
                        }
                        else{
                            r= r->der; 
                            delete r->der; 
                        }
                    }
                     
                }
            }
        }
};

int main(){
    Tree miArbol; 
    /*miArbol.crearArbol(miArbol.raiz); //Implementación de crearArbol(NodoArbol* &r)
    miArbol.raiz = miArbol.crearArbol(); // La otra
    miArbol.insert(miArbol.raiz, 5); 
    miArbol.insert(miArbol.raiz, 1); 
    miArbol.insert(miArbol.raiz, 0); 
    miArbol.insert(miArbol.raiz, 2); 
    miArbol.insert(miArbol.raiz, 7); 
    
   
    std::ifstream file;
    file.open("leerarchivo.txt");
    std::string line; // Para leer línea por línea
    while(std::getline(file, line)){
        std::stringstream ss(line);
        int data; 
        ss >> data;
        miArbol.insert(miArbol.raiz, data);
    }
    file.close();

    std::cout << "Preorden:\n"; 
    miArbol.preorden(miArbol.raiz);
    std::cout << std::endl << "Inorden:\n";
    miArbol.inorden(miArbol.raiz); 
    std::cout << std::endl << "Posorden:\n";
    miArbol.posorden(miArbol.raiz); 
    
    if (miArbol.search(miArbol.raiz, 8) != nullptr){
        std::cout << "\nEncontrado\n"; 
    }
    else{
        std::cout << "\nNo lo encontró\n"; 
    }
    //miArbol.search(miArbol.raiz, 110); 

    return 0; 
}


*/

