import { createFileRoute } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Board from '@/components/Board';

export const Route = createFileRoute('/')({
  component: App,
});

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <h1>Sticky Clouds</h1>
      <QueryClientProvider client={queryClient}>
        <Board />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
