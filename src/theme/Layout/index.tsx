// Swizzled theme/Layout — wraps the default Docusaurus Layout and appends a
// sticky mobile-only bottom navigation bar.
//
// On phones the hamburger drawer has been unreliable on the user's device.
// This bottom bar renders as plain visible HTML on every page (homepage and
// doc pages alike), so navigation never depends on the drawer working. It's
// hidden on desktop (≥997px) where the regular top navbar is already shown.

import React from 'react';
import OriginalLayout from '@theme-original/Layout';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/Layout';
import styles from './styles.module.css';

const QUICK_LINKS = [
  {to: '/learn/guide/master-guide', label: 'Guide'},
  {to: '/learn/dsa/arrays-strings', label: 'Learn'},
  {to: '/study-plan', label: 'Plan'},
  {to: '/progress', label: 'Progress'},
];

function MobileBottomNav() {
  return (
    <nav className={styles.bottomNav} aria-label="Mobile quick navigation">
      {QUICK_LINKS.map(({to, label}) => (
        <Link key={to} to={to} className={styles.bottomNavLink}>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function Layout(props: Props): React.ReactElement {
  return (
    <>
      <OriginalLayout {...props} />
      <MobileBottomNav />
    </>
  );
}
