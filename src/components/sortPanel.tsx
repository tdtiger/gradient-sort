import { Button, Card, Title } from '@mantine/core';
import type { SortLane } from '../data/sortLanes';
import type { SortStatus } from '../types/sort';

type SortPanelProps = {
    lane: SortLane;
    values: number[];
    status: SortStatus;
    canRun: boolean;
    onRun: () => void;
    onStop: () => void;
    onShuffle: () => void;
};

const statusLabels: Record<SortStatus, string> = {
    idle: '待機中', running: '実行中', done: '完了', stopped: '停止', error:'エラー'
}

// ソートごとの表示領域をカードで作成
export default function SortPanel({lane, values, status, canRun, onRun, onStop, onShuffle}: SortPanelProps){
    const isRunning = (status === 'running');

    return(
        <Card 
            component = "section" withBorder padding = "sm" radius = "md" style = {{minWidth: 0}}
        >
            {/* ソート名と状態を表示する部分 */}
            <div style = {{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                gap: 8, marginBottom: 8
            }}>
                <Title order = {2} size = "h5">
                    {lane.name}
                </Title>

                <span style = {{fontSize: 12}}>
                    {canRun ? statusLabels[status] : '未実装'}
                </span>
            </div>

            {/* ボタン群を配置する部分 */}
            <div style = {{
                display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12
            }}>
                <Button size = "xs" variant = "light" onClick = {onShuffle} disabled = {!canRun || isRunning}>
                    シャッフル
                </Button>

                <Button size = "xs" onClick = {onRun} disabled = {!canRun || isRunning}>
                    実行
                </Button>

                <Button size = "xs" variant = "default" onClick = {onStop} disabled = {!isRunning}>
                    停止
                </Button>
            </div>

            {/* ソートするカラーバーを表示する部分 */}
            <div style = {{display: 'flex', gap: 2}}>
                {values.map((lightness) => (
                    <div
                        key = {lightness} title = {`明度：${lightness}%`}
                        style = {{
                            flex: 1, minWidth: 0, height: 40, borderRadius: 2,
                            backgroundColor: `hsl(${lane.hue}, 80%, ${lightness}%)`
                        }}
                    />
                ))}
            </div>
        </Card>
    );
}