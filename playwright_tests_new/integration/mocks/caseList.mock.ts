// Minimal mock response for case list search endpoint used in integration test.
// Shape based on ngIntegration CCDApi.getWorkbasketCases() but trimmed to required columns.
export function buildCaseListMock(caseReference: string = '#1763-5442-4345-7183') {
    return {
        columns: [
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
        ],
        results: [
            {
                case_id: caseReference,
                supplementary_data: null,
                case_fields: {
                    TextField0: 'alpha',
                    "[STATE]": "CaseCreated",
                    "[SECURITY_CLASSIFICATION]": "PUBLIC",
                    "[JURISDICTION]": "DIVORCE",
                    "[LAST_STATE_MODIFIED_DATE]": "2025-05-12T15:24:53.977",
                    "[CREATED_DATE]": "2025-05-12T15:24:53.977",
                    TextField2: 'alpha',
                    "[CASE_TYPE]": "xuiTestJurisdiction",
                    TextField1: 'alpha',
                    "[CASE_REFERENCE]": caseReference,
                    "[LAST_MODIFIED_DATE]": "2025-10-09T13:43:59.362"
                },
            },
            {
                case_id: "1747063493980829",
                supplementary_data: null,
                case_fields: {
                    TextField0: "Luna",
                    "[STATE]": "CaseCreated",
                    "[SECURITY_CLASSIFICATION]": "PUBLIC",
                    "[JURISDICTION]": "DIVORCE",
                    "[LAST_STATE_MODIFIED_DATE]": "2025-05-12T15:24:53.977",
                    "[CREATED_DATE]": "2025-05-12T15:24:53.977",
                    TextField2: 'Cute',
                    "[CASE_TYPE]": "xuiTestJurisdiction",
                    TextField1: 'Potatoes are yummy',
                    "[CASE_REFERENCE]": "1747063493980829",
                    "[LAST_MODIFIED_DATE]": "2025-10-09T13:43:59.362"
                },
            }],
        total: 2
    };
}

export default buildCaseListMock;
