import { createRequire } from 'node:module';
import type { Route } from '@playwright/test';

const require = createRequire(import.meta.url);
const caseDetailsTemplate = require('../../../src/assets/getCaseNoLinkedCases.json');

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const QUERY_MANAGEMENT_CASE_REFERENCE = String(caseDetailsTemplate.case_id);
export const QUERY_MANAGEMENT_JURISDICTION = String(caseDetailsTemplate.case_type?.jurisdiction?.id ?? 'SSCS');
export const QUERY_MANAGEMENT_CASE_TYPE = String(caseDetailsTemplate.case_type?.id ?? 'Benefit_Xui');
export const QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID = 'queryManagementRaiseQuery';
export const QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME = 'Raise a query';
export const QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID = 'qmCaseQueriesCollection';
export const QUERY_MANAGEMENT_QUERY_SUBJECT = 'Question about next steps';
export const QUERY_MANAGEMENT_QUERY_DETAIL = 'Please confirm what the next step is for this case.';
export const QUERY_MANAGEMENT_CONFIRMATION_HEADER = 'Your query has been sent to HMCTS';
export const QUERY_MANAGEMENT_CONFIRMATION_BODY = 'Our team will read your query and respond.';

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

const DATE_FIELD_TYPE = {
  id: 'Date',
  type: 'Date',
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
  min: null,
  max: null,
  regular_expression: null,
};

const DOCUMENT_FIELD_TYPE = {
  id: 'Document',
  type: 'Document',
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
  min: null,
  max: null,
  regular_expression: null,
};

function buildComplexField(id: string, label: string, fieldType: Record<string, unknown>, order: number) {
  return {
    id,
    label,
    hidden: null,
    order,
    metadata: false,
    case_type_id: null,
    hint_text: null,
    value: null,
    field_type: fieldType,
    security_classification: 'PUBLIC',
    live_from: null,
    live_until: null,
    show_condition: null,
    acls: FULL_ACCESS_ACLS,
    complexACLs: [],
    display_context: null,
    display_context_parameter: null,
    retain_hidden_value: null,
    formatted_value: null,
  };
}

function buildCaseMessageFieldType() {
  const attachmentFieldType = {
    id: 'QueryAttachments',
    type: 'Collection',
    fixed_list_items: [],
    complex_fields: [],
    collection_field_type: DOCUMENT_FIELD_TYPE,
    min: null,
    max: null,
    regular_expression: null,
  };

  return {
    id: 'CaseMessage',
    type: 'Complex',
    fixed_list_items: [],
    complex_fields: [
      buildComplexField('id', 'ID', TEXT_FIELD_TYPE, 1),
      buildComplexField('subject', 'Query subject', TEXT_FIELD_TYPE, 2),
      buildComplexField('name', 'Sender name', TEXT_FIELD_TYPE, 3),
      buildComplexField('body', 'Query body', TEXT_FIELD_TYPE, 4),
      buildComplexField('attachments', 'Attachments', attachmentFieldType, 5),
      buildComplexField('isHearingRelated', 'Is the query hearing related?', TEXT_FIELD_TYPE, 6),
      buildComplexField('hearingDate', 'Hearing date', DATE_FIELD_TYPE, 7),
      buildComplexField('createdOn', 'Created on', DATE_FIELD_TYPE, 8),
      buildComplexField('createdBy', 'Created by', TEXT_FIELD_TYPE, 9),
      buildComplexField('parentId', 'Parent ID', TEXT_FIELD_TYPE, 10),
      buildComplexField('messageType', 'Message type', TEXT_FIELD_TYPE, 11),
    ],
    collection_field_type: null,
    min: null,
    max: null,
    regular_expression: null,
  };
}

function buildCaseQueriesCollectionFieldType() {
  return {
    id: 'CaseQueriesCollection',
    type: 'Complex',
    fixed_list_items: [],
    complex_fields: [
      buildComplexField('partyName', 'Party name', TEXT_FIELD_TYPE, 1),
      buildComplexField('roleOnCase', 'Role on case', TEXT_FIELD_TYPE, 2),
      buildComplexField(
        'caseMessages',
        'Case messages',
        {
          id: 'CaseMessages',
          type: 'Collection',
          fixed_list_items: [],
          complex_fields: [],
          collection_field_type: buildCaseMessageFieldType(),
          min: null,
          max: null,
          regular_expression: null,
        },
        3
      ),
    ],
    collection_field_type: null,
    min: null,
    max: null,
    regular_expression: null,
  };
}

function buildCaseQueriesCollectionField() {
  return {
    id: QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID,
    label: 'Query management',
    hidden: null,
    value: null,
    metadata: false,
    hint_text: null,
    field_type: buildCaseQueriesCollectionFieldType(),
    validation_expr: null,
    security_label: 'PUBLIC',
    order: 1,
    formatted_value: null,
    display_context: 'OPTIONAL',
    display_context_parameter: null,
    show_condition: null,
    show_summary_change_option: true,
    show_summary_content_option: null,
    retain_hidden_value: null,
    publish: false,
    publish_as: null,
    acls: FULL_ACCESS_ACLS,
  };
}

export function buildQueryManagementCaseDetailsMock(options?: { data?: Record<string, unknown> }) {
  const caseDetails = deepClone(caseDetailsTemplate) as Record<string, unknown>;
  caseDetails.case_id = QUERY_MANAGEMENT_CASE_REFERENCE;
  caseDetails.triggers = [
    {
      id: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
      name: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
      description: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
      order: 1,
    },
  ];

  if (options?.data) {
    caseDetails.data = options.data;
  }

  return caseDetails;
}

export function buildQueryManagementRaiseQueryEventTriggerMock(caseId = QUERY_MANAGEMENT_CASE_REFERENCE) {
  return {
    id: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
    name: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
    description: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
    case_id: caseId,
    case_fields: [buildCaseQueriesCollectionField()],
    event_token: `mock-${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}-event-token`,
    wizard_pages: [
      {
        id: 'queryManagementRaiseQueryPage1',
        label: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
        order: 1,
        wizard_page_fields: [
          {
            case_field_id: QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID,
            order: 1,
            page_column_no: 1,
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
        href: `/data/internal/cases/${caseId}/event-triggers/${QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID}`,
      },
    },
  };
}

export function buildQueryManagementValidationResponse(route: Route): Record<string, unknown> {
  const requestBody = route.request().postDataJSON?.() as { data?: Record<string, unknown> } | undefined;

  return {
    data: requestBody?.data ?? {},
    errors: [],
    warnings: [],
    _links: {
      self: {
        href: route.request().url(),
      },
    },
  };
}

export function buildQueryManagementCreateEventResponse(
  route: Route,
  caseDetails: Record<string, unknown>
): Record<string, unknown> {
  const requestBody = route.request().postDataJSON?.() as { data?: Record<string, unknown> } | undefined;

  return {
    ...caseDetails,
    data: requestBody?.data ?? {},
    after_submit_callback_response: {
      confirmation_header: QUERY_MANAGEMENT_CONFIRMATION_HEADER,
      confirmation_body: QUERY_MANAGEMENT_CONFIRMATION_BODY,
    },
  };
}
