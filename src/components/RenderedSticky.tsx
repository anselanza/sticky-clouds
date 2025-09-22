import { useMutation, useQueryClient } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';
// import { awaitSleep } from '@/utils/utils';

export default function RenderedSticky({ id, title, body, position }: Sticky) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      console.log(`Deleting "${id}"...`);
      await fetch(`/.netlify/functions/deleteSticky?key=${id}`);
      queryClient.invalidateQueries({ queryKey: ['stickies'] });
    },
  });
  return (
    <div className={styles.sticky}>
      <h1>{title}</h1>
      <div className={styles.body}>
        <Markdown>{body}</Markdown>
      </div>
      {mutation.isError && (
        <div>An error occurred: {mutation.error.message}</div>
      )}
      <button
        onClick={() => {
          mutation.mutate();
        }}
      >
        {mutation.isPending ? '...' : '🗑️'}
      </button>
    </div>
  );
}
