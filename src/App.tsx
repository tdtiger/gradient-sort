import { useState } from 'react';
import {
  Button, Container, MantineProvider, Stack,
  Text, Title
} from '@mantine/core';
import '@mantine/core/styles.css';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <MantineProvider defaultColorScheme = 'light'>
      <Container size = "sm" py = "xl">
        <Stack>
          <Title order = {1}>Gradient Sort</Title>
          <Text>動作確認</Text>

          <Button onClick ={() => setCount(count + 1)}>
            クリック回数：{count}
          </Button>
        </Stack>
      </Container>
    </MantineProvider>
  );
}