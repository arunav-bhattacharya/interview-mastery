/* Mobile bottom navigation injector.
 *
 * Adds a sticky bottom nav with four quick links on mobile viewports. We
 * inject via direct DOM manipulation in a client module (rather than via
 * the swizzled React Layout) so the bar can't be removed by any hydration
 * mismatch and is identical in every browser — including Safari, where
 * the React-rendered version seems to disappear at runtime.
 *
 * Inline `<style>` is appended to <head> with high-specificity rules so no
 * external stylesheet can override the layout. The bar lives directly on
 * <body> as a sibling of Docusaurus' root container.
 */

type QuickLink = { href: string; label: string };

const LINKS: QuickLink[] = [
  { href: '/interview-mastery/learn/guide/master-guide', label: 'Guide' },
  { href: '/interview-mastery/learn/dsa/arrays-strings', label: 'Learn' },
  { href: '/interview-mastery/study-plan', label: 'Plan' },
  { href: '/interview-mastery/progress', label: 'Progress' },
];

const STYLE_ID = 'im-mobile-bottom-nav-style';
const NAV_ID = 'im-mobile-bottom-nav';

const CSS = `
#${NAV_ID} { display: none; }
@media (max-width: 996px) {
  #${NAV_ID} {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    padding: 8px;
    padding-bottom: calc(8px + env(safe-area-inset-bottom));
    background: var(--ifm-navbar-background-color, #ffffff);
    border-top: 1px solid var(--im-border, #e3e5ee);
    -webkit-box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
            box-shadow: 0 -2px 8px rgba(0,0,0,0.08);
    gap: 6px;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
  }
  #${NAV_ID} a {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 0;
    flex: 1 1 0;
    text-align: center;
    padding: 10px 4px;
    font-size: 13px;
    font-weight: 600;
    color: var(--im-fg, #14151b);
    background: var(--im-surface, #ffffff);
    border: 1px solid var(--im-border, #e3e5ee);
    border-radius: 8px;
    text-decoration: none !important;
    line-height: 1.1;
  }
  #${NAV_ID} a:hover,
  #${NAV_ID} a:focus,
  #${NAV_ID} a:active {
    color: var(--im-accent, #3346b3);
    border-color: var(--im-accent, #3346b3);
    background: var(--im-accent-soft, #d8def0);
  }
  body { padding-bottom: calc(60px + env(safe-area-inset-bottom)) !important; }
}
`;

function ensureStyle(): void {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.appendChild(document.createTextNode(CSS));
  document.head.appendChild(style);
}

function ensureNav(): void {
  if (document.getElementById(NAV_ID)) return;
  const nav = document.createElement('nav');
  nav.id = NAV_ID;
  nav.setAttribute('aria-label', 'Mobile quick navigation');
  for (const { href, label } of LINKS) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    nav.appendChild(a);
  }
  document.body.appendChild(nav);
}

function init(): void {
  if (typeof document === 'undefined') return;
  ensureStyle();
  ensureNav();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}

export {};
