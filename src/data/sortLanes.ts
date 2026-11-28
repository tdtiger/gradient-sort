import type { SortId } from "../types/sort";

// 各ソート区画を取り扱うための型
export type SortLane = {
    id: SortId;
    name: string;
    hue: number;
};

export const sortLanes: SortLane[] = [
    {id: 'bubble', name: 'バブルソート', hue: 0},
    {id: 'selection', name: 'セレクションソート', hue: 30},
    {id: 'insertion', name: 'インサーションソート', hue: 55},
    {id: 'shell', name: 'シェルソート', hue: 85},
    {id: 'heap', name: 'ヒープソート', hue: 120},
    {id: 'quick', name: 'クイックソート', hue: 180},
    {id: 'merge', name: 'マージソート', hue: 220},
    {id: 'bogo', name: 'ボゴソート', hue: 280},
    {id: 'stalin', name: 'スターリンソート', hue: 320}
]