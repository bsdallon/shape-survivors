# Shape Survivors - Development Documentation

## Project Structure

```
shape-survivors/
├── index.html              # Main entry point
├── package.json            # Project configuration
├── .gitignore             # Git ignore rules
├── README.md              # Project overview
├── css/                   # Stylesheets
│   ├── variables.css      # CSS custom properties (design system)
│   ├── styles.css         # Main stylesheet
│   └── components/        # Component-specific styles (future)
├── js/                    # JavaScript modules
│   ├── main.js           # Application entry point
│   ├── game/             # Core game logic
│   │   ├── Game.js       # Main game class
│   │   ├── Player.js     # Player triangle
│   │   ├── Enemy.js      # Enemy shapes
│   │   └── GameEngine.js # Game utilities
│   ├── ui/               # User interface
│   │   ├── Menu.js       # Menu system
│   │   └── HUD.js        # Heads-up display
│   └── utils/            # Utility functions
│       ├── math.js       # Math utilities
│       └── collision.js  # Collision detection
├── assets/               # Game assets
│   ├── audio/           # Sound effects and music
│   └── images/          # Images and sprites
└── docs/                # Documentation
    ├── README.md        # This file
    ├── game-design.md   # Game design document
    └── api.md           # Code API documentation
```

## Architecture Overview

### Modular Design
The project uses ES6 modules for clean separation of concerns:

- **main.js**: Application bootstrap and high-level state management
- **Game.js**: Core game loop, entity management, and game state
- **Player.js**: Player character (triangle) with movement and abilities
- **Enemy.js**: Enemy entities with various geometric shapes
- **GameEngine.js**: Utility functions and game engine helpers

### UI System
- **Menu.js**: Handles all menu screens (main, instructions, game over)
- **HUD.js**: Manages in-game UI elements (health, score, level)

### Utility Libraries
- **math.js**: Mathematical functions for game development
- **collision.js**: Collision detection algorithms

## Design Principles

### Scalability
- Modular architecture allows easy addition of new features
- Utility classes provide reusable functionality
- CSS custom properties enable consistent theming
- Clear separation between game logic and presentation

### Performance
- Efficient collision detection
- Object pooling ready (for future optimization)
- Canvas-based rendering for smooth gameplay
- RequestAnimationFrame for smooth animations

### Maintainability
- Clear code organization
- Comprehensive documentation
- Consistent naming conventions
- ES6 modules for dependency management

## Getting Started

1. Clone the repository
2. Open `index.html` in a web browser, or
3. Run a local server: `npm run dev` (serves on http://localhost:8000)

## Development Workflow

### Adding New Enemy Types
1. Modify `Enemy.js` to add new shapes in `getRandomType()` and `setupByType()`
2. Implement drawing logic in the appropriate draw method
3. Adjust balance in the setup method

### Adding New Features
1. Create new modules in appropriate directories
2. Import and integrate with existing systems
3. Update documentation

### Styling Changes
1. Use CSS custom properties in `variables.css` for consistent theming
2. Add component-specific styles in `css/components/`
3. Follow existing naming conventions

## Future Enhancements

### Planned Features
- Power-up system
- Weapon upgrades
- Particle effects
- Sound system
- Local storage for high scores
- Mobile touch controls
- Multiple game modes

### Technical Improvements
- Object pooling for performance
- Sprite-based rendering option
- WebGL acceleration
- Progressive Web App features
- Automated testing

## Contributing

1. Follow the existing code style
2. Add documentation for new features
3. Test thoroughly across different browsers
4. Keep commits small and focused