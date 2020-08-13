module.exports = {
    "id": "startAppeal",
    "name": "Start your appeal",
    "description": "Start your appeal",
    "case_id": null,
    "case_fields": [
        {
            "id": "checklistTitle",
            "label": "# Tell us about your client",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "checklistTitle2",
            "label": "If you cannot use the new online service due to your client's circumstances, you can <a href=\"https://immigrationappealsonline.justice.gov.uk/IACFees\" target=\"_blank\">appeal using the current online service</a> or appeal by post or fax using <a href=\"https://www.gov.uk/government/publications/appeal-a-visa-or-immigration-decision-within-the-uk-form-iaft-5\" target=\"_blank\">form IAFT-5</a>.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "checklist",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "checklist",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "checklist5",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist5",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isResidingInUK",
                                    "label": "My client is living in the UK",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "checklist1",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist1",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isAdult",
                                    "label": "My client is at least 18 years old",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": "checklist1=\"DUMMY_VALUE_TO_HIDE_FIELD\"",
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "checklist2",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist2",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isNotDetained",
                                    "label": "My client is not in detention",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "checklist7",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist7",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isNotEUDecision",
                                    "label": "My client is not appealing an EU Settlement Scheme decision",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "checklist3",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist3",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isNotFamilyAppeal",
                                    "label": "My client is not appealing with anyone else as part of a linked or grouped appeal",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "checklist4",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist4",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isWithinPostcode",
                                    "label": "My client is located in one of these postcodes: BN, CB, CM, HP, IP, ME, N, NR, RH, SE, TN, W, L, LA, M, OL, PR, SK, WA, WN",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": "checklist4=\"DUMMY_VALUE_TO_HIDE_FIELD\"",
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            }
                        ],
                        "complexACLs": [],
                        "display_context": null,
                        "display_context_parameter": null,
                        "formatted_value": null
                    },
                    {
                        "id": "checklist6",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-checklist6",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "isNotStateless",
                                    "label": "My client is not stateless",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": "checklist6=\"DUMMY_VALUE_TO_HIDE_FIELD\"",
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "homeOfficeDecisionTitle",
            "label": "# Home office details",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "homeOfficeReferenceNumber",
            "label": "Home Office reference",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "homeOfficeDecisionLetterImage",
            "label": "![Image of Home Office decision letter](https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/home-office-letter.png)",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "homeOfficeDecisionDate",
            "label": "Enter the date the decision letter was sent",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "You can usally find this stamped on the evelope. Alternatively enter the\ndate given to the decision letter.\n\nFor example, 03 04 2019",
            "field_type": {
                "id": "Date",
                "type": "Date",
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
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "homeOfficeDecisionEnvelopeImage",
            "label": "![Image of Home Office decision evelope](https://raw.githubusercontent.com/hmcts/ia-appeal-frontend/master/app/assets/images/homeOffice-decision-envelope.png)",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "appellantBasicDetailsTitle",
            "label": "# Basic details\nEnter the basic details for your client.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantTitle",
            "label": "Title",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantGivenNames",
            "label": "Given names",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantFamilyName",
            "label": "Family name",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantDateOfBirth",
            "label": "Date of birth",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Date",
                "type": "Date",
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
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantNationalities",
            "label": "Nationality",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appellantNationalities-2f8b9a15-a4ff-4bdc-bd1d-504b31fd1cfd",
                "type": "Collection",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": {
                    "id": "nationality",
                    "type": "Complex",
                    "min": null,
                    "max": null,
                    "regular_expression": null,
                    "fixed_list_items": [],
                    "complex_fields": [
                        {
                            "id": "code",
                            "label": "Nationality",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
                            "hint_text": null,
                            "field_type": {
                                "id": "FixedList-isoCountries",
                                "type": "FixedList",
                                "min": null,
                                "max": null,
                                "regular_expression": null,
                                "fixed_list_items": [
                                    {
                                        "code": "ZW",
                                        "label": "Zimbabwe",
                                        "order": null
                                    },
                                    {
                                        "code": "ZM",
                                        "label": "Zambia",
                                        "order": null
                                    },
                                    {
                                        "code": "YE",
                                        "label": "Yemen",
                                        "order": null
                                    },
                                    {
                                        "code": "EH",
                                        "label": "Western Sahara",
                                        "order": null
                                    },
                                    {
                                        "code": "WF",
                                        "label": "Wallis and Futuna Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "VI",
                                        "label": "Virgin Islands, US",
                                        "order": null
                                    },
                                    {
                                        "code": "VN",
                                        "label": "Viet Nam",
                                        "order": null
                                    },
                                    {
                                        "code": "VE",
                                        "label": "Venezuela (Bolivarian Republic of)",
                                        "order": null
                                    },
                                    {
                                        "code": "VU",
                                        "label": "Vanuatu",
                                        "order": null
                                    },
                                    {
                                        "code": "UZ",
                                        "label": "Uzbekistan",
                                        "order": null
                                    },
                                    {
                                        "code": "UY",
                                        "label": "Uruguay",
                                        "order": null
                                    },
                                    {
                                        "code": "UM",
                                        "label": "United States Minor Outlying Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "US",
                                        "label": "United States of America",
                                        "order": null
                                    },
                                    {
                                        "code": "GB",
                                        "label": "United Kingdom",
                                        "order": null
                                    },
                                    {
                                        "code": "AE",
                                        "label": "United Arab Emirates",
                                        "order": null
                                    },
                                    {
                                        "code": "UA",
                                        "label": "Ukraine",
                                        "order": null
                                    },
                                    {
                                        "code": "UG",
                                        "label": "Uganda",
                                        "order": null
                                    },
                                    {
                                        "code": "TV",
                                        "label": "Tuvalu",
                                        "order": null
                                    },
                                    {
                                        "code": "TC",
                                        "label": "Turks and Caicos Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "TM",
                                        "label": "Turkmenistan",
                                        "order": null
                                    },
                                    {
                                        "code": "TR",
                                        "label": "Turkey",
                                        "order": null
                                    },
                                    {
                                        "code": "TN",
                                        "label": "Tunisia",
                                        "order": null
                                    },
                                    {
                                        "code": "TT",
                                        "label": "Trinidad and Tobago",
                                        "order": null
                                    },
                                    {
                                        "code": "TO",
                                        "label": "Tonga",
                                        "order": null
                                    },
                                    {
                                        "code": "TK",
                                        "label": "Tokelau",
                                        "order": null
                                    },
                                    {
                                        "code": "TG",
                                        "label": "Togo",
                                        "order": null
                                    },
                                    {
                                        "code": "TL",
                                        "label": "Timor-Leste",
                                        "order": null
                                    },
                                    {
                                        "code": "TH",
                                        "label": "Thailand",
                                        "order": null
                                    },
                                    {
                                        "code": "TZ",
                                        "label": "Tanzania *, United Republic of",
                                        "order": null
                                    },
                                    {
                                        "code": "TJ",
                                        "label": "Tajikistan",
                                        "order": null
                                    },
                                    {
                                        "code": "TW",
                                        "label": "Taiwan",
                                        "order": null
                                    },
                                    {
                                        "code": "SY",
                                        "label": "Syrian Arab Republic (Syria)",
                                        "order": null
                                    },
                                    {
                                        "code": "CH",
                                        "label": "Switzerland",
                                        "order": null
                                    },
                                    {
                                        "code": "SE",
                                        "label": "Sweden",
                                        "order": null
                                    },
                                    {
                                        "code": "SZ",
                                        "label": "Swaziland",
                                        "order": null
                                    },
                                    {
                                        "code": "SJ",
                                        "label": "Svalbard and Jan Mayen Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "SR",
                                        "label": "Suriname *",
                                        "order": null
                                    },
                                    {
                                        "code": "SD",
                                        "label": "Sudan",
                                        "order": null
                                    },
                                    {
                                        "code": "LK",
                                        "label": "Sri Lanka",
                                        "order": null
                                    },
                                    {
                                        "code": "ES",
                                        "label": "Spain",
                                        "order": null
                                    },
                                    {
                                        "code": "SS",
                                        "label": "South Sudan",
                                        "order": null
                                    },
                                    {
                                        "code": "GS",
                                        "label": "South Georgia and the South Sandwich Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "ZA",
                                        "label": "South Africa",
                                        "order": null
                                    },
                                    {
                                        "code": "SO",
                                        "label": "Somalia",
                                        "order": null
                                    },
                                    {
                                        "code": "SB",
                                        "label": "Solomon Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "SI",
                                        "label": "Slovenia",
                                        "order": null
                                    },
                                    {
                                        "code": "SK",
                                        "label": "Slovakia",
                                        "order": null
                                    },
                                    {
                                        "code": "SX",
                                        "label": "Sint Maarten (Dutch part)",
                                        "order": null
                                    },
                                    {
                                        "code": "SG",
                                        "label": "Singapore",
                                        "order": null
                                    },
                                    {
                                        "code": "SL",
                                        "label": "Sierra Leone",
                                        "order": null
                                    },
                                    {
                                        "code": "SC",
                                        "label": "Seychelles",
                                        "order": null
                                    },
                                    {
                                        "code": "RS",
                                        "label": "Serbia",
                                        "order": null
                                    },
                                    {
                                        "code": "SN",
                                        "label": "Senegal",
                                        "order": null
                                    },
                                    {
                                        "code": "SA",
                                        "label": "Saudi Arabia",
                                        "order": null
                                    },
                                    {
                                        "code": "ST",
                                        "label": "Sao Tome and Principe",
                                        "order": null
                                    },
                                    {
                                        "code": "SM",
                                        "label": "San Marino",
                                        "order": null
                                    },
                                    {
                                        "code": "WS",
                                        "label": "Samoa",
                                        "order": null
                                    },
                                    {
                                        "code": "VC",
                                        "label": "Saint Vincent and Grenadines",
                                        "order": null
                                    },
                                    {
                                        "code": "PM",
                                        "label": "Saint Pierre and Miquelon",
                                        "order": null
                                    },
                                    {
                                        "code": "MF",
                                        "label": "Saint-Martin (French part)",
                                        "order": null
                                    },
                                    {
                                        "code": "LC",
                                        "label": "Saint Lucia",
                                        "order": null
                                    },
                                    {
                                        "code": "KN",
                                        "label": "Saint Kitts and Nevis",
                                        "order": null
                                    },
                                    {
                                        "code": "SH",
                                        "label": "Saint Helena",
                                        "order": null
                                    },
                                    {
                                        "code": "BL",
                                        "label": "Saint-Barthélemy",
                                        "order": null
                                    },
                                    {
                                        "code": "RW",
                                        "label": "Rwanda",
                                        "order": null
                                    },
                                    {
                                        "code": "RU",
                                        "label": "Russian Federation",
                                        "order": null
                                    },
                                    {
                                        "code": "RO",
                                        "label": "Romania",
                                        "order": null
                                    },
                                    {
                                        "code": "RE",
                                        "label": "Réunion",
                                        "order": null
                                    },
                                    {
                                        "code": "QA",
                                        "label": "Qatar",
                                        "order": null
                                    },
                                    {
                                        "code": "PR",
                                        "label": "Puerto Rico",
                                        "order": null
                                    },
                                    {
                                        "code": "PT",
                                        "label": "Portugal",
                                        "order": null
                                    },
                                    {
                                        "code": "PL",
                                        "label": "Poland",
                                        "order": null
                                    },
                                    {
                                        "code": "PN",
                                        "label": "Pitcairn",
                                        "order": null
                                    },
                                    {
                                        "code": "PH",
                                        "label": "Philippines",
                                        "order": null
                                    },
                                    {
                                        "code": "PE",
                                        "label": "Peru",
                                        "order": null
                                    },
                                    {
                                        "code": "PY",
                                        "label": "Paraguay",
                                        "order": null
                                    },
                                    {
                                        "code": "PG",
                                        "label": "Papua New Guinea",
                                        "order": null
                                    },
                                    {
                                        "code": "PA",
                                        "label": "Panama",
                                        "order": null
                                    },
                                    {
                                        "code": "PS",
                                        "label": "Palestinian Territory, Occupied",
                                        "order": null
                                    },
                                    {
                                        "code": "PW",
                                        "label": "Palau",
                                        "order": null
                                    },
                                    {
                                        "code": "PK",
                                        "label": "Pakistan",
                                        "order": null
                                    },
                                    {
                                        "code": "OM",
                                        "label": "Oman",
                                        "order": null
                                    },
                                    {
                                        "code": "NO",
                                        "label": "Norway",
                                        "order": null
                                    },
                                    {
                                        "code": "MP",
                                        "label": "Northern Mariana Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "NF",
                                        "label": "Norfolk Island",
                                        "order": null
                                    },
                                    {
                                        "code": "NU",
                                        "label": "Niue",
                                        "order": null
                                    },
                                    {
                                        "code": "NG",
                                        "label": "Nigeria",
                                        "order": null
                                    },
                                    {
                                        "code": "NE",
                                        "label": "Niger",
                                        "order": null
                                    },
                                    {
                                        "code": "NI",
                                        "label": "Nicaragua",
                                        "order": null
                                    },
                                    {
                                        "code": "NZ",
                                        "label": "New Zealand",
                                        "order": null
                                    },
                                    {
                                        "code": "NC",
                                        "label": "New Caledonia",
                                        "order": null
                                    },
                                    {
                                        "code": "AN",
                                        "label": "Netherlands Antilles",
                                        "order": null
                                    },
                                    {
                                        "code": "NL",
                                        "label": "Netherlands",
                                        "order": null
                                    },
                                    {
                                        "code": "NP",
                                        "label": "Nepal",
                                        "order": null
                                    },
                                    {
                                        "code": "NR",
                                        "label": "Nauru",
                                        "order": null
                                    },
                                    {
                                        "code": "NA",
                                        "label": "Namibia",
                                        "order": null
                                    },
                                    {
                                        "code": "MM",
                                        "label": "Myanmar",
                                        "order": null
                                    },
                                    {
                                        "code": "MZ",
                                        "label": "Mozambique",
                                        "order": null
                                    },
                                    {
                                        "code": "MA",
                                        "label": "Morocco",
                                        "order": null
                                    },
                                    {
                                        "code": "MS",
                                        "label": "Montserrat",
                                        "order": null
                                    },
                                    {
                                        "code": "ME",
                                        "label": "Montenegro",
                                        "order": null
                                    },
                                    {
                                        "code": "MN",
                                        "label": "Mongolia",
                                        "order": null
                                    },
                                    {
                                        "code": "MC",
                                        "label": "Monaco",
                                        "order": null
                                    },
                                    {
                                        "code": "MD",
                                        "label": "Moldova",
                                        "order": null
                                    },
                                    {
                                        "code": "FM",
                                        "label": "Micronesia, Federated States of",
                                        "order": null
                                    },
                                    {
                                        "code": "MX",
                                        "label": "Mexico",
                                        "order": null
                                    },
                                    {
                                        "code": "YT",
                                        "label": "Mayotte",
                                        "order": null
                                    },
                                    {
                                        "code": "MU",
                                        "label": "Mauritius",
                                        "order": null
                                    },
                                    {
                                        "code": "MR",
                                        "label": "Mauritania",
                                        "order": null
                                    },
                                    {
                                        "code": "MQ",
                                        "label": "Martinique",
                                        "order": null
                                    },
                                    {
                                        "code": "MH",
                                        "label": "Marshall Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "MT",
                                        "label": "Malta",
                                        "order": null
                                    },
                                    {
                                        "code": "ML",
                                        "label": "Mali",
                                        "order": null
                                    },
                                    {
                                        "code": "MV",
                                        "label": "Maldives",
                                        "order": null
                                    },
                                    {
                                        "code": "MY",
                                        "label": "Malaysia",
                                        "order": null
                                    },
                                    {
                                        "code": "MW",
                                        "label": "Malawi",
                                        "order": null
                                    },
                                    {
                                        "code": "MG",
                                        "label": "Madagascar",
                                        "order": null
                                    },
                                    {
                                        "code": "MK",
                                        "label": "Macedonia, Republic of",
                                        "order": null
                                    },
                                    {
                                        "code": "LU",
                                        "label": "Luxembourg",
                                        "order": null
                                    },
                                    {
                                        "code": "LT",
                                        "label": "Lithuania",
                                        "order": null
                                    },
                                    {
                                        "code": "LI",
                                        "label": "Liechtenstein",
                                        "order": null
                                    },
                                    {
                                        "code": "LY",
                                        "label": "Libya",
                                        "order": null
                                    },
                                    {
                                        "code": "LR",
                                        "label": "Liberia",
                                        "order": null
                                    },
                                    {
                                        "code": "LS",
                                        "label": "Lesotho",
                                        "order": null
                                    },
                                    {
                                        "code": "LB",
                                        "label": "Lebanon",
                                        "order": null
                                    },
                                    {
                                        "code": "LV",
                                        "label": "Latvia",
                                        "order": null
                                    },
                                    {
                                        "code": "LA",
                                        "label": "Lao PDR",
                                        "order": null
                                    },
                                    {
                                        "code": "KG",
                                        "label": "Kyrgyzstan",
                                        "order": null
                                    },
                                    {
                                        "code": "KW",
                                        "label": "Kuwait",
                                        "order": null
                                    },
                                    {
                                        "code": "KR",
                                        "label": "Korea, Republic of",
                                        "order": null
                                    },
                                    {
                                        "code": "KP",
                                        "label": "Korea, Democratic People's Republic of",
                                        "order": null
                                    },
                                    {
                                        "code": "KI",
                                        "label": "Kiribati",
                                        "order": null
                                    },
                                    {
                                        "code": "KE",
                                        "label": "Kenya",
                                        "order": null
                                    },
                                    {
                                        "code": "KZ",
                                        "label": "Kazakhstan",
                                        "order": null
                                    },
                                    {
                                        "code": "JO",
                                        "label": "Jordan",
                                        "order": null
                                    },
                                    {
                                        "code": "JE",
                                        "label": "Jersey",
                                        "order": null
                                    },
                                    {
                                        "code": "JP",
                                        "label": "Japan",
                                        "order": null
                                    },
                                    {
                                        "code": "JM",
                                        "label": "Jamaica",
                                        "order": null
                                    },
                                    {
                                        "code": "IT",
                                        "label": "Italy",
                                        "order": null
                                    },
                                    {
                                        "code": "IL",
                                        "label": "Israel",
                                        "order": null
                                    },
                                    {
                                        "code": "IM",
                                        "label": "Isle of Man",
                                        "order": null
                                    },
                                    {
                                        "code": "IE",
                                        "label": "Ireland",
                                        "order": null
                                    },
                                    {
                                        "code": "IQ",
                                        "label": "Iraq",
                                        "order": null
                                    },
                                    {
                                        "code": "IR",
                                        "label": "Iran, Islamic Republic of",
                                        "order": null
                                    },
                                    {
                                        "code": "ID",
                                        "label": "Indonesia",
                                        "order": null
                                    },
                                    {
                                        "code": "IN",
                                        "label": "India",
                                        "order": null
                                    },
                                    {
                                        "code": "IS",
                                        "label": "Iceland",
                                        "order": null
                                    },
                                    {
                                        "code": "HU",
                                        "label": "Hungary",
                                        "order": null
                                    },
                                    {
                                        "code": "HN",
                                        "label": "Honduras",
                                        "order": null
                                    },
                                    {
                                        "code": "VA",
                                        "label": "Holy See (Vatican City State)",
                                        "order": null
                                    },
                                    {
                                        "code": "HM",
                                        "label": "Heard Island and Mcdonald Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "HT",
                                        "label": "Haiti",
                                        "order": null
                                    },
                                    {
                                        "code": "GY",
                                        "label": "Guyana",
                                        "order": null
                                    },
                                    {
                                        "code": "GW",
                                        "label": "Guinea-Bissau",
                                        "order": null
                                    },
                                    {
                                        "code": "GN",
                                        "label": "Guinea",
                                        "order": null
                                    },
                                    {
                                        "code": "GG",
                                        "label": "Guernsey",
                                        "order": null
                                    },
                                    {
                                        "code": "GT",
                                        "label": "Guatemala",
                                        "order": null
                                    },
                                    {
                                        "code": "GU",
                                        "label": "Guam",
                                        "order": null
                                    },
                                    {
                                        "code": "GP",
                                        "label": "Guadeloupe",
                                        "order": null
                                    },
                                    {
                                        "code": "GD",
                                        "label": "Grenada",
                                        "order": null
                                    },
                                    {
                                        "code": "GL",
                                        "label": "Greenland",
                                        "order": null
                                    },
                                    {
                                        "code": "GR",
                                        "label": "Greece",
                                        "order": null
                                    },
                                    {
                                        "code": "GI",
                                        "label": "Gibraltar",
                                        "order": null
                                    },
                                    {
                                        "code": "GH",
                                        "label": "Ghana",
                                        "order": null
                                    },
                                    {
                                        "code": "DE",
                                        "label": "Germany",
                                        "order": null
                                    },
                                    {
                                        "code": "GE",
                                        "label": "Georgia",
                                        "order": null
                                    },
                                    {
                                        "code": "GM",
                                        "label": "Gambia",
                                        "order": null
                                    },
                                    {
                                        "code": "GA",
                                        "label": "Gabon",
                                        "order": null
                                    },
                                    {
                                        "code": "TF",
                                        "label": "French Southern Territories",
                                        "order": null
                                    },
                                    {
                                        "code": "PF",
                                        "label": "French Polynesia",
                                        "order": null
                                    },
                                    {
                                        "code": "GF",
                                        "label": "French Guiana",
                                        "order": null
                                    },
                                    {
                                        "code": "FR",
                                        "label": "France",
                                        "order": null
                                    },
                                    {
                                        "code": "FI",
                                        "label": "Finland",
                                        "order": null
                                    },
                                    {
                                        "code": "FJ",
                                        "label": "Fiji",
                                        "order": null
                                    },
                                    {
                                        "code": "FO",
                                        "label": "Faroe Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "FK",
                                        "label": "Falkland Islands (Malvinas)",
                                        "order": null
                                    },
                                    {
                                        "code": "ET",
                                        "label": "Ethiopia",
                                        "order": null
                                    },
                                    {
                                        "code": "EE",
                                        "label": "Estonia",
                                        "order": null
                                    },
                                    {
                                        "code": "ER",
                                        "label": "Eritrea",
                                        "order": null
                                    },
                                    {
                                        "code": "GQ",
                                        "label": "Equatorial Guinea",
                                        "order": null
                                    },
                                    {
                                        "code": "SV",
                                        "label": "El Salvador",
                                        "order": null
                                    },
                                    {
                                        "code": "EG",
                                        "label": "Egypt",
                                        "order": null
                                    },
                                    {
                                        "code": "EC",
                                        "label": "Ecuador",
                                        "order": null
                                    },
                                    {
                                        "code": "DO",
                                        "label": "Dominican Republic",
                                        "order": null
                                    },
                                    {
                                        "code": "DM",
                                        "label": "Dominica",
                                        "order": null
                                    },
                                    {
                                        "code": "DJ",
                                        "label": "Djibouti",
                                        "order": null
                                    },
                                    {
                                        "code": "DK",
                                        "label": "Denmark",
                                        "order": null
                                    },
                                    {
                                        "code": "CZ",
                                        "label": "Czech Republic",
                                        "order": null
                                    },
                                    {
                                        "code": "CY",
                                        "label": "Cyprus",
                                        "order": null
                                    },
                                    {
                                        "code": "CW",
                                        "label": "Curaçao",
                                        "order": null
                                    },
                                    {
                                        "code": "CU",
                                        "label": "Cuba",
                                        "order": null
                                    },
                                    {
                                        "code": "HR",
                                        "label": "Croatia",
                                        "order": null
                                    },
                                    {
                                        "code": "CI",
                                        "label": "Côte d'Ivoire",
                                        "order": null
                                    },
                                    {
                                        "code": "CR",
                                        "label": "Costa Rica",
                                        "order": null
                                    },
                                    {
                                        "code": "CK",
                                        "label": "Cook Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "CD",
                                        "label": "Congo, Democratic Republic of the",
                                        "order": null
                                    },
                                    {
                                        "code": "CG",
                                        "label": "Congo (Brazzaville)",
                                        "order": null
                                    },
                                    {
                                        "code": "KM",
                                        "label": "Comoros",
                                        "order": null
                                    },
                                    {
                                        "code": "CO",
                                        "label": "Colombia",
                                        "order": null
                                    },
                                    {
                                        "code": "CC",
                                        "label": "Cocos (Keeling) Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "CX",
                                        "label": "Christmas Island",
                                        "order": null
                                    },
                                    {
                                        "code": "MO",
                                        "label": "Macao, Special Administrative Region of China",
                                        "order": null
                                    },
                                    {
                                        "code": "HK",
                                        "label": "Hong Kong, Special Administrative Region of China",
                                        "order": null
                                    },
                                    {
                                        "code": "CN",
                                        "label": "China",
                                        "order": null
                                    },
                                    {
                                        "code": "CL",
                                        "label": "Chile",
                                        "order": null
                                    },
                                    {
                                        "code": "TD",
                                        "label": "Chad",
                                        "order": null
                                    },
                                    {
                                        "code": "CF",
                                        "label": "Central African Republic",
                                        "order": null
                                    },
                                    {
                                        "code": "KY",
                                        "label": "Cayman Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "CV",
                                        "label": "Cape Verde",
                                        "order": null
                                    },
                                    {
                                        "code": "CA",
                                        "label": "Canada",
                                        "order": null
                                    },
                                    {
                                        "code": "CM",
                                        "label": "Cameroon",
                                        "order": null
                                    },
                                    {
                                        "code": "KH",
                                        "label": "Cambodia",
                                        "order": null
                                    },
                                    {
                                        "code": "BI",
                                        "label": "Burundi",
                                        "order": null
                                    },
                                    {
                                        "code": "BF",
                                        "label": "Burkina Faso",
                                        "order": null
                                    },
                                    {
                                        "code": "BG",
                                        "label": "Bulgaria",
                                        "order": null
                                    },
                                    {
                                        "code": "BN",
                                        "label": "Brunei Darussalam",
                                        "order": null
                                    },
                                    {
                                        "code": "IO",
                                        "label": "British Indian Ocean Territory",
                                        "order": null
                                    },
                                    {
                                        "code": "VG",
                                        "label": "British Virgin Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "BR",
                                        "label": "Brazil",
                                        "order": null
                                    },
                                    {
                                        "code": "BV",
                                        "label": "Bouvet Island",
                                        "order": null
                                    },
                                    {
                                        "code": "BW",
                                        "label": "Botswana",
                                        "order": null
                                    },
                                    {
                                        "code": "BA",
                                        "label": "Bosnia and Herzegovina",
                                        "order": null
                                    },
                                    {
                                        "code": "BQ",
                                        "label": "Bonaire, Sint Eustatius and Saba",
                                        "order": null
                                    },
                                    {
                                        "code": "BO",
                                        "label": "Bolivia",
                                        "order": null
                                    },
                                    {
                                        "code": "BT",
                                        "label": "Bhutan",
                                        "order": null
                                    },
                                    {
                                        "code": "BM",
                                        "label": "Bermuda",
                                        "order": null
                                    },
                                    {
                                        "code": "BJ",
                                        "label": "Benin",
                                        "order": null
                                    },
                                    {
                                        "code": "BZ",
                                        "label": "Belize",
                                        "order": null
                                    },
                                    {
                                        "code": "BE",
                                        "label": "Belgium",
                                        "order": null
                                    },
                                    {
                                        "code": "BY",
                                        "label": "Belarus",
                                        "order": null
                                    },
                                    {
                                        "code": "BB",
                                        "label": "Barbados",
                                        "order": null
                                    },
                                    {
                                        "code": "BD",
                                        "label": "Bangladesh",
                                        "order": null
                                    },
                                    {
                                        "code": "BH",
                                        "label": "Bahrain",
                                        "order": null
                                    },
                                    {
                                        "code": "BS",
                                        "label": "Bahamas",
                                        "order": null
                                    },
                                    {
                                        "code": "AZ",
                                        "label": "Azerbaijan",
                                        "order": null
                                    },
                                    {
                                        "code": "AT",
                                        "label": "Austria",
                                        "order": null
                                    },
                                    {
                                        "code": "AU",
                                        "label": "Australia",
                                        "order": null
                                    },
                                    {
                                        "code": "AW",
                                        "label": "Aruba",
                                        "order": null
                                    },
                                    {
                                        "code": "AM",
                                        "label": "Armenia",
                                        "order": null
                                    },
                                    {
                                        "code": "AR",
                                        "label": "Argentina",
                                        "order": null
                                    },
                                    {
                                        "code": "AG",
                                        "label": "Antigua and Barbuda",
                                        "order": null
                                    },
                                    {
                                        "code": "AQ",
                                        "label": "Antarctica",
                                        "order": null
                                    },
                                    {
                                        "code": "AI",
                                        "label": "Anguilla",
                                        "order": null
                                    },
                                    {
                                        "code": "AO",
                                        "label": "Angola",
                                        "order": null
                                    },
                                    {
                                        "code": "AD",
                                        "label": "Andorra",
                                        "order": null
                                    },
                                    {
                                        "code": "AS",
                                        "label": "American Samoa",
                                        "order": null
                                    },
                                    {
                                        "code": "DZ",
                                        "label": "Algeria",
                                        "order": null
                                    },
                                    {
                                        "code": "AL",
                                        "label": "Albania",
                                        "order": null
                                    },
                                    {
                                        "code": "AX",
                                        "label": "Aland Islands",
                                        "order": null
                                    },
                                    {
                                        "code": "AF",
                                        "label": "Afghanistan",
                                        "order": null
                                    }
                                ],
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
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-ia-legalrep-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-ia-caseofficer",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-ia-admofficer",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-homeofficeapc",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-homeofficelart",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-homeofficepou",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-respondentofficer",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-iacjudge",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                }
                            ],
                            "complexACLs": [],
                            "display_context": null,
                            "display_context_parameter": null,
                            "formatted_value": null
                        }
                    ],
                    "collection_field_type": null
                }
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": "#COLLECTION(allowDelete,allowInsert)",
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantAddressTitle",
            "label": "# Your client's address\nWe'll use this to work out which hearing centre is best for them.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantHasFixedAddress",
            "label": "Does the appellant have a fixed address?",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantHasFixedAddressLabel",
            "label": "**We will use the address of your legal practice.**",
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
            "show_condition": "appellantHasFixedAddress=\"No\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantAddress",
            "label": "Address",
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
            "show_condition": "appellantHasFixedAddress=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appellantContactPreferenceTitle",
            "label": "# The appellant's contact preference\nSelect the communication method which best suits the appellant. \n\n The Tribunal needs this to: \n- provide standard guidance on the appeal process\n- update the appellant at key points in the appeal\n- send the Hearing Notice and guidance on what to expect at hearing\n- contact the appellant if, for any reason, your representation ends",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "contactPreference",
            "label": "Communication Preference",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-contactPreference",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "wantsEmail",
                        "label": "Email",
                        "order": null
                    },
                    {
                        "code": "wantsSms",
                        "label": "Text message",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "email",
            "label": "Email address",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Email",
                "type": "Email",
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
            "show_condition": "contactPreference=\"wantsEmail\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "mobileNumber",
            "label": "Mobile phone number",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "mobileNumber-c4da7253-6cc1-4789-9b63-f543ca462f0e",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": "^((\\+44(\\s\\(0\\)\\s|\\s0\\s|\\s)?)|0)7\\d{3}(\\s)?\\d{6}$",
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
            "show_condition": "contactPreference=\"wantsSms\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealTypeTitle",
            "label": "# Type of appeal\nSelect the appeal type that best fits your case. If you want to raise something relating to another appeal type, you can do this later.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealType",
            "label": "Type of appeal",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-appealType",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "refusalOfHumanRights",
                        "label": "Refusal of a human rights claim",
                        "order": null
                    },
                    {
                        "code": "refusalOfEu",
                        "label": "Refusal of application under the EEA regulations",
                        "order": null
                    },
                    {
                        "code": "deprivation",
                        "label": "Deprivation of citizenship",
                        "order": null
                    },
                    {
                        "code": "protection",
                        "label": "Refusal of protection claim",
                        "order": null
                    },
                    {
                        "code": "revocationOfProtection",
                        "label": "Revocation of a protection status",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsEuRefusalTitle",
            "label": "# The grounds of your appeal\n\nYou'll be able to explain your grounds in more detail later.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsEuRefusal",
            "label": "The grounds of your appeal",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsEuRefusal",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsEuRefusal",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "appealGroundsEuRefusal",
                                    "label": "The decision breaches the appellant's rights under the EEA regulations",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsHumanRightsRefusalTitle",
            "label": "# The grounds of your appeal\n\nYou'll be able to explain your grounds in more detail later.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsHumanRightsRefusal",
            "label": "The grounds of your appeal",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsHumanRightsRefusal",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsHumanRightsRefusal",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "protectionHumanRights",
                                    "label": "Removing the appellant from the UK would be unlawful under section 6 of the Human Rights Act 1998",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsDeprivationTitle",
            "label": "# The grounds of your appeal\n\nYou'll be able to explain your grounds in more detail later.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsDeprivation",
            "label": "Select at least one of the options below",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsDeprivation",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsDeprivation",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "unlawfulDeprivation",
                                    "label": "The decision is unlawful because discretion should have been exercised differently",
                                    "order": null
                                },
                                {
                                    "code": "disproportionateDeprivation",
                                    "label": "Deprivation would have a disproportionate effect",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsDeprivationHumanRightsTitle",
            "label": "## Human rights grounds",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsDeprivationHumanRights",
            "label": "Check the box if this statement also applies",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsHumanRights",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsHumanRights",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "protectionHumanRights",
                                    "label": "Removing the appellant from the UK would be unlawful under section 6 of the Human Rights Act 1998",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsProtectionTitle",
            "label": "# The grounds of your appeal\n\nYou'll be able to explain your grounds in more detail later.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsProtection",
            "label": "Select at least one of the options below",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsProtection",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsProtection",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "protectionRefugeeConvention",
                                    "label": "Removing the appellant from the UK would breach the UK's obligation under the Refugee Convention",
                                    "order": null
                                },
                                {
                                    "code": "protectionHumanitarianProtection",
                                    "label": "Removing the appellant from the UK would breach the UK's obligation in relation to persons eligible for a grant of humanitarian protection",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsProtectionHumanRightsTitle",
            "label": "## Human rights grounds",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsHumanRights",
            "label": "Check the box if this statement also applies",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsHumanRights",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsHumanRights",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "protectionHumanRights",
                                    "label": "Removing the appellant from the UK would be unlawful under section 6 of the Human Rights Act 1998",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsRevocationTitle",
            "label": "# The grounds of your appeal\n\nYou'll be able to explain your grounds later.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "appealGroundsRevocation",
            "label": "Select at least one of the options below",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "appealGroundsRevocation",
                "type": "Complex",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [
                    {
                        "id": "values",
                        "label": "",
                        "hidden": null,
                        "order": null,
                        "metadata": false,
                        "case_type_id": null,
                        "hint_text": null,
                        "field_type": {
                            "id": "MultiSelectList-appealGroundsRevocation",
                            "type": "MultiSelectList",
                            "min": null,
                            "max": null,
                            "regular_expression": null,
                            "fixed_list_items": [
                                {
                                    "code": "revocationRefugeeConvention",
                                    "label": "Revocation of the appellant's protection status breaches the United Kingdom's obligations under the Refugee Convention",
                                    "order": null
                                },
                                {
                                    "code": "revocationHumanitarianProtection",
                                    "label": "Revocation of the appellant's protection status breaches the United Kingdom's obligations in relation to persons eligible for humanitarian protection",
                                    "order": null
                                }
                            ],
                            "complex_fields": [],
                            "collection_field_type": null
                        },
                        "security_classification": "PUBLIC",
                        "live_from": null,
                        "live_until": null,
                        "show_condition": null,
                        "acls": [
                            {
                                "role": "caseworker-ia-legalrep-solicitor",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-caseofficer",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-ia-admofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficeapc",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficelart",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-homeofficepou",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-respondentofficer",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-ia-iacjudge",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "newMattersTitle",
            "label": "# New matters",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "hasNewMatters",
            "label": "Are there any new reasons your client wishes to remain in the UK or any new grounds on which they should be permitted to stay?",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "newMatters",
            "label": "Explain these new matters and their relevance to the appeal",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "TextArea",
                "type": "TextArea",
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
            "show_condition": "hasNewMatters=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "hasOtherAppealsTitle",
            "label": "# Has your client appealed against any other UK immigration decisions?",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "hasOtherAppeals",
            "label": "Other appeals",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedList-otherAppeals",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "NotSure",
                        "label": "I'm not sure",
                        "order": null
                    },
                    {
                        "code": "No",
                        "label": "No",
                        "order": null
                    },
                    {
                        "code": "YesWithoutAppealNumber",
                        "label": "Yes, but I don't have an appeal number",
                        "order": null
                    },
                    {
                        "code": "Yes",
                        "label": "Yes",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "otherAppealsTitle",
            "label": "# Has your client appealed against any other UK immigration decisions?",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "otherAppeals",
            "label": "Appeal number",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "otherAppeals-19fa7c04-10e6-4336-b620-97acf30d2548",
                "type": "Collection",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": {
                    "id": "appealNumber",
                    "type": "Complex",
                    "min": null,
                    "max": null,
                    "regular_expression": null,
                    "fixed_list_items": [],
                    "complex_fields": [
                        {
                            "id": "value",
                            "label": "",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
                            "hint_text": null,
                            "field_type": {
                                "id": "value-51dcbc6f-e43e-4efc-81ae-a1dec1c2dcb7",
                                "type": "Text",
                                "min": null,
                                "max": null,
                                "regular_expression": "^(RP|PA|EA|HU|DC|DA|AA|IA|OA|VA)\\/[0-9]{5}\\/[0-9]{4}$",
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
                                    "role": "caseworker-ia-legalrep-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-ia-caseofficer",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-ia-admofficer",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-homeofficeapc",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-homeofficelart",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-homeofficepou",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-respondentofficer",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-ia-iacjudge",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                }
                            ],
                            "complexACLs": [],
                            "display_context": null,
                            "display_context_parameter": null,
                            "formatted_value": null
                        }
                    ],
                    "collection_field_type": null
                }
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": "#COLLECTION(allowDelete,allowInsert)",
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "legalRepDetailsHintAndTitle",
            "label": "# Legal representative details\nEnter your details.",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "legalRepCompany",
            "label": "Company",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "legalRepName",
            "label": "Name",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "legalRepReferenceNumber",
            "label": "Own reference",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-caseofficer",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-ia-admofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficeapc",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficelart",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-homeofficepou",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-respondentofficer",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-ia-iacjudge",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "isFeePaymentEnabled",
            "label": "isFeePaymentEnabled",
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
            "display_context": "READONLY",
            "display_context_parameter": null,
            "show_condition": "legalRepReferenceNumber=\"DUMMY_VALUE_TO_HIDE_FIELD\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "decisionHearingFeeOption",
            "label": "How do you want the appeal to be decided?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-decisionHearingFeeOption",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "decisionWithHearing",
                        "label": "Decision with a hearing. The fee for this type of appeal is £140",
                        "order": null
                    },
                    {
                        "code": "decisionWithoutHearing",
                        "label": "Decision without a hearing. The fee for this type of appeal is £80",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "makePayment",
            "label": "# Make a payment",
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
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "payForTheAppealOption",
            "label": "When will you pay?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-paymentPreference",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "payLater",
                        "label": "Submit the appeal now and pay within 14 days",
                        "order": null
                    },
                    {
                        "code": "payNow",
                        "label": "Pay and submit the appeal now",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "appealFeeHearingDesc",
            "label": "",
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
            "display_context": "READONLY",
            "display_context_parameter": null,
            "show_condition": "decisionHearingFeeOption=\"decisionWithHearing\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "appealFeeWithoutHearingDesc",
            "label": "",
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
            "display_context": "READONLY",
            "display_context_parameter": null,
            "show_condition": "decisionHearingFeeOption=\"decisionWithoutHearing\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-ia-legalrep-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJnOHQwZWM2NmI0NnE4b2libmJncHIzOGdrbSIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0OTI3NSwiZXZlbnQtaWQiOiJzdGFydEFwcGVhbCIsImNhc2UtdHlwZS1pZCI6IkFzeWx1bSIsImp1cmlzZGljdGlvbi1pZCI6IklBIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.Se_jKUNpOUU9p6VUZsu8Ok9flYDv0tMMoGZrhEnmqt0",
    "wizard_pages": [
        {
            "id": "startAppealchecklist",
            "label": null,
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "checklistTitle",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "checklistTitle2",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "checklist",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealhomeOfficeDecision",
            "label": null,
            "order": 2,
            "wizard_page_fields": [
                {
                    "case_field_id": "homeOfficeDecisionTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "homeOfficeReferenceNumber",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "homeOfficeDecisionLetterImage",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "homeOfficeDecisionDate",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "homeOfficeDecisionEnvelopeImage",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappellantBasicDetails",
            "label": null,
            "order": 3,
            "wizard_page_fields": [
                {
                    "case_field_id": "appellantBasicDetailsTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantTitle",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantGivenNames",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantFamilyName",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantDateOfBirth",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantNationalities",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappellantAddress",
            "label": null,
            "order": 4,
            "wizard_page_fields": [
                {
                    "case_field_id": "appellantAddressTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantHasFixedAddress",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantHasFixedAddressLabel",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appellantAddress",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappellantContactPreference",
            "label": null,
            "order": 5,
            "wizard_page_fields": [
                {
                    "case_field_id": "appellantContactPreferenceTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "contactPreference",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "email",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "mobileNumber",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappealType",
            "label": null,
            "order": 6,
            "wizard_page_fields": [
                {
                    "case_field_id": "appealTypeTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealType",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappealGroundsEuRefusal",
            "label": null,
            "order": 7,
            "wizard_page_fields": [
                {
                    "case_field_id": "appealGroundsEuRefusalTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsEuRefusal",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "appealType=\"refusalOfEu\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappealGroundsHumanRightsRefusal",
            "label": null,
            "order": 8,
            "wizard_page_fields": [
                {
                    "case_field_id": "appealGroundsHumanRightsRefusalTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsHumanRightsRefusal",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "appealType=\"refusalOfHumanRights\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappealGroundsDeprivation",
            "label": null,
            "order": 9,
            "wizard_page_fields": [
                {
                    "case_field_id": "appealGroundsDeprivationTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsDeprivation",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsDeprivationHumanRightsTitle",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsDeprivationHumanRights",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "appealType=\"deprivation\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappealGroundsProtection",
            "label": null,
            "order": 10,
            "wizard_page_fields": [
                {
                    "case_field_id": "appealGroundsProtectionTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsProtection",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsProtectionHumanRightsTitle",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsHumanRights",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "appealType=\"protection\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealappealGroundsRevocation",
            "label": null,
            "order": 11,
            "wizard_page_fields": [
                {
                    "case_field_id": "appealGroundsRevocationTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealGroundsRevocation",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "appealType=\"revocationOfProtection\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealnewMatters",
            "label": null,
            "order": 12,
            "wizard_page_fields": [
                {
                    "case_field_id": "newMattersTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "hasNewMatters",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "newMatters",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealhasOtherAppeals",
            "label": null,
            "order": 13,
            "wizard_page_fields": [
                {
                    "case_field_id": "hasOtherAppealsTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "hasOtherAppeals",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealotherAppeals",
            "label": null,
            "order": 14,
            "wizard_page_fields": [
                {
                    "case_field_id": "otherAppealsTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "otherAppeals",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "hasOtherAppeals=\"Yes\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppeallegalRepresentativeDetails",
            "label": null,
            "order": 15,
            "wizard_page_fields": [
                {
                    "case_field_id": "legalRepDetailsHintAndTitle",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "legalRepCompany",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "legalRepName",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "legalRepReferenceNumber",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "isFeePaymentEnabled",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealhearingFeeDecision",
            "label": null,
            "order": 16,
            "wizard_page_fields": [
                {
                    "case_field_id": "decisionHearingFeeOption",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "isFeePaymentEnabled=\"Yes\" AND appealType!=\"deprivation\" AND appealType!=\"revocationOfProtection\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "startAppealpayment",
            "label": null,
            "order": 17,
            "wizard_page_fields": [
                {
                    "case_field_id": "makePayment",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "payForTheAppealOption",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealFeeHearingDesc",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "appealFeeWithoutHearingDesc",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "isFeePaymentEnabled=\"Yes\" AND appealType!=\"deprivation\" AND appealType!=\"revocationOfProtection\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        }
    ],
    "show_summary": true,
    "show_event_notes": false,
    "end_button_label": "Save and continue",
    "can_save_draft": null,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/Asylum/event-triggers/startAppeal?ignore-warning=false"
        }
    }
}
