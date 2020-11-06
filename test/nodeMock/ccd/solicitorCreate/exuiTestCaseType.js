module.exports = {
    "id": "FR_solicitorCreate",
    "name": "EXUI Test CaseType",
    "description": "Create an application for EXUI Test Casetype 1",
    "case_id": null,
    "case_fields": [
        {
            "id": "testTextField",
            "label": "Organisation ID",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
                "id": "Text",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
            },
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
                
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null,
            "default_value": null
        },
        {
            "id": "textCollection",
            "label": "Test Simple Text Collection",
            "hidden": null,
            "order": null,
            "value": [{ "id": "1", "value": "test value 1" }],
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
                "id": "textCollection1",
                "type": "Collection",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": {
                    "id": "testTextInCollection",
                    "type": "Text",
                    "min": null,
                    "max": null,
                    "regular_expression": null,
                    "fixed_list_items": [],
                    "complex_fields": [],
                    "collection_field_type": null
                }
            },
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
                
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": "#COLLECTION(allowInsert),#COLLECTION(allowDelete)",
            "retain_hidden_value": null,
            "formatted_value": null,
            "default_value": null
            },
        {
            "id": "complexDynamicList1",
            "label": "Test Dynamic complex Collection",
            "hidden": null,
            "order": null,
            "value": [],
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
                "id": "textCollection1",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "testTextField1",
                        "label": "Complex field Text",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "Text12",
                            "type": "Text",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [

                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null,
                        "default_value": null
                    },
                    {
                        "id": "dynamiclist1",
                        "label": "Complex field DL",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "Text12",
                            "type": "DynamicList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {"code":"item1", "value":"item 1"}
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [

                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null,
                        "default_value": null
                    }
                ],
                "collection_field_type": null
            },
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [

            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "retain_hidden_value": null,
            "formatted_value": null,
            "default_value": null
        },
        {
            "id": "dynamiclist12",
            "label": "Complex field DL",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
                "id": "Text12",
                "type": "DynamicList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    { "code": "item1", "label": "item 1" , "order" : null}
                ],
                "complex_fields": [],
                "collection_field_type": null
            },
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [

            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null,
            "default_value": null
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpcTlxNWs5NW85cWllNTk5NnU1MmEyNGhqYiIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NzA2NSwiZXZlbnQtaWQiOiJGUl9zb2xpY2l0b3JDcmVhdGUiLCJjYXNlLXR5cGUtaWQiOiJGaW5hbmNpYWxSZW1lZHlDb250ZXN0ZWQiLCJqdXJpc2RpY3Rpb24taWQiOiJESVZPUkNFIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.QXtddQWsWbl8H8tKvM-SViK-E9JrFeU6bS0wlt5eJ0o",
    "wizard_pages": [
        {
            "id": 'page1',
            "label": null,
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "testTextField",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                 {
                    "case_field_id": "textCollection",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "complexDynamicList1",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "dynamiclist12",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/contested/set-defaults",
            "retries_timeout_mid_event": []
        }
    ],
    "show_summary": true,
    "show_event_notes": false,
    "end_button_label": null,
    "can_save_draft": null,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/FinancialRemedyContested/event-triggers/FR_solicitorCreate?ignore-warning=false"
        }
    }
}
