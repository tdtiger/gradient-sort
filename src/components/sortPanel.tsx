import type { ReactNode } from 'react';
import { Title } from '@mantine/core';
import type { SortLane } from '../data/sortLanes';

type SortPanelProps = {
    lane: SortLane;
    values: number[];
    children?: ReactNode;
};

export default function SortPanel({lane, values, children}: SortPanelProps){
    return(
        <section style = {{minWidth: 0, padding: 12, border: '1px solid #dee2e6', borderRadius: 8}}>
            <Title order = {2} size = "h5" mb = "sm">
                {lane.name}
            </Title>

            {children}

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
        </section>
    );
}