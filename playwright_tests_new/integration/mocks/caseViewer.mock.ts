import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const caseTemplate = require('../../../src/assets/getCaseNoLinkedCases.json');

export const CASE_VIEWER_CASE_REFERENCE = '1652112127295261';
export const CASE_VIEWER_CASE_TYPE = 'Benefit_Xui';
export const CASE_VIEWER_JURISDICTION = 'SSCS';

type ViewerVariant = 'populated' | 'empty' | 'shuttered';

const CASE_VIEWER_RESTRICTED_ACL = [
  {
    create: false,
    read: true,
    update: false,
    delete: false,
    role: 'caseworker-sscs',
  },
];

type CaseViewerMock = {
  case_id: string;
  case_type: {
    id: string;
    jurisdiction: { id: string };
    printEnabled: boolean;
  };
  state: unknown;
  metadataFields: Array<Record<string, unknown>>;
  tabs: unknown[];
  triggers: unknown[];
  events: unknown[];
};

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function textField(id: string, label: string, value: string | null) {
  return {
    id,
    label,
    hidden: null,
    value,
    metadata: false,
    hint_text: null,
    field_type: {
      id: 'Text',
      type: 'Text',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
    },
    security_classification: 'PUBLIC',
    live_from: null,
    live_until: null,
    show_condition: null,
    acls: [],
    complexACLs: [],
    display_context: 'OPTIONAL',
    display_context_parameter: null,
    retain_hidden_value: null,
    formatted_value: null,
  };
}

function viewerField(id: string, label: string, type: 'CaseHistoryViewer' | 'CasePaymentHistoryViewer', value: unknown) {
  return {
    ...textField(id, label, null),
    value,
    acls: CASE_VIEWER_RESTRICTED_ACL,
    field_type: {
      ...textField(id, label, null).field_type,
      id: type,
      type,
    },
  };
}

export function buildCaseViewerMock(variant: ViewerVariant = 'populated', roles?: string[]) {
  const mock = clone(caseTemplate) as CaseViewerMock;
  mock.case_id = CASE_VIEWER_CASE_REFERENCE;
  mock.case_type.id = CASE_VIEWER_CASE_TYPE;
  mock.case_type.jurisdiction.id = CASE_VIEWER_JURISDICTION;
  mock.case_type.printEnabled = variant !== 'shuttered';
  mock.state = { id: 'caseCreated', name: 'Case created' };
  mock.metadataFields = mock.metadataFields.map((field: Record<string, unknown>) =>
    field.id === '[CASE_REFERENCE]' ? { ...field, value: CASE_VIEWER_CASE_REFERENCE } : field
  );

  const events =
    variant === 'empty'
      ? []
      : [
          {
            id: 'event-001',
            event_id: 'createCase',
            event_name: 'Create a case',
            summary: 'Case created from the viewer fixture',
            created_date: '2026-08-11T08:30:00.000Z',
            author: 'Integration caseworker',
            state_id: 'caseCreated',
            state_name: 'Case created',
          },
        ];

  mock.tabs = [
    {
      id: 'case-summary',
      label: 'Case summary',
      order: 1,
      fields: [textField('caseReferenceText', 'Case reference', CASE_VIEWER_CASE_REFERENCE)],
      show_condition: null,
    },
    {
      id: 'activity-history',
      label: 'Activity and history',
      order: 2,
      fields: [viewerField('caseHistory', 'Case history', 'CaseHistoryViewer', events)],
      acls: CASE_VIEWER_RESTRICTED_ACL,
      show_condition: null,
    },
    {
      id: 'payment-history',
      label: 'Payment history',
      order: 3,
      fields: [viewerField('paymentHistory', 'Payment history', 'CasePaymentHistoryViewer', null)],
      acls: CASE_VIEWER_RESTRICTED_ACL,
      show_condition: null,
    },
    {
      id: 'retain-dispose',
      label: 'Retain or dispose',
      order: 4,
      fields: [textField('retentionStatus', 'Retention status', variant === 'shuttered' ? null : 'Retain case')],
      acls: CASE_VIEWER_RESTRICTED_ACL,
      show_condition: variant === 'shuttered' ? 'NeverMatches="true"' : null,
    },
  ];

  const canReadRestrictedData = !roles || roles.includes('caseworker-sscs');
  if (!canReadRestrictedData) {
    mock.tabs = mock.tabs.filter((tab: { acls?: typeof CASE_VIEWER_RESTRICTED_ACL }) => !tab.acls?.length);
  }

  mock.triggers = [];
  mock.events = canReadRestrictedData ? events : [];
  return mock;
}
