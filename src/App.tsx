import { useState } from 'react';
import {
  Button, Container, MantineProvider, Stack, Text, Title
} from '@mantine/core';
import '@mantine/core/styles.css';

// 90から30まで4ずつ小さくなっていくの数列を生成
const lightnessValues: number[] = Array.from({length: 16}, (_, index) => 90 - (60 * index) / 15);

export default function App() {
  return (
    <MantineProvider defaultColorScheme = 'light'>
      <Container size = "sm" py = "xl">
        <Stack>
          <Title order = {1}>Gradient Sort</Title>
          <div style = {{ display: 'flex', gap: 4}}>
            {lightnessValues.map((lightness) => (
              // 色相：赤、彩度：80%、明度を最初に定義した配列にの値にしたタイルを生成
              <div 
                key = {lightness} title = {`明度:${lightness}%`}
                style = {{ flex: 1, height: 100, borderRadius: 4, backgroundColor: `hsl(0, 80%, ${lightness}%)`}}
              />
            ))}
          </div>
        </Stack>
      </Container>
    </MantineProvider>
  );
}