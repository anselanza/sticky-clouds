import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './RenderedSticky.module.css';
import { awaitSleep } from '@/utils/utils';

export default () => {
  const [sticky, setSticky] = useState<Sticky>({
    id: Date.now().toString(),
    title: 'Title Here',
    body: 'Body text here',
    position: { x: 0, y: 0 },
  });

  const mutation = useMutation({
    mutationFn: async (newSticky: Sticky) => {
      await awaitSleep(1000);
      await fetch('/.netlify/functions/addSticky', {
        method: 'POST',
        body: JSON.stringify(newSticky),
      });
    },
  });

  if (mutation.isError) {
    return <div>An error occurred: {mutation.error.message}</div>;
  }

  if (mutation.isPending) {
    return <div>Adding new sticky...</div>;
  }

  return (
    <div>
      <div className={styles.sticky}>New stuff goes here</div>
      <div>
        <button>Cancel ❌</button>
        <button
          onClick={() => {
            mutation.mutate(sticky);
          }}
        >
          Save 💾
        </button>
      </div>
    </div>
  );
};
