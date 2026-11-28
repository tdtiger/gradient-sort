import { useState } from 'react';
import {
  Button, Container, MantineProvider, SimpleGrid, Stack, Title
} from '@mantine/core';
import '@mantine/core/styles.css';

import { algorithms } from './algorithms';
import { sortLanes } from './data/sortLanes';
import SortPanel from './components/sortPanel';
import { useSortRace } from './hooks/useSortRace';

// 90から30まで4ずつ小さくなっていくの数列を生成
const lightnessValues: number[] = Array.from({length: 16}, (_, index) => 90 - (60 * index) / 15);

export default function App() {
  const {
    states, run, stop, shuffleOne, runAll, stopAll, shuffleAll
  } = useSortRace(lightnessValues);
  
  return (
    <MantineProvider defaultColorScheme = "light">
      <Container fluid py = "md">
        <Stack gap = "md">
          <Title order = {1} size = "h2">Gradient Sort</Title>

          <div style = {{display: 'flex', flexWrap: 'wrap', gap: 8}}>
            <Button variant = "light" onClick = {shuffleAll}>
              全体をシャッフル
            </Button>

            <Button onClick = {runAll}>
              全て同時実行
            </Button>

            <Button variant = "default" onClick = {stopAll}>
              全て停止
            </Button>
          </div>

          <SimpleGrid cols = {{base: 1, sm: 2}} spacing = "sm">
            {sortLanes.map((lane) => (
              <SortPanel
                key = {lane.id} lane = {lane} values = {states[lane.id].values}
                status = {states[lane.id].status} canRun = {algorithms[lane.id] !== undefined}
                onRun = {() => run(lane.id)} onStop = {() => stop(lane.id)} onShuffle = {() => shuffleOne(lane.id)}
              />
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </MantineProvider>
  );
}