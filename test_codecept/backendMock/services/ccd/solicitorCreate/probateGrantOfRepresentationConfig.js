module.exports = {
    "id": "solicitorCreateApplication",
    "name": "Apply for probate",
    "description": "Solicitor begins a new application with firm and case details",
    "case_id": null,
    "case_fields": [
        {
            "id": "solsSolicitorFirmName",
            "label": "Name of your firm",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "solsSolicitorFirmName-3135b45c-eaee-4d7c-b561-3077a2a78666",
                "type": "Text",
                "min": 1,
                "max": 100,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorAddress",
            "label": "Address of your firm",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "AddressUK",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "AddressLine1",
                        "label": "Building and Street",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax150",
                            "type": "Text",
                            "min": null,
                            "max": 150,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "AddressLine2",
                        "label": "Address Line 2",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax50",
                            "type": "Text",
                            "min": null,
                            "max": 50,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "AddressLine3",
                        "label": "Address Line 3",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax50",
                            "type": "Text",
                            "min": null,
                            "max": 50,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "PostTown",
                        "label": "Town or City",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax50",
                            "type": "Text",
                            "min": null,
                            "max": 50,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "County",
                        "label": "County",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax50",
                            "type": "Text",
                            "min": null,
                            "max": 50,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "PostCode",
                        "label": "Postcode/Zipcode",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax14",
                            "type": "Text",
                            "min": null,
                            "max": 14,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "Country",
                        "label": "Country",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "TextMax50",
                            "type": "Text",
                            "min": null,
                            "max": 50,
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
                            {
                                "role": "citizen",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": false
                            },
                            {
                                "role": "caseworker-probate-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-issuer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-superuser",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-registrar",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-caseadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-probate-scheduler",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    }
                ],
                "collection_field_type": null
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorEmail",
            "label": "Solicitor email address",
            "hidden": null,
            "value": null,
            "metadata": false,
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
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorPhoneNumber",
            "label": "Solicitor phone number",
            "hidden": null,
            "value": null,
            "metadata": false,
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
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorAppReference",
            "label": "Your reference for this application",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "solsSolicitorAppReference-a4d0da74-4207-4e23-9589-c0866cabed36",
                "type": "Text",
                "min": null,
                "max": 100,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": null
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorIsExec",
            "label": "Is the solicitor named in the will as an executor?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "YesOrNo",
                "type": "YesOrNo",
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
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorIsMainApplicant",
            "label": "Is the solicitor the main applicant?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "YesOrNo",
                "type": "YesOrNo",
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
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": "solsSolicitorIsExec=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solicitorMainApplicantInfo",
            "label": "You cannot apply for letters of administration if you are a solicitor applying as an executor.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Label",
                "type": "Label",
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
            "display_context": "READONLY",
            "display_context_parameter": null,
            "show_condition": "solsSolicitorIsExec=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorIsApplying",
            "label": "Is the solicitor applying?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "YesOrNo",
                "type": "YesOrNo",
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
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": "solsSolicitorIsExec=\"Yes\" AND solsSolicitorIsMainApplicant=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSolicitorNotApplyingReason",
            "label": "Why aren't they applying?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedList-notApplyingExecutorReasonFixedList",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "MentallyIncapable",
                        "label": "They lack capacity to act as executor",
                        "order": null
                    },
                    {
                        "code": "PowerOfAttorney",
                        "label": "They have appointed or wish to appoint another person to act as their attorney",
                        "order": null
                    },
                    {
                        "code": "Renunciation",
                        "label": "They have renounced",
                        "order": null
                    },
                    {
                        "code": "PowerReserved",
                        "label": "They're holding power reserved",
                        "order": null
                    },
                    {
                        "code": "DiedAfter",
                        "label": "They died after the deceased",
                        "order": null
                    },
                    {
                        "code": "DiedBefore",
                        "label": "They died before the deceased",
                        "order": null
                    }
                ],
                "complex_fields": [],
                "collection_field_type": null
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": "solsSolicitorIsApplying=\"No\" AND solsSolicitorIsExec=\"Yes\" AND solsSolicitorIsMainApplicant=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSOTForenames",
            "label": "Solicitor first name(s)",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Include all middle names",
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
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": "solsSolicitorIsExec=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsSOTSurname",
            "label": "Solicitor last name(s)",
            "hidden": null,
            "value": null,
            "metadata": false,
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
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": "solsSolicitorIsExec=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solsStartPage",
            "label": "Mock Data",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Label",
                "type": "Label",
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
            "display_context": "READONLY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-issuer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-registrar",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-caseadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-probate-scheduler",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJvZGp0ZjNvM2JrMTRrY3JoMnMwbm9waW11ayIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NzI2OCwiZXZlbnQtaWQiOiJzb2xpY2l0b3JDcmVhdGVBcHBsaWNhdGlvbiIsImNhc2UtdHlwZS1pZCI6IkdyYW50T2ZSZXByZXNlbnRhdGlvbiIsImp1cmlzZGljdGlvbi1pZCI6IlBST0JBVEUiLCJjYXNlLXZlcnNpb24iOiJiZjIxYTllOGZiYzVhMzg0NmZiMDViNGZhMDg1OWUwOTE3YjIyMDJmIn0.-bbd4eIaPHKD70CvxCvXr7x5g4VTdBbvVQfpt17labA",
    "wizard_pages": [
        {
            "id": "solicitorCreateApplicationsolicitorCreateApplicationPage1",
            "label": null,
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "solsStartPage",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateApplicationsolicitorCreateApplicationPage2",
            "label": null,
            "order": 2,
            "wizard_page_fields": [
                {
                    "case_field_id": "solsSolicitorFirmName",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorAddress",
                    "order": 9,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorEmail",
                    "order": 11,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorPhoneNumber",
                    "order": 12,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorAppReference",
                    "order": 10,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorIsExec",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorIsMainApplicant",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solicitorMainApplicantInfo",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorIsApplying",
                    "order": 7,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorNotApplyingReason",
                    "order": 8,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSOTForenames",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSOTSurname",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        }
    ],
    "show_summary": true,
    "show_event_notes": null,
    "end_button_label": "Save and continue",
    "can_save_draft": true,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/GrantOfRepresentation/event-triggers/solicitorCreateApplication?ignore-warning=false"
        }
    }
}
