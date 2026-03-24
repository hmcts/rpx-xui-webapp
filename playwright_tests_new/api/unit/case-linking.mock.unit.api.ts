import { expect, test } from '@playwright/test';
import {
  buildCaseLinkingCaseDetailsMock,
  CASE_LINKING_CASE_REFERENCE,
  CASE_LINKING_OTHER_DESCRIPTION,
  CASE_LINKING_OTHER_REASON_CODE,
  CASE_LINKING_REASON_CODE,
  CASE_LINKING_RELATED_CASE_REFERENCE,
  CASE_LINKING_SECOND_RELATED_CASE_REFERENCE,
  CASE_LINKING_SECONDARY_REASON_CODE,
} from '../../integration/mocks/caseLinking.mock.js';

function metadataCaseReference(caseDetails: Record<string, unknown>): number | undefined {
  const metadataFields = Array.isArray(caseDetails.metadataFields) ? caseDetails.metadataFields : [];
  const caseReferenceField = metadataFields.find(
    (field): field is Record<string, unknown> => typeof field === 'object' && field !== null && field.id === '[CASE_REFERENCE]'
  );

  return typeof caseReferenceField?.value === 'number' ? caseReferenceField.value : undefined;
}

function firstLinkedCaseReference(caseDetails: Record<string, unknown>): string | undefined {
  const linkedCase = firstLinkedCase(caseDetails);
  const linkedCaseValue =
    typeof linkedCase?.value === 'object' && linkedCase.value !== null
      ? (linkedCase.value as Record<string, unknown>)
      : undefined;

  return typeof linkedCaseValue?.CaseReference === 'string' ? linkedCaseValue.CaseReference : undefined;
}

function firstLinkedCaseReasonCode(caseDetails: Record<string, unknown>): string | undefined {
  const linkedCase = firstLinkedCase(caseDetails);
  const linkedCaseValue =
    typeof linkedCase?.value === 'object' && linkedCase.value !== null
      ? (linkedCase.value as Record<string, unknown>)
      : undefined;
  const reasons = Array.isArray(linkedCaseValue?.Reasons) ? linkedCaseValue.Reasons : [];
  const firstReason = reasons[0];

  return typeof firstReason?.reasonCode === 'string' ? firstReason.reasonCode : undefined;
}

function firstLinkedCaseOtherDescription(caseDetails: Record<string, unknown>): string | undefined {
  const linkedCase = firstLinkedCase(caseDetails);
  const linkedCaseValue =
    typeof linkedCase?.value === 'object' && linkedCase.value !== null
      ? (linkedCase.value as Record<string, unknown>)
      : undefined;
  const reasons = Array.isArray(linkedCaseValue?.Reasons) ? linkedCaseValue.Reasons : [];
  const firstReason = reasons[0];

  return typeof firstReason?.OtherDescription === 'string' ? firstReason.OtherDescription : undefined;
}

function firstLinkedCase(caseDetails: Record<string, unknown>): Record<string, unknown> | undefined {
  const linkedCases = linkedCasesCollection(caseDetails);
  const firstLinkedCase = linkedCases[0];

  return typeof firstLinkedCase === 'object' && firstLinkedCase !== null ? firstLinkedCase : undefined;
}

function linkedCasesCollection(caseDetails: Record<string, unknown>): unknown[] {
  const tabs = Array.isArray(caseDetails.tabs) ? caseDetails.tabs : [];
  const linkedCasesTab = tabs.find(
    (tab): tab is Record<string, unknown> => typeof tab === 'object' && tab !== null && tab.id === 'linked_cases_sscs'
  );
  const fields = Array.isArray(linkedCasesTab?.fields) ? linkedCasesTab.fields : [];
  const caseLinksField = fields.find(
    (field): field is Record<string, unknown> => typeof field === 'object' && field !== null && field.id === 'caseLinks'
  );
  return Array.isArray(caseLinksField?.value) ? caseLinksField.value : [];
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

  test('stores the custom Other description when the linked case reason is CLRC014', () => {
    const caseDetails = buildCaseLinkingCaseDetailsMock({
      withLinks: true,
      reasonCode: CASE_LINKING_OTHER_REASON_CODE,
      otherDescription: CASE_LINKING_OTHER_DESCRIPTION,
    });

    expect(firstLinkedCaseReference(caseDetails)).toBe(CASE_LINKING_RELATED_CASE_REFERENCE);
    expect(firstLinkedCaseReasonCode(caseDetails)).toBe(CASE_LINKING_OTHER_REASON_CODE);
    expect(firstLinkedCaseOtherDescription(caseDetails)).toBe(CASE_LINKING_OTHER_DESCRIPTION);
  });

  test('keeps OtherDescription empty for standard linked-case reasons', () => {
    const caseDetails = buildCaseLinkingCaseDetailsMock({
      withLinks: true,
      reasonCode: CASE_LINKING_REASON_CODE,
    });

    expect(firstLinkedCaseReference(caseDetails)).toBe(CASE_LINKING_RELATED_CASE_REFERENCE);
    expect(firstLinkedCaseReasonCode(caseDetails)).toBe(CASE_LINKING_REASON_CODE);
    expect(firstLinkedCaseOtherDescription(caseDetails)).toBe('');
  });

  test('preserves the supplied linked-case ordering in the case details tab data', () => {
    const caseDetails = buildCaseLinkingCaseDetailsMock({
      linkedCases: [
        {
          linkedCaseReference: CASE_LINKING_RELATED_CASE_REFERENCE,
          reasonCode: CASE_LINKING_REASON_CODE,
        },
        {
          linkedCaseReference: CASE_LINKING_SECOND_RELATED_CASE_REFERENCE,
          reasonCode: CASE_LINKING_SECONDARY_REASON_CODE,
        },
      ],
    });

    const linkedCaseReferences = linkedCasesCollection(caseDetails)
      .map((linkedCase) =>
        typeof linkedCase === 'object' && linkedCase !== null && typeof (linkedCase as { id?: unknown }).id === 'string'
          ? (linkedCase as { id: string }).id
          : null
      )
      .filter((linkedCaseReference): linkedCaseReference is string => linkedCaseReference !== null);

    expect(linkedCaseReferences).toEqual([CASE_LINKING_RELATED_CASE_REFERENCE, CASE_LINKING_SECOND_RELATED_CASE_REFERENCE]);
  });
});
