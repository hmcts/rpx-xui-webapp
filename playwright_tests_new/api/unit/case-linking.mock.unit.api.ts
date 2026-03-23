import { expect, test } from '@playwright/test';
import {
  buildCaseLinkingCaseDetailsMock,
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_RELATED_CASE_REFERENCE,
} from '../../integration/mocks/caseLinking.mock.js';

function metadataCaseReference(caseDetails: Record<string, unknown>): number | undefined {
  const metadataFields = Array.isArray(caseDetails.metadataFields) ? caseDetails.metadataFields : [];
  const caseReferenceField = metadataFields.find(
    (field): field is Record<string, unknown> => typeof field === 'object' && field !== null && field.id === '[CASE_REFERENCE]'
  );

  return typeof caseReferenceField?.value === 'number' ? caseReferenceField.value : undefined;
}

function firstLinkedCaseReference(caseDetails: Record<string, unknown>): string | undefined {
  const firstLinkedCase = firstLinkedCase(caseDetails);

  return typeof firstLinkedCase?.caseReference === 'string' ? firstLinkedCase.caseReference : undefined;
}

function firstLinkedCaseReasonCode(caseDetails: Record<string, unknown>): string | undefined {
  const firstLinkedCase = firstLinkedCase(caseDetails);
  const reasons = Array.isArray(firstLinkedCase?.reasons) ? firstLinkedCase.reasons : [];
  const firstReason = reasons[0];

  return typeof firstReason?.reasonCode === 'string' ? firstReason.reasonCode : undefined;
}

function firstLinkedCase(caseDetails: Record<string, unknown>): Record<string, unknown> | undefined {
  const tabs = Array.isArray(caseDetails.tabs) ? caseDetails.tabs : [];
  const linkedCasesTab = tabs.find(
    (tab): tab is Record<string, unknown> => typeof tab === 'object' && tab !== null && tab.id === 'linked_cases_sscs'
  );
  const fields = Array.isArray(linkedCasesTab?.fields) ? linkedCasesTab.fields : [];
  const caseLinksField = fields.find(
    (field): field is Record<string, unknown> => typeof field === 'object' && field !== null && field.id === 'caseLinks'
  );
  const linkedCases = Array.isArray(caseLinksField?.value) ? caseLinksField.value : [];
  const firstLinkedCase = linkedCases[0];

  return typeof firstLinkedCase === 'object' && firstLinkedCase !== null ? firstLinkedCase : undefined;
}

test.describe('case linking mock builder', { tag: '@svc-internal' }, () => {
  test('keeps the linked-case success fixture on the same case identity as the link journey', () => {
    const caseDetails = buildCaseLinkingCaseDetailsMock({ withLinks: true });

    expect(caseDetails.case_id).toBe(CASE_LINKING_CASE_REFERENCE);
    expect(metadataCaseReference(caseDetails)).toBe(Number(CASE_LINKING_CASE_REFERENCE));
    expect(firstLinkedCaseReference(caseDetails)).toBe(CASE_LINKING_RELATED_CASE_REFERENCE);
    expect(firstLinkedCaseReasonCode(caseDetails)).toBe(CASE_LINKING_REASON_CODE);
  });

  test('keeps the no-links fixture on the same case identity before submit', () => {
    const caseDetails = buildCaseLinkingCaseDetailsMock({ withLinks: false });

    expect(caseDetails.case_id).toBe(CASE_LINKING_CASE_REFERENCE);
    expect(metadataCaseReference(caseDetails)).toBe(Number(CASE_LINKING_CASE_REFERENCE));
  });
});
