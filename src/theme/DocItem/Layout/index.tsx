import React, { useEffect, useState } from 'react';
import OriginalLayout from '@theme-original/DocItem/Layout';
import type LayoutType from '@theme/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './styles.module.css';

type Props = WrapperProps<typeof LayoutType>;

const STORAGE_KEY = 'im-toc-hidden';

function applyToc(hidden: boolean) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.tocHidden = hidden ? '1' : '0';
  // Bypass CSS specificity by forcing inline styles on the main doc column.
  const mainCol = document.querySelector<HTMLElement>(
    '[class*="docItemCol"]',
  );
  if (mainCol) {
    if (hidden) {
      mainCol.style.setProperty('max-width', '100%', 'important');
      mainCol.style.setProperty('flex', '1 1 100%', 'important');
    } else {
      mainCol.style.removeProperty('max-width');
      mainCol.style.removeProperty('flex');
    }
  }
}

function TocToggle() {
  const [hidden, setHidden] = useState(false);
  const [tocPresent, setTocPresent] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) === '1';
    setHidden(stored);
    applyToc(stored);
    setTocPresent(!!document.querySelector('.theme-doc-toc-desktop'));
  }, []);

  // Re-apply after route changes (Docusaurus does client-side nav)
  useEffect(() => {
    const id = window.setTimeout(() => applyToc(hidden), 60);
    return () => window.clearTimeout(id);
  }, [hidden]);

  const toggle = () => {
    const next = !hidden;
    setHidden(next);
    localStorage.setItem(STORAGE_KEY, next ? '1' : '0');
    applyToc(next);
  };

  if (!tocPresent) return null;

  return (
    <button
      className={`${styles.tocBtn} ${hidden ? styles.tocBtnHidden : ''}`}
      onClick={toggle}
      aria-pressed={hidden}
      aria-label={hidden ? 'Show table of contents' : 'Hide table of contents'}
      title={hidden ? 'Show table of contents' : 'Hide table of contents'}
      type="button"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        {hidden ? (
          <>
            <line x1="2" y1="4" x2="14" y2="4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <line x1="2" y1="12" x2="14" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </>
        ) : (
          <>
            <rect x="1.5" y="2.5" width="13" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <line x1="10" y1="3" x2="10" y2="13" stroke="currentColor" strokeWidth="1.4" />
            <rect x="10.5" y="3.5" width="3" height="9" fill="currentColor" opacity="0.25" />
          </>
        )}
      </svg>
    </button>
  );
}

export default function DocItemLayoutWrapper(props: Props): React.ReactElement {
  return (
    <div className={styles.wrap}>
      <BrowserOnly>{() => <TocToggle />}</BrowserOnly>
      <OriginalLayout {...props} />
    </div>
  );
}
