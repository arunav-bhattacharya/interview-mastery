// Swizzled NavbarMobileSidebar/SecondaryMenu
// The upstream version renders a "← Back to main menu" button above the
// secondary content because primary and secondary are presented as two
// alternating panels. In our swizzled Layout they're stacked vertically and
// both visible, so the back button is dead UI. Render just the content.

import React from 'react';
import {useNavbarSecondaryMenu} from '@docusaurus/theme-common/internal';

export default function NavbarMobileSidebarSecondaryMenu(): React.ReactElement {
  const secondaryMenu = useNavbarSecondaryMenu();
  return <>{secondaryMenu.content}</>;
}
