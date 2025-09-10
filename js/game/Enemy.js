/**
 * Enemy class - represents various geometric enemy shapes
 */

export class Enemy {
  constructor(x, y, level = 1) {
    this.x = x;
    this.y = y;
    this.level = level;
    
    // Randomly choose enemy type
    this.type = this.getRandomType();
    this.setupByType();
    
    // Common properties
    this.health = this.maxHealth;
    this.isAlive = true;
    this.speed = this.baseSpeed * (1 + level * 0.1); // Increase speed with level
    this.damage = Math.floor(this.baseDamage * (1 + level * 0.2)); // Increase damage with level
    
    // Movement
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;
    
    // Visual effects
    this.pulsePhase = Math.random() * Math.PI * 2;
  }
  
  getRandomType() {
    const types = ['square', 'circle', 'pentagon', 'hexagon'];
    const weights = [40, 30, 20, 10]; // Percentage chance
    
    const random = Math.random() * 100;
    let cumulative = 0;
    
    for (let i = 0; i < types.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        return types[i];
      }
    }
    
    return types[0]; // Fallback
  }
  
  setupByType() {
    switch (this.type) {
      case 'square':
        this.size = 12;
        this.baseSpeed = 80;
        this.maxHealth = 20;
        this.baseDamage = 10;
        this.color = '#ff0040';
        this.rotationSpeed = 2;
        break;
        
      case 'circle':
        this.size = 10;
        this.baseSpeed = 120;
        this.maxHealth = 15;
        this.baseDamage = 8;
        this.color = '#ff8800';
        this.rotationSpeed = 0;
        break;
        
      case 'pentagon':
        this.size = 15;
        this.baseSpeed = 60;
        this.maxHealth = 35;
        this.baseDamage = 15;
        this.color = '#8800ff';
        this.rotationSpeed = 1.5;
        break;
        
      case 'hexagon':
        this.size = 18;
        this.baseSpeed = 40;
        this.maxHealth = 50;
        this.baseDamage = 20;
        this.color = '#ff0088';
        this.rotationSpeed = 1;
        break;
    }
  }
  
  update(deltaTime, player, canvas) {
    const dt = deltaTime / 1000;
    
    // Move towards player
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance > 0) {
      this.vx = (dx / distance) * this.speed;
      this.vy = (dy / distance) * this.speed;
    }
    
    // Update position
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    
    // Update rotation
    this.rotation += this.rotationSpeed * dt;
    
    // Update visual effects
    this.pulsePhase += dt * 3;
    
    // Remove if too far off screen
    const margin = 100;
    if (this.x < -margin || this.x > canvas.width + margin ||
        this.y < -margin || this.y > canvas.height + margin) {
      this.isAlive = false;
    }
  }
  
  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Pulsing effect
    const pulse = 1 + Math.sin(this.pulsePhase) * 0.1;
    ctx.scale(pulse, pulse);
    
    // Set colors
    ctx.fillStyle = this.color;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    
    // Draw based on type
    switch (this.type) {
      case 'square':
        this.drawSquare(ctx);
        break;
      case 'circle':
        this.drawCircle(ctx);
        break;
      case 'pentagon':
        this.drawPolygon(ctx, 5);
        break;
      case 'hexagon':
        this.drawPolygon(ctx, 6);
        break;
    }
    
    // Add glow effect
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 5;
    ctx.fill();
    
    ctx.restore();
  }
  
  drawSquare(ctx) {
    ctx.beginPath();
    ctx.rect(-this.size, -this.size, this.size * 2, this.size * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  drawCircle(ctx) {
    ctx.beginPath();
    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  
  drawPolygon(ctx, sides) {
    ctx.beginPath();
    const angleStep = (Math.PI * 2) / sides;
    
    for (let i = 0; i < sides; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = Math.cos(angle) * this.size;
      const y = Math.sin(angle) * this.size;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  
  takeDamage(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      this.isAlive = false;
    }
    
    // Visual feedback
    const originalColor = this.color;
    this.color = '#ffffff';
    setTimeout(() => {
      this.color = originalColor;
    }, 100);
  }
  
  collidesWith(other) {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < (this.size + other.size);
  }
}