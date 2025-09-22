import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import StaticSticky from './StaticSticky';
import EditingSticky from './EditingSticky';
// import { awaitSleep } from '@/utils/utils';

export default function RenderedSticky(original: Sticky) {
  const [sticky, setSticky] = useState({ ...original });
  const { id, title, body, position } = sticky;

  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      console.log(`Deleting "${id}"...`);
      await fetch(`/.netlify/functions/deleteSticky?key=${id}`);
      await queryClient.invalidateQueries({ queryKey: ['stickies'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (updated: Sticky) => {
      const res = await fetch(`/.netlify/functions/updateSticky`, {
        method: 'POST',
        body: JSON.stringify(updated),
      });
      if (!res.ok) {
        throw Error(`not OK: ${res.status}: ${res.statusText}`);
      }
      await queryClient.invalidateQueries({ queryKey: ['stickies'] });
    },
    onError: (error) => {
      console.error('Update error:', error);
    },
  });

  if (isEditing) {
    return (
      <EditingSticky
        original={sticky}
        onSave={(updated) => {
          setSticky(updated);
          updateMutation.mutate(updated);
          setIsEditing(false);
        }}
        onCancel={() => {
          setIsEditing(false);
        }}
      />
    );
  }

  if (deleteMutation.isError || updateMutation.isError) {
    return (
      <div>
        An error occurred:{' '}
        {deleteMutation.error?.message ||
          updateMutation.error?.message ||
          'unknown'}
      </div>
    );
  }

  return (
    <>
      <StaticSticky
        sticky={sticky}
        isFaded={deleteMutation.isPending || updateMutation.isPending}
      />

      <div>
        <button
          onClick={() => {
            setIsEditing(true);
          }}
        >
          Edit 🖊️
        </button>
        <button
          disabled={deleteMutation.isPending}
          onClick={() => {
            deleteMutation.mutate();
          }}
        >
          Delete {deleteMutation.isPending ? '...' : '🗑️'}
        </button>
      </div>
    </>
  );
}
