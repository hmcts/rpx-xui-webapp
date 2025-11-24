import { faker } from '@faker-js/faker';

export function buildCaseListMock(rowCount: number = 2) {
    const columns = [
        {
            label: "Case reference",
            order: 1,
            metadata: true,
            case_field_id: "[CASE_REFERENCE]",
            case_field_type: {
                id: "Text",
                type: "Text",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null
            },
            display_context_parameter: null
        },
        {
            label: "Text Field 0",
            order: 2,
            metadata: false,
            case_field_id: "TextField0",
            case_field_type: {
                id: "Text",
                type: "Text",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null
            },
            display_context_parameter: null
        },
        {
            label: "Text Field 1",
            order: 3,
            metadata: false,
            case_field_id: "TextField1",
            case_field_type: {
                id: "Text",
                type: "Text",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null
            },
            display_context_parameter: null
        },
        {
            label: "Text Field 2",
            order: 4,
            metadata: false,
            case_field_id: "TextField2",
            case_field_type: {
                id: "Text",
                type: "Text",
                min: null,
                max: null,
                regular_expression: null,
                fixed_list_items: [],
                complex_fields: [],
                collection_field_type: null
            },
            display_context_parameter: null
        }
    ];

    const results = Array.from({ length: rowCount }, (_, i) => {
        const caseReference = `#${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}`;
        return {
            case_id: caseReference,
            supplementary_data: null,
            case_fields: {
                TextField0: faker.lorem.word(),
                "[STATE]": "CaseCreated",
                "[SECURITY_CLASSIFICATION]": "PUBLIC",
                "[JURISDICTION]": "DIVORCE",
                "[LAST_STATE_MODIFIED_DATE]": "2025-05-12T15:24:53.977",
                "[CREATED_DATE]": "2025-05-12T15:24:53.977",
                TextField2: faker.lorem.word(),
                "[CASE_TYPE]": "xuiTestJurisdiction",
                TextField1: faker.lorem.word(),
                "[CASE_REFERENCE]": caseReference,
                "[LAST_MODIFIED_DATE]": "2025-10-09T13:43:59.362"
            },
        };
    });

    return {
        columns,
        results,
        total: rowCount
    };
}

export default buildCaseListMock;
