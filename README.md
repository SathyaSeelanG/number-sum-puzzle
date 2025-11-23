# Number Sum Puzzle Game

A fully functional, production-quality React Native + TypeScript puzzle game similar to EasyBrain's Number Sum Puzzle. Built with smooth animations and clean architecture for internship showcase.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## 🎮 Game Overview

Number Sum Puzzle is an engaging mobile game where players:
- Tap contiguous (adjacent) cells to form a path
- Selected cells' values must sum to the target value
- Correct matches make cells pop and vanish with smooth animations
- Wrong matches trigger shake/wiggle animations
- Progress through levels with increasing difficulty

## ✨ Features

### Core Functionality
- ✅ Dynamic N×N grid (scalable from 3×3 to 10×10)
- ✅ Strict adjacency checking (horizontal & vertical only)
- ✅ Real-time sum validation
- ✅ Cell removal on successful match
- ✅ Level progression system
- ✅ Score tracking

### Advanced Animations
- 🎨 **Selection Animation**: Smooth pulse effect with scale transform
- 💥 **Success Animation**: Dramatic pop-and-vanish effect
- 🔴 **Error Animation**: Quick shake/wiggle feedback
- 🎯 **Smooth Transitions**: Deselection and state changes

### Architecture
- 📦 Fully modular, reusable components
- 🔧 TypeScript with strict typing
- 🪝 Custom game logic hook (`useGameLogic`)
- 🎨 Premium dark theme UI with gradients
- 📱 Responsive design for all screen sizes

## 📂 Project Structure

```
number-sum-puzzle/
├── src/
│   ├── components/
│   │   ├── Grid.tsx          # Main grid component
│   │   ├── Cell.tsx           # Individual cell with animations
│   │   └── TargetDisplay.tsx  # Target & score display
│   ├── hooks/
│   │   └── useGameLogic.ts    # Core game state & logic
│   ├── types/
│   │   └── cell.ts            # TypeScript interfaces
│   └── utils/
│       └── generateGrid.ts    # Grid generation & validation
├── App.tsx                    # Main application entry
├── babel.config.js
├── package.json
└── tsconfig.json
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (will be installed automatically)
- **Expo Go app** (for mobile testing) or **Android Studio/Xcode** for emulators

### Installation

1. **Navigate to the project directory:**
   ```bash
   cd number-sum-puzzle
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

### Running on Different Platforms

After starting the dev server, you can run on:

- **Android:**
  ```bash
  npm run android
  ```
  (Requires Android Studio & emulator or physical device)

- **iOS:**
  ```bash
  npm run ios
  ```
  (Requires macOS with Xcode)

- **Web:**
  ```bash
  npm run web
  ```
  (Opens in browser - some animations may differ)

- **Expo Go App:**
  - Scan the QR code from the terminal
  - Install Expo Go from App Store or Google Play

## 🎯 How to Play

1. **Objective**: Match the target sum by selecting adjacent cells
2. **Selection**: Tap cells to create a path - they must be horizontally or vertically adjacent
3. **Validation**: Press "CHECK" when your sum matches the target
4. **Success**: Matched cells will pop and vanish
5. **Error**: If the sum doesn't match, cells will shake
6. **Progression**: Complete the grid to advance to the next level

## 🧱 Technical Details

### Key Technologies

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **Expo**: Development toolchain
- **react-native-reanimated**: High-performance animations
- **expo-linear-gradient**: Premium gradient backgrounds

### Core Logic

#### Adjacency Checking
```typescript
export const areAdjacent = (cell1: CellData, cell2: CellData): boolean => {
  const rowDiff = Math.abs(cell1.row - cell2.row);
  const colDiff = Math.abs(cell1.col - cell2.col);
  
  // Adjacent means exactly one unit apart in row OR col (no diagonals)
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};
```

#### Path Validation
```typescript
export const isPathContiguous = (cells: CellData[]): boolean => {
  if (cells.length <= 1) return true;

  for (let i = 1; i < cells.length; i++) {
    if (!areAdjacent(cells[i - 1], cells[i])) {
      return false;
    }
  }
  return true;
};
```

### Animation System

All animations use **react-native-reanimated** for 60fps performance:

1. **Selection**: `withSpring()` for smooth scale animation
2. **Success**: `withSequence()` for pop-then-fade effect
3. **Error**: `withSequence()` for rapid shake movements

### Scalability

The grid automatically scales to any size. To change it, modify the `useGameLogic` parameter in `App.tsx`:

```typescript
// Change from 5x5 to 7x7
const { ... } = useGameLogic(7);
```

The cell size automatically adjusts based on:
- Screen width
- Grid size
- Padding and margins

## 🎨 UI/UX Design

### Color Palette
- **Background**: Dark gradient (`#0F0F1E` → `#1A1A2E` → `#16213E`)
- **Primary**: Purple (`#6C5CE7`, `#A29BFE`)
- **Success**: Green (`#00D9A0`)
- **Error**: Red (`#FF6B6B`)
- **Warning**: Orange (`#FFA500`)

### Design Principles
- Clean, minimal dark theme
- Smooth animations for all interactions
- Clear visual feedback
- Responsive layout
- Production-quality polish

## 📊 Game Mechanics

### Scoring System
- **10 points** per cell matched
- Score accumulates across levels
- Displayed in real-time

### Level Progression
- Complete when ≤ 2 cells remain
- Automatically generates new grid
- Level counter increments
- Difficulty can be increased by grid size

### Target Generation
- Random sum of 2-5 cells from the grid
- Ensures solvability
- Updates after each successful match

## 🔧 Customization

### Change Grid Size
In `App.tsx`:
```typescript
const { ... } = useGameLogic(6); // 6x6 grid
```

### Modify Value Range
In `useGameLogic.ts`:
```typescript
generateGrid(gridSize, 1, 15) // Values from 1-15 instead of 1-9
```

### Adjust Animation Speed
In `Cell.tsx`:
```typescript
// Adjust duration values
withTiming(0, { duration: 500 }) // Slower fade-out
```

### Change Colors
Update styles in component files:
- `Cell.tsx` - Cell colors
- `TargetDisplay.tsx` - UI elements
- `App.tsx` - Overall theme

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Reanimated Errors
Make sure `babel.config.js` includes:
```javascript
plugins: ['react-native-reanimated/plugin']
```

### iOS Build Issues
```bash
cd ios && pod install && cd ..
```

### TypeScript Errors
```bash
npm run typecheck
```

## 📱 Testing

### Manual Testing Checklist
- [ ] Can select adjacent cells
- [ ] Cannot select diagonal cells
- [ ] Cannot select non-adjacent cells
- [ ] Sum displays correctly
- [ ] Check button validates sum
- [ ] Success animation plays
- [ ] Error animation plays
- [ ] Cells are removed on success
- [ ] Score updates correctly
- [ ] Level progresses correctly
- [ ] Clear button works
- [ ] New Game button works

## 🎓 Learning Outcomes

This project demonstrates:
- React Native fundamentals
- TypeScript integration
- Custom hooks for state management
- Animation implementation
- Component architecture
- Game logic programming
- Responsive design
- Production-quality code

## 📄 License

This project is created for educational and internship portfolio purposes.

## 👤 Author

Built as an internship assignment showcasing React Native + TypeScript skills.

## 🙏 Acknowledgments

- Inspired by EasyBrain's Number Sum Puzzle
- Built with React Native & Expo
- Animations powered by Reanimated

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Consult React Native documentation

---

**Ready to showcase your skills! 🚀**

For the internship review, demonstrate:
- Clean, modular code
- Smooth animations
- Proper TypeScript usage
- Game logic understanding
- Scalable architecture
