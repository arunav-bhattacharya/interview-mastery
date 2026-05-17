import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Interview Mastery',
  tagline: '8-Week Interview Preparation, Visualized',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
    faster: true,
  },

  url: 'https://example.github.io',
  baseUrl: '/interview-mastery/',
  organizationName: 'example',
  projectName: 'interview-mastery',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

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
    image: 'img/social-card.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Interview Mastery',
      logo: {
        alt: 'Interview Mastery',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/overview', label: 'Overview', position: 'left' },
        { to: '/schedule', label: 'Schedule', position: 'left' },
        { to: '/study-plan', label: 'Study Plan', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'learnSidebar',
          position: 'left',
          label: 'Learn',
        },
        { to: '/progress', label: 'Progress', position: 'right' },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Learn',
          items: [
            { label: 'DSA', to: '/learn/dsa/linked-list' },
            { label: 'System Design', to: '/learn/system-design/fundamentals' },
            { label: 'Java / Spring / AWS', to: '/learn/java-spring-aws/java-essentials' },
            { label: 'Behavioral', to: '/learn/behavioral/star-method' },
          ],
        },
        {
          title: 'Program',
          items: [
            { label: 'Overview', to: '/overview' },
            { label: 'Schedule', to: '/schedule' },
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
  } satisfies Preset.ThemeConfig,
};

export default config;
