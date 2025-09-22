import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';

export default function RenderedSticky({ id, title, body, position }: Sticky) {
  return (
    <div className={styles.sticky}>
      <h1>{title}</h1>
      <div className={styles.body}>
        <Markdown>{body}</Markdown>
      </div>
    </div>
  );
}
