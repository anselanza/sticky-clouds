import { useQueryClient } from '@tanstack/react-query';
import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';
// import { awaitSleep } from '@/utils/utils';

export default function RenderedSticky({ id, title, body, position }: Sticky) {
  const queryClient = useQueryClient();
  return (
    <div className={styles.sticky}>
      <h1>{title}</h1>
      <div className={styles.body}>
        <Markdown>{body}</Markdown>
      </div>
      <button
        onClick={async () => {
          console.log(`Deleting "${id}"...`);
          // await awaitSleep(1000);
          await fetch(`/.netlify/functions/deleteSticky?key=${id}`);
          queryClient.invalidateQueries({ queryKey: ['stickies'] });
        }}
      >
        🗑️
      </button>
    </div>
  );
}
