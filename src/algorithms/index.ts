import { bubbleSort } from "./bubbleSort";
import { selectionSort } from "./selectionSort";
import type { SortAlgorithm, SortId } from '../types/sort';

export const algorithms: Partial<Record<SortId, SortAlgorithm>> = {
    bubble: bubbleSort,
    selection: selectionSort
};