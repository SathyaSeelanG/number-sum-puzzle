import { useState, useCallback, useRef } from 'react';
import { CellData, GameState } from '../types/cell';
import {
    generateGrid,
    generateTargetValue,
    areAdjacent,
    calculateSum,
    isPathContiguous,
} from '../utils/generateGrid';

export const useGameLogic = (initialGridSize: number = 5) => {
    const [gridSize] = useState(initialGridSize);
    const [grid, setGrid] = useState<CellData[]>(() => generateGrid(gridSize));
    const [selectedCells, setSelectedCells] = useState<string[]>([]);
    const [targetValue, setTargetValue] = useState<number>(() =>
        generateTargetValue(grid)
    );
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [isGameOver, setIsGameOver] = useState(false);
    const [animationState, setAnimationState] = useState<
        'idle' | 'success' | 'error'
    >('idle');

    const animationTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    /**
     * Get the actual CellData objects for selected cells
     */
    const getSelectedCellData = useCallback((): CellData[] => {
        return selectedCells
            .map(id => grid.find(cell => cell.id === id))
            .filter((cell): cell is CellData => cell !== undefined);
    }, [selectedCells, grid]);

    /**
     * Calculate current sum of selected cells
     */
    const getCurrentSum = useCallback((): number => {
        const cells = getSelectedCellData();
        return calculateSum(cells);
    }, [getSelectedCellData]);

    /**
     * Handle cell selection with adjacency checking
     */
    const handleCellPress = useCallback(
        (cell: CellData) => {
            if (cell.isRemoved || animationState !== 'idle') return;

            setSelectedCells(prev => {
                // If cell is already selected, deselect it (only if it's the last one)
                if (prev.includes(cell.id)) {
                    if (prev[prev.length - 1] === cell.id) {
                        return prev.slice(0, -1);
                    }
                    return prev; // Can't deselect from middle
                }

                // First selection
                if (prev.length === 0) {
                    return [cell.id];
                }

                // Check adjacency with the last selected cell
                const lastSelectedId = prev[prev.length - 1];
                const lastCell = grid.find(c => c.id === lastSelectedId);

                if (lastCell && areAdjacent(lastCell, cell)) {
                    return [...prev, cell.id];
                }

                // Not adjacent, ignore the selection
                return prev;
            });
        },
        [grid, animationState]
    );

    /**
     * Validate the current selection
     */
    const validateSelection = useCallback((): boolean => {
        if (selectedCells.length === 0) return false;

        const cells = getSelectedCellData();

        // Check if path is contiguous
        if (!isPathContiguous(cells)) return false;

        // Check if sum matches target
        const sum = calculateSum(cells);
        return sum === targetValue;
    }, [selectedCells, getSelectedCellData, targetValue]);

    /**
     * Handle check button press
     */
    const handleCheck = useCallback(() => {
        if (selectedCells.length === 0 || animationState !== 'idle') return;

        const isValid = validateSelection();

        if (isValid) {
            setAnimationState('success');

            // Clear any existing timeout
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            // After animation, remove cells and update game state
            animationTimeoutRef.current = setTimeout(() => {
                setGrid(prev =>
                    prev.map(cell =>
                        selectedCells.includes(cell.id)
                            ? { ...cell, isRemoved: true }
                            : cell
                    )
                );

                // Update score
                const pointsEarned = selectedCells.length * 10;
                setScore(prev => prev + pointsEarned);

                // Clear selection
                setSelectedCells([]);

                // Generate new target
                const updatedGrid = grid.map(cell =>
                    selectedCells.includes(cell.id) ? { ...cell, isRemoved: true } : cell
                );
                const newTarget = generateTargetValue(updatedGrid);
                setTargetValue(newTarget);

                // Check for level completion
                const remainingCells = updatedGrid.filter(cell => !cell.isRemoved);
                if (remainingCells.length <= 2) {
                    // Level complete!
                    setLevel(prev => prev + 1);
                    const newGrid = generateGrid(gridSize);
                    setGrid(newGrid);
                    setTargetValue(generateTargetValue(newGrid));
                }

                setAnimationState('idle');
            }, 600); // Animation duration
        } else {
            setAnimationState('error');

            // Clear any existing timeout
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }

            animationTimeoutRef.current = setTimeout(() => {
                setAnimationState('idle');
            }, 500);
        }
    }, [
        selectedCells,
        validateSelection,
        animationState,
        grid,
        gridSize,
        targetValue,
    ]);

    /**
     * Reset the game
     */
    const resetGame = useCallback(() => {
        const newGrid = generateGrid(gridSize);
        setGrid(newGrid);
        setSelectedCells([]);
        setTargetValue(generateTargetValue(newGrid));
        setScore(0);
        setLevel(1);
        setIsGameOver(false);
        setAnimationState('idle');
    }, [gridSize]);

    /**
     * Clear current selection
     */
    const clearSelection = useCallback(() => {
        if (animationState === 'idle') {
            setSelectedCells([]);
        }
    }, [animationState]);

    return {
        grid,
        selectedCells,
        targetValue,
        score,
        level,
        isGameOver,
        animationState,
        gridSize,
        currentSum: getCurrentSum(),
        handleCellPress,
        handleCheck,
        resetGame,
        clearSelection,
    };
};
