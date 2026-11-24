import { buildEventBehaviourTrigger } from './eventBehaviour.mock';

type Trigger = ReturnType<typeof buildEventBehaviourTrigger>;
type Field = Trigger['case_fields'][number];

const field = (id: string, label: string, overrides: Partial<Field> = {}): Field => ({
  ...buildEventBehaviourTrigger().case_fields[1],
  id,
  label,
  display_context: 'OPTIONAL',
  hint_text: null,
  show_condition: null,
  retain_hidden_value: true,
  ...overrides,
});

const wizardPage = (id: string, order: number, fields: string[], condition: string | null = null) => ({
  ...buildEventBehaviourTrigger().wizard_pages[1],
  id,
  label: id,
  order,
  show_condition: condition,
  wizard_page_fields: fields.map((case_field_id, index) => ({
    case_field_id,
    order: index + 1,
    page_column_no: null,
    complex_field_overrides: [],
  })),
});

export function buildChainedShowConditionsTrigger(): Trigger {
  return {
    ...buildEventBehaviourTrigger(),
    case_fields: [
      field('Controller', 'Controller', { value: 'yes' }),
      field('Intermediary', 'Conditional source', { value: 'hide', show_condition: 'Controller="yes"' }),
      field('Dependent', 'Dependent detail', { show_condition: 'Intermediary="show"' }),
    ],
    wizard_pages: [wizardPage('dependencyPage', 1, ['Controller', 'Intermediary', 'Dependent'])],
  };
}

export function buildHiddenPageShowConditionsTrigger(sourceValue: string): Trigger {
  return {
    ...buildEventBehaviourTrigger(),
    case_fields: [
      field('Controller', 'Show source page', { value: 'no' }),
      field('Source', 'Skipped page source', { value: sourceValue }),
      field('Anchor', 'Destination note'),
      field('Dependent', 'Dependent detail', { show_condition: 'Source="show"' }),
    ],
    wizard_pages: [
      wizardPage('controllerPage', 1, ['Controller']),
      wizardPage('skippedSourcePage', 2, ['Source'], 'Controller="yes"'),
      wizardPage('destinationPage', 3, ['Anchor', 'Dependent']),
    ],
  };
}

export function buildLaterPageShowConditionsTrigger(sourceValue: string): Trigger {
  return {
    ...buildEventBehaviourTrigger(),
    case_fields: [
      field('Anchor', 'First page note'),
      field('Dependent', 'Dependent detail', { show_condition: 'Source="show"' }),
      field('Source', 'Later page source', { value: sourceValue }),
    ],
    wizard_pages: [wizardPage('dependentPage', 1, ['Anchor', 'Dependent']), wizardPage('laterSourcePage', 2, ['Source'])],
  };
}

export function buildMetadataShowConditionsTrigger(expectedState: string): Trigger {
  return {
    ...buildEventBehaviourTrigger(),
    case_fields: [
      field('Anchor', 'Metadata page note'),
      field('Dependent', 'Metadata-dependent detail', { show_condition: `[STATE]="${expectedState}"` }),
    ],
    wizard_pages: [wizardPage('metadataPage', 1, ['Anchor', 'Dependent'])],
  };
}
