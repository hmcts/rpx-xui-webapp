module.exports = {
    "id": "solicitorCreateCaveat",
    "name": "Raise a caveat",
    "description": "Raise a caveat against grant application",
    "case_id": null,
    "case_fields": [
        {
            "id": "caveatorEmailAddress",
            "label": "Email address",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "If applying through a solicitor, provide the solicitor's email instead",
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
            "id": "caveatorAddress",
            "label": "Address - (If applying through a solicitor, provide the solicitor's firm name and address instead)",
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
            "id": "solsSolicitorFirmName",
            "label": "Name of your firm",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "solsSolicitorFirmName-6436ebbd-f143-44e8-a198-224e622f509f",
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
            "label": "Phone number",
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
                "id": "solsSolicitorAppReference-dca9e041-e277-4ee7-9cd1-2d22780c26fe",
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
            "id": "solsCaveatEligibility",
            "label": "# Stop an application for probate    Use this service to stop an application for a grant of representation for up to 6 months. This is also known as 'entering a caveat'.  You may want to stop an application when your client: * thinks the person who made the will was being influenced by someone else or was not able to make their own decisions  * thinks someone interfered with the will or forged it  * there is a more recent will  * the will was not properly signed and witnessed   * the person applying for probate refuses to share a copy of the will with you * your client is in dispute with the person applying or you think they are not suitable to carry out the instructions in the will * thinks the person applying is not eligible to apply if there is no will (see <a href=\"https://www.gov.uk/inherits-someone-dies-without-will\" target=\"_blank\">who inherits if there is no will</a>) * your client is entitled to apply but have not been included in the application * the person who died got married or entered into a civil partnership after the will was signed  These are the most common reasons, but there may be others too.  Your client should always try to come to an agreement with the person applying for probate before you stop their application.  It takes one working day for your request to stop applications in progress.  If an application is approved on the same day you make the request, it will not be stopped. But you will stop any future applications for probate made on the estate for 6 months.   ## You will need:  * an address in England or Wales where legal papers can be sent to you * the full name of the person who died (and any other names they were known by) * the exact date they died  ## Fees  It costs £3 to stop an application for 6 months.  You’ll need to pay by PBA.",
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
                    "role": "caseworker-probate-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJsdmI4cGZoampmNzhsNXViZjY1aWxpZXNvcyIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0ODAxOCwiZXZlbnQtaWQiOiJzb2xpY2l0b3JDcmVhdGVDYXZlYXQiLCJjYXNlLXR5cGUtaWQiOiJDYXZlYXQiLCJqdXJpc2RpY3Rpb24taWQiOiJQUk9CQVRFIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.uYsUFZtdStbzqfI-9-qYVtR4045jhODlxI5hvbAaff0",
    "wizard_pages": [
        {
            "id": "solicitorCreateCaveatsolicitorCreateCaveatPage1",
            "label": null,
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "solsCaveatEligibility",
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
            "id": "solicitorCreateCaveatsolicitorCreateCaveatPage2",
            "label": null,
            "order": 2,
            "wizard_page_fields": [
                {
                    "case_field_id": "caveatorEmailAddress",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "caveatorAddress",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorFirmName",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorPhoneNumber",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solsSolicitorAppReference",
                    "order": 3,
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
    "can_save_draft": null,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/Caveat/event-triggers/solicitorCreateCaveat?ignore-warning=false"
        }
    }
}
