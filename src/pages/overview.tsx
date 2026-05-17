import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import ProgramOverview from '@site/src/components/ProgramOverview';
import styles from './page.module.css';

export default function OverviewPage() {
  return (
    <Layout title="Overview — Interview Mastery" description="The shape of the program: four pillars, eight weeks, dozens of patterns.">
      <main className={styles.main}>
        <div className={styles.head}>
          <span className="im-accent-rule" />
          <h1>Program overview</h1>
          <p>Four pillars across eight weeks. Each pillar gets its own visualization on the page below, and links into the full lessons.</p>
        </div>
        <ProgramOverview />
        <p className={styles.fineprint}>
          New here? Start with the <Link to="/schedule">8-week schedule</Link> to see how the topics sequence,
          then open the <Link to="/study-plan">study plan board</Link> to track your progress.
        </p>
      </main>
    </Layout>
  );
}
