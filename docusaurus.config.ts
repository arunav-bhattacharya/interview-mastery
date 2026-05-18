import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Interview Mastery',
  tagline: '8-Week Interview Preparation, Visualized',
  favicon: 'img/favicon.svg',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://arunav-bhattacharya.github.io',
  baseUrl: '/interview-mastery/',
  organizationName: 'arunav-bhattacharya',
  projectName: 'interview-mastery',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  themes: ['@docusaurus/theme-mermaid'],

  clientModules: [
    require.resolve('./src/clientModules/mermaidDarkPalette.ts'),
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'learn',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/logo.svg',
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: false,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    navbar: {
      title: 'Interview Mastery',
      logo: {
        alt: 'Interview Mastery',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/learn/guide/master-guide', label: 'Master Guide', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'learnSidebar',
          position: 'left',
          label: 'Learn',
        },
        { to: '/study-plan', label: 'Study Plan', position: 'left' },
        { to: '/progress', label: 'Progress', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'Master Guide', to: '/learn/guide/master-guide' },
            { label: 'DSA', to: '/learn/dsa/arrays-strings' },
            { label: 'System Design', to: '/learn/system-design/fundamentals' },
            { label: 'Java', to: '/learn/java/core' },
            { label: 'Kotlin', to: '/learn/kotlin/' },
            { label: 'Spring', to: '/learn/spring/' },
            { label: 'Quarkus', to: '/learn/quarkus/' },
            { label: 'Microservices', to: '/learn/microservices/' },
            { label: 'SQL', to: '/learn/sql/practice' },
            { label: 'Cloud', to: '/learn/cloud/aws-architecture' },
            { label: 'Behavioral', to: '/learn/behavioral/prep' },
          ],
        },
        {
          title: 'Program',
          items: [
            { label: 'Study Plan', to: '/study-plan' },
            { label: 'Progress', to: '/progress' },
          ],
        },
      ],
      copyright: `Built with care · Interview Mastery © ${new Date().getFullYear()}`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ['java', 'bash', 'yaml', 'sql', 'json'],
    },
    mermaid: {
      theme: { light: 'neutral', dark: 'dark' },
      options: {
        fontFamily:
          "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        themeVariables: {
          fontSize: '13px',
          // Primary — indigo accent for system nodes
          primaryColor: '#e8ecf9',
          primaryBorderColor: '#3346b3',
          primaryTextColor: '#1c2566',
          // Secondary — cyan/teal for data / cache layer
          secondaryColor: '#ecfeff',
          secondaryBorderColor: '#0891b2',
          secondaryTextColor: '#164e63',
          // Tertiary — warm amber for async / queue path
          tertiaryColor: '#fff7ed',
          tertiaryBorderColor: '#c2410c',
          tertiaryTextColor: '#7c2d12',
          // Lines + arrows in the indigo accent
          lineColor: '#3346b3',
          classText: '#14151b',
          // Sequence diagrams
          actorBkg: '#e8ecf9',
          actorBorder: '#3346b3',
          actorTextColor: '#1c2566',
          actorLineColor: '#3346b3',
          signalColor: '#3346b3',
          signalTextColor: '#1c2566',
          labelBoxBkgColor: '#dde2f5',
          labelBoxBorderColor: '#3346b3',
          labelTextColor: '#1c2566',
          // State diagrams
          labelColor: '#1c2566',
          // Notes: light-indigo "sticky" — same accent-soft palette used elsewhere.
          // Mermaid v11 forces these as inline `style="…!important"` on note paths,
          // so we have to set them here (CSS can't override inline-!important).
          noteBkgColor: '#dde2f5',
          noteBorderColor: '#3346b3',
          noteTextColor: '#1c2566',
        },
      },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
