import { bubbleSort } from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import type { SortAlgorithm, SortId } from '../types/sort';

// 実装済みのソートを登録
export const algorithms: Partial<Record<SortId, SortAlgorithm>> = {
    bubble: bubbleSort,
    selection: selectionSort
};