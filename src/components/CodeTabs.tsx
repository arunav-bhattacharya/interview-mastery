import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Highlight, themes, type Language } from 'prism-react-renderer';
import { useColorMode } from '@docusaurus/theme-common';
import BrowserOnly from '@docusaurus/BrowserOnly';
import styles from './CodeTabs.module.css';

interface LanguageEntry {
  key: string;
  label: string;
  lang: string;
}

const ORDER: LanguageEntry[] = [
  { key: 'java',       label: 'Java',       lang: 'java' },
  { key: 'kotlin',     label: 'Kotlin',     lang: 'kotlin' },
  { key: 'python',     label: 'Python',     lang: 'python' },
  { key: 'go',         label: 'Go',         lang: 'go' },
  { key: 'sql',        label: 'SQL',        lang: 'sql' },
  { key: 'typescript', label: 'TypeScript', lang: 'typescript' },
  { key: 'javascript', label: 'JavaScript', lang: 'javascript' },
  { key: 'bash',       label: 'CLI',        lang: 'bash' },
  { key: 'yaml',       label: 'YAML',       lang: 'yaml' },
  { key: 'terraform',  label: 'Terraform',  lang: 'hcl' },
];

export interface CodeTabsProps {
  title?: string;
  groupId?: string;
  java?: string;
  kotlin?: string;
  python?: string;
  go?: string;
  sql?: string;
  typescript?: string;
  javascript?: string;
  bash?: string;
  yaml?: string;
  terraform?: string;
}

// MDX dedents template-literal JSX-attribute strings before they reach our
// component — that strips the minimum leading indent from every line, which
// flattens inner indentation. To restore real indentation we re-indent based
// on brace depth so the rendered code looks faithful regardless of what MDX
// did. This is a syntactic re-formatter — it preserves comments, strings,
// and the original line order; only leading whitespace is rewritten.
function reindent(raw: string, lang: string): string {
  const lines = raw.replace(/^\n+/, '').replace(/\s+$/, '').split('\n');
  const tab = '  ';
  let depth = 0;
  const out: string[] = [];

  const openers = /[\{\(\[]/g;
  const closers = /[\}\)\]]/g;

  for (let raw of lines) {
    const trimmed = raw.replace(/^\s+/, '');
    if (!trimmed) {
      out.push('');
      continue;
    }
    // Lines starting with a closer reduce depth before being printed
    const startsWithCloser = /^[\}\)\]]/.test(trimmed);
    const effectiveDepth = startsWithCloser ? Math.max(0, depth - 1) : depth;
    out.push(tab.repeat(effectiveDepth) + trimmed);

    // Count opens / closes in the rest of the line for the next line's depth.
    // Ignore braces inside strings and line comments.
    const codeOnly = trimmed
      .replace(/"([^"\\]|\\.)*"/g, '""')
      .replace(/'([^'\\]|\\.)*'/g, "''")
      .replace(/\/\/.*$/, '')
      .replace(/\/\*[\s\S]*?\*\//g, '');
    const opens = (codeOnly.match(openers) || []).length;
    const closes = (codeOnly.match(closers) || []).length;
    depth += opens - closes;
    if (depth < 0) depth = 0;
  }
  return out.join('\n');
}

function CodeView({ code, lang, title }: { code: string; lang: string; title?: string }) {
  const { colorMode } = useColorMode();
  const theme = colorMode === 'dark' ? themes.oneDark : themes.oneLight;
  const formatted = reindent(code, lang);

  return (
    <div className={`theme-code-block ${styles.block}`}>
      {title ? <div className={styles.title}>{title}</div> : null}
      <Highlight code={formatted} language={lang as Language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} ${styles.pre}`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })} className={styles.line}>
                {line.map((token, k) => (
                  <span key={k} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

export default function CodeTabs(props: CodeTabsProps) {
  const { title, groupId = 'im-lang', ...rest } = props;
  const present = ORDER.filter(e => (rest as Record<string, string | undefined>)[e.key]);

  if (present.length === 0) return null;

  return (
    <Tabs groupId={groupId} queryString={false}>
      {present.map(e => {
        const code = (rest as Record<string, string | undefined>)[e.key] as string;
        return (
          <TabItem key={e.key} value={e.key} label={e.label}>
            <BrowserOnly fallback={<pre className={styles.pre}>{code}</pre>}>
              {() => <CodeView code={code} lang={e.lang} title={title} />}
            </BrowserOnly>
          </TabItem>
        );
      })}
    </Tabs>
  );
}
