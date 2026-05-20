// Swizzled NavbarMobileSidebar/Layout
//
// Renders the mobile drawer as a simple vertically-scrolling block. The
// upstream version places primary + secondary panels side-by-side and uses a
// transform-based horizontal slide to switch between them, which:
//   - hides the primary navbar items by default on doc pages
//   - leaves the homepage drawer looking empty on some real mobile browsers
//     (notably Safari)
//
// We sidestep all of that: drop the flex/slide and let the panels stack as
// normal block elements. Inline styles are used for the layout-critical bits
// so no external stylesheet can override them on any browser, and key
// properties are restated with -webkit- prefixes for older WebKit.

import React, {version, type ReactNode, type CSSProperties} from 'react';
import clsx from 'clsx';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';
import {ThemeClassNames} from '@docusaurus/theme-common';

function inertProps(inert: boolean): Record<string, string | boolean | undefined> {
  const isBeforeReact19 = parseInt(version.split('.')[0], 10) < 19;
  if (isBeforeReact19) {
    return {inert: inert ? '' : undefined};
  }
  return {inert};
}

const itemsStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  height: 'calc(100% - var(--ifm-navbar-height, 60px))',
  overflowY: 'auto',
  overflowX: 'hidden',
  transform: 'none',
  WebkitTransform: 'none',
  WebkitOverflowScrolling: 'touch',
};

const primaryPanelStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '0.5rem',
  boxSizing: 'border-box',
};

const secondaryPanelStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '0.5rem',
  boxSizing: 'border-box',
  borderTop: '1px solid var(--ifm-toc-border-color, rgba(0, 0, 0, 0.1))',
  marginTop: '0.25rem',
  paddingTop: '0.5rem',
};

interface PanelProps {
  children: ReactNode;
  inert?: boolean;
  className?: string;
  style?: CSSProperties;
}

function MobilePanel({children, inert = false, className, style}: PanelProps): React.ReactElement {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        'navbar-sidebar__item menu',
        className,
      )}
      style={style}
      {...inertProps(inert)}>
      {children}
    </div>
  );
}

interface LayoutProps {
  header: ReactNode;
  primaryMenu: ReactNode;
  secondaryMenu: ReactNode;
}

export default function NavbarMobileSidebarLayout({
  header,
  primaryMenu,
  secondaryMenu,
}: LayoutProps): React.ReactElement {
  // Consume the hook so Docusaurus' state machine isn't surprised, but ignore
  // the returned `shown` flag — primary is always visible in this layout.
  useNavbarSecondaryMenu();
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        'navbar-sidebar',
        'im-msb',
      )}>
      {header}
      <div className={clsx('navbar-sidebar__items', 'im-msb-stack')} style={itemsStyle}>
        <MobilePanel className="im-msb-primary" style={primaryPanelStyle}>
          {primaryMenu}
        </MobilePanel>
        <MobilePanel className="im-msb-secondary" style={secondaryPanelStyle}>
          {secondaryMenu}
        </MobilePanel>
      </div>
    </div>
  );
}
