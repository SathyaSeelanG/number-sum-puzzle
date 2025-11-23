# Number Sum Puzzle Game

A fully functional, production-quality React Native + TypeScript puzzle game similar to EasyBrain's Number Sum Puzzle. Built with smooth animations using Reanimated and clean architecture for internship showcase.

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)

## 🔗 Repository

**GitHub**: [https://github.com/SathyaSeelanG/number-sum-puzzle](https://github.com/SathyaSeelanG/number-sum-puzzle)

## 🎮 Game Overview

Number Sum Puzzle is an engaging mobile game where players:
- Tap cells to create a contiguous path (horizontally or vertically adjacent)
- Selected cells' values must sum to exactly the target value
- Correct matches trigger a pop-and-vanish animation and remove cells
- Wrong matches trigger a shake animation as feedback
- Progress through levels by clearing the grid (when ≤2 cells remain)
- Each level generates a new randomized grid

## ✨ Features

### Core Functionality
- ✅ Dynamic N×N grid (scalable from 3×3 to 10×10)
- ✅ Strict adjacency checking (horizontal & vertical only, no diagonals)
- ✅ Real-time sum calculation and display
- ✅ Cell removal on successful match with smooth animations
- ✅ Automatic level progression when ≤2 cells remain
- ✅ Real-time score tracking (+10 points per matched cell)
- ✅ Deselection by tapping the last selected cell

### Advanced Animations (Reanimated)
- 🎨 **Selection Animation**: Smooth pulse effect with `withSpring()` scale transform (1 → 1.1)
- 💥 **Success Animation**: Dramatic pop-and-vanish using `withSequence()` (scale 1.3 → 0, fade out)
- 🔴 **Error Animation**: Quick shake/wiggle using `withSequence()` (translateX oscillates -8 ↔ 8)
- 🎯 **Smooth Transitions**: Spring physics for natural deselection animations

### Architecture
- 📦 Fully modular, reusable components
- 🔧 TypeScript with strict typing - no `any` types
- 🪝 Custom game logic hook (`useGameLogic`) for state management
- 🎨 Premium dark theme UI with gradients (LinearGradient)
- 📱 Responsive design - auto-calculates cell size based on screen width and grid size

---

## 🏗️ Architecture

### High-Level Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                         App.tsx                                 │
│                   (Main Application)                            │
│                                                                 │
│  • Initializes game with useGameLogic(gridSize)                │
│  • Renders UI layout with LinearGradient background           │
│  • Handles button interactions (Check, Clear, New Game)        │
│  • Passes state and callbacks to child components             │
└────────────┬─────────────┬─────────────┬────────────────────────┘
             │             │             │
             │             │             │
    ┌────────▼────┐  ┌────▼────┐  ┌─────▼──────┐
    │TargetDisplay│  │  Grid   │  │  Buttons   │
    │             │  │         │  │            │
    │• targetValue│  │ Maps    │  │• Check     │
    │• currentSum │  │ cells   │  │• Clear     │
    │• score      │  │ to N²   │  │• New Game  │
    │• level      │  │ Cell    │  │            │
    └─────────────┘  └────┬────┘  └────────────┘
                          │
                     ┌────▼────┐
                     │  Cell   │ ← Rendered N×N times
                     │         │
                     │• Animated│
                     │• Pressable│
                     │• Dynamic │
                     │  sizing │
                     └─────────┘
```

### Data Flow

```
User taps Cell
      │
      ▼
Cell.onPress(cell) → triggered
      │
      ▼
handleCellPress(cell) in useGameLogic
      │
      ├─ Check: cell.isRemoved? → reject
      ├─ Check: Already selected? → deselect if last
      ├─ Check: areAdjacent(lastCell, cell)? → accept/reject
      │
      ▼
setSelectedCells([...prev, cell.id])
      │
      ▼
React re-renders
      │
      ├──► Cell receives isSelected=true
      ├──► TargetDisplay shows updated currentSum
      └──► Check button enabled if selectedCells.length > 0
```

### Validation Flow

```
User presses CHECK
      │
      ▼
handleCheck() in useGameLogic
      │
      ▼
validateSelection()
      │
      ├─ isPathContiguous(selectedCellData)?
      │  └─ Checks areAdjacent() for each consecutive pair
      │
      ├─ calculateSum(selectedCellData) === targetValue?
      │
      ▼
┌─────┴─────┐
│           │
▼           ▼
SUCCESS     ERROR
│           │
├─ setAnimationState('success')     ├─ setAnimationState('error')
├─ Remove cells after 600ms         ├─ Shake animation (500ms)
├─ Add score (+10 per cell)         ├─ Keep selection
├─ Generate new targetValue         └─ User can try again
├─ Check if ≤2 cells remain
│  └─ If yes: Next level!
└─ setAnimationState('idle')
```

---

## 📂 Project Structure

```
number-sum-puzzle/
├── src/
│   ├── components/
│   │   ├── Grid.tsx            # Maps grid array to Cell components
│   │   ├── Cell.tsx            # Individual cell with Reanimated animations
│   │   └── TargetDisplay.tsx   # Shows target, current sum, score, level
│   ├── hooks/
│   │   └── useGameLogic.ts     # Core game state & logic hook
│   ├── types/
│   │   └── cell.ts             # TypeScript interfaces (CellData, GameState, etc.)
│   └── utils/
│       └── generateGrid.ts     # Pure functions for grid/target generation
├── App.tsx                     # Main application entry point
├── babel.config.js             # Includes reanimated plugin
├── package.json
├── tsconfig.json
├── ARCHITECTURE.md             # Detailed architecture diagrams
├── DOCUMENTATION.md            # Comprehensive code documentation
└── README.md                   # This file
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Expo CLI** (installed automatically with dependencies)
- **Expo Go app** (for mobile testing) OR **Android Studio/Xcode** for emulators

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SathyaSeelanG/number-sum-puzzle.git
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

After starting the dev server:

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
  (Opens in browser - animations may differ slightly)

- **Expo Go App:**
  - Scan the QR code from the terminal
  - Install Expo Go from App Store or Google Play

---

## 🎯 How to Play

1. **Objective**: Select adjacent cells whose values sum to the target number
2. **Selection**: Tap cells to create a path - they must be horizontally or vertically adjacent
3. **Deselection**: Tap the last selected cell again to remove it from selection
4. **Validation**: Press "CHECK" when your sum matches the target
5. **Success**: Matched cells will pop, vanish, and be removed from the grid
6. **Error**: If the sum doesn't match or path isn't contiguous, cells will shake
7. **Progression**: Clear the grid (≤2 cells remaining) to advance to the next level
8. **Controls**: 
   - "Clear" - Clears current selection
   - "New Game" - Resets to level 1 with a new grid

---

## 🧱 Technical Implementation

### Key Technologies

- **React Native**: Cross-platform mobile framework
- **TypeScript**: Type-safe development with strict mode
- **Expo**: Development toolchain and platform
- **react-native-reanimated**: High-performance 60fps animations
- **expo-linear-gradient**: Premium gradient backgrounds

### Core Methods & Functions

#### `useGameLogic(initialGridSize: number)` Hook

**Location**: `src/hooks/useGameLogic.ts`

**Returns**:
```typescript
{
  grid: CellData[],              // Full grid state
  selectedCells: string[],       // Array of selected cell IDs
  targetValue: number,           // Current target sum
  score: number,                 // Total score
  level: number,                 // Current level
  animationState: 'idle' | 'success' | 'error',
  gridSize: number,              // Grid dimension (N for N×N)
  currentSum: number,            // Computed sum of selected cells
  handleCellPress: (cell: CellData) => void,
  handleCheck: () => void,
  resetGame: () => void,
  clearSelection: () => void
}
```

**Key Methods**:
- `handleCellPress(cell)`: Validates adjacency using `areAdjacent()` before adding to selection
- `handleCheck()`: Validates path using `isPathContiguous()` and sum using `calculateSum()`
- `validateSelection()`: Returns `true` if path is contiguous AND sum equals target
- `getSelectedCellData()`: Maps cell IDs to full CellData objects
- `getCurrentSum()`: Computes real-time sum using `calculateSum()`

#### Utility Functions

**Location**: `src/utils/generateGrid.ts`

```typescript
// Generates N×N grid with random values
generateGrid(size: number, minValue = 1, maxValue = 9): CellData[]

// Generates target value by summing 2-5 random cells
generateTargetValue(grid: CellData[], minCells = 2, maxCells = 5): number

// Checks if two cells are adjacent (horizontal/vertical only)
areAdjacent(cell1: CellData, cell2: CellData): boolean
// Returns true if: (|row1-row2| === 1 && col1 === col2) || (row1 === row2 && |col1-col2| === 1)

// Validates entire path is contiguous
isPathContiguous(cells: CellData[]): boolean
// Checks areAdjacent() for each consecutive pair

// Sums cell values
calculateSum(cells: CellData[]): number
```

#### Animation Implementation

**Location**: `src/components/Cell.tsx`

Uses **react-native-reanimated** shared values:

```typescript
const scale = useSharedValue(1);
const translateX = useSharedValue(0);
const opacity = useSharedValue(1);
```

**Selection Animation** (`animationState === 'idle'`):
```typescript
scale.value = withSpring(1.1, { damping: 10, stiffness: 100 });
```

**Success Animation** (`animationState === 'success'`):
```typescript
scale.value = withSequence(
  withSpring(1.3, { damping: 8, stiffness: 100 }),
  withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) })
);
opacity.value = withTiming(0, { duration: 400 });
```

**Error Animation** (`animationState === 'error'`):
```typescript
translateX.value = withSequence(
  withTiming(-8, { duration: 50 }),
  withTiming(8, { duration: 50 }),
  withTiming(-8, { duration: 50 }),
  withTiming(8, { duration: 50 }),
  withTiming(0, { duration: 50 })
);
```

### TypeScript Interfaces

**Location**: `src/types/cell.ts`

```typescript
interface CellData {
  id: string;           // Format: "row-col"
  value: number;        // Cell value (1-9)
  row: number;          // Row index
  col: number;          // Column index
  isRemoved: boolean;   // Removal state
}

interface GameState {
  grid: CellData[];
  selectedCells: string[];
  targetValue: number;
  score: number;
  level: number;
  isGameOver: boolean;
}
```

### Dynamic Cell Sizing

**Location**: `src/components/Cell.tsx`

```typescript
const { width } = Dimensions.get('window');
const GRID_PADDING = 20;

// Auto-calculates cell size to fit screen
const cellSize = (width - GRID_PADDING * 2 - (gridSize - 1) * 8) / gridSize;
```

This ensures cells scale properly for any grid size (3×3 to 10×10).

---

## 🎨 UI/UX Design

### Color Palette
- **Background**: Dark gradient (`#0F0F1E` → `#1A1A2E` → `#16213E`)
- **Cell Default**: `#2A2A3E` with `#3A3A4E` border
- **Cell Selected**: `#6C5CE7` with `#A29BFE` border
- **Success Button**: `#00D9A0` → `#00B88C` gradient
- **Text**: `#FFFFFF` (selected), `#E0E0E0` (default)

### Design Principles
- Clean, minimal dark theme
- Smooth 60fps animations for all interactions
- Clear visual feedback (color changes, shadows, animations)
- Responsive layout adapts to all screen sizes
- Production-quality polish

---

## 📊 Game Mechanics

### Scoring System
- **10 points** per cell matched
- Score accumulates across all levels
- Displayed in real-time in TargetDisplay

### Level Progression
- Level completes when **≤ 2 cells remain** in grid
- Automatically generates new grid with `generateGrid(gridSize)`
- Level counter increments
- Difficulty can be increased by changing grid size or value range

### Target Generation
- Random sum of **2-5 cells** from available grid cells
- Uses `generateTargetValue(grid, minCells: 2, maxCells: 5)`
- Updates after each successful match
- Ensures solvability by using actual grid values

---

## 🔧 Customization

### Change Grid Size
In `App.tsx` line 30:
```typescript
const { ... } = useGameLogic(7); // Change to 7×7 grid
```

### Modify Value Range
In `src/hooks/useGameLogic.ts` line 13:
```typescript
const [grid, setGrid] = useState<CellData[]>(() => generateGrid(gridSize, 1, 15));
// Values from 1-15 instead of default 1-9
```

### Adjust Animation Speed
In `src/components/Cell.tsx`:
```typescript
// Line 62: Success animation duration
withTiming(0, { duration: 500 }) // Slower fade-out

// Line 147: Success timeout in useGameLogic.ts
setTimeout(() => { ... }, 800); // Longer animation duration
```

### Change Colors
- **Cells**: `src/components/Cell.tsx` - styles object (lines 132-171)
- **Target Display**: `src/components/TargetDisplay.tsx`
- **Overall Theme**: `App.tsx` - LinearGradient colors (line 36)

---

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --reset-cache
```

### Reanimated Not Working
Ensure `babel.config.js` includes:
```javascript
module.exports = {
  presets: ['babel-preset-expo'],
  plugins: ['react-native-reanimated/plugin'], // Must be last
};
```

### iOS Build Issues
```bash
cd ios && pod install && cd ..
npm run ios
```

### TypeScript Errors
Check types match interfaces in `src/types/cell.ts`

---

## 📱 Testing Checklist

### Functional Testing
- [x] Can select adjacent cells (horizontal/vertical)
- [x] Cannot select diagonal cells
- [x] Cannot select non-adjacent cells
- [x] Can deselect last selected cell
- [x] Current sum displays correctly in real-time
- [x] Check button validates sum correctly
- [x] Success animation plays on correct match
- [x] Error animation plays on wrong match
- [x] Cells are removed on successful match
- [x] Score updates correctly (+10 per cell)
- [x] Level progresses when ≤2 cells remain
- [x] Clear button clears selection
- [x] New Game button resets to level 1
- [x] Grid scales to different sizes (tested 3×3 to 10×10)

### Animation Testing
- [x] Selection animation (spring to 1.1 scale)
- [x] Deselection animation (spring back to 1.0)
- [x] Success pop-and-vanish animation
- [x] Error shake animation
- [x] All animations run at 60fps

---

## 🎓 Learning Outcomes

This project demonstrates:
- **React Native** fundamentals (components, state, lifecycle)
- **TypeScript** integration with strict typing
- **Custom hooks** for complex state management (`useGameLogic`)
- **Advanced animations** with react-native-reanimated
- **Component architecture** (separation of concerns)
- **Game logic programming** (algorithms for adjacency, pathfinding)
- **Responsive design** (dynamic sizing, layout)
- **Production-quality code** (clean, documented, tested)

---

## 📄 License

This project is created for educational and internship portfolio purposes.

## 👤 Author

**Sathya Seelan G**

Built as an internship assignment showcasing React Native + TypeScript + Reanimated skills.

## 🙏 Acknowledgments

- Inspired by EasyBrain's Number Sum Puzzle
- Built with React Native & Expo
- Animations powered by Reanimated 2
- TypeScript for type safety

---

## 📞 Support

For issues or questions:
1. Check the [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed code explanations
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for architecture diagrams
3. See [QUICKSTART.md](./QUICKSTART.md) for setup help
4. Check [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) for testing guidance

---

## 🚀 For Internship Review

This project showcases:
- ✅ Clean, modular, production-quality code
- ✅ Smooth 60fps animations using Reanimated
- ✅ Proper TypeScript usage with strict typing
- ✅ Deep understanding of game logic and algorithms
- ✅ Scalable, maintainable architecture
- ✅ Comprehensive documentation

**GitHub Repository**: [https://github.com/SathyaSeelanG/number-sum-puzzle](https://github.com/SathyaSeelanG/number-sum-puzzle)

---

**Ready to showcase your skills! 🎮🚀**
