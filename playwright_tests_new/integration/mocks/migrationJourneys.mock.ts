import { CASE_VIEWER_CASE_REFERENCE, CASE_VIEWER_CASE_TYPE, CASE_VIEWER_JURISDICTION } from './caseViewer.mock';
import { buildVisualCaseListMock } from './visualManageCases.mock';

export const MIGRATION_DOCUMENT_CASE = '1690807693531270';
export const MIGRATION_DOCUMENT_TEXT = 'Case File View - Document Delivery Fixture';

export function buildMigrationRecoveryCaseList() {
  const mock = buildVisualCaseListMock();
  const result = mock.results[0];
  result.case_id = CASE_VIEWER_CASE_REFERENCE;
  Object.assign(result.case_fields, {
    '[CASE_REFERENCE]': CASE_VIEWER_CASE_REFERENCE,
    '[JURISDICTION]': CASE_VIEWER_JURISDICTION,
    '[CASE_TYPE]': CASE_VIEWER_CASE_TYPE,
    TextField0: 'Migration recovery case',
  });
  return mock;
}
