# 🐍 Snake Game

A modern implementation of the classic Snake game built with Next.js, React, and TypeScript. This project showcases interactive game development using modern web technologies.

## 🎥 Gameplay Demo

<video width="100%" controls>
  <source src="./assets/video/snake.mov" type="video/quicktime">
  Your browser does not support the video tag.
</video>

## 🎮 Game Features

- Responsive game board that adapts to screen size
- Smooth snake movement and controls
- Score tracking
- Collision detection
- Game over state handling
- Modern, clean UI

## 🛠️ Technologies Used

- **Framework:** Next.js 15.2.3
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** React Hooks
- **Game Loop:** Custom hook implementation

## 🎯 Game Components

The game is built using a modular component architecture:

```
snakeGame/
├── components/
│   ├── Board/       # Game board implementation
│   └── Snake/       # Snake movement and rendering
├── hooks/           # Custom game logic hooks
├── consts.ts        # Game constants
├── index.tsx        # Main game component
└── page.tsx         # Next.js page component
```

## 🕹️ How to Play

1. Use the arrow keys to control the snake's direction:
   - ⬆️ Up Arrow: Move up
   - ⬇️ Down Arrow: Move down
   - ⬅️ Left Arrow: Move left
   - ➡️ Right Arrow: Move right

2. Collect food to grow the snake and increase your score
3. Avoid hitting the walls or the snake's own body
4. Try to achieve the highest score possible!

## 🚀 Getting Started

1. Navigate to the game:
```bash
# From the main portfolio page
Click on "Snake" in the navigation
# Or visit directly
/projects/snakeGame
```

2. The game will start automatically
3. Use arrow keys to control the snake
4. Press any key to restart after game over

## 🎨 Customization

The game can be customized by modifying:
- Board dimensions in `index.tsx`
- Game speed and other constants in `consts.ts`
- Snake appearance in the Snake component
- Board styling in the Board component

## 🔧 Development

To modify or enhance the game:

1. Navigate to the game directory:
```bash
cd src/app/projects/snakeGame
```

2. Main components:
- `components/Board/`: Handles game board rendering and state
- `components/Snake/`: Manages snake movement and rendering
- `hooks/`: Contains game logic and state management
- `consts.ts`: Game configuration constants

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📝 License

This project is open source and available under the MIT License.
