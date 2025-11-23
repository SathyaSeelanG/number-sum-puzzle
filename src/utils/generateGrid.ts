import { CellData } from '../types/cell';

/**
 * Generates a random NxN grid of numbers
 * @param size - The size of the grid (NxN)
 * @param minValue - Minimum value for cells (default: 1)
 * @param maxValue - Maximum value for cells (default: 9)
 * @returns Array of CellData objects
 */
export const generateGrid = (
    size: number,
    minValue: number = 1,
    maxValue: number = 9
): CellData[] => {
    const grid: CellData[] = [];

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const value = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

            grid.push({
                id: `${row}-${col}`,
                value,
                row,
                col,
                isRemoved: false,
            });
        }
    }

    return grid;
};

/**
 * Generates a random target value based on grid values
 * @param grid - The current grid
 * @param minCells - Minimum cells to sum (default: 2)
 * @param maxCells - Maximum cells to sum (default: 5)
 * @returns A target sum value
 */
export const generateTargetValue = (
    grid: CellData[],
    minCells: number = 2,
    maxCells: number = 5
): number => {
    const availableCells = grid.filter(cell => !cell.isRemoved);

    if (availableCells.length === 0) return 0;

    const numCells = Math.min(
        Math.floor(Math.random() * (maxCells - minCells + 1)) + minCells,
        availableCells.length
    );

    let sum = 0;
    for (let i = 0; i < numCells; i++) {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        sum += availableCells[randomIndex].value;
    }

    return sum;
};

/**
 * Checks if two cells are adjacent (horizontally or vertically)
 */
export const areAdjacent = (cell1: CellData, cell2: CellData): boolean => {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);

    // Adjacent means exactly one unit apart in row OR col, but not both (no diagonals)
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

/**
 * Validates if a path of cells is contiguous (all cells are adjacent)
 */
export const isPathContiguous = (cells: CellData[]): boolean => {
    if (cells.length <= 1) return true;

    for (let i = 1; i < cells.length; i++) {
        if (!areAdjacent(cells[i - 1], cells[i])) {
            return false;
        }
    }

    return true;
};

/**
 * Calculate sum of selected cells
 */
export const calculateSum = (cells: CellData[]): number => {
    return cells.reduce((sum, cell) => sum + cell.value, 0);
};
