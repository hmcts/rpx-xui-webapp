import { buildCaseListMock } from './caseList.mock';

export function buildVisualCaseListMock() {
  const mock = buildCaseListMock(2);
  const references = ['1234-5678-9012-3456', '2345-6789-0123-4567'];
  mock.results.forEach((result, index) => {
    const reference = references[index];
    result.case_id = reference;
    Object.assign(result.case_fields, {
      '[CASE_REFERENCE]': reference,
      '[CREATED_DATE]': '2026-09-15T09:30:00.000Z',
      '[LAST_STATE_MODIFIED_DATE]': '2026-09-16T10:30:00.000Z',
      '[LAST_MODIFIED_DATE]': '2026-09-17T11:30:00.000Z',
      TextField0: index === 0 ? 'Visual case alpha' : 'Visual case beta',
      TextField1: index === 0 ? 'Civil' : 'Family',
      TextField2: index === 0 ? 'Open' : 'Review',
    });
  });
  return mock;
}
