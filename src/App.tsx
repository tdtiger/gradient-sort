import { useState } from 'react';
import {
  Button, Container, MantineProvider, SimpleGrid, Stack, Text, Title
} from '@mantine/core';
import '@mantine/core/styles.css';

import { sortLanes } from './data/sortLanes';
import SortPanel from './components/sortPanel';
import { bubbleSort } from './algorithms/bubbleSort';
import { selectionSort } from './algorithms/selectionSort';
import { shuffle } from './utils/shuffle';

// 90から30まで4ずつ小さくなっていくの数列を生成
const lightnessValues: number[] = Array.from({length: 16}, (_, index) => 90 - (60 * index) / 15);

export default function App() {
  const [bubbleValues, setBubbleValues] = useState<number[]>(lightnessValues);
  const [selectionValues, setSelectionValues] = useState<number[]>(lightnessValues);
  const [isSorting, setIsSorting] = useState(false);

  function shuffleBubble(){
    if(isSorting){
      return;
    }

    setBubbleValues(shuffle(bubbleValues));
  }

  async function runBubbleSort(){
    if(isSorting){
      return;
    }

    setIsSorting(true);

    try{
      for(const values of bubbleSort(bubbleValues)){
        setBubbleValues(values);

        await new Promise<void>((resolve) => {
          setTimeout(resolve, 100);
        });
      }
    }
    finally{
      setIsSorting(false);
    }
  }
  
  function shuffleSelection(){
    if(isSorting){
      return;
    }

    setSelectionValues(shuffle(selectionValues));
  }

  async function runSelectionSort(){
    if(isSorting){
      return;
    }

    setIsSorting(true);

    try{
      for(const values of selectionSort(selectionValues)){
        setSelectionValues(values);

        await new Promise<void>((resolve) => {
          setTimeout(resolve, 100);
        });
      }
    }
    finally{
      setIsSorting(false);
    }
  }
  
  return (
    <MantineProvider defaultColorScheme = 'light'>
      <Container size = "sm" py = "xl">
        <Stack gap = 'xl'>
          <Title order = {1}>Gradient Sort</Title>

          <SimpleGrid cols = {{base: 1, sm: 2}} spacing = "sm">
            {sortLanes.map((lane) => (
              <SortPanel
                key = {lane.id} lane = {lane}
                values = {lane.id === 'bubble' ? bubbleValues : lightnessValues}
              >
                {lane.id === 'bubble' && (
                  <div style = {{display: 'flex', gap: 8, marginBottom: 12}}>
                    <Button size = "xs" variant = "light" color = "red" onClick = {shuffleBubble} disabled = {isSorting}>
                      シャッフル
                    </Button>

                    <Button size = "xs" color = "red" onClick = {runBubbleSort} disabled = {isSorting}>
                      {isSorting ? 'ソート中' : 'バブルソート'}
                    </Button>
                  </div>
                )}
              </SortPanel>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </MantineProvider>
  );
}