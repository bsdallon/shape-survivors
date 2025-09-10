/**
 * GameEngine class - handles core game systems and utilities
 */

export class GameEngine {
  constructor() {
    this.lastTime = 0;
    this.deltaTime = 0;
    this.fps = 0;
    this.frameCount = 0;
    this.lastFpsUpdate = 0;
  }
  
  updateDeltaTime(currentTime) {
    this.deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Calculate FPS
    this.frameCount++;
    if (currentTime - this.lastFpsUpdate >= 1000) {
      this.fps = this.frameCount;
      this.frameCount = 0;
      this.lastFpsUpdate = currentTime;
    }
    
    return this.deltaTime;
  }
  
  // Utility functions for game development
  static lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  static randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  static distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  static angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }
  
  static normalizeAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
  
  // Vector utilities
  static vectorLength(x, y) {
    return Math.sqrt(x * x + y * y);
  }
  
  static vectorNormalize(x, y) {
    const length = this.vectorLength(x, y);
    if (length === 0) return { x: 0, y: 0 };
    return { x: x / length, y: y / length };
  }
  
  static vectorAdd(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y };
  }
  
  static vectorSubtract(v1, v2) {
    return { x: v1.x - v2.x, y: v1.y - v2.y };
  }
  
  static vectorMultiply(vector, scalar) {
    return { x: vector.x * scalar, y: vector.y * scalar };
  }
  
  static vectorDot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
}