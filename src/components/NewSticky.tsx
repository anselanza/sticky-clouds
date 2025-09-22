import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';
// import { awaitSleep } from '@/utils/utils';

interface Props {
  onComplete: (newSticky: Sticky) => any;
  onCancel: () => any;
}

export default ({ onComplete, onCancel }: Props) => {
  const [sticky, setSticky] = useState<Sticky>({
    id: Date.now().toString(),
    title: 'Title Here',
    body: 'Body text here: ' + (Math.random() * 1000).toFixed(0).toString(),
    position: { x: 0, y: 0 },
  });

  const mutation = useMutation({
    mutationFn: async (newSticky: Sticky) => {
      // await awaitSleep(1000);
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
        <label htmlFor="title">Title:</label>
        <input
          name="title"
          type="text"
          onChange={(e) => setSticky({ ...sticky, title: e.target.value })}
          value={sticky.title}
        ></input>

        <label htmlFor="body">Body (markdown):</label>
        <textarea
          name="body"
          onChange={(e) => setSticky({ ...sticky, body: e.target.value })}
          value={sticky.body}
        ></textarea>

        <div className={styles.body}>
          <Markdown>{sticky.body}</Markdown>
        </div>
      </div>
      <div>
        <button onClick={onCancel}>Cancel ❌</button>
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
