import { createFileRoute, redirect } from '@tanstack/react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { getAuth } from '@clerk/tanstack-react-start/server';
import Board from '@/components/Board';

const authStateFn = createServerFn({ method: 'GET' }).handler(async () => {
  const request = getWebRequest();
  // if (!request) throw new Error('No request found');
  const { isAuthenticated, userId } = await getAuth(request);

  if (!isAuthenticated) {
    // This will error because you're redirecting to a path that doesn't exist yet
    // You can create a sign-in route to handle this
    // See https://clerk.com/docs/references/tanstack-start/custom-sign-in-or-up-page
    throw redirect({
      to: '/login',
    });
  }

  return { userId };
});

export const Route = createFileRoute('/')({
  component: App,
  beforeLoad: async () => await authStateFn(),
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
