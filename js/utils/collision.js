/**
 * Collision detection utilities
 */

export class CollisionUtils {
  // Circle vs Circle collision
  static circleVsCircle(c1x, c1y, r1, c2x, c2y, r2) {
    const dx = c2x - c1x;
    const dy = c2y - c1y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (r1 + r2);
  }
  
  // Rectangle vs Rectangle collision (AABB)
  static rectVsRect(r1x, r1y, r1w, r1h, r2x, r2y, r2w, r2h) {
    return r1x < r2x + r2w &&
           r1x + r1w > r2x &&
           r1y < r2y + r2h &&
           r1y + r1h > r2y;
  }
  
  // Point vs Circle collision
  static pointVsCircle(px, py, cx, cy, radius) {
    const dx = px - cx;
    const dy = py - cy;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
  }
  
  // Point vs Rectangle collision
  static pointVsRect(px, py, rx, ry, width, height) {
    return px >= rx && px <= rx + width && py >= ry && py <= ry + height;
  }
  
  // Circle vs Rectangle collision
  static circleVsRect(cx, cy, radius, rx, ry, width, height) {
    // Find the closest point on the rectangle to the circle
    const closestX = Math.max(rx, Math.min(cx, rx + width));
    const closestY = Math.max(ry, Math.min(cy, ry + height));
    
    // Calculate distance between circle center and closest point
    const dx = cx - closestX;
    const dy = cy - closestY;
    
    return (dx * dx + dy * dy) <= (radius * radius);
  }
  
  // Line vs Line collision
  static lineVsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return false; // Lines are parallel
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
    
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  }
  
  // Get collision response for circle vs circle
  static circleVsCircleResponse(c1x, c1y, r1, c2x, c2y, r2) {
    const dx = c2x - c1x;
    const dy = c2y - c1y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance === 0 || distance > r1 + r2) {
      return null; // No collision or objects at same position
    }
    
    const overlap = r1 + r2 - distance;
    const separationX = (dx / distance) * overlap * 0.5;
    const separationY = (dy / distance) * overlap * 0.5;
    
    return {
      overlap,
      separationX,
      separationY,
      normalX: dx / distance,
      normalY: dy / distance
    };
  }
  
  // SAT (Separating Axis Theorem) for polygon collision
  static polygonVsPolygon(poly1, poly2) {
    const axes = [];
    
    // Get axes for both polygons
    this.getAxes(poly1, axes);
    this.getAxes(poly2, axes);
    
    // Test each axis
    for (let i = 0; i < axes.length; i++) {
      const axis = axes[i];
      
      const proj1 = this.projectPolygon(poly1, axis);
      const proj2 = this.projectPolygon(poly2, axis);
      
      // Check for separation
      if (proj1.max < proj2.min || proj2.max < proj1.min) {
        return false; // Separated on this axis
      }
    }
    
    return true; // No separation found, collision detected
  }
  
  // Helper function to get axes from polygon
  static getAxes(polygon, axes) {
    for (let i = 0; i < polygon.length; i++) {
      const p1 = polygon[i];
      const p2 = polygon[(i + 1) % polygon.length];
      
      const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
      const normal = { x: -edge.y, y: edge.x };
      
      // Normalize
      const length = Math.sqrt(normal.x * normal.x + normal.y * normal.y);
      if (length > 0) {
        normal.x /= length;
        normal.y /= length;
        axes.push(normal);
      }
    }
  }
  
  // Helper function to project polygon onto axis
  static projectPolygon(polygon, axis) {
    let min = Infinity;
    let max = -Infinity;
    
    for (let i = 0; i < polygon.length; i++) {
      const dot = polygon[i].x * axis.x + polygon[i].y * axis.y;
      min = Math.min(min, dot);
      max = Math.max(max, dot);
    }
    
    return { min, max };
  }
}