# 🐔🍌 Chicken Banana Game

A modern, responsive tile-clicking game built with React. Choose your side and find all your tiles before your opponent!

![Game Screenshot](public/logo512.png)

## 🎮 About

Chicken Banana is an engaging grid-based tile game where players compete to find all their assigned tiles. The game features a coin flip to determine who goes first, strategic gameplay, and a sleek modern interface with responsive design.

## ✨ Features

### 🎯 Core Gameplay
- **Interactive tile grid** with hover effects and smooth animations
- **Coin flip mechanism** to determine starting player
- **Strategic gameplay** - wrong clicks give opponents bonus points
- **Real-time scoring** and tile tracking
- **Game state management** with setup, playing, and finished states

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices (mobile, tablet, desktop)
- **Smooth animations** and transitions using CSS3
- **Glass morphism effects** with backdrop blur
- **Accessibility features** including keyboard navigation and screen reader support
- **Dark theme** with gold accents for premium feel
- **Loading states** and error handling

### 📱 Mobile Optimized
- **Touch-friendly** interface with proper touch targets
- **Adaptive grid** that resizes based on screen size
- **Landscape/portrait** mode optimization
- **PWA ready** - can be installed as a mobile app

### 🛠️ Technical Excellence
- **Modern React hooks** for state management
- **Component-based architecture** for maintainability
- **Custom hooks** for responsive design and game logic
- **Optimized performance** with image preloading
- **Clean code structure** following best practices

## 🚀 Technologies Used

- **React 19.1.0** - Latest React with modern features
- **CSS3** - Advanced styling with custom properties and animations
- **JavaScript ES6+** - Modern JavaScript features
- **HTML5** - Semantic markup with accessibility in mind
- **Progressive Web App** - PWA capabilities for mobile installation

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

## 🔧 Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Chibogs/ChickenBanana.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd chicken-banana
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## 🎯 How to Play

### Game Setup
1. **Choose Your Side**: Select either Chicken 🐔 or Banana 🍌
2. **Coin Flip**: Watch the animated coin flip to see who goes first
3. **Game Begins**: The grid appears with numbered tiles

### Gameplay
1. **Take Turns**: Players alternate clicking tiles
2. **Find Your Tiles**: Click tiles to reveal if they contain your assigned item
3. **Avoid Wrong Tiles**: Clicking opponent's tiles gives them +5 bonus points
4. **Win Conditions**: 
   - Find all 18 of your tiles to win
   - Force opponent to click wrong tile for instant victory

### Scoring
- **+1 point** for each correct tile found
- **+5 points** if opponent clicks your tile (instant win)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CoinFlip.js     # Animated coin flip component
│   ├── GameBoard.js    # Main game grid
│   ├── GameControls.js # New game, quit buttons
│   ├── GameMessage.js  # Status messages
│   ├── GameTile.js     # Individual tile component
│   ├── PlayerSelection.js # Team selection
│   └── ScoreBoard.js   # Score display
├── hooks/              # Custom React hooks
│   ├── useGameState.js # Game logic and state
│   └── useResponsive.js # Responsive design hook
├── utils/              # Utility functions
│   ├── gameLogic.js    # Game rules and logic
│   └── images.js       # Image handling utilities
├── styles/             # Global styles
│   └── globals.css     # CSS variables and base styles
├── App.js             # Main app component
├── App.css            # App-specific styles
└── index.js           # Entry point
```

## 🎨 Customization

### Color Themes
Modify CSS custom properties in `src/styles/globals.css`:
```css
:root {
  --primary-gold: #ffd700;
  --secondary-gold: #ffeb3b;
  --bg-primary: #0a0a0a;
  /* ... more variables */
}
```

### Game Configuration
Adjust game settings in `src/utils/gameLogic.js`:
```javascript
export const TILE_COUNT = 36;        // Total tiles
export const TILES_PER_PLAYER = 18;  // Tiles per player
export const GRID_SIZE = 6;          // Grid dimensions
```

## 📱 PWA Features

The app includes Progressive Web App capabilities:
- **Installable** on mobile devices and desktop
- **Offline capable** (basic functionality)
- **App-like experience** with fullscreen mode
- **Fast loading** with optimized assets

To install:
1. Visit the app in a supported browser
2. Look for "Add to Home Screen" or "Install" option
3. Follow browser prompts to install

## 🧪 Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## 🏗️ Building for Production

Create an optimized production build:
```bash
npm run build
```

The build files will be in the `build/` directory, ready for deployment.

## 🚀 Deployment

The app can be deployed to various platforms:

### Netlify / Vercel
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `build`

### GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Senior Frontend Developer**
- Modern React application architecture
- Responsive design implementation
- Accessibility and performance optimization

## 🙏 Acknowledgments

- React team for the amazing framework
- Unsplash for beautiful images
- Modern CSS techniques and best practices
- Accessibility guidelines and standards

---

**Enjoy playing Chicken Banana! 🐔🍌**
