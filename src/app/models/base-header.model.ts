interface MenuItem {
    active: boolean;
    href: string;
    text: string;
    roles?: string[];
    flags?: (string | { flagName: string; value: string })[];
    align?: string;
    ngClass?: string;
    notFlags?: string[];
  }

export const menuItems: MenuItem[] = [
  {
    active: false,
    href: '/cases',
    text: 'Case list'
  },
  {
    active: false,
    href: '/cases/case-filter',
    text: 'Create case'
  },
  {
    active: false,
    flags: ['MC_Notice_of_Change'],
    href: '/noc',
    roles: [],
    text: 'Notice of change'
  },
  {
    active: false,
    align: 'right',
    href: '/cases/case-search',
    ngClass: 'hmcts-search-toggle__button',
    text: 'Find case'
  },
  {
    active: false,
    flags: [
      'MC_Work_Allocation',
      {
        flagName: 'mc-work-allocation-active-feature',
        value: 'WorkAllocationRelease2'
      }
    ],
    href: '/work/my-work/list',
    roles: [],
    text: 'My work'
  },
  {
    active: false,
    flags: [
      'MC_Work_Allocation',
      {
        flagName: 'mc-work-allocation-active-feature',
        value: 'WorkAllocationRelease2'
      }
    ],
    href: '/work/all-work/tasks',
    roles: [],
    text: 'All work'
  },
  {
    active: false,
    flags: ['feature-global-search'],
    href: '/search',
    roles: [],
    text: 'Search'
  },
  {
    active: false,
    href: '/booking',
    roles: [],
    text: 'Work access'
  },
  {
    active: false,
    align: 'right',
    flags: ['feature-global-search'],
    href: '/cases/case-search',
    ngClass: 'hmcts-search-toggle__button',
    text: '16-digit-ref-search'
  },
  {
    active: false,
    flags: [
      'MC_Work_Allocation',
      {
        flagName: 'mc-work-allocation-active-feature',
        value: 'WorkAllocationRelease1'
      }
    ],
    href: '/tasks',
    roles: [],
    text: 'Task list'
  },
  {
    active: false,
    flags: [
      'MC_Work_Allocation',
      {
        flagName: 'mc-work-allocation-active-feature',
        value: 'WorkAllocationRelease1'
      }
    ],
    href: '/tasks/task-manager',
    roles: [],
    text: 'Task manager'
  },
  {
    active: false,
    flags: ['feature-refunds'],
    href: '/refunds',
    roles: [],
    text: 'Refunds'
  },
  {
    active: false,
    flags: [],
    href: '/staff',
    roles: [],
    text: 'Staff'
  }
];
