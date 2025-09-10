# Shape Survivors - Game Design Document

## Game Overview

**Title**: Shape Survivors  
**Genre**: Survival Action / Bullet Hell  
**Platform**: Web Browser (HTML5)  
**Technology**: HTML, CSS, JavaScript (Canvas)  

## Core Concept

Shape Survivors is a minimalist geometric battle arena inspired by Vampire Survivors. Players control a green triangle navigating through waves of geometric enemies, surviving as long as possible while the difficulty gradually increases.

## Game Mechanics

### Player Character
- **Shape**: Triangle (green)
- **Movement**: WASD or Arrow Keys
- **Size**: 15px base size
- **Speed**: 200 pixels/second with acceleration and friction
- **Health**: 100 HP with visual health bar
- **Visual Effects**: Trail and glow effects

### Enemy System
- **Types**: Square, Circle, Pentagon, Hexagon
- **Behavior**: Move toward player with different speeds
- **Spawning**: Random edges of screen with increasing frequency
- **Scaling**: Health and damage increase with level

#### Enemy Types
1. **Square** (Red)
   - Size: 12px
   - Speed: 80px/s
   - Health: 20 HP
   - Damage: 10
   - Rotates while moving

2. **Circle** (Orange)
   - Size: 10px
   - Speed: 120px/s
   - Health: 15 HP
   - Damage: 8
   - Fast and agile

3. **Pentagon** (Purple)
   - Size: 15px
   - Speed: 60px/s
   - Health: 35 HP
   - Damage: 15
   - Tanky mid-tier enemy

4. **Hexagon** (Pink)
   - Size: 18px
   - Speed: 40px/s
   - Health: 50 HP
   - Damage: 20
   - Heavy, slow boss-type enemy

### Progression System
- **Levels**: Increase every 30 seconds
- **Difficulty Scaling**:
  - Enemy spawn rate increases
  - Enemy health and damage scale with level
  - New enemy types unlock at higher levels

### Visual Design
- **Art Style**: Minimalist geometric shapes with glow effects
- **Color Scheme**: 
  - Player: Bright green (#00ff00)
  - Enemies: Various bright colors
  - Background: Dark with subtle grid pattern
  - UI: Monospace font with neon-style effects

### Audio Design (Future)
- **Music**: Electronic/synthwave ambient tracks
- **Sound Effects**: 
  - Player movement (subtle whoosh)
  - Enemy destruction (geometric pop sounds)
  - Damage taken (warning beep)
  - Level up (power-up chime)

## User Interface

### Main Menu
- Game title with glowing effect
- Start Game button
- Instructions button
- Minimalist design matching game aesthetic

### HUD (Heads-Up Display)
- **Health Bar**: Top-left, color-coded (green → orange → red)
- **Score**: Top-right, increases by destroying enemies
- **Level**: Top-right, shows current difficulty level

### Game Over Screen
- Final score display
- Restart and main menu options
- Clean, consistent with overall design

## Technical Specifications

### Performance Targets
- **Frame Rate**: 60 FPS
- **Canvas Size**: 800x600 (responsive)
- **Entity Limit**: 100+ simultaneous enemies
- **Browser Support**: Modern browsers with ES6 support

### Architecture
- **Modular Design**: ES6 modules for maintainability
- **Game Loop**: RequestAnimationFrame for smooth rendering
- **Collision Detection**: Circle-based for performance
- **State Management**: Simple state machine for game phases

## Future Enhancements

### Phase 2 Features
- **Power-ups**: Temporary abilities and stat boosts
- **Weapons**: Projectile attacks for the player
- **Particle Effects**: Visual feedback for impacts and destruction
- **High Score System**: Local storage for best scores

### Phase 3 Features
- **Multiple Game Modes**: Survival, time attack, boss rush
- **Player Upgrades**: Permanent progression between runs
- **Mobile Controls**: Touch-based movement
- **Achievements**: Goal-based progression system

### Technical Improvements
- **Object Pooling**: Optimize memory usage
- **WebGL**: Enhanced visual effects
- **Progressive Web App**: Offline play capability
- **Multiplayer**: Local co-op mode

## Balancing Philosophy

### Core Principles
1. **Fair Challenge**: Difficulty should feel challenging but fair
2. **Clear Feedback**: Visual and audio cues for all game events
3. **Smooth Progression**: Gradual difficulty increase
4. **Accessibility**: Simple controls, clear visual design

### Tuning Parameters
- **Enemy spawn rates**: Balanced for sustained tension
- **Health scaling**: Linear increase to maintain difficulty curve
- **Movement speeds**: Varied to create different threat types
- **Visual clarity**: High contrast for gameplay readability

## Success Metrics

### Player Engagement
- **Session Length**: Target 3-5 minutes average
- **Retry Rate**: High replay value indicator
- **Progression**: Players should regularly reach new personal bests

### Technical Performance
- **Load Time**: Under 2 seconds on average connections
- **Frame Rate**: Consistent 60 FPS during gameplay
- **Memory Usage**: Stable without leaks during extended play