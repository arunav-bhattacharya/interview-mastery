/* Re-paint Mermaid SD diagrams in dark mode.
 *
 * Mermaid v11 stamps `!important` on every inline `style` it emits from
 * classDef declarations, which means external CSS can't override them.
 * CSS variables can't be used inside classDef either — Mermaid's lexer
 * chokes on the parenthesis in `var(...)`.
 *
 * The classDef declarations in the MDX source use the light palette
 * (which is the "good" palette per design). This client module patches
 * the inline styles on `g.node.<role>` containers when the page is in
 * dark mode, swapping each role's fill/stroke/text for a darker variant.
 *
 * On theme toggle the MutationObserver re-runs the paint. On theme back
 * to light, we restore the original inline styles via a cached map.
 *
 * Sequence and state diagrams don't use classDef — their dark-mode
 * appearance is handled separately via plain CSS in custom.css.
 */

type Palette = { fill: string; stroke: string; text: string };

// All text in dark mode is pure white for maximum contrast against any
// dark fill, regardless of hue. Same-hue light-tints (e.g. light cyan
// text on dark cyan bg) technically meet WCAG, but read as "tinted pale"
// — white pops on every background.
const TEXT = '#ffffff';

const DARK: Record<string, Palette> = {
  // Indigo family
  client:   { fill: '#312e81', stroke: '#818cf8', text: TEXT },
  producer: { fill: '#312e81', stroke: '#818cf8', text: TEXT },
  user:     { fill: '#312e81', stroke: '#818cf8', text: TEXT },
  writer:   { fill: '#312e81', stroke: '#818cf8', text: TEXT },
  service:  { fill: '#3730a3', stroke: '#a5b4fc', text: TEXT },
  primary:  { fill: '#3730a3', stroke: '#a5b4fc', text: TEXT },
  auth:     { fill: '#3730a3', stroke: '#a5b4fc', text: TEXT },

  // Cyan family
  cache: { fill: '#155e75', stroke: '#67e8f9', text: TEXT },
  leaf:  { fill: '#155e75', stroke: '#67e8f9', text: TEXT },

  // Slate family
  db:      { fill: '#334155', stroke: '#94a3b8', text: TEXT },
  replica: { fill: '#334155', stroke: '#94a3b8', text: TEXT },
  shard:   { fill: '#334155', stroke: '#94a3b8', text: TEXT },

  // Orange family
  queue:  { fill: '#7c2d12', stroke: '#fdba74', text: TEXT },
  topic:  { fill: '#7c2d12', stroke: '#fdba74', text: TEXT },
  origin: { fill: '#7c2d12', stroke: '#fdba74', text: TEXT },
  master: { fill: '#7c2d12', stroke: '#fdba74', text: TEXT },
  store:  { fill: '#7c2d12', stroke: '#fdba74', text: TEXT },
  shield: { fill: '#9a3412', stroke: '#fdba74', text: TEXT },

  // Amber family
  edge:    { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  gateway: { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  pop:     { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  router:  { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  coord:   { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  reader:  { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  group:   { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  lb:      { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  root:    { fill: '#854d0e', stroke: '#fde047', text: TEXT },
  tld:     { fill: '#a16207', stroke: '#fde047', text: TEXT },

  // Lime family
  worker:   { fill: '#3f6212', stroke: '#bef264', text: TEXT },
  consumer: { fill: '#3f6212', stroke: '#bef264', text: TEXT },
  pipe:     { fill: '#3f6212', stroke: '#bef264', text: TEXT },
};

const ROLES = Object.keys(DARK);

// Cache the original light-mode inline styles so we can restore on theme back.
const originalStyles = new WeakMap<Element, string>();

function classifyNode(node: Element): string | null {
  const classes = (node.getAttribute('class') || '').split(/\s+/);
  for (const c of classes) if (DARK[c]) return c;
  return null;
}

function paintNode(node: Element, role: string, mode: 'dark' | 'restore') {
  const palette = DARK[role];
  const shape = node.querySelector(':scope > rect, :scope > polygon, :scope > path');
  if (shape instanceof SVGElement) {
    if (mode === 'dark') {
      if (!originalStyles.has(shape)) {
        originalStyles.set(shape, shape.getAttribute('style') || '');
      }
      shape.style.setProperty('fill', palette.fill, 'important');
      shape.style.setProperty('stroke', palette.stroke, 'important');
    } else {
      const orig = originalStyles.get(shape);
      if (orig !== undefined) shape.setAttribute('style', orig);
    }
  }
  // Label text: Mermaid wraps in a foreignObject with class "nodeLabel"
  const labels = node.querySelectorAll<HTMLElement>('.nodeLabel, .nodeLabel *');
  labels.forEach((l) => {
    if (mode === 'dark') {
      if (!originalStyles.has(l)) originalStyles.set(l, l.getAttribute('style') || '');
      l.style.setProperty('color', palette.text, 'important');
      l.style.setProperty('fill', palette.text, 'important');
    } else {
      const orig = originalStyles.get(l);
      if (orig !== undefined) l.setAttribute('style', orig);
    }
  });
}

function paintAll(mode: 'dark' | 'restore') {
  ROLES.forEach((role) => {
    document
      .querySelectorAll(`.docusaurus-mermaid-container g.node.${role}`)
      .forEach((node) => paintNode(node, role, mode));
  });
}

function applyForCurrentTheme() {
  const theme = document.documentElement.getAttribute('data-theme');
  paintAll(theme === 'dark' ? 'dark' : 'restore');
}

if (typeof window !== 'undefined') {
  // Run on initial load + after Docusaurus client routing
  const run = () => {
    // Mermaid renders async; retry a couple of times until nodes appear.
    let tries = 0;
    const tick = () => {
      tries++;
      const any = document.querySelector('.docusaurus-mermaid-container g.node');
      if (any || tries > 30) {
        applyForCurrentTheme();
      }
      if (tries <= 30) setTimeout(tick, 100);
    };
    tick();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

  // Re-apply when the user toggles theme
  const observer = new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'attributes' && m.attributeName === 'data-theme') {
        applyForCurrentTheme();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true });

  // Re-apply on every client-side navigation (Docusaurus SPA)
  const orig = (history as History & { pushState: History['pushState'] }).pushState;
  (history as History & { pushState: History['pushState'] }).pushState = function (
    ...args: Parameters<History['pushState']>
  ) {
    const r = orig.apply(this, args);
    setTimeout(run, 200);
    return r;
  };
  window.addEventListener('popstate', () => setTimeout(run, 200));
}

export {};
