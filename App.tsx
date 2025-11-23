import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Grid } from './src/components/Grid';
import { TargetDisplay } from './src/components/TargetDisplay';
import { useGameLogic } from './src/hooks/useGameLogic';

export default function App() {
  const {
    grid,
    selectedCells,
    targetValue,
    score,
    level,
    animationState,
    gridSize,
    currentSum,
    handleCellPress,
    handleCheck,
    resetGame,
    clearSelection,
  } = useGameLogic(5); // 5x5 grid - can be changed to any size (3-10)

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0F1E" />
      <LinearGradient
        colors={['#0F0F1E', '#1A1A2E', '#16213E']}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Number Sum</Text>
            <Text style={styles.subtitle}>Puzzle</Text>
          </View>

          {/* Target Display */}
          <TargetDisplay
            targetValue={targetValue}
            currentSum={currentSum}
            score={score}
            level={level}
          />

          {/* Game Grid */}
          <Grid
            cells={grid}
            selectedCells={selectedCells}
            onCellPress={handleCellPress}
            gridSize={gridSize}
            animationState={animationState}
          />

          {/* Control Buttons */}
          <View style={styles.controls}>
            {/* Check Button */}
            <Pressable
              style={({ pressed }) => [
                styles.checkButton,
                selectedCells.length === 0 && styles.checkButtonDisabled,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleCheck}
              disabled={selectedCells.length === 0 || animationState !== 'idle'}
            >
              <LinearGradient
                colors={
                  selectedCells.length > 0
                    ? ['#00D9A0', '#00B88C']
                    : ['#3A3A4E', '#2A2A3E']
                }
                style={styles.buttonGradient}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedCells.length === 0 && styles.buttonTextDisabled,
                  ]}
                >
                  ✓ CHECK
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Action Buttons Row */}
            <View style={styles.actionRow}>
              {/* Clear Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={clearSelection}
                disabled={selectedCells.length === 0 || animationState !== 'idle'}
              >
                <View style={styles.actionButtonInner}>
                  <Text style={styles.actionButtonText}>Clear</Text>
                </View>
              </Pressable>

              {/* Reset Button */}
              <Pressable
                style={({ pressed }) => [
                  styles.actionButton,
                  pressed && styles.buttonPressed,
                ]}
                onPress={resetGame}
              >
                <View style={styles.actionButtonInner}>
                  <Text style={styles.actionButtonText}>New Game</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.instructions}>
            <Text style={styles.instructionTitle}>How to Play</Text>
            <Text style={styles.instructionText}>
              • Tap contiguous cells to form a path
            </Text>
            <Text style={styles.instructionText}>
              • Sum must equal the target value
            </Text>
            <Text style={styles.instructionText}>
              • Cells must be adjacent (horizontally or vertically)
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F1E',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 28,
    fontWeight: '300',
    color: '#A29BFE',
    letterSpacing: 4,
  },
  controls: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  checkButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#00D9A0',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  checkButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  buttonTextDisabled: {
    color: '#6A6A7A',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  actionButtonInner: {
    backgroundColor: '#2A2A3E',
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3A3A4E',
  },
  actionButtonText: {
    color: '#E0E0E0',
    fontSize: 16,
    fontWeight: '600',
  },
  instructions: {
    marginTop: 30,
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: 'rgba(42, 42, 62, 0.3)',
    marginHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(162, 155, 254, 0.2)',
  },
  instructionTitle: {
    color: '#A29BFE',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  instructionText: {
    color: '#C0C0D0',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 4,
  },
});
