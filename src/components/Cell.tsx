import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    Dimensions,
} from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withSpring,
    withSequence,
    withTiming,
    Easing,
} from 'react-native-reanimated';
import { CellProps } from '../types/cell';

const { width } = Dimensions.get('window');
const GRID_PADDING = 20;

interface AnimatedCellProps extends CellProps {
    gridSize: number;
    animationState: 'idle' | 'success' | 'error';
}

export const Cell: React.FC<AnimatedCellProps> = ({
    cell,
    isSelected,
    onPress,
    gridSize,
    animationState,
}) => {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);

    // Calculate cell size based on grid size
    const cellSize = (width - GRID_PADDING * 2 - (gridSize - 1) * 8) / gridSize;

    // Selection animation
    useEffect(() => {
        if (isSelected && animationState === 'idle') {
            // Pulse effect when selected
            scale.value = withSpring(1.1, {
                damping: 10,
                stiffness: 100,
            });
        } else if (!isSelected && animationState === 'idle') {
            // Deselect animation
            scale.value = withSpring(1, {
                damping: 12,
                stiffness: 150,
            });
        }
    }, [isSelected, animationState]);

    // Success animation (pop and vanish)
    useEffect(() => {
        if (isSelected && animationState === 'success') {
            scale.value = withSequence(
                withSpring(1.3, { damping: 8, stiffness: 100 }),
                withTiming(0, { duration: 300, easing: Easing.in(Easing.ease) })
            );
            opacity.value = withTiming(0, {
                duration: 400,
                easing: Easing.out(Easing.ease),
            });
        } else if (animationState === 'idle') {
            opacity.value = withTiming(1, { duration: 200 });
        }
    }, [animationState, isSelected]);

    // Error animation (shake/wiggle)
    useEffect(() => {
        if (isSelected && animationState === 'error') {
            translateX.value = withSequence(
                withTiming(-8, { duration: 50 }),
                withTiming(8, { duration: 50 }),
                withTiming(-8, { duration: 50 }),
                withTiming(8, { duration: 50 }),
                withTiming(0, { duration: 50 })
            );
        }
    }, [animationState, isSelected]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { scale: scale.value },
                { translateX: translateX.value },
            ],
            opacity: opacity.value,
        };
    });

    if (cell.isRemoved) {
        return (
            <Animated.View
                style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    styles.removedCell,
                ]}
            />
        );
    }

    return (
        <Pressable onPress={() => onPress(cell)} disabled={cell.isRemoved}>
            <Animated.View
                style={[
                    styles.cell,
                    { width: cellSize, height: cellSize },
                    isSelected && styles.selectedCell,
                    animatedStyle,
                ]}
            >
                <Text
                    style={[
                        styles.cellText,
                        isSelected && styles.selectedCellText,
                        { fontSize: cellSize * 0.4 },
                    ]}
                >
                    {cell.value}
                </Text>
            </Animated.View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#2A2A3E',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderWidth: 2,
        borderColor: '#3A3A4E',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    selectedCell: {
        backgroundColor: '#6C5CE7',
        borderColor: '#A29BFE',
        shadowColor: '#6C5CE7',
        shadowOpacity: 0.6,
        shadowRadius: 8,
        elevation: 10,
    },
    removedCell: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
    },
    cellText: {
        color: '#E0E0E0',
        fontWeight: 'bold',
    },
    selectedCellText: {
        color: '#FFFFFF',
    },
});
