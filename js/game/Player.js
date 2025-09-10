/**
 * Player class - represents the player's triangle character
 */

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15;
    this.speed = 200; // pixels per second
    this.health = 100;
    this.maxHealth = 100;
    this.color = '#00ff00'; // Bright green
    
    // Movement
    this.vx = 0;
    this.vy = 0;
    this.friction = 0.85;
    
    // Visual effects
    this.rotation = 0;
    this.trail = [];
    this.maxTrailLength = 10;
  }
  
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.health = this.maxHealth;
    this.trail = [];
  }
  
  update(deltaTime, keys, canvas) {
    const dt = deltaTime / 1000; // Convert to seconds
    
    // Handle input
    let inputX = 0;
    let inputY = 0;
    
    if (keys['KeyW'] || keys['ArrowUp']) inputY = -1;
    if (keys['KeyS'] || keys['ArrowDown']) inputY = 1;
    if (keys['KeyA'] || keys['ArrowLeft']) inputX = -1;
    if (keys['KeyD'] || keys['ArrowRight']) inputX = 1;
    
    // Normalize diagonal movement
    if (inputX !== 0 && inputY !== 0) {
      inputX *= 0.707; // 1/sqrt(2)
      inputY *= 0.707;
    }
    
    // Apply acceleration
    this.vx += inputX * this.speed * dt;
    this.vy += inputY * this.speed * dt;
    
    // Apply friction
    this.vx *= this.friction;
    this.vy *= this.friction;
    
    // Update position
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    
    // Keep player in bounds
    this.x = Math.max(this.size, Math.min(canvas.width - this.size, this.x));
    this.y = Math.max(this.size, Math.min(canvas.height - this.size, this.y));
    
    // Update rotation based on movement
    if (Math.abs(this.vx) > 1 || Math.abs(this.vy) > 1) {
      this.rotation = Math.atan2(this.vy, this.vx) + Math.PI / 2;
    }
    
    // Update trail
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > this.maxTrailLength) {
      this.trail.shift();
    }
  }
  
  draw(ctx) {
    // Draw trail
    this.drawTrail(ctx);
    
    // Save context for rotation
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Draw triangle
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    ctx.beginPath();
    ctx.moveTo(0, -this.size);
    ctx.lineTo(-this.size * 0.8, this.size * 0.8);
    ctx.lineTo(this.size * 0.8, this.size * 0.8);
    ctx.closePath();
    
    ctx.fill();
    ctx.stroke();
    
    // Draw glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    
    ctx.restore();
  }
  
  drawTrail(ctx) {
    if (this.trail.length < 2) return;
    
    ctx.save();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.3;
    
    ctx.beginPath();
    ctx.moveTo(this.trail[0].x, this.trail[0].y);
    
    for (let i = 1; i < this.trail.length; i++) {
      const alpha = i / this.trail.length;
      ctx.globalAlpha = alpha * 0.3;
      ctx.lineTo(this.trail[i].x, this.trail[i].y);
    }
    
    ctx.stroke();
    ctx.restore();
  }
  
  takeDamage(amount) {
    this.health -= amount;
    this.health = Math.max(0, this.health);
    
    // Visual feedback for damage
    this.color = '#ff4444';
    setTimeout(() => {
      this.color = '#00ff00';
    }, 200);
  }
  
  heal(amount) {
    this.health += amount;
    this.health = Math.min(this.maxHealth, this.health);
  }
  
  collidesWith(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (this.size + other.size);
  }
  
  get isAlive() {
    return this.health > 0;
  }
}