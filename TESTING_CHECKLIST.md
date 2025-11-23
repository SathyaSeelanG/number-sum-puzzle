# Testing Checklist - Number Sum Puzzle

Use this checklist to verify all features are working correctly before submitting your internship project.

## 🚀 Setup Testing

### Installation
- [ ] `npm install` completes without errors
- [ ] No critical warnings in console
- [ ] TypeScript compiles without errors
- [ ] `npm start` launches successfully

## 🎮 Core Gameplay Testing

### Grid Generation
- [ ] Grid displays correctly on first load
- [ ] All cells show numbers (1-9)
- [ ] Grid is centered on screen
- [ ] Target value is displayed

### Cell Selection
- [ ] Can tap a cell to select it
- [ ] Selected cell changes color (purple)
- [ ] Can tap adjacent cell to add to selection
- [ ] **Cannot** tap diagonal cell (should be ignored)
- [ ] **Cannot** tap non-adjacent cell (should be ignored)
- [ ] Can tap last selected cell again to deselect it
- [ ] Cannot deselect from middle of path

### Selection Path Tests

**Test 1: Simple Horizontal Path**
- [ ] Select 3 cells in a row (e.g., [0,0] → [0,1] → [0,2])
- [ ] All should be selected
- [ ] Current sum displays correctly

**Test 2: Simple Vertical Path**
- [ ] Select 3 cells in a column (e.g., [0,0] → [1,0] → [2,0])
- [ ] All should be selected
- [ ] Current sum displays correctly

**Test 3: L-Shaped Path**
- [ ] Select horizontal then vertical: [0,0] → [0,1] → [1,1]
- [ ] Path should work
- [ ] Current sum updates

**Test 4: Invalid Diagonal**
- [ ] Try [0,0] → [1,1] (diagonal)
- [ ] Second cell should NOT be selected
- [ ] Only first cell remains selected

**Test 5: Invalid Jump**
- [ ] Select [0,0]
- [ ] Try to select [0,2] (skipping [0,1])
- [ ] Should NOT work

## ✅ Validation Testing

### Correct Match
- [ ] Select cells that sum to target
- [ ] Press CHECK button
- [ ] Success animation plays (pop & fade)
- [ ] Cells disappear/become transparent
- [ ] Score increases
- [ ] New target value appears
- [ ] Selection clears

### Incorrect Match
- [ ] Select cells that DON'T sum to target
- [ ] Press CHECK button
- [ ] Error animation plays (shake)
- [ ] Cells remain visible
- [ ] Score stays same
- [ ] Selection remains
- [ ] Can try again

### Edge Cases
- [ ] Try CHECK with no selection (button should be disabled)
- [ ] Try CHECK with 1 cell selected
- [ ] Try CHECK with sum > target
- [ ] Try CHECK with sum < target

## 🎨 Animation Testing

### Selection Animation
- [ ] Single tap shows pulse/scale effect
- [ ] Animation is smooth (no jank)
- [ ] Multiple cells animate independently
- [ ] Deselection animates back smoothly

### Success Animation
- [ ] Matched cells scale up dramatically
- [ ] Cells fade out smoothly
- [ ] Animation takes ~600ms
- [ ] All matched cells animate simultaneously
- [ ] No visual glitches

### Error Animation
- [ ] Selected cells shake left-right
- [ ] Animation is quick (~250ms)
- [ ] All selected cells shake together
- [ ] Animation stops cleanly

## 🎯 UI/UX Testing

### Display Elements
- [ ] Level number displays correctly
- [ ] Score displays correctly
- [ ] Target value is clear and readable
- [ ] Current sum shows when cells selected
- [ ] Current sum is color-coded:
  - [ ] Orange when < target
  - [ ] Green when = target
  - [ ] Red when > target

### Buttons
- [ ] CHECK button lights up when selection active
- [ ] CHECK button disabled when no selection
- [ ] CHECK button shows pressed state
- [ ] CLEAR button works (clears selection)
- [ ] NEW GAME button resets everything

### Layout
- [ ] Everything fits on screen without scrolling
- [ ] Grid is properly centered
- [ ] No text cutoff
- [ ] Touch targets are easy to hit
- [ ] Spacing looks good

## 🏆 Game Progression Testing

### Level Completion
- [ ] Match cells until ≤2 cells remain
- [ ] Level increments
- [ ] New grid generates
- [ ] Score carries over
- [ ] New target appears

### Score System
- [ ] Matching 2 cells gives 20 points (2 × 10)
- [ ] Matching 3 cells gives 30 points (3 × 10)
- [ ] Score accumulates across levels
- [ ] Score never decreases

## 📱 Cross-Platform Testing

### Android
- [ ] App loads on Android device/emulator
- [ ] All animations smooth
- [ ] Touch interactions work
- [ ] No crashes
- [ ] Back button behavior acceptable

### iOS
- [ ] App loads on iOS device/simulator
- [ ] All animations smooth
- [ ] Touch interactions work
- [ ] No crashes
- [ ] Safe area respected

### Web (Optional)
- [ ] Runs in browser with `npm run web`
- [ ] Click interactions work
- [ ] Layout responsive
- [ ] Animations work (may differ slightly)

## 📐 Scalability Testing

### Different Grid Sizes

Change `useGameLogic(X)` parameter in App.tsx:

**3×3 Grid**
- [ ] Change to `useGameLogic(3)`
- [ ] Grid renders correctly
- [ ] Cells are larger
- [ ] All features work

**7×7 Grid**
- [ ] Change to `useGameLogic(7)`
- [ ] Grid renders correctly
- [ ] Cells are smaller but still tappable
- [ ] All features work

**10×10 Grid**
- [ ] Change to `useGameLogic(10)`
- [ ] Grid renders correctly
- [ ] Cells are small but usable
- [ ] All features work

## 🔄 State Management Testing

### Selection State
- [ ] Selected cells persist until cleared
- [ ] Selection updates in real-time
- [ ] No duplicate selections
- [ ] Order is maintained

### Grid State
- [ ] Removed cells stay removed
- [ ] Grid state persists between selections
- [ ] New grid generates properly
- [ ] All cells have proper values

### Animation State
- [ ] Cannot select during success animation
- [ ] Cannot select during error animation
- [ ] Can select again after animation ends
- [ ] No animation conflicts

## 🐛 Error Handling Testing

### Edge Cases
- [ ] Rapid tapping doesn't break state
- [ ] Pressing CHECK multiple times doesn't duplicate animations
- [ ] Selecting same cell multiple times handled
- [ ] No console errors during normal gameplay
- [ ] No memory leaks (check with React DevTools)

### Recovery
- [ ] CLEAR button works at any time
- [ ] NEW GAME resets everything cleanly
- [ ] Can play multiple rounds without restart

## 📊 Performance Testing

### Frame Rate
- [ ] Animations run at 60fps (use Debug menu)
- [ ] No stuttering during selection
- [ ] Success animation is smooth
- [ ] Error animation is smooth

### Memory
- [ ] No increasing memory usage over time
- [ ] App remains responsive after multiple games
- [ ] No lag after extended play

### Load Time
- [ ] Initial load < 10 seconds
- [ ] Level transitions instant
- [ ] Grid generation instant

## 📝 Code Quality Checks

### TypeScript
- [ ] No TypeScript errors during build
- [ ] All props properly typed
- [ ] No `any` types used
- [ ] Strict mode enabled

### Code Structure
- [ ] All components in `src/components/`
- [ ] All hooks in `src/hooks/`
- [ ] All types in `src/types/`
- [ ] All utils in `src/utils/`

### Documentation
- [ ] README.md exists and is complete
- [ ] DOCUMENTATION.md explains architecture
- [ ] QUICKSTART.md has setup steps
- [ ] Code has helpful comments

## 🎓 Demo Preparation

### Key Features to Show
1. [ ] **Adjacency Validation**
   - Show valid path
   - Try invalid diagonal
   - Try invalid jump

2. [ ] **Animations**
   - Success animation (correct match)
   - Error animation (wrong match)
   - Selection pulse

3. [ ] **Scalability**
   - Change grid size in code
   - Show it auto-adjusts

4. [ ] **Code Quality**
   - Open useGameLogic.ts
   - Show TypeScript interfaces
   - Explain architecture

### Interview Talking Points
- [ ] Explain adjacency algorithm
- [ ] Describe animation implementation
- [ ] Discuss state management approach
- [ ] Show scalability proof
- [ ] Highlight TypeScript usage

## ✅ Final Checklist

Before submission:
- [ ] All core features working
- [ ] All animations smooth
- [ ] No console errors
- [ ] Documentation complete
- [ ] Code is clean and commented
- [ ] Project runs on first try (`npm install && npm start`)
- [ ] README has clear instructions
- [ ] Git history is clean
- [ ] No sensitive data in code

## 🎯 Acceptance Criteria

**Minimum to Pass:**
- ✅ Grid displays
- ✅ Can select adjacent cells
- ✅ Sum validation works
- ✅ Basic animations present
- ✅ TypeScript compiles

**To Excel:**
- ✅ All animations polished (60fps)
- ✅ Grid scales to any size
- ✅ Clean, modular code
- ✅ Comprehensive documentation
- ✅ Zero bugs in testing

---

## 📊 Testing Summary Template

After testing, fill this out:

**Date Tested**: ____________________

**Platform(s) Tested**: 
- [ ] Android
- [ ] iOS  
- [ ] Web

**Grid Sizes Tested**:
- [ ] 3×3
- [ ] 5×5
- [ ] 7×7
- [ ] 10×10

**Critical Issues Found**: 
_____________________________________
_____________________________________

**Non-Critical Issues**: 
_____________________________________
_____________________________________

**Overall Status**: 
- [ ] Ready to submit
- [ ] Needs fixes
- [ ] Needs testing

**Tester Name**: ____________________

**Signature**: ____________________

---

**Good luck with your internship submission! 🚀**

Use this checklist to ensure everything works perfectly before you present.
