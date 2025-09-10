/**
 * Menu class - handles all menu screens and UI interactions
 */

export class Menu {
  constructor() {
    this.currentScreen = 'main';
    this.init();
  }
  
  init() {
    // Set up initial state
    this.showMain();
  }
  
  showMain() {
    this.hideAll();
    document.getElementById('menu').classList.remove('hidden');
    this.currentScreen = 'main';
  }
  
  showInstructions() {
    this.hideAll();
    document.getElementById('instructions').classList.remove('hidden');
    this.currentScreen = 'instructions';
  }
  
  showGameOver(finalScore) {
    this.hideAll();
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').textContent = `Final Score: ${finalScore}`;
    this.currentScreen = 'gameOver';
  }
  
  hide() {
    this.hideAll();
    this.currentScreen = null;
  }
  
  hideAll() {
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
  }
  
  // Utility methods for smooth transitions
  fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.classList.remove('hidden');
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      
      element.style.opacity = Math.min(progress, 1);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  fadeOut(element, duration = 300) {
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      
      element.style.opacity = Math.max(1 - progress, 0);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.classList.add('hidden');
      }
    };
    
    requestAnimationFrame(animate);
  }
}