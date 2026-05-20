import React from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './TopicCard.module.css';

export interface TopicCardProps {
  title: string;
  summary?: string;
  icon?: React.ReactNode;
  href?: string;
  accent?: 'amber' | 'iris' | 'mint' | 'rose' | 'cyan';
  meta?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function TopicCard({
  title,
  summary,
  icon,
  href,
  accent = 'amber',
  meta,
  className,
  children,
}: TopicCardProps) {
  const Wrapper = (props: { children: React.ReactNode }) =>
    href ? (
      <Link to={href} className={clsx(styles.card, styles[accent], className)}>
        {props.children}
      </Link>
    ) : (
      <div className={clsx(styles.card, styles[accent], styles.static, className)}>
        {props.children}
      </div>
    );

  return (
    <Wrapper>
      <div className={styles.rail} aria-hidden />
      <div className={styles.body}>
        <div className={styles.head}>
          {icon ? <span className={styles.icon} aria-hidden>{icon}</span> : null}
          <h3 className={styles.title}>{title}</h3>
          {meta ? <span className={styles.meta}>{meta}</span> : null}
        </div>
        {summary ? <p className={styles.summary}>{summary}</p> : null}
        {children ? <div className={styles.children}>{children}</div> : null}
      </div>
    </Wrapper>
  );
}
