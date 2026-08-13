type FixedListItem = { code: string; label: string; order: null };

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

function field(params: {
  id: string;
  label: string;
  hintText?: string;
  displayContext?: 'MANDATORY' | 'OPTIONAL';
  value?: unknown;
  fieldType?: FieldType;
  showCondition?: string | null;
  retainHiddenValue?: boolean | null;
}) {
  return {
    id: params.id,
    label: params.label,
    hidden: null,
    value: params.value ?? null,
    metadata: false,
    hint_text: params.hintText ?? null,
    field_type: params.fieldType ?? textFieldType(),
    validation_expr: null,
    security_label: 'PUBLIC',
    order: null,
    formatted_value: null,
    display_context: params.displayContext ?? 'OPTIONAL',
    display_context_parameter: null,
    show_condition: params.showCondition ?? null,
    show_summary_change_option: true,
    show_summary_content_option: null,
    retain_hidden_value: params.retainHiddenValue ?? null,
    publish: false,
    publish_as: null,
    acls: [],
    complexACLs: [],
  };
}

const fixedList = (id: string, type: string, items: FixedListItem[]): FieldType =>
  textFieldType({ id, type, fixed_list_items: items });

export function dynamicFieldConfigCaseData() {
  return {
    id: 'createCase',
    name: 'Create a case',
    description: 'Dynamic field-config integration fixture',
    case_id: null,
    case_fields: [
      field({
        id: 'CaseTitle',
        label: 'Case title',
        hintText: 'Enter a title for this case',
        displayContext: 'MANDATORY',
        value: 'Default case title',
      }),
      field({
        id: 'CaseType',
        label: 'Case type',
        hintText: 'Select the type of case',
        fieldType: fixedList('FixedList-caseType', 'FixedList', [
          { code: 'standard', label: 'Standard', order: null },
          { code: 'urgent', label: 'Urgent', order: null },
        ]),
        value: 'standard',
      }),
      field({
        id: 'UrgentReason',
        label: 'Reason for urgent handling',
        hintText: 'Required when the case type is urgent',
        displayContext: 'MANDATORY',
        showCondition: 'CaseType="urgent"',
      }),
      field({
        id: 'CaseReference',
        label: 'Case reference',
        hintText: 'Use three digits',
        displayContext: 'MANDATORY',
        fieldType: textFieldType({ regular_expression: '^[0-9]{3}$', min: 3, max: 3 }),
      }),
      field({
        id: 'HiddenWithoutRetention',
        label: 'Hidden value without retention',
        value: 'omit-me',
        showCondition: 'CaseType="standard"',
      }),
      field({
        id: 'HiddenWithRetention',
        label: 'Hidden value with retention',
        value: 'keep-me',
        showCondition: 'CaseType="standard"',
        retainHiddenValue: true,
      }),
      field({
        id: 'Service',
        label: 'Service',
        hintText: 'Select a service',
        fieldType: textFieldType({ id: 'DynamicList-service', type: 'DynamicList' }),
        value: {
          value: { code: 'civil', label: 'Civil' },
          list_items: [
            { code: 'civil', label: 'Civil' },
            { code: 'family', label: 'Family' },
          ],
        },
      }),
    ],
    event_token: 'dynamic-field-config-token',
    wizard_pages: [
      {
        id: 'dynamicFieldConfigPage',
        label: 'Dynamic field configuration',
        order: 1,
        wizard_page_fields: [
          'CaseTitle',
          'CaseType',
          'UrgentReason',
          'CaseReference',
          'HiddenWithoutRetention',
          'HiddenWithRetention',
          'Service',
        ].map((case_field_id, index) => ({ case_field_id, order: index + 1, page_column_no: null, complex_field_overrides: [] })),
        show_condition: null,
        callback_url_mid_event: null,
        retries_timeout_mid_event: [],
      },
    ],
    show_summary: true,
    show_event_notes: false,
    end_button_label: 'Test submit',
    can_save_draft: null,
    access_granted: 'STANDARD',
    access_process: 'NONE',
    title_display: null,
    supplementary_data: null,
  };
}
