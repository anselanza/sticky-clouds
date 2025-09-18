import { createFileRoute } from '@tanstack/react-router';
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
  return (
    <div>
      <h1>Sticky Clouds</h1>

      <Board stickies={DUMMY_DATA} />
    </div>
  );
}
