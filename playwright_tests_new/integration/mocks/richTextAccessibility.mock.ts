import { buildEventBehaviourTrigger } from './eventBehaviour.mock';

export const RICH_TEXT_READ_VALUE =
  '<p>Existing <strong>formatted</strong> text.</p><ul><li><p>Bullet item</p></li></ul><ol><li><p>Numbered item</p></li></ol>';

export function buildRichTextAccessibilityTrigger() {
  const trigger = buildEventBehaviourTrigger();
  const caseFields = trigger.case_fields.map((field) => {
    if (field.id === 'OutcomeType') {
      return { ...field, value: 'needsMoreInfo' };
    }

    if (field.id === 'OutcomeNote') {
      return {
        ...field,
        field_type: { ...field.field_type, id: 'RichTextArea', type: 'RichTextArea' },
        value: null,
      };
    }

    return field;
  });

  caseFields.push({
    id: 'LegacyTextAreaNote',
    label: 'Legacy text area note',
    hidden: null,
    value: null,
    metadata: false,
    hint_text: 'This confirms the existing TextArea mapping remains covered.',
    field_type: {
      id: 'TextArea',
      type: 'TextArea',
      min: null,
      max: null,
      regular_expression: null,
      fixed_list_items: [],
      complex_fields: [],
      collection_field_type: null,
    },
    validation_expr: null,
    security_label: 'PUBLIC',
    order: 3,
    formatted_value: null,
    display_context: 'OPTIONAL',
    display_context_parameter: null,
    show_condition: 'OutcomeType="needsMoreInfo"',
    show_summary_change_option: true,
    show_summary_content_option: null,
    retain_hidden_value: null,
    publish: false,
    publish_as: null,
    acls: [],
    complexACLs: [],
  });

  const wizardPages = trigger.wizard_pages.map((page) => {
    if (page.id !== 'recordOutcomePage1') {
      return page;
    }

    return {
      ...page,
      wizard_page_fields: [
        ...page.wizard_page_fields,
        {
          case_field_id: 'LegacyTextAreaNote',
          order: 3,
          page_column_no: null,
          complex_field_overrides: [],
        },
      ],
    };
  });

  return { ...trigger, case_fields: caseFields, wizard_pages: wizardPages };
}
