import { expect, test } from '@playwright/test';
import { extractCaseNumberFromUrl } from '../../E2E/page-objects/pages/exui/caseDetails.po.js';

test.describe('case-details route case number', { tag: '@svc-internal' }, () => {
  const caseId = '1795534753466874';

  test('accepts the current jurisdiction and case-type route and the short route', () => {
    expect(
      extractCaseNumberFromUrl(`https://manage-case.example/cases/case-details/EMPLOYMENT/Leeds/${caseId}#Case%20Details`)
    ).toBe(caseId);
    expect(extractCaseNumberFromUrl(`https://manage-case.example/cases/case-details/${caseId}`)).toBe(caseId);
  });

  test('rejects a case-creation route, a wrong path and an invalid case ID', () => {
    expect(extractCaseNumberFromUrl(`https://manage-case.example/cases/case-create/EMPLOYMENT/Leeds/${caseId}`)).toBeNull();
    expect(extractCaseNumberFromUrl(`https://manage-case.example/other/${caseId}`)).toBeNull();
    expect(extractCaseNumberFromUrl('https://manage-case.example/cases/case-details/EMPLOYMENT/Leeds/1234')).toBeNull();
  });
});
