import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  learnSidebar: [
    {
      type: 'category',
      label: 'Data Structures & Algorithms',
      collapsed: false,
      items: [
        'dsa/linked-list',
        'dsa/two-pointer',
        'dsa/sliding-window',
        'dsa/binary-search',
        'dsa/bfs-dfs',
        'dsa/dp',
        'dsa/heap',
        'dsa/trie',
        'dsa/graphs',
      ],
    },
    {
      type: 'category',
      label: 'System Design',
      collapsed: false,
      items: [
        'system-design/fundamentals',
        'system-design/scaling',
        'system-design/case-studies',
      ],
    },
    {
      type: 'category',
      label: 'Java · Spring · AWS',
      collapsed: false,
      items: [
        'java-spring-aws/java-essentials',
        'java-spring-aws/spring-boot',
        'java-spring-aws/aws-essentials',
      ],
    },
    {
      type: 'category',
      label: 'Behavioral',
      collapsed: false,
      items: [
        'behavioral/star-method',
        'behavioral/common-questions',
      ],
    },
  ],
};

export default sidebars;
