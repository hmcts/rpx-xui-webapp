import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

type LegacyCaseEventBuilder = {
  getCase: () => LegacyCaseEventConfig;
};

type LegacySearchConfigBuilder = {
  getConfig: () => Record<string, unknown>;
};

type LegacyFieldBuilderInput = {
  id?: string;
  type: string;
  label?: string;
  list?: Array<Record<string, unknown>>;
  fixed_list_items?: Array<Record<string, unknown>>;
  complex_fields?: LegacyFieldBuilderInput[];
  collection_field_type?: LegacyFieldBuilderInput;
  value?: unknown;
  props?: Record<string, unknown>;
};

type LegacyFieldBuilderInstance = {
  getCCDFieldTemplateCopy: (fieldConfig: LegacyFieldBuilderInput) => LegacyCaseField;
};

type LegacyCaseFieldType = Record<string, unknown> & {
  type?: string;
  complex_fields?: LegacyCaseField[];
  collection_field_type?: LegacyCaseFieldType | null;
};

export type LegacyCaseField = Record<string, unknown> & {
  id: string;
  label?: string;
  field_type: LegacyCaseFieldType;
};

export type LegacyWizardPageField = {
  case_field_id: string;
  complex_field_overrides: Array<Record<string, unknown>>;
};

export type LegacyCaseEventConfig = Record<string, unknown> & {
  id: string;
  case_fields: LegacyCaseField[];
  wizard_pages: Array<Record<string, unknown> & { wizard_page_fields: LegacyWizardPageField[] }>;
  show_summary?: boolean | null;
};

type LegacyToolkitCreateCaseOptions = {
  showSummary?: boolean;
  multiSelectShowCondition?: string | null;
  showSummaryChangeFieldIds?: string[];
};

const legacyCcdCaseMock = require('../../../test_codecept/ngIntegration/mockData/ccdCaseMock.js') as {
  getTestJurisdiction: (scenario?: Record<string, unknown>) => LegacyCaseEventBuilder;
  getMockJurisdictionWorkbaseketConfig: () => LegacySearchConfigBuilder;
  getMockJurisdictionSearchInputConfig: () => LegacySearchConfigBuilder;
};

const legacySolicitorCreateEvent =
  require('../../../test_codecept/ngIntegration/mockData/ccd/solicitorCreate/exuiTestCaseType.js') as LegacyCaseEventConfig;

const LegacyCcdCaseField =
  require('../../../test_codecept/ngIntegration/mockData/ccd/solicitorCreate/ccdCaseConfig/CCDCaseField.js') as {
    new (): LegacyFieldBuilderInstance;
  };

export const NG_INTEGRATION_JURISDICTION = 'Test_Jurisdiction';
export const NG_INTEGRATION_CASE_TYPE = 'Test_case';
export const NG_INTEGRATION_EVENT_ID = 'testEvent';
export const NG_INTEGRATION_PAGE_ID = 'testPage';
export const NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME = 'Family Divorce';
export const NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME = 'Divorce case - v115.00';

export type NgIntegrationToolkitConfigField = {
  label: string;
  order: number;
  field: {
    id: string;
    metadata?: boolean;
    field_type: Record<string, unknown>;
  };
  display_context_parameter?: string | null;
};

export type NgIntegrationToolkitSearchConfig = {
  workbasketInputs?: NgIntegrationToolkitConfigField[];
  searchInputs?: NgIntegrationToolkitConfigField[];
};

type NgIntegrationToolkitSearchSource = 'workbasket' | 'search';

function cloneLegacyValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function normalizeLegacyEvent(caseEvent: LegacyCaseEventConfig): LegacyCaseEventConfig {
  const normalized = cloneLegacyValue(caseEvent);
  normalized.id = NG_INTEGRATION_EVENT_ID;
  normalized.name = 'ngIntegration parity event';
  normalized._links = {
    self: {
      href: `${process.env.TEST_URL ?? 'http://localhost:3000'}/internal/case-types/${NG_INTEGRATION_CASE_TYPE}/event-triggers/${NG_INTEGRATION_EVENT_ID}?ignore-warning=false`,
    },
  };
  return normalized;
}

function createLegacyFieldFactory(): LegacyFieldBuilderInstance {
  return new LegacyCcdCaseField();
}

function findCaseField(caseEvent: LegacyCaseEventConfig, fieldId: string): LegacyCaseField {
  const caseField = caseEvent.case_fields.find((field) => field.id === fieldId);
  if (!caseField) {
    throw new Error(`Legacy case field '${fieldId}' was not found`);
  }
  return caseField;
}

function setCaseFieldProps(caseEvent: LegacyCaseEventConfig, fieldId: string, props: Record<string, unknown>): void {
  Object.assign(findCaseField(caseEvent, fieldId), props);
}

function setComplexFieldOverride(
  caseEvent: LegacyCaseEventConfig,
  caseFieldId: string,
  complexFieldElementId: string,
  props: Record<string, unknown>
): void {
  for (const wizardPage of caseEvent.wizard_pages) {
    const pageField = wizardPage.wizard_page_fields.find((field) => field.case_field_id === caseFieldId);
    if (!pageField) {
      continue;
    }

    pageField.complex_field_overrides.push({
      complex_field_element_id: complexFieldElementId,
      display_context: null,
      label: null,
      hint_text: null,
      show_condition: null,
      retain_hidden_value: null,
      ...props,
    });
  }
}

function setShowSummaryChangeOptions(caseEvent: LegacyCaseEventConfig, showSummaryChangeFieldIds?: string[]): void {
  if (!showSummaryChangeFieldIds) {
    return;
  }

  const enabledFieldIds = new Set(showSummaryChangeFieldIds);
  for (const caseField of caseEvent.case_fields) {
    caseField.show_summary_change_option = enabledFieldIds.has(caseField.id);
  }
}

export function buildNgIntegrationToolkitCreateCaseEvent(options: LegacyToolkitCreateCaseOptions = {}): LegacyCaseEventConfig {
  const createCaseBuilder = legacyCcdCaseMock.getTestJurisdiction({
    show_summary: options.showSummary ?? true,
  });
  const caseEvent = normalizeLegacyEvent(createCaseBuilder.getCase());

  if (options.multiSelectShowCondition !== undefined) {
    setCaseFieldProps(caseEvent, 'MultiSelectListField', {
      show_condition: options.multiSelectShowCondition,
    });
  }

  setShowSummaryChangeOptions(caseEvent, options.showSummaryChangeFieldIds);

  return caseEvent;
}

export function buildNgIntegrationToolkitWorkbasketConfig(): Record<string, unknown> {
  const configBuilder = legacyCcdCaseMock.getMockJurisdictionWorkbaseketConfig();
  return cloneLegacyValue(configBuilder.getConfig());
}

export function buildNgIntegrationToolkitSearchInputConfig(): Record<string, unknown> {
  const configBuilder = legacyCcdCaseMock.getMockJurisdictionSearchInputConfig();
  return cloneLegacyValue(configBuilder.getConfig());
}

export function buildNgIntegrationToolkitJurisdictionsMock() {
  return [
    {
      id: NG_INTEGRATION_JURISDICTION,
      name: NG_INTEGRATION_TOOLKIT_JURISDICTION_NAME,
      caseTypes: [
        {
          id: NG_INTEGRATION_CASE_TYPE,
          name: NG_INTEGRATION_TOOLKIT_CASE_TYPE_NAME,
          states: [
            {
              id: 'CaseCreated',
              name: 'Case created',
            },
          ],
        },
      ],
    },
  ];
}

function getToolkitConfig(source: NgIntegrationToolkitSearchSource): NgIntegrationToolkitSearchConfig {
  return (
    source === 'search' ? buildNgIntegrationToolkitSearchInputConfig() : buildNgIntegrationToolkitWorkbasketConfig()
  ) as NgIntegrationToolkitSearchConfig;
}

function getToolkitConfigFields(source: NgIntegrationToolkitSearchSource): NgIntegrationToolkitConfigField[] {
  const config = getToolkitConfig(source);
  return source === 'search' ? (config.searchInputs ?? []) : (config.workbasketInputs ?? []);
}

function resolveToolkitFieldRawValue(fieldId: string, resultIndex: number): string | string[] {
  switch (fieldId) {
    case 'simpletext':
      return `Simple text ${resultIndex}`;
    case 'radioInput':
      return resultIndex % 2 === 0 ? 'a' : 'b';
    case 'radioYesorNo':
      return resultIndex % 2 === 0 ? 'Yes' : 'No';
    case 'fixedListItem':
      return resultIndex % 2 === 0 ? 'b' : 'c';
    case 'multiSelectItem':
      return resultIndex % 2 === 0 ? ['a', 'c'] : ['b', 'c'];
    default:
      return `${fieldId}-${resultIndex}`;
  }
}

function resolveToolkitFieldDisplayValue(fieldId: string, resultIndex: number): string | string[] {
  switch (fieldId) {
    case 'radioInput':
      return resultIndex % 2 === 0 ? 'A' : 'B';
    case 'fixedListItem':
      return resultIndex % 2 === 0 ? 'B' : 'C';
    case 'multiSelectItem':
      return resultIndex % 2 === 0 ? ['A', 'C'] : ['B', 'C'];
    default:
      return resolveToolkitFieldRawValue(fieldId, resultIndex);
  }
}

export function buildNgIntegrationToolkitSearchResults(
  source: NgIntegrationToolkitSearchSource,
  options: {
    pageNumber?: number;
    total?: number;
  } = {}
) {
  const fields = getToolkitConfigFields(source);
  const pageNumber = options.pageNumber ?? 1;
  const total = options.total ?? 26;
  const pageSize = 25;
  const firstRowIndex = (pageNumber - 1) * pageSize + 1;
  const rowCount = Math.max(0, Math.min(pageSize, total - firstRowIndex + 1));

  const columns = [
    {
      label: 'Case reference',
      order: 1,
      metadata: true,
      case_field_id: '[CASE_REFERENCE]',
      case_field_type: {
        id: 'Text',
        type: 'Text',
        min: null,
        max: null,
        regular_expression: null,
        fixed_list_items: [],
        complex_fields: [],
        collection_field_type: null,
      },
      display_context_parameter: null,
    },
    ...fields.map((field, index) => ({
      label: field.label,
      order: index + 2,
      metadata: Boolean(field.field.metadata),
      case_field_id: field.field.id,
      case_field_type: cloneLegacyValue(field.field.field_type),
      display_context_parameter: field.display_context_parameter ?? null,
    })),
  ];

  const results = Array.from({ length: rowCount }, (_, rowOffset) => {
    const rowIndex = firstRowIndex + rowOffset;
    const caseReference = `${1600000000000000 + rowIndex}`;
    const caseFields = fields.reduce<Record<string, string | string[]>>(
      (acc, field) => ({
        ...acc,
        [field.field.id]: resolveToolkitFieldRawValue(field.field.id, rowIndex),
      }),
      {
        '[CASE_REFERENCE]': caseReference,
        '[STATE]': 'CaseCreated',
        '[JURISDICTION]': NG_INTEGRATION_JURISDICTION,
        '[CASE_TYPE]': NG_INTEGRATION_CASE_TYPE,
        '[LAST_MODIFIED_DATE]': `2025-01-${String((rowIndex % 28) + 1).padStart(2, '0')}T10:30:00.000Z`,
      }
    );
    const formattedCaseFields = fields.reduce<Record<string, string | string[]>>(
      (acc, field) => ({
        ...acc,
        [field.field.id]: resolveToolkitFieldDisplayValue(field.field.id, rowIndex),
      }),
      {
        '[CASE_REFERENCE]': caseReference,
        '[STATE]': 'CaseCreated',
        '[JURISDICTION]': NG_INTEGRATION_JURISDICTION,
        '[CASE_TYPE]': NG_INTEGRATION_CASE_TYPE,
        '[LAST_MODIFIED_DATE]': `2025-01-${String((rowIndex % 28) + 1).padStart(2, '0')}T10:30:00.000Z`,
      }
    );

    return {
      case_id: caseReference,
      supplementary_data: null,
      case_fields: caseFields,
      case_fields_formatted: formattedCaseFields,
    };
  });

  return {
    columns,
    results,
    total,
  };
}

export function buildNgIntegrationCollectionPermissionsEvent(displayContextParameter: string | null): LegacyCaseEventConfig {
  const caseEvent = normalizeLegacyEvent(legacySolicitorCreateEvent);
  setCaseFieldProps(caseEvent, 'textCollection', {
    display_context_parameter: displayContextParameter,
  });
  return caseEvent;
}

export function buildNgIntegrationCcdFieldsValidationEvent(): LegacyCaseEventConfig {
  const fieldFactory = createLegacyFieldFactory();
  const baseEvent = buildNgIntegrationToolkitCreateCaseEvent({
    showSummary: false,
    multiSelectShowCondition: null,
  });

  const collectionField = fieldFactory.getCCDFieldTemplateCopy({
    id: 'collectionTestField',
    type: 'Collection',
    label: 'Test collection field',
    collection_field_type: {
      id: 'text',
      type: 'Text',
      label: 'Textfield in collection',
    },
  });

  const complexField = fieldFactory.getCCDFieldTemplateCopy({
    id: 'complexTestField',
    type: 'Complex',
    label: 'Test complex field',
    complex_fields: [
      {
        id: 'text',
        type: 'Text',
        label: 'Textfield in complex',
      },
    ],
  });

  baseEvent.case_fields = [
    fieldFactory.getCCDFieldTemplateCopy({ id: 'text', type: 'Text', label: 'Text' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'postcode', type: 'Postcode', label: 'Postcode' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'testArea', type: 'TextArea', label: 'TextArea' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'number', type: 'Number', label: 'Number' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'radioYesNo', type: 'YesOrNo', label: 'YesOrNo' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'email', type: 'Email', label: 'Email' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'phoneUK', type: 'PhoneUK', label: 'PhoneUK' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'date', type: 'Date', label: 'Date' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'dateTime', type: 'DateTime', label: 'DateTime' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'moneyGBP', type: 'MoneyGBP', label: 'MoneyGBP' }),
    fieldFactory.getCCDFieldTemplateCopy({
      id: 'fixedList',
      type: 'FixedList',
      label: 'FixedList',
      list: [
        { code: 'item1', label: 'Item 1' },
        { code: 'item2', label: 'Item 2' },
        { code: 'item3', label: 'Item 3' },
      ],
    }),
    fieldFactory.getCCDFieldTemplateCopy({
      id: 'fixedRadioList',
      type: 'FixedRadioList',
      label: 'FixedRadioList',
      list: [
        { code: 'item1', label: 'Item 1' },
        { code: 'item2', label: 'Item 2' },
        { code: 'item3', label: 'Item 3' },
      ],
    }),
    fieldFactory.getCCDFieldTemplateCopy({
      id: 'multiselectList',
      type: 'MultiSelectList',
      label: 'MultiSelectList',
      list: [
        { code: 'item1', label: 'Item 1' },
        { code: 'item2', label: 'Item 2' },
        { code: 'item3', label: 'Item 3' },
      ],
    }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'addressGlobalUK', type: 'AddressGlobalUK', label: 'AddressGlobalUK' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'addressUK', type: 'AddressUK', label: 'AddressUK' }),
    fieldFactory.getCCDFieldTemplateCopy({ id: 'organisation', type: 'Organisation', label: 'Organisation' }),
    complexField,
    collectionField,
  ];

  baseEvent.wizard_pages = [
    {
      id: NG_INTEGRATION_PAGE_ID,
      label: 'ngIntegration field coverage',
      order: 1,
      show_condition: null,
      callback_url_mid_event: null,
      retries_timeout_mid_event: [],
      wizard_page_fields: baseEvent.case_fields.map((field, index) => ({
        case_field_id: field.id,
        order: index + 1,
        page_column_no: 1,
        complex_field_overrides: [],
      })),
    },
  ];

  const mandatoryFieldIds = [
    'text',
    'postcode',
    'testArea',
    'number',
    'radioYesNo',
    'email',
    'phoneUK',
    'date',
    'dateTime',
    'moneyGBP',
    'fixedList',
    'fixedRadioList',
    'multiselectList',
    'addressGlobalUK',
    'addressUK',
    'organisation',
    'complexTestField',
    'collectionTestField',
  ];

  for (const fieldId of mandatoryFieldIds) {
    setCaseFieldProps(baseEvent, fieldId, { display_context: 'MANDATORY' });
  }

  setComplexFieldOverride(baseEvent, 'addressGlobalUK', 'addressGlobalUK.AddressLine1', { display_context: 'MANDATORY' });
  setComplexFieldOverride(baseEvent, 'addressUK', 'addressUK.AddressLine1', { display_context: 'MANDATORY' });
  setComplexFieldOverride(baseEvent, 'organisation', 'organisation.OrgPolicyCaseAssignedRole', {
    display_context: 'MANDATORY',
  });
  setComplexFieldOverride(baseEvent, 'complexTestField', 'complexTestField.text', { display_context: 'MANDATORY' });

  return baseEvent;
}
