/**
 * Main Game class - handles game loop, state management, and coordination
 */

import { Player } from './Player.js';
import { GameEngine } from './GameEngine.js';
import { Enemy } from './Enemy.js';

export class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.engine = new GameEngine();
    
    // Game state
    this.isRunning = false;
    this.isPaused = false;
    this.score = 0;
    this.level = 1;
    this.gameStartTime = 0;
    
    // Game objects
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.powerUps = [];
    
    // Input handling
    this.keys = {};
    
    // Game settings
    this.enemySpawnRate = 1000; // milliseconds
    this.lastEnemySpawn = 0;
    
    this.init();
  }
  
  init() {
    // Initialize player
    this.player = new Player(
      this.canvas.width / 2,
      this.canvas.height / 2
    );
    
    console.log('Game initialized');
  }
  
  start() {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.isPaused = false;
    this.gameStartTime = Date.now();
    this.lastEnemySpawn = Date.now();
    
    // Reset game state
    this.score = 0;
    this.level = 1;
    this.enemies = [];
    this.projectiles = [];
    this.powerUps = [];
    
    // Reset player
    this.player.reset(this.canvas.width / 2, this.canvas.height / 2);
    
    // Start game loop
    this.gameLoop();
    
    console.log('Game started');
  }
  
  stop() {
    this.isRunning = false;
    this.isPaused = false;
    console.log('Game stopped');
  }
  
  pause() {
    this.isPaused = true;
    console.log('Game paused');
  }
  
  resume() {
    this.isPaused = false;
    this.gameLoop();
    console.log('Game resumed');
  }
  
  gameLoop() {
    if (!this.isRunning || this.isPaused) return;
    
    // Calculate delta time
    const currentTime = Date.now();
    const deltaTime = Math.min(currentTime - (this.lastFrameTime || currentTime), 16);
    this.lastFrameTime = currentTime;
    
    // Update game state
    this.update(deltaTime);
    
    // Render frame
    this.render();
    
    // Check game over condition
    if (this.player.health <= 0) {
      this.endGame();
      return;
    }
    
    // Continue loop
    requestAnimationFrame(() => this.gameLoop());
  }
  
  update(deltaTime) {
    // Update player
    this.player.update(deltaTime, this.keys, this.canvas);
    
    // Spawn enemies
    this.spawnEnemies();
    
    // Update enemies
    this.enemies.forEach(enemy => {
      enemy.update(deltaTime, this.player, this.canvas);
    });
    
    // Update projectiles
    this.projectiles.forEach(projectile => {
      projectile.update(deltaTime, this.canvas);
    });
    
    // Check collisions
    this.checkCollisions();
    
    // Remove dead objects
    this.cleanup();
    
    // Update level and difficulty
    this.updateLevel();
  }
  
  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw background pattern (optional)
    this.drawBackground();
    
    // Draw player
    this.player.draw(this.ctx);
    
    // Draw enemies
    this.enemies.forEach(enemy => enemy.draw(this.ctx));
    
    // Draw projectiles
    this.projectiles.forEach(projectile => projectile.draw(this.ctx));
    
    // Draw power-ups
    this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
  }
  
  drawBackground() {
    // Simple grid pattern
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    this.ctx.lineWidth = 1;
    
    const gridSize = 50;
    
    for (let x = 0; x < this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    
    for (let y = 0; y < this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }
  
  spawnEnemies() {
    const currentTime = Date.now();
    if (currentTime - this.lastEnemySpawn > this.enemySpawnRate) {
      this.spawnEnemy();
      this.lastEnemySpawn = currentTime;
    }
  }
  
  spawnEnemy() {
    // Spawn enemy at random edge of screen
    const side = Math.floor(Math.random() * 4);
    let x, y;
    
    switch (side) {
      case 0: // Top
        x = Math.random() * this.canvas.width;
        y = -20;
        break;
      case 1: // Right
        x = this.canvas.width + 20;
        y = Math.random() * this.canvas.height;
        break;
      case 2: // Bottom
        x = Math.random() * this.canvas.width;
        y = this.canvas.height + 20;
        break;
      case 3: // Left
        x = -20;
        y = Math.random() * this.canvas.height;
        break;
    }
    
    const enemy = new Enemy(x, y, this.level);
    this.enemies.push(enemy);
  }
  
  checkCollisions() {
    // Player vs enemies
    this.enemies.forEach((enemy, enemyIndex) => {
      if (this.player.collidesWith(enemy)) {
        this.player.takeDamage(enemy.damage);
        this.enemies.splice(enemyIndex, 1);
        
        // Update health UI
        this.updateHealthUI();
      }
    });
  }
  
  cleanup() {
    // Remove dead enemies
    this.enemies = this.enemies.filter(enemy => enemy.isAlive);
    
    // Remove off-screen projectiles
    this.projectiles = this.projectiles.filter(projectile => 
      projectile.x >= -50 && projectile.x <= this.canvas.width + 50 &&
      projectile.y >= -50 && projectile.y <= this.canvas.height + 50
    );
  }
  
  updateLevel() {
    const gameTime = Date.now() - this.gameStartTime;
    const newLevel = Math.floor(gameTime / 30000) + 1; // Level up every 30 seconds
    
    if (newLevel > this.level) {
      this.level = newLevel;
      this.enemySpawnRate = Math.max(300, 1000 - (this.level * 50)); // Faster spawning
      this.updateLevelUI();
    }
  }
  
  updateScore(points) {
    this.score += points;
    this.updateScoreUI();
  }
  
  updateScoreUI() {
    // This will be called by main.js event system
    if (window.shapeSurvivors) {
      window.shapeSurvivors.onScoreUpdate(this.score);
    }
  }
  
  updateLevelUI() {
    if (window.shapeSurvivors) {
      window.shapeSurvivors.onLevelUpdate(this.level);
    }
  }
  
  updateHealthUI() {
    if (window.shapeSurvivors) {
      window.shapeSurvivors.onHealthUpdate(this.player.health, this.player.maxHealth);
    }
  }
  
  endGame() {
    this.stop();
    if (window.shapeSurvivors) {
      window.shapeSurvivors.onGameOver(this.score);
    }
  }
  
  handleKeyDown(event) {
    this.keys[event.code] = true;
  }
  
  handleKeyUp(event) {
    this.keys[event.code] = false;
  }
  
  handleResize() {
    // Handle canvas resize
    console.log('Game handling resize');
  }
}