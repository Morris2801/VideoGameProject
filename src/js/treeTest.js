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
    constructor(roomNum, levelStringValue = "", downParent = null, enteredFromDir = null) {
        this.roomNum = roomNum;
        this.levelStringValue = levelStringValue;
        this.downParent = downParent; // ya no se usó mucho pero igual ya no es el parent
        this.enteredFromDir = enteredFromDir; // direction from which parent connects
        this.children = { up: null, left: null, right: null, down: null };
        this.doors = {}; // e.g. { left: childNode, right: childNode, up: childNode, down: parentNode }
    }
}

class Tree{ // level tree
    constructor(levNum, numRooms){
        //important info 
        this.levNum = levNum;
        this.numRooms = numRooms; // <- #rooms/level
        this.currentRoomCount = 1; 
        this.root = new TreeNode(1, levGen(cols, rows,1)); //etsroot}
        this.lastRoom = this.root;
    }
    treeGen(node = this.root, enteredFromDir = null) {
        if (this.currentRoomCount >= this.numRooms) {
            this.bossLoc2();
            return;
        }
        let availableDirs = node === this.root
            ? ["up", "left", "right"]
            : ["up", "left", "right", "down"];
        if (enteredFromDir) {
            const backDir = oppositeDirections[enteredFromDir];
            availableDirs = availableDirs.filter(d => d !== backDir);
        }
        const maxPossibleChildren = Math.min(availableDirs.length, this.numRooms - this.currentRoomCount);
        const numChildren = Math.min(Math.floor(Math.random() * 3) + 1, maxPossibleChildren);

        for (let i = availableDirs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [availableDirs[i], availableDirs[j]] = [availableDirs[j], availableDirs[i]];
        }
        for (let i = 0; i < numChildren && availableDirs.length > 0; i++) {
            const dirIndex = Math.floor(Math.random() * availableDirs.length);
            const dir = availableDirs[dirIndex];
            availableDirs.splice(dirIndex, 1);
            this.currentRoomCount++;
            const childRoomNum = this.currentRoomCount;
            const isBossRoom = this.currentRoomCount === this.numRooms;
            const childNode = new TreeNode(childRoomNum, levGen(cols, rows, this.levNum, isBossRoom), node, dir);
            node.children[dir] = childNode;
            node.doors[dir] = childNode;
            childNode.doors[oppositeDirections[dir]] = node;
            this.lastRoom = childNode;
        }
        for (let dir of ["up", "left", "right", "down"]) {
            if (node.children[dir]) {
                this.treeGen(node.children[dir], dir);
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
    /*
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
            if(node.children[dir]){
                this.traverse(node.children[dir], depth + 1, maxDepthFound);
            }
        }
    }*/
    //sets boss room "boss location"
    bossLoc1(){
        let maxDepthFound = {
            maxDepth: -1, 
            bossRoom: null
        }
        this.traverse(this.root, 0, maxDepthFound);
        if(maxDepthFound.bossRoom){
            maxDepthFound.bossRoom.isBossRoom = true;
            console.log(`Llv ${this.levNum} Boss room: ${maxDepthFound.bossRoom.roomNum}, depth: ${maxDepthFound.maxDepth}`);
        }
    }
    bossLoc2() {
        let candidate = this.lastRoom;
        while (candidate && candidate.enteredFromDir === "down") {
            candidate = candidate.downParent;
        }
        if(candidate){
            candidate.isBossRoom = true;
            console.log(`Llv ${this.levNum} Boss room: ${candidate.roomNum}`);
        } else {
            console.log("No valid boss room found (not in a down child)");
        }
    }
    printTreeStructure(node = this.root, indent = "") {
        if (!node) return;
        console.log(`${indent}Room ${node.roomNum}`);
        for (let dir of ["up", "left", "right", "down"]) {
            if (node.children[dir]) {
                console.log(`${indent}  └─${dir}→`); // los chars los saqué de internet
                this.printTreeStructure(node.children[dir], indent + "    ");
            }
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
#include <sstream> class NodoArbol{
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
}; int main(){
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
    file.close();     std::cout << "Preorden:\n"; 
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
    //miArbol.search(miArbol.raiz, 110);      return 0; 
} 
*/