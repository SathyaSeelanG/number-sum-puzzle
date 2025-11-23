export interface CellData {
  id: string;
  value: number;
  row: number;
  col: number;
  isRemoved: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface GameState {
  grid: CellData[];
  selectedCells: string[];
  targetValue: number;
  score: number;
  level: number;
  isGameOver: boolean;
}

export interface CellProps {
  cell: CellData;
  isSelected: boolean;
  onPress: (cell: CellData) => void;
}

export interface GridProps {
  cells: CellData[];
  selectedCells: string[];
  onCellPress: (cell: CellData) => void;
  gridSize: number;
}

export interface TargetDisplayProps {
  targetValue: number;
  currentSum: number;
  score: number;
  level: number;
}
