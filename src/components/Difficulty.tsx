import React from 'react';
import styles from './Difficulty.module.css';

type Key = 'easy' | 'medium' | 'hard';

interface Props {
  children?: React.ReactNode;
  level?: Key | 'Easy' | 'Medium' | 'Hard';
}

const LABEL: Record<Key, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

function resolveKey(input: string): Key | null {
  const norm = input.trim().toLowerCase();
  if (norm === 'easy' || norm === 'medium' || norm === 'hard') return norm;
  return null;
}

export default function Difficulty({ children, level }: Props) {
  const source =
    level ??
    (typeof children === 'string'
      ? children
      : Array.isArray(children)
        ? children.filter((c) => typeof c === 'string').join('')
        : '');
  const key = resolveKey(String(source));
  if (!key) return <span>{children ?? level}</span>;
  return <span className={`${styles.pill} ${styles[key]}`}>{LABEL[key]}</span>;
}
