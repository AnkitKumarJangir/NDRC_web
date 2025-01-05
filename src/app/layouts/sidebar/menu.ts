import { MenuItem } from './menu.model';

export const MENU: any[] = [
  {
    id: 1,
    label: 'Dashboards',
    isTitle: true,
  },
  {
    id: 2,
    label: 'Dashboard',
    icon: 'bx bx-home-circle',
    link: '/dashboard',
  },
  {
    id: 6,
    label: 'Calendar',
    icon: 'bx bxs-calendar',
    link: '/calendar',
  },
  {
    id: 3,
    label: 'Loading Slips',
    icon: 'bx bx-receipt',
    link: '/loading-slips',
  },
  {
    id: 4,
    label: 'Entries',
    icon: 'bx bx-list-ul',
    link: '/entries',
  },
  {
    id: 5,
    label: 'Sheet',
    icon: 'bx bx-clipboard',
    link: '/sheet',
  },
];

//NOTE Last id is 205
