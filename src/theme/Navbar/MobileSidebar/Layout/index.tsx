// Swizzled NavbarMobileSidebar/Layout
// Originally renders primary + secondary as two side-by-side panels with a
// transform-based slide. That hides the primary navbar items on doc pages and,
// in some browsers (notably iOS Safari WebKit), leaves the drawer looking
// empty on the homepage.
//
// Stack them vertically instead — primary nav items first (always visible),
// then a divider and the secondary content (e.g. the doc sidebar) when
// present on doc pages.
//
// Styles live in src/css/custom.css (global selectors) rather than a CSS
// module so cascade order and specificity behave predictably across browsers.

import React, {version, type ReactNode} from 'react';
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

interface PanelProps {
  children: ReactNode;
  inert?: boolean;
  className?: string;
}

function MobilePanel({children, inert = false, className}: PanelProps): React.ReactElement {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.panel,
        'navbar-sidebar__item menu',
        className,
      )}
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
      <div className={clsx('navbar-sidebar__items', 'im-msb-stack')}>
        <MobilePanel className="im-msb-primary">{primaryMenu}</MobilePanel>
        <MobilePanel className="im-msb-secondary">{secondaryMenu}</MobilePanel>
      </div>
    </div>
  );
}
