import { faker } from '@faker-js/faker';

type CreateCaseFixedListItem = {
  code: string;
  label: string;
  order: null;
};

type CreateCaseFieldTypeName = 'Text' | 'MultiSelectList' | 'FixedRadioList' | 'FixedList' | 'Complex' | 'Collection';

type CreateCaseFieldType = {
  id: string;
  type: CreateCaseFieldTypeName;
  min: null;
  max: null;
  regular_expression: null;
  fixed_list_items: CreateCaseFixedListItem[];
  complex_fields: Record<string, unknown>[];
  collection_field_type: CreateCaseFieldType | null;
};

const CREATE_CASE_BASE_FIELD_TYPE: Omit<CreateCaseFieldType, 'id' | 'type'> = {
  min: null,
  max: null,
  regular_expression: null,
  fixed_list_items: [],
  complex_fields: [],
  collection_field_type: null,
};

const CREATE_CASE_TEXT_FIELD_TYPE: CreateCaseFieldType = {
  id: 'Text',
  type: 'Text',
  ...CREATE_CASE_BASE_FIELD_TYPE,
};

function buildFieldType(params: {
  id: string;
  type: CreateCaseFieldTypeName;
  fixedListItems?: CreateCaseFixedListItem[];
  complexFields?: Record<string, unknown>[];
  collectionFieldType?: CreateCaseFieldType | null;
}): CreateCaseFieldType {
  return {
    id: params.id,
    type: params.type,
    ...CREATE_CASE_BASE_FIELD_TYPE,
    fixed_list_items: params.fixedListItems ?? [],
    complex_fields: params.complexFields ?? [],
    collection_field_type: params.collectionFieldType ?? null,
  };
}

function buildFixedListFieldType(params: {
  id: string;
  type: 'FixedList' | 'FixedRadioList' | 'MultiSelectList';
  fixedListItems: CreateCaseFixedListItem[];
}): CreateCaseFieldType {
  return buildFieldType({
    id: params.id,
    type: params.type,
    fixedListItems: params.fixedListItems,
  });
}

function buildComplexFieldType(params: { id: string; complexFields: Record<string, unknown>[] }): CreateCaseFieldType {
  return buildFieldType({
    id: params.id,
    type: 'Complex',
    complexFields: params.complexFields,
  });
}

function buildCollectionFieldType(params: { id: string; collectionFieldType: CreateCaseFieldType }): CreateCaseFieldType {
  return buildFieldType({
    id: params.id,
    type: 'Collection',
    collectionFieldType: params.collectionFieldType,
  });
}

function buildPersonComplexField(params: {
  id: string;
  label: string;
  showCondition?: string | null;
  retainHiddenValue?: boolean | null;
  fieldType?: CreateCaseFieldType;
}) {
  return {
    id: params.id,
    label: params.label,
    hidden: null,
    order: null,
    metadata: false,
    case_type_id: null,
    hint_text: null,
    field_type: params.fieldType ?? CREATE_CASE_TEXT_FIELD_TYPE,
    security_classification: 'PUBLIC',
    live_from: null,
    live_until: null,
    show_condition: params.showCondition ?? null,
    acls: CREATE_CASE_SHARED_ACLS,
    complexACLs: [],
    display_context: null,
    display_context_parameter: null,
    retain_hidden_value: params.retainHiddenValue ?? null,
    formatted_value: null,
    category_id: null,
  };
}

function buildPersonFieldType(): CreateCaseFieldType {
  const personGenderFieldType = buildFixedListFieldType({
    id: 'FixedList-gender',
    type: 'FixedList',
    fixedListItems: [
      { code: 'male', label: 'Male', order: null },
      { code: 'female', label: 'Female', order: null },
      { code: 'notGiven', label: 'Not given', order: null },
    ],
  });

  const personJobFieldType = buildComplexFieldType({
    id: 'Job',
    complexFields: [
      buildPersonComplexField({ id: 'Title', label: 'Title' }),
      buildPersonComplexField({
        id: 'Description',
        label: 'Description',
        showCondition: 'Title!=""',
        retainHiddenValue: true,
      }),
    ],
  });

  return buildComplexFieldType({
    id: 'Person',
    complexFields: [
      buildPersonComplexField({ id: 'Title', label: 'Title' }),
      buildPersonComplexField({ id: 'FirstName', label: 'First Name' }),
      buildPersonComplexField({ id: 'LastName', label: 'Last Name' }),
      buildPersonComplexField({
        id: 'MaidenName',
        label: 'Maiden Name',
        showCondition: 'PersonGender="female"',
        retainHiddenValue: true,
      }),
      buildPersonComplexField({ id: 'PersonGender', label: 'Gender', fieldType: personGenderFieldType }),
      buildPersonComplexField({
        id: 'PersonJob',
        label: 'Job',
        fieldType: personJobFieldType,
        showCondition: 'LastName!=""',
        retainHiddenValue: true,
      }),
    ],
  });
}

const CREATE_CASE_DEFAULT_FIELD = {
  hidden: null,
  value: null,
  metadata: false,
  validation_expr: null,
  security_label: 'PUBLIC',
  order: null,
  formatted_value: null,
  display_context_parameter: null,
  show_summary_change_option: true,
  show_summary_content_option: null,
  publish: false,
  publish_as: null,
};

export type CreateCaseAcl = {
  role: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
};

export type CreateCaseAclCrudOverrides = {
  role: string;
  create?: boolean;
  read?: boolean;
  update?: boolean;
  delete?: boolean;
};

export type CreateCaseAclGroupInput = string[] | CreateCaseAclCrudOverrides[];

const CREATE_CASE_DEFAULT_CRUD: Omit<CreateCaseAcl, 'role'> = {
  create: true,
  read: true,
  update: true,
  delete: true,
};

export function buildCreateCaseAclGroup(input: CreateCaseAclGroupInput): CreateCaseAcl[] {
  return input.map((entry) => {
    if (typeof entry === 'string') {
      return {
        role: entry,
        ...CREATE_CASE_DEFAULT_CRUD,
      };
    }

    return {
      role: entry.role,
      create: entry.create ?? CREATE_CASE_DEFAULT_CRUD.create,
      read: entry.read ?? CREATE_CASE_DEFAULT_CRUD.read,
      update: entry.update ?? CREATE_CASE_DEFAULT_CRUD.update,
      delete: entry.delete ?? CREATE_CASE_DEFAULT_CRUD.delete,
    };
  });
}

const CREATE_CASE_SHARED_ACLS = buildCreateCaseAclGroup([
  'caseworker-divorce-solicitor',
  'caseworker-divorce-courtadmin',
  'caseworker-divorce-superuser',
  'caseworker-caa',
  'pui-caa',
]);

const CREATE_CASE_ACLS_WITH_READONLY_COURTADMIN = CREATE_CASE_SHARED_ACLS.map((acl) =>
  acl.role === 'caseworker-divorce-courtadmin' ? { ...acl, update: false, delete: false } : acl
);

export function divorcePocCaseData() {
  return {
    id: 'createCase',
    name: 'Create a case',
    description: 'Create a case',
    case_id: null,
    case_fields: [
      {
        id: 'TextField0',
        label: 'Text Field 0',
        ...CREATE_CASE_DEFAULT_FIELD,
        hint_text:
          'Type "Hide TextField1" or "Hide TextField2" to hide these optional fields respectively, or "Hide all" to hide all',
        field_type: CREATE_CASE_TEXT_FIELD_TYPE,
        display_context: 'MANDATORY',
        show_condition: null,
        retain_hidden_value: null,
        acls: CREATE_CASE_ACLS_WITH_READONLY_COURTADMIN,
      },
      {
        id: 'TextField1',
        label: 'Text Field 1',
        ...CREATE_CASE_DEFAULT_FIELD,
        hint_text: 'If hidden, this value will not be retained',
        field_type: CREATE_CASE_TEXT_FIELD_TYPE,
        display_context: 'OPTIONAL',
        show_condition: 'TextField0!="Hide TextField1" AND TextField0!="Hide all"',
        retain_hidden_value: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'TextField2',
        label: 'Text Field 2',
        ...CREATE_CASE_DEFAULT_FIELD,
        hint_text: 'If hidden, this value will be retained',
        field_type: CREATE_CASE_TEXT_FIELD_TYPE,
        display_context: 'OPTIONAL',
        show_condition: 'TextField0!="Hide TextField2" AND TextField0!="Hide all"',
        retain_hidden_value: true,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'TextField3',
        label: 'Text Field 3',
        ...CREATE_CASE_DEFAULT_FIELD,
        hint_text: null,
        field_type: CREATE_CASE_TEXT_FIELD_TYPE,
        display_context: 'OPTIONAL',
        show_condition: null,
        retain_hidden_value: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'DivorceReason',
        label: 'Choose divorce reasons',
        hidden: null,
        value: null,
        metadata: false,
        hint_text: 'Hidden if "Hide all" is entered in Text Field 0; value will not be retained',
        field_type: buildFixedListFieldType({
          id: 'MultiSelectList-reasonForDivorceEnum',
          type: 'MultiSelectList',
          fixedListItems: [
            {
              code: 'behaviour',
              label: 'Behaviour',
              order: null,
            },
            {
              code: 'adultery',
              label: 'Adultery',
              order: null,
            },
            {
              code: 'desertion',
              label: 'Desertion',
              order: null,
            },
            {
              code: '2-year',
              label: '2-year separation (with consent)',
              order: null,
            },
            {
              code: '5-year',
              label: '5-year separation',
              order: null,
            },
          ],
        }),
        validation_expr: null,
        security_label: 'PUBLIC',
        order: null,
        formatted_value: null,
        display_context: 'OPTIONAL',
        display_context_parameter: null,
        show_condition: 'TextField0!="Hide all"',
        show_summary_change_option: true,
        show_summary_content_option: null,
        retain_hidden_value: null,
        publish: false,
        publish_as: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'Gender',
        label: 'Select your gender',
        hidden: null,
        value: null,
        metadata: false,
        hint_text: 'Hidden if "Hide all" is entered in Text Field 0',
        field_type: buildFixedListFieldType({
          id: 'FixedRadioList-gender',
          type: 'FixedRadioList',
          fixedListItems: [
            {
              code: 'male',
              label: 'Male',
              order: null,
            },
            {
              code: 'female',
              label: 'Female',
              order: null,
            },
            {
              code: 'notGiven',
              label: 'Not given',
              order: null,
            },
          ],
        }),
        validation_expr: null,
        security_label: 'PUBLIC',
        order: null,
        formatted_value: null,
        display_context: 'OPTIONAL',
        display_context_parameter: null,
        show_condition: 'TextField0!="Hide all"',
        show_summary_change_option: true,
        show_summary_content_option: null,
        retain_hidden_value: true,
        publish: false,
        publish_as: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'Person1',
        label: 'Person 1 - retained',
        hidden: null,
        value: null,
        metadata: false,
        hint_text: 'Hidden if "Hide all" is entered in Text Field 0; value will be retained',
        field_type: buildPersonFieldType(),
        validation_expr: null,
        security_label: 'PUBLIC',
        order: null,
        formatted_value: null,
        display_context: 'OPTIONAL',
        display_context_parameter: null,
        show_condition: 'TextField0!="Hide all 2"',
        show_summary_change_option: true,
        show_summary_content_option: null,
        retain_hidden_value: true,
        publish: false,
        publish_as: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'Person2',
        label: 'Person 2 - not retained',
        hidden: null,
        value: null,
        metadata: false,
        hint_text: 'Hidden if "Hide all" is entered in Text Field 0; value will not be retained',
        field_type: buildPersonFieldType(),
        validation_expr: null,
        security_label: 'PUBLIC',
        order: null,
        formatted_value: null,
        display_context: 'OPTIONAL',
        display_context_parameter: null,
        show_condition: 'TextField0!="Hide all 3"',
        show_summary_change_option: true,
        show_summary_content_option: null,
        retain_hidden_value: null,
        publish: false,
        publish_as: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
      {
        id: 'People',
        label: 'Group of People',
        hidden: null,
        value: null,
        metadata: false,
        hint_text: 'Hidden if "Hide all" is entered in Text Field 0; value will not be retained',
        field_type: buildCollectionFieldType({
          id: 'People-25f76628-edb7-422e-a721-a13ef378548f',
          collectionFieldType: buildPersonFieldType(),
        }),
        validation_expr: null,
        security_label: 'PUBLIC',
        order: null,
        formatted_value: null,
        display_context: 'OPTIONAL',
        display_context_parameter: '#COLLECTION(allowDelete,allowInsert,allowUpdate)',
        show_condition: 'TextField0!="Hide all 4"',
        show_summary_change_option: true,
        show_summary_content_option: null,
        retain_hidden_value: true,
        publish: false,
        publish_as: null,
        acls: CREATE_CASE_SHARED_ACLS,
      },
    ],
    event_token: faker.string.uuid(),
    wizard_pages: [
      {
        id: 'createCasePage_1',
        label: 'The data on this page will appear in various tabs',
        order: 2,
        wizard_page_fields: [
          {
            case_field_id: 'DivorceReason',
            order: 8,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'TextField1',
            order: 2,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'TextField3',
            order: 1,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'TextField0',
            order: 1,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'TextField2',
            order: 3,
            page_column_no: null,
            complex_field_overrides: [],
          },
        ],
        show_condition: null,
        callback_url_mid_event: null,
        retries_timeout_mid_event: [],
      },
      {
        id: 'createCasePage_2',
        label: 'The data on this page will appear in various tabs',
        order: 1,
        wizard_page_fields: [
          {
            case_field_id: 'People',
            order: 7,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'Person1',
            order: 5,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'Person2',
            order: 6,
            page_column_no: null,
            complex_field_overrides: [],
          },
          {
            case_field_id: 'Gender',
            order: 4,
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
    end_button_label: 'Test submit',
    can_save_draft: null,
    access_granted: 'STANDARD',
    access_process: 'NONE',
    title_display: null,
    supplementary_data: null,
    _links: {
      self: {
        href: `${process.env.TEST_URL}/internal/case-types/xuiTestJurisdiction/event-triggers/createCase?ignore-warning=false`,
      },
    },
  };
}
