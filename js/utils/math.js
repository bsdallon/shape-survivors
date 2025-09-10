/**
 * Math utilities for game development
 */

export class MathUtils {
  // Linear interpolation
  static lerp(start, end, factor) {
    return start + (end - start) * factor;
  }
  
  // Clamp value between min and max
  static clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }
  
  // Random number between min and max
  static randomRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // Random integer between min and max (inclusive)
  static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Distance between two points
  static distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  // Angle between two points
  static angle(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1);
  }
  
  // Normalize angle to -PI to PI range
  static normalizeAngle(angle) {
    while (angle > Math.PI) angle -= Math.PI * 2;
    while (angle < -Math.PI) angle += Math.PI * 2;
    return angle;
  }
  
  // Convert degrees to radians
  static degToRad(degrees) {
    return degrees * (Math.PI / 180);
  }
  
  // Convert radians to degrees
  static radToDeg(radians) {
    return radians * (180 / Math.PI);
  }
  
  // Check if point is inside circle
  static pointInCircle(px, py, cx, cy, radius) {
    return this.distance(px, py, cx, cy) <= radius;
  }
  
  // Check if point is inside rectangle
  static pointInRect(px, py, rx, ry, width, height) {
    return px >= rx && px <= rx + width && py >= ry && py <= ry + height;
  }
  
  // Smooth step function for smooth animations
  static smoothStep(edge0, edge1, x) {
    const t = this.clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }
  
  // Easing functions
  static easeInQuad(t) {
    return t * t;
  }
  
  static easeOutQuad(t) {
    return t * (2 - t);
  }
  
  static easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}