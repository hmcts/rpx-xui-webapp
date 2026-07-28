const baseUrl = 'http://localhost:4200/';

const conf = {
  headless: 'new',
  failTestOna11yIssues: false,
  reportPath: 'reports/tests/a11y/',
  appName: 'EXUI Manage Cases a11y Test Report',
  baseUrl: baseUrl,
  params: {
    username: process.env.A11Y_TEST_USERNAME || 'lukesuperuserxui@mailnesia.com',
    password: process.env.A11Y_TEST_PASSWORD || process.env.TEST_PASSWORD,
  },
  unauthenticatedUrls: ['accessibility', 'cookies', 'privacy-policy', 'get-help'],
};

module.exports = { conf };
