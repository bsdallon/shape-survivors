/**
 * Main entry point for Shape Survivors game
 * Handles initialization and high-level game state management
 */

import { Game } from './game/Game.js';
import { Menu } from './ui/Menu.js';

class ShapeSurvivors {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.game = null;
    this.menu = null;
    this.currentState = 'menu'; // menu, playing, paused, gameOver
    
    this.init();
  }
  
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setup());
    } else {
      this.setup();
    }
  }
  
  setup() {
    // Get canvas and context
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Set canvas size
    this.resizeCanvas();
    
    // Initialize game components
    this.game = new Game(this.canvas, this.ctx);
    this.menu = new Menu();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Start with menu
    this.showMenu();
    
    console.log('Shape Survivors initialized successfully!');
  }
  
  resizeCanvas() {
    // Set a reasonable default size that works on most screens
    const maxWidth = Math.min(800, window.innerWidth * 0.9);
    const maxHeight = Math.min(600, window.innerHeight * 0.9);
    
    this.canvas.width = maxWidth;
    this.canvas.height = maxHeight;
  }
  
  setupEventListeners() {
    // Window resize
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      if (this.game) {
        this.game.handleResize();
      }
    });
    
    // Menu button events
    document.getElementById('start-btn')?.addEventListener('click', () => {
      this.startGame();
    });
    
    document.getElementById('instructions-btn')?.addEventListener('click', () => {
      this.showInstructions();
    });
    
    document.getElementById('back-btn')?.addEventListener('click', () => {
      this.showMenu();
    });
    
    document.getElementById('restart-btn')?.addEventListener('click', () => {
      this.startGame();
    });
    
    document.getElementById('menu-btn')?.addEventListener('click', () => {
      this.showMenu();
    });
    
    // Keyboard events for game
    document.addEventListener('keydown', (event) => {
      if (this.currentState === 'playing' && this.game) {
        this.game.handleKeyDown(event);
      }
      
      // ESC to pause/resume
      if (event.code === 'Escape' && this.currentState === 'playing') {
        this.togglePause();
      }
    });
    
    document.addEventListener('keyup', (event) => {
      if (this.currentState === 'playing' && this.game) {
        this.game.handleKeyUp(event);
      }
    });
  }
  
  startGame() {
    this.currentState = 'playing';
    this.menu.hide();
    this.game.start();
    
    // Show HUD
    document.getElementById('hud').classList.remove('hidden');
  }
  
  showMenu() {
    this.currentState = 'menu';
    this.menu.showMain();
    
    if (this.game) {
      this.game.stop();
    }
    
    // Hide HUD and other screens
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('instructions').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
  }
  
  showInstructions() {
    this.menu.showInstructions();
  }
  
  showGameOver(finalScore) {
    this.currentState = 'gameOver';
    this.menu.showGameOver(finalScore);
    
    // Hide HUD
    document.getElementById('hud').classList.add('hidden');
  }
  
  togglePause() {
    if (this.currentState === 'playing') {
      this.currentState = 'paused';
      this.game.pause();
    } else if (this.currentState === 'paused') {
      this.currentState = 'playing';
      this.game.resume();
    }
  }
  
  // Game event handlers
  onGameOver(finalScore) {
    this.showGameOver(finalScore);
  }
  
  onScoreUpdate(score) {
    document.getElementById('score').textContent = `Score: ${score}`;
  }
  
  onLevelUpdate(level) {
    document.getElementById('level').textContent = `Level: ${level}`;
  }
  
  onHealthUpdate(health, maxHealth) {
    const healthFill = document.getElementById('health-fill');
    const percentage = (health / maxHealth) * 100;
    healthFill.style.width = `${percentage}%`;
  }
}

// Initialize the game when the script loads
const shapeSurvivors = new ShapeSurvivors();

// Make it globally available for game events
window.shapeSurvivors = shapeSurvivors;