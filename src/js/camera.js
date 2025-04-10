
// Clase Camara
class Camera {
    constructor(targetX, targetY) {
        this.x = targetX;
        this.y = targetY;
        this.smoothing = 0.1; // Factor de suavizado (0-1)
        this.zoomLevel =2.2;
    }
    
    follow(targetX, targetY) {
        // Movimiento suave de la cámara hacia el objetivo
        this.x += (targetX - this.x) * this.smoothing;
        this.y += (targetY - this.y) * this.smoothing;
    }
}