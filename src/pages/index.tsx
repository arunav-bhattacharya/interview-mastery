import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import TopicCard from '@site/src/components/TopicCard';
import styles from './index.module.css';

const sampleJava = `// Two-pointer: O(n) pair sum in a sorted array.
public int[] pairSum(int[] a, int target) {
  int l = 0, r = a.length - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s == target) return new int[] { l, r };
    if (s < target) l++; else r--;
  }
  return new int[] { -1, -1 };
}`;

export default function Home() {
  return (
    <Layout
      title="Interview Mastery — 8-Week Interview Preparation"
      description="A visual, structured 8-week program covering DSA, system design, Java/Spring/AWS, and behavioral interviews."
    >
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>8-WEEK · STRUCTURED · VISUAL</span>
          <h1 className={styles.title}>
            Interview prep that <span className={styles.highlight}>shows</span> you the answer.
          </h1>
          <p className={styles.subtitle}>
            A focused 8-week plan covering data structures &amp; algorithms,
            system design, the Java / Spring / AWS stack, and behavioral
            interviews — with animated visualizers for every pattern.
          </p>
          <div className={styles.heroActions}>
            <Link className={styles.primaryBtn} to="/overview">View the program →</Link>
            <Link className={styles.ghostBtn} to="/learn/dsa/linked-list">Jump into DSA</Link>
          </div>

          <div className={styles.codePeek}>
            <CodeBlock language="java" title="example.java">
              {sampleJava}
            </CodeBlock>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="im-accent-rule" />
            <h2>What you study</h2>
            <p>Four pillars across eight weeks. Each topic ships with a visualizer, a Java reference implementation, and a short problem set.</p>
          </div>

          <div className={styles.grid}>
            <TopicCard
              accent="amber"
              icon="◑"
              title="Data Structures &amp; Algorithms"
              summary="Patterns over problems: linked lists, two-pointer, sliding window, BFS/DFS, DP, heap, trie, graphs."
              href="/learn/dsa/linked-list"
              meta="9 topics"
            />
            <TopicCard
              accent="iris"
              icon="◈"
              title="System Design"
              summary="Fundamentals, scaling primitives, and case studies framed for 45-minute interviews."
              href="/learn/system-design/fundamentals"
              meta="3 topics"
            />
            <TopicCard
              accent="mint"
              icon="◐"
              title="Java · Spring · AWS"
              summary="Modern Java, Spring Boot REST APIs, and the AWS services you'll actually be asked about."
              href="/learn/java-spring-aws/java-essentials"
              meta="3 topics"
            />
            <TopicCard
              accent="rose"
              icon="◓"
              title="Behavioral"
              summary="STAR method, a curated list of common prompts, and a workspace to build your story bank."
              href="/learn/behavioral/star-method"
              meta="2 topics"
            />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <span className="im-accent-rule" />
            <h2>How it's built</h2>
            <p>Three opinions that shape every page.</p>
          </div>

          <div className={styles.threeUp}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⌧</div>
              <h3>Visual first</h3>
              <p>Every diagram on the original platform — Overview, Schedule, Study Plan, plus pattern-specific diagrams — has been replaced with a custom, animated React component.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>{`</>`}</div>
              <h3>JetBrains Mono everywhere</h3>
              <p>All code, all chips, all stats. Tuned line-height, ligatures on, zero letter-spacing — so nothing crowds the surrounding type.</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>◷</div>
              <h3>Yours to pace</h3>
              <p>Eight weeks if you grind, twelve if you don't. The Study Plan board and Progress page live entirely in your browser — no account, no telemetry.</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.ctaSection}`}>
          <div className={styles.cta}>
            <h2 className={styles.ctaTitle}>Ready when you are.</h2>
            <p className={styles.ctaSubtitle}>The first week is forty pages and a handful of problems. Start anywhere.</p>
            <div className={styles.heroActions}>
              <Link className={styles.primaryBtn} to="/schedule">See the schedule</Link>
              <Link className={styles.ghostBtn} to="/study-plan">Open the study plan</Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
