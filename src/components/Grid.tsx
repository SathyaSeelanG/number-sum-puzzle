import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Cell } from './Cell';
import { GridProps } from '../types/cell';

interface AnimatedGridProps extends GridProps {
    animationState: 'idle' | 'success' | 'error';
}

export const Grid: React.FC<AnimatedGridProps> = ({
    cells,
    selectedCells,
    onCellPress,
    gridSize,
    animationState,
}) => {
    // Organize cells into rows
    const rows: typeof cells[] = [];
    for (let i = 0; i < gridSize; i++) {
        rows.push(cells.slice(i * gridSize, (i + 1) * gridSize));
    }

    return (
        <View style={styles.container}>
            {rows.map((row, rowIndex) => (
                <View key={`row-${rowIndex}`} style={styles.row}>
                    {row.map(cell => (
                        <Cell
                            key={cell.id}
                            cell={cell}
                            isSelected={selectedCells.includes(cell.id)}
                            onPress={onCellPress}
                            gridSize={gridSize}
                            animationState={animationState}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
