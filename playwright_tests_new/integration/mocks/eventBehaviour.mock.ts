import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const caseDetailsTemplate = require('../../../src/assets/getCaseNoLinkedCases.json') as Record<string, unknown>;

export const EVENT_BEHAVIOUR_CASE_REFERENCE = '1652112127295261';
export const EVENT_BEHAVIOUR_CASE_TYPE = 'Benefit_Xui';
export const EVENT_BEHAVIOUR_JURISDICTION = 'SSCS';
export const EVENT_BEHAVIOUR_TRIGGER_ID = 'recordOutcome';
export const EVENT_BEHAVIOUR_TRIGGER_NAME = 'Record outcome';
export const EVENT_BEHAVIOUR_EVENT_TOKEN = 'mock-record-outcome-event-token';
export const EVENT_BEHAVIOUR_CALLBACK_URL = '/data/case-types/Benefit_Xui/callbacks/record-outcome';

type FixedListItem = { code: string; label: string; order: number };

type FieldType = {
  id: string;
  type: string;
  min: number | null;
  max: number | null;
  regular_expression: string | null;
  fixed_list_items: FixedListItem[];
  complex_fields: unknown[];
  collection_field_type: FieldType | null;
};

type EventFieldOptions = {
  id: string;
  label: string;
  order: number;
  fieldType?: FieldType;
  displayContext?: 'MANDATORY' | 'OPTIONAL';
  hintText?: string;
  showCondition?: string | null;
  value?: unknown;
  retainHiddenValue?: boolean | null;
};

const textFieldType = (overrides: Partial<FieldType> = {}): FieldType => ({
  id: 'Text',
  type: 'Text',
  min: null,
  max: null,
  regular_expression: null,
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
  ...overrides,
});

const fixedListFieldType = (items: FixedListItem[]): FieldType =>
  textFieldType({ id: 'FixedList-OutcomeType', type: 'FixedList', fixed_list_items: items });

const eventField = (options: EventFieldOptions) => ({
  id: options.id,
  label: options.label,
  hidden: null,
  value: options.value ?? null,
  metadata: false,
  hint_text: options.hintText ?? null,
  field_type: options.fieldType ?? textFieldType(),
  validation_expr: null,
  security_label: 'PUBLIC',
  order: options.order,
  formatted_value: null,
  display_context: options.displayContext ?? 'OPTIONAL',
  display_context_parameter: null,
  show_condition: options.showCondition ?? null,
  show_summary_change_option: true,
  show_summary_content_option: null,
  retain_hidden_value: options.retainHiddenValue ?? null,
  publish: false,
  publish_as: null,
  acls: [],
  complexACLs: [],
});

export function buildEventBehaviourTrigger() {
  return {
    id: EVENT_BEHAVIOUR_TRIGGER_ID,
    name: EVENT_BEHAVIOUR_TRIGGER_NAME,
    description: 'Record a configured case outcome',
    case_id: EVENT_BEHAVIOUR_CASE_REFERENCE,
    case_fields: [
      eventField({
        id: 'OutcomeType',
        label: 'Outcome type',
        hintText: 'Select the outcome for this case',
        fieldType: fixedListFieldType([
          { code: 'approved', label: 'Approved', order: 1 },
          { code: 'needsMoreInfo', label: 'Needs more information', order: 2 },
        ]),
        order: 1,
        displayContext: 'MANDATORY',
        value: 'approved',
      }),
      eventField({
        id: 'OutcomeNote',
        label: 'Outcome note',
        hintText: 'Explain what information is still needed',
        order: 2,
        displayContext: 'MANDATORY',
        showCondition: 'OutcomeType="needsMoreInfo"',
      }),
      eventField({
        id: 'DecisionReference',
        label: 'Decision reference',
        hintText: 'Use the format EVT-123',
        order: 3,
        displayContext: 'MANDATORY',
        fieldType: textFieldType({ regular_expression: '^EVT-[0-9]{3}$', min: 7, max: 7 }),
      }),
      eventField({
        id: 'InternalNote',
        label: 'Internal note',
        order: 4,
        value: 'retained internal note',
        showCondition: 'OutcomeType="approved"',
        retainHiddenValue: true,
      }),
    ],
    event_token: EVENT_BEHAVIOUR_EVENT_TOKEN,
    wizard_pages: [
      {
        id: 'recordOutcomePage1',
        label: 'Outcome details',
        order: 1,
        wizard_page_fields: [
          { case_field_id: 'OutcomeType', order: 1, page_column_no: null, complex_field_overrides: [] },
          { case_field_id: 'OutcomeNote', order: 2, page_column_no: null, complex_field_overrides: [] },
        ],
        show_condition: null,
        callback_url_mid_event: EVENT_BEHAVIOUR_CALLBACK_URL,
        retries_timeout_mid_event: [1, 2],
      },
      {
        id: 'recordOutcomePage2',
        label: 'Decision details',
        order: 2,
        wizard_page_fields: [
          { case_field_id: 'DecisionReference', order: 1, page_column_no: null, complex_field_overrides: [] },
          { case_field_id: 'InternalNote', order: 2, page_column_no: null, complex_field_overrides: [] },
        ],
        show_condition: null,
        callback_url_mid_event: null,
        retries_timeout_mid_event: [],
      },
    ],
    show_summary: true,
    show_event_notes: false,
    end_button_label: 'Submit outcome',
    can_save_draft: null,
    access_granted: 'STANDARD',
    access_process: 'NONE',
    title_display: null,
    supplementary_data: null,
    _links: {
      self: {
        href: `/data/internal/cases/${EVENT_BEHAVIOUR_CASE_REFERENCE}/event-triggers/${EVENT_BEHAVIOUR_TRIGGER_ID}?ignore-warning=false`,
      },
    },
  };
}

export function buildEventBehaviourCaseDetails(options: { eventRecorded?: boolean; eventReturnedByCaseView?: boolean } = {}) {
  const caseDetails = JSON.parse(JSON.stringify(caseDetailsTemplate)) as Record<string, unknown>;
  caseDetails.case_id = EVENT_BEHAVIOUR_CASE_REFERENCE;
  caseDetails.case_type = {
    ...(caseDetails.case_type as Record<string, unknown>),
    id: EVENT_BEHAVIOUR_CASE_TYPE,
    jurisdiction: { id: EVENT_BEHAVIOUR_JURISDICTION },
  };
  caseDetails.triggers =
    options.eventReturnedByCaseView === false
      ? []
      : [
          {
            id: EVENT_BEHAVIOUR_TRIGGER_ID,
            name: EVENT_BEHAVIOUR_TRIGGER_NAME,
            description: 'Record a configured case outcome',
            order: 1,
          },
        ];

  if (options.eventRecorded) {
    caseDetails.events = [
      ...(Array.isArray(caseDetails.events) ? caseDetails.events : []),
      {
        id: 999999,
        timestamp: '2026-08-11T09:30:00.000Z',
        summary: 'Record outcome',
        comment: 'Outcome recorded',
        event_id: EVENT_BEHAVIOUR_TRIGGER_ID,
        event_name: EVENT_BEHAVIOUR_TRIGGER_NAME,
        user_id: 'event-behaviour-user',
        user_last_name: 'Tester',
        user_first_name: 'Event',
        state_name: 'Outcome recorded',
        state_id: 'outcomeRecorded',
        significant_item: null,
        proxied_by: null,
        proxied_by_last_name: null,
        proxied_by_first_name: null,
      },
    ];
    caseDetails.state = { id: 'outcomeRecorded', name: 'Outcome recorded' };
  }

  caseDetails.tabs = [
    {
      id: 'activity-history',
      label: 'Activity and history',
      order: 1,
      fields: [
        {
          id: 'caseHistory',
          label: 'Case history',
          value: caseDetails.events,
          field_type: {
            id: 'CaseHistoryViewer',
            type: 'CaseHistoryViewer',
            min: null,
            max: null,
            regular_expression: null,
            fixed_list_items: [],
            complex_fields: [],
            collection_field_type: null,
          },
          acls: [],
          complexACLs: [],
          display_context: 'OPTIONAL',
          display_context_parameter: null,
          show_condition: null,
        },
      ],
      show_condition: null,
    },
  ];

  return caseDetails;
}
