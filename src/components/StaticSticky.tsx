import Markdown from 'react-markdown';
import styles from './RenderedSticky.module.css';

interface Props {
  sticky: Sticky;
  isFaded: boolean;
}

export default ({ sticky, isFaded }: Props) => {
  const { id, title, body } = sticky;
  return (
    <div className={styles.sticky} style={{ opacity: isFaded ? 0.5 : 1.0 }}>
      <h1>{title}</h1>
      <h2 className={styles.tiny}>{id}</h2>
      <div className={styles.body}>
        <Markdown>{body}</Markdown>
      </div>
    </div>
  );
};
