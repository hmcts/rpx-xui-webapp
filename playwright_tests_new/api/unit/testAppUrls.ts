export const TEST_APP_BASE_URL = 'https://xui-webapp.example.test';

export function buildTestAppUrl(path: string): string {
  return new URL(path, TEST_APP_BASE_URL).toString();
}

export const TEST_CASES_URL = buildTestAppUrl('/cases');
export const TEST_AVAILABLE_TASKS_URL = buildTestAppUrl('/work/my-work/available');
export const TEST_SERVICE_DOWN_URL = buildTestAppUrl('/service-down');
