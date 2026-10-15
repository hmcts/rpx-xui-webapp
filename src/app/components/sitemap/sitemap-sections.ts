export interface SitemapLink {
  text: string;
  href: string;
  accessHref: string;
}

export interface SitemapSection {
  heading: string;
  links: SitemapLink[];
}

export const sitemapSections: SitemapSection[] = [
  {
    heading: 'My work',
    links: [
      { text: 'My tasks', href: '/work/my-work/list', accessHref: '/work/my-work/list' },
      { text: 'Available tasks', href: '/work/my-work/available', accessHref: '/work/my-work/list' },
      { text: 'My cases', href: '/work/my-work/my-cases', accessHref: '/work/my-work/list' },
      { text: 'My access', href: '/work/my-work/my-access', accessHref: '/work/my-work/list' },
    ],
  },
  {
    heading: 'All work',
    links: [
      { text: 'Tasks', href: '/work/all-work/tasks', accessHref: '/work/all-work/tasks' },
      { text: 'Cases', href: '/work/all-work/cases', accessHref: '/work/all-work/tasks' },
      { text: 'Work access', href: '/booking', accessHref: '/booking' },
    ],
  },
  {
    heading: 'Case management',
    links: [
      { text: 'Case list', href: '/cases', accessHref: '/cases' },
      { text: 'Create case', href: '/cases/case-filter', accessHref: '/cases/case-filter' },
      { text: 'Find case', href: '/cases/case-search', accessHref: '/cases/case-search' },
      { text: 'Search', href: '/search', accessHref: '/search' },
      { text: 'Notice of change', href: '/noc', accessHref: '/noc' },
      { text: 'Refunds', href: '/refunds', accessHref: '/refunds' },
    ],
  },
  {
    heading: 'Staff administration',
    links: [{ text: 'Staff', href: '/staff', accessHref: '/staff' }],
  },
];
