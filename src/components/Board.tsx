import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import RenderedSticky from './RenderedSticky';
import NewSticky from './NewSticky';
// import { awaitSleep } from '@/utils/utils';

export default function Board() {
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);

  const {
    isPending,
    isError,
    data: stickies,
    error,
  } = useQuery({
    queryKey: ['stickies'],
    queryFn: async () => {
      // await awaitSleep(1000);
      const res = await fetch('/.netlify/functions/getStickies', {
        method: 'GET',
      });
      const data = (await res.json()) as Array<Sticky>;
      return data;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>We have {stickies.length} stickies</h2>
      <button
        onClick={() => {
          setIsAdding(true);
        }}
      >
        Add another ✚
      </button>

      {isAdding && (
        <NewSticky
          onComplete={(newSticky) => {
            queryClient.setQueryData(['stickies'], [...stickies, newSticky]);
            setIsAdding(false);
          }}
          onCancel={() => {
            setIsAdding(false);
          }}
        />
      )}

      {stickies.map((s) => (
        <RenderedSticky key={`sticky-${s.id}`} {...s} />
      ))}
    </div>
  );
}
