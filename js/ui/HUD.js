/**
 * HUD class - manages the heads-up display during gameplay
 */

export class HUD {
  constructor() {
    this.elements = {
      health: document.getElementById('health-fill'),
      score: document.getElementById('score'),
      level: document.getElementById('level'),
      hud: document.getElementById('hud')
    };
    
    this.isVisible = false;
  }
  
  show() {
    this.elements.hud.classList.remove('hidden');
    this.isVisible = true;
  }
  
  hide() {
    this.elements.hud.classList.add('hidden');
    this.isVisible = false;
  }
  
  updateHealth(current, max) {
    if (!this.elements.health) return;
    
    const percentage = Math.max(0, (current / max) * 100);
    this.elements.health.style.width = `${percentage}%`;
    
    // Change color based on health percentage
    if (percentage > 60) {
      this.elements.health.style.background = 'linear-gradient(90deg, #00ff00 0%, #88ff00 100%)';
    } else if (percentage > 30) {
      this.elements.health.style.background = 'linear-gradient(90deg, #ffaa00 0%, #ff6600 100%)';
    } else {
      this.elements.health.style.background = 'linear-gradient(90deg, #ff0040 0%, #cc0000 100%)';
    }
  }
  
  updateScore(score) {
    if (!this.elements.score) return;
    this.elements.score.textContent = `Score: ${score.toLocaleString()}`;
  }
  
  updateLevel(level) {
    if (!this.elements.level) return;
    this.elements.level.textContent = `Level: ${level}`;
  }
  
  // Add visual feedback for important events
  flashElement(elementId, color = '#ffffff', duration = 200) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const originalColor = element.style.color;
    element.style.color = color;
    element.style.textShadow = `0 0 10px ${color}`;
    
    setTimeout(() => {
      element.style.color = originalColor;
      element.style.textShadow = '';
    }, duration);
  }
  
  showLevelUp() {
    this.flashElement('level', '#00bfff', 500);
  }
  
  showDamage() {
    // Flash the health bar red briefly
    const healthBar = document.getElementById('health-bar');
    if (healthBar) {
      healthBar.style.boxShadow = '0 0 20px #ff0040';
      setTimeout(() => {
        healthBar.style.boxShadow = '';
      }, 300);
    }
  }
}