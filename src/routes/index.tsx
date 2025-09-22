import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

import Board from '@/components/Board';

export const Route = createFileRoute('/')({
  component: App,
});

const DUMMY_DATA: Array<Sticky> = [
  {
    id: 'one',
    title: 'First',
    body: 'This is some **test** content',
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    id: 'two',
    title: 'Second',
    body: 'And here is another one.',
    position: {
      x: 0.5,
      y: 0.5,
    },
  },
];

function App() {
  const [stickies, setStickies] = useState<Array<Sticky>>([]);
  const [wasFetched, setWasFetched] = useState(false);

  useEffect(() => {
    const getList = async () => {
      if (!wasFetched) {
        console.log('fetching...');
        const res = await fetch('/.netlify/functions/getStickies', {
          method: 'GET',
        });
        const data = (await res.json()) as Array<Sticky>;
        setWasFetched(true);
        setStickies(data);
      }
    };

    getList().catch((e) => {
      console.error('Error fetching data:', e);
    });
  }, [stickies, wasFetched]);

  return (
    <div>
      <h1>Sticky Clouds</h1>

      <Board stickies={stickies} />
    </div>
  );
}
