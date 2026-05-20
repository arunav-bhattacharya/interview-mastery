import React from 'react';
import Link from '@docusaurus/Link';
import styles from './ResourceCard.module.css';

export type ResourceKind =
  | 'course'
  | 'video'
  | 'article'
  | 'docs'
  | 'book'
  | 'tool'
  | 'paid';

interface CardProps {
  kind: ResourceKind;
  title: string;
  source: string;
  url: string;
  duration?: string;
  children?: React.ReactNode;
}

const KIND_LABEL: Record<ResourceKind, string> = {
  course: 'Course',
  video: 'Video',
  article: 'Article',
  docs: 'Docs',
  book: 'Book',
  tool: 'Tool',
  paid: 'Paid',
};

export function ResourceCard({ kind, title, source, url, duration, children }: CardProps) {
  return (
    <Link to={url} className={styles.card} target="_blank" rel="noopener noreferrer">
      <div className={styles.head}>
        <span className={`${styles.badge} ${styles[`badge_${kind}`]}`}>{KIND_LABEL[kind]}</span>
        {duration && <span className={styles.duration}>{duration}</span>}
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.source}>{source}</div>
      {children && <div className={styles.note}>{children}</div>}
    </Link>
  );
}

interface GridProps {
  children: React.ReactNode;
}

export function ResourceGrid({ children }: GridProps) {
  return <div className={styles.grid}>{children}</div>;
}

export default ResourceCard;
