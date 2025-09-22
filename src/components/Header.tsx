import { Link } from '@tanstack/react-router';

import Logo from '../logo.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header>
      <nav className={styles.banner}>
        <img className={styles.logo} src={Logo} alt="Sticky Clouds Logo" />
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}
