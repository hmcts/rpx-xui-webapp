import { buildCaseViewerMock } from './caseViewer.mock';
import { buildGlobalSearchMenuResultsMock } from './globalSearch.mock';
import { buildMigrationWorkTaskList, MIGRATION_WORK_ROLES } from './migrationWork.mock';

const navigationTask = buildMigrationWorkTaskList().tasks[0];
export const NAVIGATION_CASE_REFERENCE = navigationTask.case_id;
export const NAVIGATION_RESTRICTED_REFERENCE = '1700000000000002';
export const NAVIGATION_CASE_PATH = `/cases/case-details/IA/Asylum/${NAVIGATION_CASE_REFERENCE}`;

export function buildMigrationNavigationCase() {
  const caseDetails = buildCaseViewerMock('populated', MIGRATION_WORK_ROLES);
  caseDetails.case_id = NAVIGATION_CASE_REFERENCE;
  caseDetails.case_type.id = 'Asylum';
  caseDetails.case_type.jurisdiction.id = 'IA';
  const metadata = { '[CASE_REFERENCE]': NAVIGATION_CASE_REFERENCE, '[CASE_TYPE]': 'Asylum', '[JURISDICTION]': 'IA' };
  caseDetails.metadataFields = caseDetails.metadataFields.map((field) => ({
    ...field,
    value: metadata[field.id as keyof typeof metadata] ?? field.value,
  }));
  const reference = caseDetails.tabs[0].fields[0] as { value: string };
  reference.value = NAVIGATION_CASE_REFERENCE;
  return caseDetails;
}

export function buildMigrationNavigationSearch() {
  const results = buildGlobalSearchMenuResultsMock();
  Object.assign(results.results[0], {
    CCDCaseTypeId: 'Asylum',
    CCDCaseTypeName: 'Asylum',
    CCDJurisdictionId: 'IA',
    CCDJurisdictionName: 'Immigration and Asylum',
    HMCTSServiceId: 'BFA1',
    HMCTSServiceShortDescription: 'Immigration and Asylum',
    caseNameHmctsInternal: navigationTask.case_name,
    caseReference: NAVIGATION_CASE_REFERENCE,
  });
  return {
    results,
    services: [{ serviceId: 'IA', serviceName: 'Immigration and Asylum' }],
    jurisdictions: [{ id: 'IA', name: 'Immigration and Asylum', caseTypes: [{ id: 'Asylum', name: 'Asylum', states: [] }] }],
  };
}
