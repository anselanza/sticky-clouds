import { Link } from '@tanstack/react-router';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/tanstack-react-start';
import Logo from '../logo.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.banner}>
      <nav className={styles.left}>
        <img className={styles.logo} src={Logo} alt="Sticky Clouds Logo" />
        <Link to="/">Home</Link>
      </nav>
      <div className={styles.right}>
        <SignedIn>
          <span>You are signed in</span>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <span>You are signed out</span>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
}
