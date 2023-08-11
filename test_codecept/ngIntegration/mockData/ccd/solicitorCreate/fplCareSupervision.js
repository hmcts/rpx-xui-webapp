module.exports = {
    "id": "openCase",
    "name": "Start application",
    "description": "Create a new case – add a title",
    "case_id": null,
    "case_fields": [
        {
            "id": "caseName",
            "label": "Case name",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Include the Local Authority name and respondent's last name. For example, Endley Council v Smith/Tate/Jones",
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
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": null,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-publiclaw-cafcass",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-publiclaw-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-publiclaw-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-publiclaw-courtadmin",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-publiclaw-gatekeeper",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-publiclaw-systemupdate",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJ1MWFxZGY2bXBwNmFkZzd1bWRoaW9rbm9hMCIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5Njc5MTI2OCwiZXZlbnQtaWQiOiJvcGVuQ2FzZSIsImNhc2UtdHlwZS1pZCI6IkNBUkVfU1VQRVJWSVNJT05fRVBPIiwianVyaXNkaWN0aW9uLWlkIjoiUFVCTElDTEFXIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.99KbIb8nf71Mm8nr4Y7XOj12iPUKF6tlKDyKYjkdlVA",
    "wizard_pages": [
        {
            "id": "openCase1",
            "label": null,
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "caseName",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        }
    ],
    "show_summary": false,
    "show_event_notes": false,
    "end_button_label": "Save and continue",
    "can_save_draft": null,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/CARE_SUPERVISION_EPO/event-triggers/openCase?ignore-warning=false"
        }
    }
};

