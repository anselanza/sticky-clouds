import { useState } from 'react';
import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';

interface Props {
  original: Sticky;
  onCancel: () => any;
  onSave: (newSticky: Sticky) => any;
}

export default ({ original, onCancel, onSave }: Props) => {
  const [sticky, setSticky] = useState({ ...original });
  return (
    <>
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
            onSave(sticky);
            // mutate(sticky);
          }}
        >
          Save 💾
        </button>
      </div>
    </>
  );
};
