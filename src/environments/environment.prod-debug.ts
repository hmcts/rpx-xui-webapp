// Local-only debugging profile. Keep this aligned with environment.prod.ts,
// but leave Angular in development mode so Angular and NgRx DevTools can inspect state.
export const environment = {
  production: false,
  loggingLevel: 'OFF',
  cookies: {
    token: '__auth__',
    userId: '__userid__',
    roles: 'roles',
  },
  googleAnalyticsKey: 'UA-124734893-1',
  googleTagManagerKey: 'GTM-TQ7PKDF',
  themes: {
    '(judge)|(judiciary)': {
      appTitle: { name: 'Judicial Case Manager', url: '/' },
      backgroundColor: '#8d0f0e',
      logo: 'judicial',
    },
    'pui-case-manager': { appTitle: { name: 'Manage Cases', url: '/' }, backgroundColor: '#202020', logo: 'myhmcts' },
    '.+': { appTitle: { name: 'Manage Cases', url: '/' }, backgroundColor: '#202020', logo: 'none' },
  },
};
