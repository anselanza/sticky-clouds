import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';
import RenderedSticky from './RenderedSticky';
import EditingSticky from './EditingSticky';
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

  const { mutate, variables, isError, error, isPending } = useMutation({
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

  if (isError) {
    return <div>An error occurred: {error.message}</div>;
  }

  // Optimistic Update (https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates)
  if (isPending) {
    return (
      <div style={{ opacity: 0.5 }}>
        <RenderedSticky {...variables} />
      </div>
    );
  }

  return (
    <div>
      <EditingSticky
        original={sticky}
        onSave={(updated) => {
          mutate(updated);
        }}
        onCancel={onCancel}
      />
    </div>
  );
};
