// ソート手法を識別するためのID
export type SortId =
    | 'bubble'
    | 'selection'
    | 'insertion'
    | 'shell'
    | 'heap'
    | 'quick'
    | 'merge'
    | 'bogo'
    | 'stalin';

export type SortAlgorithm = (input: readonly number[])
    => Generator<number[], void, unknown>;

// 状態を表すための型
export type SortStatus =
    | 'idle'
    | 'running'
    | 'done'
    | 'stopped'
    | 'error';

export type SortState = {
    values: number[];
    status: SortStatus;
};

export type SortStates = Record<SortId, SortState>;