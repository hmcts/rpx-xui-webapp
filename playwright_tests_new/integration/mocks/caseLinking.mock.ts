import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const caseWithoutLinksTemplate = require('../../../src/assets/getCaseNoLinkedCases.json');
const linkedCasesResponseTemplate = require('../../../src/assets/getLinkedCases.json');
const linkedCasesResponseTemplateFirstItem = Array.isArray(linkedCasesResponseTemplate.linkedCases)
  ? linkedCasesResponseTemplate.linkedCases[0]
  : undefined;

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeCaseReferenceMetadata(caseDetails: Record<string, unknown>, caseReference: string): void {
  caseDetails.case_id = caseReference;

  const metadataFields = Array.isArray(caseDetails.metadataFields) ? caseDetails.metadataFields : [];
  const caseReferenceMetadataField = metadataFields.find(
    (field): field is Record<string, unknown> => typeof field === 'object' && field !== null && field.id === '[CASE_REFERENCE]'
  );

  if (caseReferenceMetadataField) {
    caseReferenceMetadataField.value = Number(caseReference);
  }
}

function setCaseLinksValue(caseDetails: Record<string, unknown>, linkedCases: Record<string, unknown>[] | null): void {
  const tabs = Array.isArray(caseDetails.tabs) ? caseDetails.tabs : [];
  const linkedCasesTab = tabs.find(
    (tab): tab is Record<string, unknown> => typeof tab === 'object' && tab !== null && tab.id === 'linked_cases_sscs'
  );
  const fields = Array.isArray(linkedCasesTab?.fields) ? linkedCasesTab.fields : [];
  const caseLinksField = fields.find(
    (field): field is Record<string, unknown> => typeof field === 'object' && field !== null && field.id === 'caseLinks'
  );

  if (caseLinksField) {
    caseLinksField.value = linkedCases;
    caseLinksField.formatted_value = linkedCases;
  }
}

export const CASE_LINKING_CASE_REFERENCE = String(caseWithoutLinksTemplate.case_id);
export const CASE_LINKING_JURISDICTION = String(caseWithoutLinksTemplate.case_type?.jurisdiction?.id ?? 'SSCS');
export const CASE_LINKING_CASE_TYPE = String(caseWithoutLinksTemplate.case_type?.id ?? 'Benefit_Xui');
export const CASE_LINKING_LINKED_CASES_API_CASE_TYPE = String(linkedCasesResponseTemplateFirstItem?.ccdCaseType ?? 'benefit');
export const CASE_LINKING_TRIGGER_ID = 'linkCases';
export const CASE_LINKING_RELATED_CASE_REFERENCE = '1652112127295261';
export const CASE_LINKING_SECOND_RELATED_CASE_REFERENCE = '1652112127295262';
export const CASE_LINKING_REASON_CODE = 'CLRC015';
export const CASE_LINKING_REASON_LABEL = 'Case consolidated';
export const CASE_LINKING_SECONDARY_REASON_CODE = 'CLRC017';
export const CASE_LINKING_SECONDARY_REASON_LABEL = 'Linked for a hearing';
export const CASE_LINKING_OTHER_REASON_CODE = 'CLRC014';
export const CASE_LINKING_OTHER_REASON_LABEL = 'Other';
export const CASE_LINKING_OTHER_DESCRIPTION = 'Linked because the appeals should be managed together';

export function formatCaseReferenceForDisplay(caseReference: string): string {
  return caseReference.replace(/(\d{4})(?=\d)/g, '$1-');
}

const FULL_ACCESS_ACLS = [
  {
    role: 'caseworker',
    create: true,
    read: true,
    update: true,
    delete: true,
  },
];

const TEXT_FIELD_TYPE = {
  id: 'Text',
  type: 'Text',
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
  min: null,
  max: null,
  regular_expression: null,
};

function buildFixedListFieldType() {
  return {
    id: 'FixedList-CaseLinkReasonCode',
    type: 'FixedList',
    fixed_list_items: [
      {
        code: CASE_LINKING_REASON_CODE,
        label: CASE_LINKING_REASON_LABEL,
        order: 1,
      },
      {
        code: CASE_LINKING_SECONDARY_REASON_CODE,
        label: CASE_LINKING_SECONDARY_REASON_LABEL,
        order: 2,
      },
      {
        code: CASE_LINKING_OTHER_REASON_CODE,
        label: CASE_LINKING_OTHER_REASON_LABEL,
        order: 3,
      },
    ],
    complex_fields: [],
    collection_field_type: null,
    min: null,
    max: null,
    regular_expression: null,
  };
}

function buildEventField(options: {
  id: string;
  label: string;
  fieldType: Record<string, unknown>;
  order: number;
  displayContext?: 'MANDATORY' | 'OPTIONAL';
  hintText?: string | null;
  showCondition?: string | null;
}) {
  return {
    id: options.id,
    label: options.label,
    hidden: null,
    value: null,
    metadata: false,
    hint_text: options.hintText ?? null,
    field_type: options.fieldType,
    validation_expr: null,
    security_label: 'PUBLIC',
    order: options.order,
    formatted_value: null,
    display_context: options.displayContext ?? 'OPTIONAL',
    display_context_parameter: null,
    show_condition: options.showCondition ?? null,
    show_summary_change_option: true,
    show_summary_content_option: null,
    retain_hidden_value: null,
    publish: false,
    publish_as: null,
    acls: FULL_ACCESS_ACLS,
  };
}

function buildCaseLinkReason(code: string, otherDescription = ''): Record<string, string> {
  return {
    reasonCode: code,
    OtherDescription: otherDescription,
  };
}

function buildCaseFieldLinkedCaseValue(
  linkedCaseReference: string,
  reasonCode: string,
  otherDescription = ''
): Record<string, unknown> {
  return {
    CaseReference: linkedCaseReference,
    ModifiedDateTime: '2022-05-10',
    CaseType: 'Benefit_SCSS',
    Reasons: [buildCaseLinkReason(reasonCode, otherDescription)],
  };
}

function buildCaseFieldLinkedCaseCollectionItem(
  linkedCaseReference: string,
  reasonCode: string,
  otherDescription = ''
): Record<string, unknown> {
  return {
    id: linkedCaseReference,
    value: buildCaseFieldLinkedCaseValue(linkedCaseReference, reasonCode, otherDescription),
  };
}

function buildLinkedCasesApiItem(
  linkedCaseReference: string,
  reasonCode: string,
  otherDescription = ''
): Record<string, unknown> {
  return {
    caseNameHmctsInternal: `Linked case ${linkedCaseReference}`,
    caseReference: linkedCaseReference,
    ccdCaseType: CASE_LINKING_LINKED_CASES_API_CASE_TYPE,
    ccdJurisdiction: CASE_LINKING_JURISDICTION,
    state: 'withDwp',
    linkDetails: [
      {
        createdDateTime: '2022-05-10T10:00:00.000',
        reasons: [
          {
            reasonCode,
            OtherDescription: otherDescription,
          },
        ],
      },
    ],
  };
}

export interface CaseLinkingLinkedCase {
  linkedCaseReference: string;
  reasonCode: string;
  otherDescription?: string;
}

function buildCaseLinkReasonLov(code: string, label: string, lovOrder: number): Record<string, unknown> {
  return {
    category_key: 'CaseLinkingReasonCode',
    key: code,
    value_en: label,
    value_cy: '',
    hint_text_en: label,
    hint_text_cy: '',
    lov_order: lovOrder,
    parent_category: '',
    parent_key: '',
    active_flag: 'Y',
    child_nodes: null,
    from: 'exui-default',
  };
}

export function buildCaseLinkingCaseDetailsMock(options?: {
  withLinks?: boolean;
  linkedCaseReference?: string;
  reasonCode?: string;
  otherDescription?: string;
  linkedCases?: CaseLinkingLinkedCase[] | null;
}) {
  const caseDetails = deepClone(caseWithoutLinksTemplate) as Record<string, unknown>;
  normalizeCaseReferenceMetadata(caseDetails, CASE_LINKING_CASE_REFERENCE);
  const linkedCases =
    options?.linkedCases !== undefined
      ? options.linkedCases
      : options?.withLinks
        ? [
            {
              linkedCaseReference: options.linkedCaseReference ?? CASE_LINKING_RELATED_CASE_REFERENCE,
              reasonCode: options.reasonCode ?? CASE_LINKING_REASON_CODE,
              otherDescription: options.otherDescription ?? '',
            },
          ]
        : null;
  setCaseLinksValue(
    caseDetails,
    linkedCases && linkedCases.length > 0
      ? linkedCases.map((linkedCase) =>
          buildCaseFieldLinkedCaseCollectionItem(
            linkedCase.linkedCaseReference,
            linkedCase.reasonCode,
            linkedCase.otherDescription ?? ''
          )
        )
      : null
  );
  return caseDetails;
}

export function buildCaseLinkingLinkedCasesResponseMock(options?: { linkedCases?: CaseLinkingLinkedCase[] }) {
  const linkedCasesResponse = deepClone(linkedCasesResponseTemplate) as Record<string, unknown>;
  const linkedCases = options?.linkedCases ?? [];

  linkedCasesResponse.linkedCases = linkedCases.map((linkedCase) =>
    buildLinkedCasesApiItem(linkedCase.linkedCaseReference, linkedCase.reasonCode, linkedCase.otherDescription ?? '')
  );

  return linkedCasesResponse;
}

export function buildCaseLinkingReasonCodesMock() {
  return {
    list_of_values: [
      buildCaseLinkReasonLov(CASE_LINKING_REASON_CODE, CASE_LINKING_REASON_LABEL, 1),
      buildCaseLinkReasonLov(CASE_LINKING_SECONDARY_REASON_CODE, CASE_LINKING_SECONDARY_REASON_LABEL, 2),
      buildCaseLinkReasonLov(CASE_LINKING_OTHER_REASON_CODE, CASE_LINKING_OTHER_REASON_LABEL, 3),
    ],
  };
}

export function buildCaseLinkingEventTriggerMock() {
  return {
    id: CASE_LINKING_TRIGGER_ID,
    name: 'Link cases',
    description: 'Link one case to another',
    case_id: CASE_LINKING_CASE_REFERENCE,
    case_fields: [
      buildEventField({
        id: 'LinkedCaseReference',
        label: 'Linked case reference',
        fieldType: TEXT_FIELD_TYPE,
        order: 1,
        displayContext: 'MANDATORY',
        hintText: 'Enter the CCD case reference to link to this case',
      }),
      buildEventField({
        id: 'CaseLinkReasonCode',
        label: 'Reason for link',
        fieldType: buildFixedListFieldType(),
        order: 2,
        displayContext: 'MANDATORY',
      }),
      buildEventField({
        id: 'OtherDescription',
        label: 'Other description',
        fieldType: TEXT_FIELD_TYPE,
        order: 3,
        hintText: 'Describe the reason for linking these cases',
        showCondition: `CaseLinkReasonCode="${CASE_LINKING_OTHER_REASON_CODE}"`,
      }),
    ],
    event_token: 'mock-case-linking-event-token',
    wizard_pages: [
      {
        id: 'linkCasesPage1',
        label: 'Link cases',
        order: 1,
        wizard_page_fields: [
          {
            case_field_id: 'LinkedCaseReference',
            order: 1,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'CaseLinkReasonCode',
            order: 2,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'OtherDescription',
            order: 3,
            page_column_no: null,
            complex_field_overrides: [],
          },
        ],
        show_condition: null,
        callback_url_mid_event: null,
        retries_timeout_mid_event: [],
      },
    ],
    show_summary: true,
    show_event_notes: false,
    end_button_label: 'Submit',
    can_save_draft: null,
    access_granted: 'STANDARD',
    access_process: 'NONE',
    title_display: null,
    supplementary_data: null,
    _links: {
      self: {
        href: `/data/internal/cases/${CASE_LINKING_CASE_REFERENCE}/event-triggers/${CASE_LINKING_TRIGGER_ID}?ignore-warning=false`,
      },
    },
  };
}
