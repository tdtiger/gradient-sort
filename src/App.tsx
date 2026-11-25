import { useState } from 'react';
import {
  Button, Container, MantineProvider, SimpleGrid, Stack, Text, Title
} from '@mantine/core';
import '@mantine/core/styles.css';

// 90から30まで4ずつ小さくなっていくの数列を生成
const lightnessValues: number[] = Array.from({length: 16}, (_, index) => 90 - (60 * index) / 15);

// 各ソート区画を取り扱うための型
type SortLane = {
  id: string;
  name: string;
  hue: number;
};

const sortLanes: SortLane[] = [
  {id: 'bubble', name: 'バブルソート', hue: 0},
  {id: 'selection', name: 'セレクションソート', hue: 30},
  {id: 'insertion', name: 'インサーションソート', hue: 55},
  {id: 'shell', name: 'シェルソート', hue: 85},
  {id: 'heep', name: 'ヒープソート', hue: 120},
  {id: 'quick', name: 'クイックソート', hue: 180},
  {id: 'merge', name: 'マージソート', hue: 220},
  {id: 'bogo', name: 'ボゴソート', hue: 280},
  {id: 'stalin', name: 'スターリンソート', hue: 320}
]

export default function App() {
  return (
    <MantineProvider defaultColorScheme = 'light'>
      <Container size = "sm" py = "xl">
        <Stack gap = 'xl'>
          <Title order = {1}>Gradient Sort</Title>

          <SimpleGrid cols = {{base: 1, sm: 2}} spacing = "md">
            {sortLanes.map((lane) => (
              <section 
                key = {lane.id}
                style = {{minWidth: 0, padding: 12, border: '1px solid #dee2e6', borderRadius: 8}}
              >
                <Title order = {2} size = "h4" mb = "sm">
                  {lane.name}
                </Title>
              
                <div style = {{display: 'flex', gap: 2}}>
                  {lightnessValues.map((lightness) => (
                    <div
                      key = {lightness} title = {`明度；${lightness}%`}
                      style = {{flex: 1, minWidth: 0, height: 40, borderRadius: 2, backgroundColor: `hsl(${lane.hue}, 80%, ${lightness}%)`}}
                    />
                  ))}
                </div>
              </section>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </MantineProvider>
  );
}