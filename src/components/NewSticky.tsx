import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styles from './RenderedSticky.module.css';
import { awaitSleep } from '@/utils/utils';
import Markdown from 'react-markdown';

interface Props {
  onComplete: (newSticky: Sticky) => any;
}

export default ({ onComplete }: Props) => {
  const queryClient = useQueryClient();

  const [sticky, setSticky] = useState<Sticky>({
    id: Date.now().toString(),
    title: 'Title Here',
    body: 'Body text here: ' + (Math.random() * 1000).toFixed(0).toString(),
    position: { x: 0, y: 0 },
  });

  const mutation = useMutation({
    mutationFn: async (newSticky: Sticky) => {
      await awaitSleep(1000);
      await fetch('/.netlify/functions/addSticky', {
        method: 'POST',
        body: JSON.stringify(newSticky),
      });
      return newSticky;
    },
    onSuccess: (data) => {
      onComplete(data);
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
      <div className={styles.sticky}>
        <h1>{sticky.title}</h1>
        <div className={styles.body}>{sticky.body}</div>
      </div>
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
