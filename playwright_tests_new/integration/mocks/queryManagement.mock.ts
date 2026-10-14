import { createRequire } from 'node:module';
import type { Route } from '@playwright/test';

const require = createRequire(import.meta.url);
const caseDetailsTemplate = require('../../../src/assets/getCaseNoLinkedCases.json');

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export const QUERY_MANAGEMENT_CASE_REFERENCE = String(caseDetailsTemplate.case_id);
export const QUERY_MANAGEMENT_JURISDICTION = 'IA';
export const QUERY_MANAGEMENT_CASE_TYPE = 'Asylum';
export const QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID = 'queryManagementRaiseQuery';
export const QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME = 'Raise a query';
export const QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID = 'queryManagementRespondQuery';
export const QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_NAME = 'Respond to query';
export const QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID = 'qmCaseQueriesCollection';
export const QUERY_MANAGEMENT_COMPONENT_LAUNCHER_FIELD_ID = 'QueryManagement1';
export const QUERY_MANAGEMENT_QUERY_SUBJECT = 'Question about next steps';
export const QUERY_MANAGEMENT_QUERY_DETAIL = 'Please confirm what the next step is for this case.';
export const QUERY_MANAGEMENT_EXISTING_QUERY_ID = 'query-management-existing-query';
export const QUERY_MANAGEMENT_EXISTING_RESPONSE_ID = 'query-management-existing-response';
export const QUERY_MANAGEMENT_RESPONSE_DETAIL = 'The caseworker response to the query.';
export const QUERY_MANAGEMENT_FOLLOW_UP_DETAIL = 'Please can you provide an update on the response.';
export const QUERY_MANAGEMENT_CONFIRMATION_HEADER = 'Your query has been sent to HMCTS';
export const QUERY_MANAGEMENT_CONFIRMATION_BODY = 'Our team will read your query and respond.';
export const QUERY_MANAGEMENT_RESPOND_TASK_ID = 'query-management-respond-task';
export const QUERY_MANAGEMENT_FOLLOW_UP_MESSAGE_TYPE = 'Followup';
export const QUERY_MANAGEMENT_RESPOND_MESSAGE_TYPE = 'Respond';

export type QueryManagementCaseMessage = {
  attachments: unknown[];
  body: string;
  createdBy: string;
  createdOn: string;
  hearingDate: string | null;
  id: string;
  isClosed?: string;
  isHearingRelated: string;
  isHmctsStaff?: string;
  messageType: string;
  name: string;
  parentId?: string;
  subject: string;
};

export type QueryManagementCaseQueriesCollection = {
  partyName: string;
  roleOnCase: string;
  caseMessages: Array<{
    id: string | null;
    value: QueryManagementCaseMessage;
  }>;
};

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
      buildComplexField('isClosed', 'Is closed', TEXT_FIELD_TYPE, 12),
      buildComplexField('isHmctsStaff', 'Is HMCTS staff', TEXT_FIELD_TYPE, 13),
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

function buildCaseQueriesCollectionField(
  value: QueryManagementCaseQueriesCollection | null = null,
  hidden: boolean | null = null
) {
  return {
    id: QUERY_MANAGEMENT_CASE_QUERIES_FIELD_ID,
    label: 'Query management',
    hidden,
    value,
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

function buildQueryManagementComponentLauncherField() {
  return {
    id: QUERY_MANAGEMENT_COMPONENT_LAUNCHER_FIELD_ID,
    label: 'Query management',
    hidden: null,
    value: null,
    metadata: false,
    hint_text: null,
    field_type: {
      id: 'ComponentLauncher',
      type: 'ComponentLauncher',
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
      min: null,
      max: null,
      regular_expression: null,
    },
    validation_expr: null,
    security_label: 'PUBLIC',
    order: 1,
    formatted_value: null,
    display_context: null,
    display_context_parameter: '#ARGUMENT(QueryManagement)',
    show_condition: null,
    show_summary_change_option: true,
    show_summary_content_option: null,
    retain_hidden_value: null,
    publish: false,
    publish_as: null,
    acls: FULL_ACCESS_ACLS,
  };
}

function buildQueryManagementTrigger(id: string, name: string, order: number) {
  return {
    id,
    name,
    description: name,
    order,
  };
}

function applyQueryManagementCaseType(caseDetails: Record<string, unknown>): void {
  const caseType = caseDetails.case_type as Record<string, unknown> | undefined;
  const jurisdiction = caseType?.jurisdiction as Record<string, unknown> | undefined;
  if (caseType) {
    caseType.id = QUERY_MANAGEMENT_CASE_TYPE;
    caseType.name = 'Immigration and Asylum';
    caseType.description = 'Immigration and Asylum';
  }
  if (jurisdiction) {
    jurisdiction.id = QUERY_MANAGEMENT_JURISDICTION;
    jurisdiction.name = 'Immigration and Asylum';
    jurisdiction.description = 'Immigration and Asylum';
  }

  const metadataFields = caseDetails.metadataFields as Array<Record<string, unknown>> | undefined;
  metadataFields?.forEach((field) => {
    if (field.id === '[JURISDICTION]') {
      field.value = QUERY_MANAGEMENT_JURISDICTION;
    }
    if (field.id === '[CASE_TYPE]') {
      field.value = QUERY_MANAGEMENT_CASE_TYPE;
    }
  });
}

function appendQueryManagementTab(
  caseDetails: Record<string, unknown>,
  queryCollection: QueryManagementCaseQueriesCollection
): void {
  const tabs = (caseDetails.tabs as Array<Record<string, unknown>> | undefined) ?? [];
  caseDetails.tabs = [
    ...tabs.filter((tab) => tab.id !== 'Queries'),
    {
      id: 'Queries',
      label: 'Queries',
      order: 40,
      fields: [buildQueryManagementComponentLauncherField(), buildCaseQueriesCollectionField(queryCollection, true)],
      role: null,
      show_condition: null,
    },
  ];
}

export function buildQueryManagementExistingQueryCollection(options?: {
  includeResponse?: boolean;
}): QueryManagementCaseQueriesCollection {
  const originalQuery: QueryManagementCaseMessage = {
    id: QUERY_MANAGEMENT_EXISTING_QUERY_ID,
    subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
    name: 'Query Solicitor',
    body: QUERY_MANAGEMENT_QUERY_DETAIL,
    attachments: [],
    isHearingRelated: 'No',
    hearingDate: null,
    createdOn: '2026-06-20T10:00:00.000Z',
    createdBy: 'query-management-solicitor-user',
    messageType: QUERY_MANAGEMENT_FOLLOW_UP_MESSAGE_TYPE,
  };
  const response: QueryManagementCaseMessage = {
    id: QUERY_MANAGEMENT_EXISTING_RESPONSE_ID,
    subject: QUERY_MANAGEMENT_QUERY_SUBJECT,
    name: 'Case Worker',
    body: QUERY_MANAGEMENT_RESPONSE_DETAIL,
    attachments: [],
    isHearingRelated: 'No',
    hearingDate: null,
    createdOn: '2026-06-21T10:00:00.000Z',
    createdBy: 'query-management-caseworker-user',
    parentId: QUERY_MANAGEMENT_EXISTING_QUERY_ID,
    isClosed: 'No',
    isHmctsStaff: 'Yes',
    messageType: QUERY_MANAGEMENT_RESPOND_MESSAGE_TYPE,
  };

  return {
    partyName: 'Query Solicitor',
    roleOnCase: '',
    caseMessages: [
      {
        id: QUERY_MANAGEMENT_EXISTING_QUERY_ID,
        value: originalQuery,
      },
      ...(options?.includeResponse
        ? [
            {
              id: QUERY_MANAGEMENT_EXISTING_RESPONSE_ID,
              value: response,
            },
          ]
        : []),
    ],
  };
}

export function buildQueryManagementCaseDetailsMock(options?: {
  data?: Record<string, unknown>;
  includeQueryTab?: boolean;
  queryCollection?: QueryManagementCaseQueriesCollection;
}) {
  const caseDetails = deepClone(caseDetailsTemplate) as Record<string, unknown>;
  caseDetails.case_id = QUERY_MANAGEMENT_CASE_REFERENCE;
  applyQueryManagementCaseType(caseDetails);
  caseDetails.triggers = [
    buildQueryManagementTrigger(QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID, QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME, 1),
    buildQueryManagementTrigger(QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID, QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_NAME, 2),
  ];

  if (options?.data) {
    caseDetails.data = options.data;
  }

  if (options?.includeQueryTab && options.queryCollection) {
    appendQueryManagementTab(caseDetails, options.queryCollection);
  }

  return caseDetails;
}

function buildQueryManagementEventTriggerMock({
  caseId = QUERY_MANAGEMENT_CASE_REFERENCE,
  eventId,
  eventName,
  queryCollection = null,
}: {
  caseId?: string;
  eventId: string;
  eventName: string;
  queryCollection?: QueryManagementCaseQueriesCollection | null;
}) {
  return {
    id: eventId,
    name: eventName,
    description: eventName,
    case_id: caseId,
    case_fields: [buildCaseQueriesCollectionField(queryCollection)],
    event_token: `mock-${eventId}-event-token`,
    wizard_pages: [
      {
        id: `${eventId}Page1`,
        label: eventName,
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
        href: `/data/internal/cases/${caseId}/event-triggers/${eventId}`,
      },
    },
  };
}

export function buildQueryManagementRaiseQueryEventTriggerMock(
  caseId = QUERY_MANAGEMENT_CASE_REFERENCE,
  queryCollection: QueryManagementCaseQueriesCollection | null = null
) {
  return buildQueryManagementEventTriggerMock({
    caseId,
    eventId: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_ID,
    eventName: QUERY_MANAGEMENT_RAISE_QUERY_TRIGGER_NAME,
    queryCollection,
  });
}

export function buildQueryManagementRespondQueryEventTriggerMock(
  caseId = QUERY_MANAGEMENT_CASE_REFERENCE,
  queryCollection: QueryManagementCaseQueriesCollection
) {
  return buildQueryManagementEventTriggerMock({
    caseId,
    eventId: QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_ID,
    eventName: QUERY_MANAGEMENT_RESPOND_QUERY_TRIGGER_NAME,
    queryCollection,
  });
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
