import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { isChecked, setChecked, subscribe } from './problemStore';
import styles from './Checklist.module.css';

interface ChecklistProps {
  id?: string;
  children: React.ReactNode;
}

export function Checklist({ children }: ChecklistProps): React.ReactElement {
  return <ul className={styles.wrap}>{children}</ul>;
}

interface ChecklistItemProps {
  id: string;
  children: React.ReactNode;
}

function ChecklistItemInner({ id, children }: ChecklistItemProps) {
  const [checked, setLocal] = useState<boolean>(() => isChecked(id));

  useEffect(() => {
    const unsub = subscribe(() => setLocal(isChecked(id)));
    return unsub;
  }, [id]);

  const toggle = () => {
    const next = !checked;
    setChecked(id, next);
    setLocal(next);
  };

  return (
    <li className={`${styles.row} ${checked ? styles.checked : ''}`} data-checklist-id={id}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={checked}
        onChange={toggle}
        id={`cl-${id}`}
      />
      <label className={styles.label} htmlFor={`cl-${id}`}>
        {children}
      </label>
    </li>
  );
}

export function ChecklistItem(props: ChecklistItemProps): React.ReactElement {
  return (
    <BrowserOnly fallback={<ChecklistItemFallback {...props} />}>
      {() => <ChecklistItemInner {...props} />}
    </BrowserOnly>
  );
}

function ChecklistItemFallback({ id, children }: ChecklistItemProps) {
  return (
    <li className={styles.row} data-checklist-id={id}>
      <input type="checkbox" className={styles.checkbox} disabled />
      <span className={styles.label}>{children}</span>
    </li>
  );
}

export default Checklist;
