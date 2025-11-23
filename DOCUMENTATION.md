# Number Sum Puzzle - Technical Documentation

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Component Details](#component-details)
3. [Game Logic Flow](#game-logic-flow)
4. [Animation System](#animation-system)
5. [State Management](#state-management)
6. [Scalability](#scalability)
7. [Performance Optimization](#performance-optimization)

---

## 🏗️ Architecture Overview

### Design Pattern

This project follows a **modular component-based architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│           App.tsx                   │
│      (Main Container)               │
└─────────────┬───────────────────────┘
              │
      ┌───────┴────────┐
      │                │
┌─────▼──────┐  ┌─────▼──────────┐
│ Components │  │  useGameLogic  │
│            │  │   (Hook)       │
│ • Grid     │◄─┤                │
│ • Cell     │  │ State + Logic  │
│ • Target   │  └────────┬───────┘
└────────────┘           │
                   ┌─────▼─────┐
                   │  Utils    │
                   │           │
                   │ • Grid    │
                   │ • Validate│
                   └───────────┘
```

### Key Principles

1. **Single Responsibility**: Each component/module has one clear purpose
2. **Reusability**: Components work with any grid size via props
3. **Type Safety**: TypeScript ensures compile-time correctness
4. **Declarative**: React state drives UI updates
5. **Performance**: Reanimated for native 60fps animations

---

## 🧩 Component Details

### 1. App.tsx (Main Container)

**Purpose**: Root component that orchestrates the entire game

**Responsibilities**:
- Initializes game logic hook
- Renders UI layout
- Passes props to child components
- Handles user interactions (buttons)

**Key Code**:
```typescript
const {
  grid,
  selectedCells,
  targetValue,
  // ... other state
  handleCellPress,
  handleCheck,
  // ... other handlers
} = useGameLogic(5); // Grid size parameter
```

**Props Flow**:
```
App → Grid → Cell
App → TargetDisplay
```

---

### 2. Grid.tsx

**Purpose**: Organizes cells into rows and manages grid layout

**Props**:
```typescript
interface GridProps {
  cells: CellData[];           // All cell data
  selectedCells: string[];     // IDs of selected cells
  onCellPress: (cell) => void; // Cell press handler
  gridSize: number;            // N for NxN grid
  animationState: 'idle' | 'success' | 'error';
}
```

**Logic**:
```typescript
// Organize linear array into 2D rows
const rows: typeof cells[] = [];
for (let i = 0; i < gridSize; i++) {
  rows.push(cells.slice(i * gridSize, (i + 1) * gridSize));
}
```

**Why This Matters**: 
- Maintains grid state as flat array (easier state management)
- Renders as 2D for display (better UX)
- Scales to any size without code changes

---

### 3. Cell.tsx

**Purpose**: Individual cell with animations

**Props**:
```typescript
interface AnimatedCellProps {
  cell: CellData;
  isSelected: boolean;
  onPress: (cell) => void;
  gridSize: number;
  animationState: 'idle' | 'success' | 'error';
}
```

**Animation Values** (Reanimated):
```typescript
const scale = useSharedValue(1);      // For pulse/pop
const translateX = useSharedValue(0); // For shake
const opacity = useSharedValue(1);    // For fade-out
```

**Dynamic Sizing**:
```typescript
const cellSize = (width - GRID_PADDING * 2 - (gridSize - 1) * 8) / gridSize;
```

This ensures cells always fit the screen regardless of grid size.

**State Transitions**:
```
Unselected ──tap──> Selected (pulse)
         <─tap─    
Selected ──check (success)──> Pop & Vanish
Selected ──check (error)──> Shake
```

---

### 4. TargetDisplay.tsx

**Purpose**: Shows game stats and target value

**Props**:
```typescript
interface TargetDisplayProps {
  targetValue: number;  // Sum to match
  currentSum: number;   // Current selection sum
  score: number;        // Total score
  level: number;        // Current level
}
```

**Dynamic Feedback**:
```typescript
const isMatch = currentSum === targetValue && currentSum > 0;

// Color coding:
// Green: Match found
// Red: Sum exceeded target
// Orange: In progress
```

**Visual Hierarchy**:
1. Level & Score (secondary info)
2. Target Value (primary focus)
3. Current Sum (dynamic feedback)

---

## 🎮 Game Logic Flow

### Core Loop

```
┌─────────────────────────────────────────┐
│ 1. User taps cell                       │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 2. Check if adjacent to last selected   │
│    (if not first selection)             │
└──────────────┬──────────────────────────┘
               │
        ┌──────┴──────┐
        │ Adjacent?   │
        └──────┬──────┘
         Yes   │   No
        ┌──────▼──────┐
        │ Add to      │   Ignore
        │ selection   │
        └──────┬──────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 3. Update UI with selection animation   │
└──────────────┬──────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────┐
│ 4. User presses CHECK                   │
└──────────────┬──────────────────────────┘
               │
        ┌──────▼──────┐
        │ Sum matches?│
        └──────┬──────┘
         Yes   │   No
        ┌──────▼──────┐ ┌──────────┐
        │ SUCCESS     │ │  ERROR   │
        │ Animation   │ │  Shake   │
        └──────┬──────┘ └──────────┘
               │
        ┌──────▼──────┐
        │ Remove cells│
        │ Update score│
        │ New target  │
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │ Level done? │
        └──────┬──────┘
         Yes   │   No
        ┌──────▼──────┐
        │ New grid    │   Continue
        │ Next level  │
        └─────────────┘
```

---

## 🎨 Animation System

### Why Reanimated?

- **Native Performance**: Animations run on UI thread (60fps)
- **Declarative**: Define animations, not frame-by-frame logic
- **Smooth**: No JS bridge overhead

### Animation Types

#### 1. Selection (Pulse)

```typescript
scale.value = withSpring(1.1, {
  damping: 10,
  stiffness: 100,
});
```

**Effect**: Smooth scale-up with spring physics
**Duration**: ~300ms (spring-based)
**Feel**: Bouncy, responsive

#### 2. Success (Pop & Vanish)

```typescript
scale.value = withSequence(
  withSpring(1.3, { damping: 8, stiffness: 100 }),  // Pop
  withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) }) // Shrink
);
opacity.value = withTiming(0, { duration: 400 }); // Fade
```

**Effect**: Dramatic expansion then disappear
**Duration**: ~600ms total
**Feel**: Celebratory, satisfying

#### 3. Error (Shake)

```typescript
translateX.value = withSequence(
  withTiming(-8, { duration: 50 }),  // Left
  withTiming(8, { duration: 50 }),   // Right
  withTiming(-8, { duration: 50 }),  // Left
  withTiming(8, { duration: 50 }),   // Right
  withTiming(0, { duration: 50 })    // Center
);
```

**Effect**: Rapid horizontal shake
**Duration**: 250ms
**Feel**: Quick, negative feedback

### Animation Lifecycle

```typescript
useEffect(() => {
  // Trigger animation when state changes
  if (isSelected && animationState === 'success') {
    // Start success animation
  }
}, [isSelected, animationState]);
```

**Key Points**:
- Animations respond to state changes
- Multiple animations can compound (scale + translate + opacity)
- Cleanup handled by React lifecycle

---

## 🔄 State Management

### Hook-Based Architecture

All game state lives in `useGameLogic` hook:

```typescript
const [grid, setGrid] = useState<CellData[]>();
const [selectedCells, setSelectedCells] = useState<string[]>();
const [targetValue, setTargetValue] = useState<number>();
const [score, setScore] = useState(0);
const [level, setLevel] = useState(1);
const [animationState, setAnimationState] = useState('idle');
```

### Why This Design?

1. **Centralized**: All game state in one place
2. **Testable**: Hook can be tested independently
3. **Reusable**: Can be used in different screens/contexts
4. **Type-Safe**: TypeScript enforces correct usage

### State Update Flow

```typescript
// Example: Adding to selection
setSelectedCells(prev => {
  // Immutable update - return new array
  return [...prev, cell.id];
});
```

**Important**: Always use functional updates for state that depends on previous state.

### Derived State

```typescript
const getCurrentSum = useCallback((): number => {
  const cells = getSelectedCellData();
  return calculateSum(cells);
}, [selectedCells, grid]);
```

**Why Memoize**: Prevents recalculation on every render

---

## 📏 Scalability

### Grid Size Independence

The entire system scales from 3×3 to 10×10 (or larger) without code changes.

#### How It Works

1. **State**:
   ```typescript
   const [gridSize] = useState(5); // Can be any N
   ```

2. **Generation**:
   ```typescript
   generateGrid(gridSize) // Creates N×N cells
   ```

3. **Rendering**:
   ```typescript
   // Cell size auto-adjusts
   const cellSize = (width - padding - gaps) / gridSize;
   ```

4. **Logic**:
   ```typescript
   // Adjacency works for any grid size
   areAdjacent(cell1, cell2) // Position-based, not hardcoded
   ```

### Adding New Features

#### Example: Diagonal Movement

1. Update adjacency check:
   ```typescript
   export const areAdjacentDiagonal = (cell1, cell2): boolean => {
     const rowDiff = Math.abs(cell1.row - cell2.row);
     const colDiff = Math.abs(cell1.col - cell2.col);
     
     // Allow diagonals
     return rowDiff <= 1 && colDiff <= 1 && (rowDiff + colDiff > 0);
   };
   ```

2. Use in `useGameLogic`:
   ```typescript
   if (lastCell && areAdjacentDiagonal(lastCell, cell)) {
     // ...
   }
   ```

No other changes needed!

---

## ⚡ Performance Optimization

### 1. Memoization

```typescript
const getCurrentSum = useCallback(() => {
  // ...
}, [selectedCells, grid]);
```

**Why**: Prevents recreating function on every render

### 2. Reanimated Shared Values

```typescript
const scale = useSharedValue(1);
```

**Why**: Updates don't trigger React re-renders

### 3. Conditional Rendering

```typescript
{currentSum > 0 && (
  <View>...</View>
)}
```

**Why**: Only render when needed

### 4. Key Props

```typescript
{row.map(cell => (
  <Cell key={cell.id} ... />
))}
```

**Why**: React can efficiently update specific cells

### 5. Animation Cleanup

```typescript
if (animationTimeoutRef.current) {
  clearTimeout(animationTimeoutRef.current);
}
```

**Why**: Prevents memory leaks and unexpected behavior

---

## 🧪 Testing Strategy

### Unit Tests (Recommended)

1. **Utility Functions**:
   ```typescript
   describe('areAdjacent', () => {
     it('returns true for horizontal neighbors', () => {
       const cell1 = { row: 0, col: 0, ... };
       const cell2 = { row: 0, col: 1, ... };
       expect(areAdjacent(cell1, cell2)).toBe(true);
     });
     
     it('returns false for diagonal', () => {
       const cell1 = { row: 0, col: 0, ... };
       const cell2 = { row: 1, col: 1, ... };
       expect(areAdjacent(cell1, cell2)).toBe(false);
     });
   });
   ```

2. **Component Tests**:
   ```typescript
   describe('Cell', () => {
     it('calls onPress when tapped', () => {
       const mockPress = jest.fn();
       const { getByText } = render(<Cell onPress={mockPress} ... />);
       fireEvent.press(getByText('5'));
       expect(mockPress).toHaveBeenCalled();
     });
   });
   ```

### Integration Tests

Test complete game flows:
```typescript
it('completes a successful match', () => {
  // 1. Render app
  // 2. Select cells
  // 3. Press check
  // 4. Verify cells removed
  // 5. Verify score updated
});
```

---

## 🎯 Best Practices Used

1. **TypeScript Strict Mode**: Catch errors at compile time
2. **Functional Components**: Modern React patterns
3. **Custom Hooks**: Reusable logic
4. **Immutable Updates**: Prevent state mutation bugs
5. **Proper Cleanup**: No memory leaks
6. **Responsive Design**: Works on all screen sizes
7. **Accessibility**: Pressable components with feedback
8. **Comments**: Complex logic is documented

---

## 🔮 Future Enhancements

### Easy Additions

1. **Sound Effects**:
   ```typescript
   import { Audio } from 'expo-av';
   
   const playSuccess = async () => {
     const { sound } = await Audio.Sound.createAsync(
       require('./assets/success.mp3')
     );
     await sound.playAsync();
   };
   ```

2. **Difficulty Levels**:
   ```typescript
   const difficulties = {
     easy: { gridSize: 4, maxValue: 9 },
     medium: { gridSize: 6, maxValue: 15 },
     hard: { gridSize: 8, maxValue: 20 },
   };
   ```

3. **Timer**:
   ```typescript
   const [timeRemaining, setTimeRemaining] = useState(60);
   
   useEffect(() => {
     const timer = setInterval(() => {
       setTimeRemaining(t => t - 1);
     }, 1000);
     return () => clearInterval(timer);
   }, []);
   ```

4. **Leaderboard**:
   ```typescript
   import AsyncStorage from '@react-native-async-storage/async-storage';
   
   const saveHighScore = async (score: number) => {
     await AsyncStorage.setItem('highScore', score.toString());
   };
   ```

### Medium Complexity

5. **Power-ups**: Special cells with bonuses
6. **Hints**: Highlight a valid path
7. **Undo**: Revert last selection
8. **Multiple Targets**: Match different sums

---

## 📚 Learning Resources

- [React Native Docs](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [Expo Docs](https://docs.expo.dev/)

---

**This documentation covers the complete technical architecture. Use it as a reference during development and for explaining your design decisions in interviews! 🚀**
