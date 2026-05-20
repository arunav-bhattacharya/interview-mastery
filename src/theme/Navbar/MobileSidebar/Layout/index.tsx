// Swizzled NavbarMobileSidebar/Layout
//
// Stacks primary nav items + secondary doc sidebar vertically so the 4 navbar
// links are always visible in the mobile drawer (including on the homepage).
//
// Layout-critical styles are applied INLINE rather than via a stylesheet,
// because external CSS module/global rules can lose specificity races on some
// mobile browsers (iOS Safari WebKit in particular). Inline styles always win.

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
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  overflowX: 'hidden',
  transform: 'none',
  WebkitTransform: 'none',
  height: 'calc(100% - var(--ifm-navbar-height, 60px))',
};

const panelStyle: CSSProperties = {
  width: '100%',
  flexShrink: 0,
};

const secondaryPanelStyle: CSSProperties = {
  ...panelStyle,
  borderTop: '1px solid var(--ifm-toc-border-color, rgba(0, 0, 0, 0.1))',
  marginTop: '0.25rem',
  paddingTop: '0.25rem',
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
        <MobilePanel className="im-msb-primary" style={panelStyle}>
          {primaryMenu}
        </MobilePanel>
        <MobilePanel className="im-msb-secondary" style={secondaryPanelStyle}>
          {secondaryMenu}
        </MobilePanel>
      </div>
    </div>
  );
}
