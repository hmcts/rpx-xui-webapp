const textFieldType = {
  id: 'Text',
  type: 'Text',
  min: null,
  max: null,
  regular_expression: null,
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
};

const complexFieldType = (id: string) => ({
  id,
  type: 'Complex',
  min: null,
  max: null,
  regular_expression: null,
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
});

const buildField = (id: string, label: string, value: unknown, fieldType = textFieldType) => ({
  id,
  label,
  value,
  formatted_value: value,
  metadata: false,
  field_type: fieldType,
});

export function asylumCase() {
  return {
    _links: { self: { href: 'http://gateway-ccd.aat.platform.hmcts.net/internal/cases/1701861283367022' } },
    case_id: '1701861283367022',
    case_type: {
      id: 'Asylum',
      name: 'Appeal* master',
      description: 'Asylum Case',
      jurisdiction: { id: 'IA', name: 'Immigration & Asylum', description: 'Immigration & Asylum' },
      printEnabled: false,
    },
    metadataFields: [
      buildField('[CASE_REFERENCE]', 'Case Reference', 1701861283367022),
      buildField('[JURISDICTION]', 'Jurisdiction', 'IA'),
      buildField('[CASE_TYPE]', 'Case Type', 'Asylum'),
    ].map((field) => ({ ...field, metadata: true })),
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        order: 1,
        fields: [
          buildField(
            'caseManagementLocation',
            'Case management location',
            { region: '1', baseLocation: '386417' },
            complexFieldType('caseManagementLocation')
          ),
          buildField('appealReferenceNumber', 'Appeal reference number', 'PA/50001/2024'),
          buildField('journeyType', 'Journey type', 'rep'),
          buildField('submissionOutOfTime', 'Submission out of time', 'No'),
        ],
      },
    ],
    state: {
      id: 'caseManagement',
      name: 'Case management',
      description: 'Case management',
      title_display: '# ${[CASE_REFERENCE]}',
    },
    triggers: [],
    channels: [],
    events: [],
  };
}
