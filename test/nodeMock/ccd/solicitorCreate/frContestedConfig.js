module.exports = {
    "id": "FR_solicitorCreate",
    "name": "Form A Application",
    "description": "Create an application for financial remedy by contested",
    "case_id": null,
    "case_fields": [
        {
            "id": "beforeYouStart",
            "label": "## Before You Start",
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
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "beforeYouStartPara1",
            "label": ">Financial Remedy Online is part of the Divorce project within the HMCTS reform programme. The Divorce project aim is to deliver a transformed end to end service for individuals and/or their legal representatives wishing to make an application to legally end their marriage or civil partnership and resolve associated financial issues.\n\n>Before you start completing this application you will need:\n\n*\tYour PBA number or an online help with fees reference number.\n*\tThe name of the Applicant’s local Court (https://courttribunalfinder.service.gov.uk/search/)\n*\tYou will have the opportunity to upload any other relevant documents e.g. pension forms, cover letters etc throughout the course of this application\n\n>The pilot will continue to improve and add additional features based on the user feedback we receive. Please check the list below to ensure the application is within the current scope of the pilot:",
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
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "beforeYouStartPara2",
            "label": ">**Scope**\n\n>Currently, you can use the pilot for any cases that fit the following criteria only:\n\n*\tThe Applicants local Court falls under one of the following FRC areas:\t\n> - London\n> - East Midlands\n> - Cheshire & Merseyside FRC\n> - Humberside & South Yorkshire\n> - Cleveland, Newcastle & Durham\n> - Kent Surrey & Sussex Financial Remedy Court\n> - North & West Yorkshire\n*\tThe application is being made as part of a Divorce case (applications on Civil Partnership, judicial separation or nullity cases cannot be accepted at this time)\n*\tThe Divorce case may have been submitted via paper or online, however, there must be no previous financial remedy proceedings on the case\n*\tYou must be representing the Applicant (the applicant for FR proceedings could be either the petitioner or respondent in the divorce proceedings)\n*\tThere cannot be a confidential address on the case\n*\tYou are not applying for Maintenance Pending Suit\n\n>If your application does not meet these criteria, it will be returned and will have to be submitted via the normal paper process.",
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
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "isAdmin",
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
            "show_condition": null,
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantRepresentedLabel",
            "label": "## Is the Applicant represented ? ##",
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
            "show_condition": "isAdmin=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantRepresented",
            "label": "",
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
            "show_condition": "isAdmin=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantContactLabel",
            "label": "#### Applicant’s Contact details",
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
            "show_condition": "applicantRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantAddress",
            "label": "",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
            "show_condition": "applicantRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantPhone",
            "label": "Phone Number",
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
            "show_condition": "applicantRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantEmail",
            "label": "Email",
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": "applicantRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorDetailLabel",
            "label": "## Solicitor Details",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorName",
            "label": "Solicitor’s name",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorFirm",
            "label": "Solicitor’s firm",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "solicitorReference",
            "label": "Your reference number",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorAddressLabel",
            "label": "#### Solicitor’s Contact Details",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorAddress",
            "label": "",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorPhone",
            "label": "Phone Number",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorEmail",
            "label": "Email",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorDXnumber",
            "label": "DX number",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantSolicitorConsentForEmails",
            "label": "Do you consent to receive emails from the court about your case ?",
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
            "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceDetailsLabel",
            "label": "## Divorce Details",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceCaseNumber",
            "label": "Divorce Case Number",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Enter 10 character alphanumeric divorce case number",
            "field_type": {
                "id": "divorceCaseNumber-2874d198-5602-4077-bfac-3ffc35c70345",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": "^([A-Z|a-z][A-Z|a-z])\\d{2}[D|d]\\d{5}$",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "dateOfMarriage",
            "label": "Date of marriage",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "dateOfSepration",
            "label": "Date of separation",
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "nameOfCourtDivorceCentre",
            "label": "Name of Court / Divorce Centre where petition issued",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceStageReached",
            "label": "What stage has the divorce reached ?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "To ensure the application is linked to the divorce file without delay, please upload a copy of the decree [nisi] [absolute]",
            "field_type": {
                "id": "FixedList-FR_fl_StageReached",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "Petition Issued",
                        "label": "Petition Issued",
                        "order": null
                    },
                    {
                        "code": "Decree Absolute",
                        "label": "Decree Absolute",
                        "order": null
                    },
                    {
                        "code": "Decree Nisi",
                        "label": "Decree Nisi",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceUploadEvidence1",
            "label": "Upload Decree Nisi",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Document",
                "type": "Document",
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
            "show_condition": "divorceStageReached=\"Decree Nisi\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceDecreeNisiDate",
            "label": "Decree Nisi Date",
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
            "show_condition": "divorceStageReached=\"Decree Nisi\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceUploadEvidence2",
            "label": "Upload Decree Absolute",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Document",
                "type": "Document",
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
            "show_condition": "divorceStageReached=\"Decree Absolute\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceDecreeAbsoluteDate",
            "label": "Decree Absolute Date",
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
            "show_condition": "divorceStageReached=\"Decree Absolute\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorceUploadPetition",
            "label": "Upload Petition",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "Document",
                "type": "Document",
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
            "show_condition": "divorceStageReached=\"Petition Issued\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "divorcePetitionIssuedDate",
            "label": "Petition Issued Date",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantDetailsLabel",
            "label": "## Applicant’s Details",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantFMName",
            "label": "Current First and Middle names",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantLName",
            "label": "Current Last Name",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentDetailsLabel",
            "label": "## Respondent’s Details ##",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentFMName",
            "label": "Current First and Middle names",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentLName",
            "label": "Current Last Name",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentRepresentedLabel",
            "label": "## Is the respondent represented ? ##",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentRepresented",
            "label": "",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorLabel",
            "label": "## Respondent’s Solicitor’s Details",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorName",
            "label": "Solicitor’s name",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorFirm",
            "label": "Solicitor’s firm",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorReference",
            "label": "Respondent solicitor’s reference",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorAddressLabel",
            "label": "#### Respondent’s Solicitor’s Contact Details",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorAddress",
            "label": "",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorPhone",
            "label": "Phone Number",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorEmail",
            "label": "Email",
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rSolicitorDXnumber",
            "label": "DX number",
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
            "show_condition": "respondentRepresented=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "rRespondentLabel2",
            "label": "#### Respondent’s Contact details",
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
            "show_condition": "respondentRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentAddress",
            "label": "",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
                                "role": "caseworker-divorce-financialremedy-judiciary",
                                "create": false,
                                "read": true,
                                "update": false,
                                "delete": false
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-courtadmin",
                                "create": true,
                                "read": true,
                                "update": true,
                                "delete": true
                            },
                            {
                                "role": "caseworker-divorce-financialremedy-solicitor",
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
            "show_condition": "respondentRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentPhone",
            "label": "Phone Number",
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
            "show_condition": "respondentRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "respondentEmail",
            "label": "Email",
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": "respondentRepresented=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "natureOfApplicationLabel",
            "label": "#### What is the nature of the application ?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "natureOfApplicationChecklist",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Select all that apply",
            "field_type": {
                "id": "MultiSelectList-FR_ms_natureApplication",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "propertyAdjustmentOrder",
                        "label": "Property Adjustment Order",
                        "order": null
                    },
                    {
                        "code": "Pension Compensation Attachment Order",
                        "label": "Pension Compensation Attachment Order",
                        "order": null
                    },
                    {
                        "code": "Pension Compensation Sharing Order",
                        "label": "Pension Compensation Sharing Order",
                        "order": null
                    },
                    {
                        "code": "Pension Attachment Order",
                        "label": "Pension Attachment Order",
                        "order": null
                    },
                    {
                        "code": "Pension Sharing Order",
                        "label": "Pension Sharing Order",
                        "order": null
                    },
                    {
                        "code": "Lump Sum Order",
                        "label": "Lump Sum Order",
                        "order": null
                    },
                    {
                        "code": "periodicalPaymentOrder",
                        "label": "Periodical Payment Order",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "propertyAdjutmentOrderDetailLabel",
            "label": "## Property adjustment order details",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "propertyAddress",
            "label": "Property address",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "mortgageDetail",
            "label": "Name(s) and address(es) of any mortgage(s) for property",
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
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "additionalPropertyOrderLabel",
            "label": "## Do you want to add additional property ?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "additionalPropertyOrderDecision",
            "label": "",
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "propertyAdjutmentOrderDetail",
            "label": "Additional Property adjustment order details",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "propertyAdjutmentOrderDetail-da964869-0fa3-4ba8-80bd-77858d02e349",
                "type": "Collection",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": {
                    "id": "FR_PropertyAdjustmentOrder",
                    "type": "Complex",
                    "min": null,
                    "max": null,
                    "regular_expression": null,
                    "fixed_list_items": [],
                    "complex_fields": [
                        {
                            "id": "propertAddress",
                            "label": "Property address",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
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
                            "security_classification": "PUBLIC",
                            "live_from": null,
                            "live_until": null,
                            "show_condition": null,
                            "acls": [
                                {
                                    "role": "caseworker-divorce-financialremedy-judiciary",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-solicitor",
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
                            "id": "nameForProperty",
                            "label": "Name(s) and address(es) of any mortgage(s) for property",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
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
                            "security_classification": "PUBLIC",
                            "live_from": null,
                            "live_until": null,
                            "show_condition": null,
                            "acls": [
                                {
                                    "role": "caseworker-divorce-financialremedy-judiciary",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-solicitor",
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
                }
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "OPTIONAL",
            "display_context_parameter": "#COLLECTION(allowDelete,allowInsert)",
            "show_condition": "additionalPropertyOrderDecision=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "paymentForChildrenLabel",
            "label": "## Does the application contain any periodical payments or secured periodical payments for children ?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "paymentForChildrenDecision",
            "label": "",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "benefitForChildrenLabel",
            "label": "## Has a written agreement been made about maintenance for the benefit of children?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "benefitForChildrenDecision",
            "label": "",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "benefitPaymentChecklistLabel",
            "label": "## What payments are you applying for ?",
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
            "show_condition": "benefitForChildrenDecision=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "benefitPaymentChecklist",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_benefitPaymentChecklist",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "The child or the person with care of the child or the absent parent of the child is not habitually resident in the United Kingdom",
                        "label": "When either the child or the person with care of the child or the absent parent of the child is not habitually resident in the United Kingdom",
                        "order": null
                    },
                    {
                        "code": "To meet expenses incurred by a child being in educated or training for work",
                        "label": "To meet expenses incurred by a child in relation to being educated or training for work",
                        "order": null
                    },
                    {
                        "code": "To meet expenses arising from a child’s disability",
                        "label": "To meet expenses arising from a child’s disability",
                        "order": null
                    },
                    {
                        "code": "In addition to child support maintenance already paid under a Child Support Agency assessment",
                        "label": "In addition to child support or maintenance already paid under a Child Support Agency assessment",
                        "order": null
                    },
                    {
                        "code": "Step child or step children",
                        "label": "For a stepchild or step children",
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
            "show_condition": "benefitForChildrenDecision=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "fastTrackDecisionLabel",
            "label": "## Is the application suitable to be dealt with under the Fast Track Procedure?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "fastTrackDecision",
            "label": "",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "fastTrackDecisionReasonLabel",
            "label": "Select all that apply",
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
            "show_condition": "fastTrackDecision=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "fastTrackDecisionReason",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_fast_track_reason",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "reason_4",
                        "label": "The financial remedy sought is related to an order for financial provision during a marriage or civil partnership under the Domestic Proceedings and Magistrates’ Courts Act 1978 or Schedule 6 to the Civil Partnership Act 2004",
                        "order": null
                    },
                    {
                        "code": "reason_3",
                        "label": "The financial remedy sought is only for an order for periodical payments",
                        "order": null
                    },
                    {
                        "code": "reason_2",
                        "label": "The financial remedy sought is related to the recognition and enforcement of a foreign maintenance order under Article 56 of the Maintenance Regulation or Article 10 of the 2007 Hague Convention",
                        "order": null
                    },
                    {
                        "code": "reason_1",
                        "label": "The financial remedy sought is an application to vary a periodical payments order (but does not seek to dismiss the periodical payments order and substitute it with one or more of the following: a lump sum order, a property adjustment order, a pension sharing order or a pension compensation sharing order)",
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
            "show_condition": "fastTrackDecision=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "fastTrackMoreInfoContent1",
            "label": "> *The types of cases to which the fast track procedure applies are set out in rule 9.9B of the Family Procedure Rules 2010. This rule came into force on 4 June 2018.*\n\n> *The main differences from the standard track procedure are:*\n*\t*Cases allocated to the fast track will be listed 6-10 weeks in advance (as opposed to the standard 12-16 weeks)*\n*\t*Financial Statements must be exchanged by no later than 21 days after the date of issue of the application (as opposed to not less than 14 days before the first appointment hearing in the standard track)*\n*\t*Financial statements for fast track cases should be filed on Form E1 (rather than the standard Form E)*\n*\t*The process at the fast track first hearing will differ from the process at a standard track first appointment hearing*",
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
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "addToComplexityListOfCourtsLbl",
            "label": "## Should this application be allocated to the Complexity List of the Financial Remedies Court?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "addToComplexityListOfCourts",
            "label": "A complex case could be retained for hearing within the Financial Remedy Centre and/or allocated to a higher tier of Judiciary",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-FR_complexityList",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "trueDontKnow",
                        "label": "I Don't Know",
                        "order": null
                    },
                    {
                        "code": "falseNo",
                        "label": "No",
                        "order": null
                    },
                    {
                        "code": "trueYes",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "estimatedAssetsLabel",
            "label": "## Please state the current estimated assets in this case:",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "estimatedAssetsChecklist",
            "label": "Select all that apply",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_estimatedAssetsChecklist",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "estimatedAssetsChecklist_5",
                        "label": "Over £10 million",
                        "order": null
                    },
                    {
                        "code": "estimatedAssetsChecklist_4",
                        "label": "£5 - £10 million",
                        "order": null
                    },
                    {
                        "code": "estimatedAssetsChecklist_3",
                        "label": "£1 - £5 million",
                        "order": null
                    },
                    {
                        "code": "estimatedAssetsChecklist_2",
                        "label": "Under £1 million",
                        "order": null
                    },
                    {
                        "code": "estimatedAssetsChecklist_1",
                        "label": "Unable to quantify",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "netValueOfHomeLabel",
            "label": "## Of the above value, what is the net value of the family home?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "The net value is the value after deduction of the sum owing on any mortgage",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "netValueOfHome",
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
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": null,
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "potentialAllegationLabel",
            "label": "## Please tick any potential allegations/issues which may arise",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "potentialAllegationChecklist",
            "label": "Select all that apply",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_potentialAllegationChecklist",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "notApplicable",
                        "label": "Not applicable",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_14",
                        "label": "The case involves an insolvency issue",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_13",
                        "label": "There is likely to be a need for the involvement of Intervenors",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_12",
                        "label": "The application involves a complex or novel legal argument",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_11",
                        "label": "The case involves an application under Schedule 1 Children Act 1989",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_10",
                        "label": "There are/may be disputed allegations of “obvious and gross” conduct",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_9",
                        "label": "There may be substantial arguments about the parties’ respective contributions",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_8",
                        "label": "There may be substantial arguments about which assets are “matrimonial assets” or “non-matrimonial assets”",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_7",
                        "label": "There are substantial arguments concerning the illiquidity of assets",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_6",
                        "label": "Expert accountancy evidence will be required",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_5",
                        "label": "Non-disclosure of assets",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_4",
                        "label": "The value of family assets, trust and/or corporate entities",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_3",
                        "label": "Assets are / were held through the medium of trusts / settlements/ family/ unquoted corporate entities or otherwise held offshore or overseas",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_2",
                        "label": "Complex asset or income structures",
                        "order": null
                    },
                    {
                        "code": "potentialAllegationChecklist_1",
                        "label": "Pre- or post-nuptial agreements",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "detailPotentialAllegationLabel",
            "label": "## Please give brief details of the potential allegation/issue:",
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
            "show_condition": "potentialAllegationChecklistCONTAINS\"potential*\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "detailPotentialAllegation",
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
            "display_context": "MANDATORY",
            "display_context_parameter": null,
            "show_condition": "potentialAllegationChecklistCONTAINS\"potential*\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "otherReasonForComplexityLabel",
            "label": "## Is there any other reason why the case should be allocated to the Complexity List?",
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
            "show_condition": "potentialAllegationChecklistCONTAINS\"potential*\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "otherReasonForComplexity",
            "label": "",
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
            "show_condition": "potentialAllegationChecklistCONTAINS\"potential*\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "otherReasonForComplexityText",
            "label": "If yes – please specify",
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
            "show_condition": "potentialAllegationChecklistCONTAINS\"potential*\" AND otherReasonForComplexity=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "chooseCourtLabel",
            "label": "## Which Financial Remedies Court are you applying to?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "specialAssistanceRequiredLabel",
            "label": "#### Does anyone in this application need assistance or special facilities when attending court?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "specialAssistanceRequired",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "For example they need to use British Sign Language, a hearing loop or documents in braille",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "specificArrangementsRequiredLabel",
            "label": "#### Does anyone in this application need specific arrangements when attending court?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "specificArrangementsRequired",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "For example you need a separate waiting room to the other person, video link or protective screen due to safety concerns. The court may contact you to discuss your requirements.",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "isApplicantsHomeCourt",
            "label": "Is there a reason why the hearing should not take place here?",
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
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "reasonForLocalCourt",
            "label": "Please specify",
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
            "show_condition": "isApplicantsHomeCourt=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantAttendedMIAMLabel",
            "label": "## Has the applicant attended a Mediation information & Assessment Meeting (MIAM) in the past 4 months?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "applicantAttendedMIAM",
            "label": "",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "claimingExemptionMIAMLabel",
            "label": "## Is the applicant claiming exemption from the requirement to attend a MIAM ?",
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
            "show_condition": "applicantAttendedMIAM=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "claimingExemptionMIAM",
            "label": "",
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
            "show_condition": "applicantAttendedMIAM=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "familyMediatorMIAMLabel",
            "label": "## Has a family mediator informed the applicant that a mediator’s exemption applies, and they do not need to attend a MIAM ?",
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
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "familyMediatorMIAM",
            "label": "",
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
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMExemptionsLabel",
            "label": "## MIAM Exemptions : what is the reason(s) for the applicant not attending a MIAM?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMExemptionsSelectAll",
            "label": "Select all that apply",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMExemptionsChecklist",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_MIAMExemptionsChecklist",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "other",
                        "label": "Other",
                        "order": null
                    },
                    {
                        "code": "previousMIAMattendance",
                        "label": "Previous MIAM attendance or previous MIAM exemption ",
                        "order": null
                    },
                    {
                        "code": "urgency",
                        "label": "Urgency",
                        "order": null
                    },
                    {
                        "code": "domesticViolence",
                        "label": "Domestic violence ",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMDomesticViolenceLabel",
            "label": "## MIAM Evidence : What evidence of domestic violence or abuse does the applicant have ?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMDomesticViolenceSelectAll",
            "label": "Select all that apply",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMDomesticViolenceChecklist",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_MIAMDomesticViolenceChecklist",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_22",
                        "label": "Evidence which demonstrates that a prospective party has been, or is at risk of being, the victim of domestic violence by another prospective party in the form of abuse which relates to financial matters.",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_21",
                        "label": "A letter from the Secretary of State for the Home Department confirming that a prospective party has been granted leave to remain in the United Kingdom under paragraph 289B of the Rules made by the Home Secretary under section 3(2) of the Immigration Act 1971, which can be found at https://www. gov.uk/guidance/immigration-rules/immigration-rules-index;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_20",
                        "label": "A letter from a public authority confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party (or a copy of that assessment);",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_19",
                        "label": "A letter or report from an organisation providing domestic violence support services in the United Kingdom confirming- \n(i) that a person with whom a prospective party is or was in a family relationship was refused admission to a refuge; \n(ii) the date on which they were refused admission to the refuge; and \n(iii)they sought admission to the refuge because of allegations of domestic violence by the prospective party referred to in paragraph (i);",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_18",
                        "label": "A letter which- \n(i) is from an organisation providing domestic violence support services, or a registered charity, which letter confirms that it- \n(a) is situated in England and Wales, \n(b) has been operating for an uninterrupted period of six months or more; and \n(c) provided a prospective party with support in relation to that person’s needs as a victim, or a person at risk, of domestic violence; and \n(ii) contains- \n(a) a statement to the effect that, in the reasonable professional judgment of the author of the letter, the prospective party is, or is at risk of being, a victim of domestic violence; \n(b) a description of the specific matters relied upon to support that judgment; \n(c) a description of the support provided to the prospective party; and \n(d) a statement of the reasons why the prospective party needed that support;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_17",
                        "label": "A letter from an officer employed by a local authority or housing association (or their equivalent in Scotland or Northern Ireland) for the purpose of supporting tenants containing- \n(i)  a statement to the effect that, in their reasonable professional judgment, a person with whom a prospective party is or has been in a family relationship is, or is at risk of being, a victim of domestic violence by that prospective party; (ii)  a description of the specific matters relied upon to support that judgment; and (iii) a description of the support they provided to the victim of domestic violence or the person at risk of domestic violence by that prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_16",
                        "label": "A letter from an independent sexual violence advisor confirming that they are providing support to a prospective party relating to sexual violence by another prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_15",
                        "label": "A letter from an independent domestic violence advisor confirming that they are providing support to a prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_13",
                        "label": "A letter from any person who is a member of a multi-agency risk assessment conference (or other suitable local safeguarding forum) confirming that a prospective party, or a person with whom that prospective party is in a family relationship, is or has been at risk of harm from domestic violence by another prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_12",
                        "label": "A letter or report from- \n(i) the appropriate health professional who made the referral described below; \n(ii) an appropriate health professional who has access to the medical records of the prospective party referred to below; or \n(iii) the person to whom the referral described below was made; \nconfirming that there was a referral by an appropriate health professional of a prospective party to a person who provides specialist support or assistance for victims of, or those at risk of, domestic violence;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_11",
                        "label": "A letter or report from an appropriate health professional confirming that- \n(i)  that professional,or another appropriate health professional, has examined a prospective party in person; and (ii)  in the reasonable professional judgment of the author or the examining appropriate health professional, that prospective party has, or has had, injuries or a condition consistent with being a victim of domestic violence;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_10",
                        "label": "An expert report produced as evidence in proceedings in the United Kingdom for the benefit of a court or tribunal confirming that a person with whom a prospective party is or was in a family relationship, was assessed as being, or at risk of being, a victim of domestic violence by that prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_9",
                        "label": "A copy of a finding of fact, made in proceedings in the United Kingdom, that there has been domestic violence by a prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_8",
                        "label": "An undertaking given in England and Wales under section 46 or 63E of the Family Law Act 1996 (or given in Scotland or Northern Ireland in place of a protective injunction) by a prospective party, provided that a cross- undertaking relating to domestic violence was not given by another prospective party;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_7",
                        "label": "A relevant protective injunction;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_6",
                        "label": "A domestic violence protection notice issued under section 24 of the Crime and Security Act 2010 against a prospective party; ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_5",
                        "label": "A court order binding a prospective party over in connection with a domestic violence offence; ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_4",
                        "label": "Evidence of a relevant conviction for a domestic violence offence;",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_3",
                        "label": "Evidence of relevant criminal proceedings for a domestic violence offence which have not concluded; ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_2",
                        "label": "Evidence of a relevant police caution for a domestic violence offence; ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMDomesticViolenceChecklist_Value_1",
                        "label": "Evidence that a prospective party has been arrested for a relevant domestic violence offence; ",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMUrgencyReasonLabel",
            "label": "## MIAM Evidence: what reason does the applicant have for the application to be made urgently?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMUrgencyReasonSelectAll",
            "label": "Select all that apply",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMUrgencyReasonChecklist",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-FR_ms_MIAMUrgencyReasonChecklist",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_ms_MIAMUrgencyReasonChecklist_Value_5",
                        "label": "There  is a significant risk that in the period necessary to schedule and attend a MIAM, proceedings relating to the dispute will be brought in another state in which a valid claim to jurisdiction may exist, such that a court in that other State would be seized of the dispute before a court in England and Wales.",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMUrgencyReasonChecklist_Value_4",
                        "label": "Any delay caused by MIAM would cause irretrievable problems in dealing with the dispute (including the irretrievable loss of significant evidence)",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMUrgencyReasonChecklist_Value_3",
                        "label": "Any delay caused by MIAM would cause unreasonable hardship to the prospective applicant",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMUrgencyReasonChecklist_Value_2",
                        "label": "Any delay caused by MIAM would cause significant risk of a miscarriage of justice",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMUrgencyReasonChecklist_Value_1",
                        "label": "There is risk to the life, liberty or physical safety of the prospective applicant or his or her family or his or her home; or",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMPreviousAttendanceLabel",
            "label": "## MIAM Evidence : Previous MIAM attendance or MIAM exemption",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMPreviousAttendanceChecklist",
            "label": "Select one",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-FR_ms_MIAMPreviousAttendanceChecklist",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_ms_MIAMPreviousAttendanceChecklist_Value_5",
                        "label": "The application would be made in existing proceedings which are continuing and a MIAM exemption applied to the application for those proceedings",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMPreviousAttendanceChecklist_Value_4",
                        "label": "The application would be made in existing proceedings which are continuing and the prospective applicant attended a MIAM before initiating those proceedings",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMPreviousAttendanceChecklist_Value_3",
                        "label": "In the 4 months prior to making the application, the person filed a relevant family application confirming that a MIAM exemption applied and that application related to the same or substantially the same dispute",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMPreviousAttendanceChecklist_Value_2",
                        "label": "At the time of making the application, the person is participating in another form of non-court dispute resolution relating to the same or substantially the same dispute",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMPreviousAttendanceChecklist_Value_1",
                        "label": "In the 4 months prior to making the application, the person attended a MIAM or participated in another form of non-court dispute resolution relating to the same or substantially the same dispute",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMOtherGroundsLabel",
            "label": "## MIAM Evidence : What other grounds of exemption apply?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMOtherGroundsChecklist",
            "label": "Select one",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedRadioList-FR_ms_MIAMOtherGroundsChecklist",
                "type": "FixedRadioList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_11",
                        "label": "There is no authorised family mediator with an office within fifteen miles of the prospective applicant’s home. ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_10",
                        "label": "(i) the prospective applicant has contacted as many authorised family mediators as have an office within fifteen miles of his or her home (or three of them if there are three or more), and all of them have stated that they are not available to conduct a MIAM within fifteen business days of the date\nof contact; and (ii) the names, postal addresses and telephone numbers\nor e-mail addresses for such authorised family mediators, and the dates of contact, can be provided to the court if requested.",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_9",
                        "label": "A child is one of the prospective parties by virtue of Rule 12.3(1). ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_8",
                        "label": "The prospective applicant or all of the prospective respondents are not habitually resident in England and Wales. ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_7",
                        "label": "the prospective applicant or all of the prospective respondents cannot attend a MIAM because he or she is, or they are, as the case may be (i) in prison or any other institution in which he or she is or they are required to be detained; (ii) subject to conditions of bail that prevent contact with the other person; or (iii) subject to a licence with a prohibited contact requirement in relation to the other person.",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_6",
                        "label": "(i) the prospective applicant is or all of the prospective respondents are subject to a disability or other inability that would prevent attendance at a MIAM unless appropriate facilities can be offered by an authorised mediator; (ii) the prospective applicant has contacted as many authorised family mediators as have an office within fifteen miles of his or her home (or three of them if there are three or more), and all have stated that they are unable to provide such facilities; and (iii)the names, postal addresses and telephone numbers or e-mail addresses for such authorised family mediators, and the dates of contact, can be provided to the court if requested.",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_5",
                        "label": "The application would be made without notice (Paragraph 5.1 of Practice Direction 18A sets out the circumstances in which applications may be made without notice.) ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_4",
                        "label": "The prospective applicant does not have sufficient contact details for any of the prospective respondents to enable a family mediator to contact any of the prospective respondents for the purpose of scheduling the MIAM. ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_3",
                        "label": "The applicant is bankrupt evidenced by a bankruptcy order in respect of the prospective applicant. ",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_2",
                        "label": "The applicant is bankrupt evidenced by a petition by a creditor of the prospective applicant for a bankruptcy order",
                        "order": null
                    },
                    {
                        "code": "FR_ms_MIAMOtherGroundsChecklist_Value_1",
                        "label": "The applicant is bankrupt evidenced by an application by the prospective applicant for a bankruptcy order;",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMCertificationPageLabel",
            "label": "## Enter details of MIAM certification",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "mediatorRegistrationNumber",
            "label": "Mediator Registration Number (URN)",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "familyMediatorServiceName",
            "label": "Family Mediation Service Name",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "soleTraderName",
            "label": "Sole Trader Name",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMCertificationPageMessage",
            "label": "**You should have a document signed by the mediator confirming this (which you should bring to your first hearing)**",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMCertificationPageLabel1",
            "label": "## Enter details of MIAM certification",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "mediatorRegistrationNumber1",
            "label": "Mediator Registration Number (URN)",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "familyMediatorServiceName1",
            "label": "Family Mediation Service Name",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "soleTraderName1",
            "label": "Sole Trader Name",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "MIAMCertificationPageMessage1",
            "label": "**You should have a document signed by the mediator confirming this (which you should bring to your first hearing)**",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "promptForAnyDocumentLabel",
            "label": "## Do you want to upload any other documents ?",
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
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "promptForAnyDocument",
            "label": "",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "uploadOtherDocumentLabel",
            "label": "## Upload other documents",
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
            "show_condition": "promptForAnyDocument=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "uploadAdditionalDocument",
            "label": "",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "uploadAdditionalDocument-e28d6f4e-9068-49fb-a7bb-84f3497fcbe7",
                "type": "Collection",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": {
                    "id": "FR_uploadAdditionalDocument",
                    "type": "Complex",
                    "min": null,
                    "max": null,
                    "regular_expression": null,
                    "fixed_list_items": [],
                    "complex_fields": [
                        {
                            "id": "additionalDocuments",
                            "label": "Please upload any additional documents related to you application",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
                            "hint_text": null,
                            "field_type": {
                                "id": "Document",
                                "type": "Document",
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
                                {
                                    "role": "caseworker-divorce-financialremedy-judiciary",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-solicitor",
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
                            "id": "additionalDocumentType",
                            "label": "Document type",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
                            "hint_text": null,
                            "field_type": {
                                "id": "FixedList-FR_s_documentType",
                                "type": "FixedList",
                                "min": null,
                                "max": null,
                                "regular_expression": null,
                                "fixed_list_items": [
                                    {
                                        "code": "other",
                                        "label": "Other",
                                        "order": null
                                    },
                                    {
                                        "code": "noticeOfActing",
                                        "label": "Notice of acting",
                                        "order": null
                                    },
                                    {
                                        "code": "letter",
                                        "label": "Letter",
                                        "order": null
                                    },
                                    {
                                        "code": "scheduleOfAssets",
                                        "label": "Schedule of assets",
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
                                    "role": "caseworker-divorce-financialremedy-judiciary",
                                    "create": false,
                                    "read": true,
                                    "update": false,
                                    "delete": false
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-financialremedy-solicitor",
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
                }
            },
            "validation_expr": null,
            "security_label": "PUBLIC",
            "order": null,
            "formatted_value": null,
            "display_context": "MANDATORY",
            "display_context_parameter": "#COLLECTION(allowDelete,allowInsert)",
            "show_condition": "promptForAnyDocument=\"Yes\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "beforeSavePreConfirmation",
            "label": "# Saving your application\nOnce you have pressed ‘continue’ at the bottom of this page, you will have the opportunity to check your application and make any necessary amendments.\n\nTo save a copy of the application, please press the ‘submit’ button at the bottom of the page.\n\n# What happens next\nOnce you have saved a copy of your application, you will be directed to the case file. Here you can use the ‘Next Steps’ options on the top right of the file to administer the case.\n\nYou will have the option to:\n* Update the application\n* Authorise, pay for and submit the application\n\nPlease note, your application will not be sent to the Court and your payment will not be taken until you authorise, pay for and submit the application.\n\n# If you need help \nYou can contact the court if you need help. \n************************************************************\nCourts and Tribunals Service Centre\nPO Box 12746, Harlow, CM20 9QZ\n<br/>Email: ContactFinancialRemedy@justice.gov.uk",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": false,
                    "read": true,
                    "update": false,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "regionList",
            "label": "Please choose the Region in which the Applicant resides",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedList-FR_region_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "wales",
                        "label": "Wales",
                        "order": null
                    },
                    {
                        "code": "southeast",
                        "label": "South East",
                        "order": null
                    },
                    {
                        "code": "northeast",
                        "label": "North East",
                        "order": null
                    },
                    {
                        "code": "northwest",
                        "label": "North West",
                        "order": null
                    },
                    {
                        "code": "london",
                        "label": "London",
                        "order": null
                    },
                    {
                        "code": "midlands",
                        "label": "Midlands",
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
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "midlandsFRCList",
            "label": "Please choose the FRC which covers the area within which the Applicant resides - if the applicant does not reside within one of these areas, you will not yet be able to submit your application online.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "This should be the FRC local to the applicant",
            "field_type": {
                "id": "FixedList-FR_midlands_FRCList",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "birmingham",
                        "label": "Birmingham FRC",
                        "order": null
                    },
                    {
                        "code": "nottingham",
                        "label": "Nottingham FRC",
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
            "show_condition": "regionList=\"midlands\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "londonFRCList",
            "label": "Please choose the FRC which covers the area within which the Applicant resides - if the applicant does not reside within one of these areas, you will not yet be able to submit your application online.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "This should be the FRC local to the applicant",
            "field_type": {
                "id": "FixedList-FR_london_FRCList",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "cfc",
                        "label": "London FRC",
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
            "show_condition": "regionList=\"london\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "northWestFRCList",
            "label": "Please choose the FRC which covers the area within which the Applicant resides - if the applicant does not reside within one of these areas, you will not yet be able to submit your application online.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "This should be the FRC local to the applicant",
            "field_type": {
                "id": "FixedList-FR_nw_frc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "manchester",
                        "label": "Manchester FRC",
                        "order": null
                    },
                    {
                        "code": "liverpool",
                        "label": "Liverpool FRC",
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
            "show_condition": "regionList=\"northwest\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "northEastFRCList",
            "label": "Please choose the FRC which covers the area within which the Applicant resides - if the applicant does not reside within one of these areas, you will not yet be able to submit your application online.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "This should be the FRC local to the applicant",
            "field_type": {
                "id": "FixedList-FR_ne_frc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "hsyorkshire",
                        "label": "Humber and South Yorkshire FRC",
                        "order": null
                    },
                    {
                        "code": "nwyorkshire",
                        "label": "North and West Yorkshire FRC",
                        "order": null
                    },
                    {
                        "code": "cleaveland",
                        "label": "Cleveland Durham and Northumbria FRC",
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
            "show_condition": "regionList=\"northeast\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "southEastFRCList",
            "label": "Please choose the FRC which covers the area within which the Applicant resides - if the applicant does not reside within one of these areas, you will not yet be able to submit your application online.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "This should be the FRC local to the applicant",
            "field_type": {
                "id": "FixedList-FR_se_frc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "kentfrc",
                        "label": "Kent, Surrey and Sussex FRC",
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
            "show_condition": "regionList=\"southeast\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "walesFRCList",
            "label": "Please choose the FRC which covers the area within which the Applicant resides - if the applicant does not reside within one of these areas, you will not yet be able to submit your application online.",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "This should be the FRC local to the applicant",
            "field_type": {
                "id": "FixedList-FR_wales_frc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "swansea",
                        "label": "Swansea FRC",
                        "order": null
                    },
                    {
                        "code": "newport",
                        "label": "Newport FRC",
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
            "show_condition": "regionList=\"wales\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "nottinghamCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_s_NottinghamList",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_s_NottinghamList_8",
                        "label": "BOSTON COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_7",
                        "label": "MANSFIELD MAGISTRATES AND COUNTY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_6",
                        "label": "CHESTERFIELD COUNTY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_5",
                        "label": "NORTHAMPTON CROWN, COUNTY AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_4",
                        "label": "LINCOLN COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_3",
                        "label": "LEICESTER COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_2",
                        "label": "DERBY COMBINED COURT CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_s_NottinghamList_1",
                        "label": "NOTTINGHAM COUNTY COURT AND FAMILY COURT",
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
            "show_condition": "regionList=\"midlands\" AND midlandsFRCList=\"nottingham\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "cfcCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_s_CFCList",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_s_CFCList_16",
                        "label": "WILLESDEN COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_14",
                        "label": "UXBRIDGE COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_11",
                        "label": "EAST LONDON FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_9",
                        "label": "CENTRAL FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_8",
                        "label": "BRENTFORD COUNTY AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_6",
                        "label": "BARNET CIVIL AND FAMILY COURTS CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_5",
                        "label": "ROMFORD COUNTY AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_4",
                        "label": "KINGSTON-UPON-THAMES COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_3",
                        "label": "EDMONTON COOUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_2",
                        "label": "CROYDON COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_s_CFCList_1",
                        "label": "BROMLEY COUNTY COURT AND FAMILY COURT",
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
            "show_condition": "regionList=\"london\" AND londonFRCList=\"cfc\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "birminghamCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_birmingham_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_birmingham_hc_list_10",
                        "label": "HEREFORD COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_9",
                        "label": "STAFFORD COMBINED COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_8",
                        "label": "WORCESTER COMBINED COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_7",
                        "label": "STOKE ON TRENT COMBINED COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_6",
                        "label": "WALSALL COUNTY AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_5",
                        "label": "DUDLEY COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_4",
                        "label": "WOLVERHAMPTON COMBINED COURT CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_3",
                        "label": "TELFORD COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_2",
                        "label": "COVENTRY COMBINED COURT CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_birmingham_hc_list_1",
                        "label": "BIRMINGHAM CIVIL AND FAMILY JUSTICE CENTRE",
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
            "show_condition": "regionList=\"midlands\" AND midlandsFRCList=\"birmingham\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "liverpoolCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_liverpool_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_liverpool_hc_list_5",
                        "label": "BIRKENHEAD COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_liverpool_hc_list_4",
                        "label": "ST. HELENS COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_liverpool_hc_list_3",
                        "label": "CREWE COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_liverpool_hc_list_2",
                        "label": "CHESTER CIVIL AND FAMILY JUSTICE CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_liverpool_hc_list_1",
                        "label": "LIVERPOOL CIVIL AND FAMILY COURT",
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
            "show_condition": "regionList=\"northwest\" AND northWestFRCList=\"liverpool\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "manchesterCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_manchester_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_manchester_hc_list_3",
                        "label": "WIGAN COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_manchester_hc_list_2",
                        "label": "STOCKPORT COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_manchester_hc_list_1",
                        "label": "MANCHESTER COUNTY AND FAMILY COURT",
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
            "show_condition": "regionList=\"northwest\" AND northWestFRCList=\"manchester\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "cleavelandCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_cleaveland_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_cleaveland_hc_list_8",
                        "label": "Darlington County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_7",
                        "label": "North Shields County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_6",
                        "label": "South Shields County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_5",
                        "label": "Gateshead County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_4",
                        "label": "Middlesbrough County Court at Teesside Combined Court",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_3",
                        "label": "SUNDERLAND COUNTY AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_2",
                        "label": "DURHAM JUSTICE CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_cleaveland_hc_list_1",
                        "label": "NEWCASTLE UPON TYNE JUSTICE CENTRE",
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
            "show_condition": "regionList=\"northeast\" AND northEastFRCList=\"cleaveland\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "nwyorkshireCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_nw_yorkshire_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_nw_yorkshire_hc_list_8",
                        "label": "Leeds Combined Court Centre",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_7",
                        "label": "Skipton County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_6",
                        "label": "Scarborough Justice Centre",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_5",
                        "label": "York County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_4",
                        "label": "Wakefield Civil and Family Justice Centre",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_3",
                        "label": "Huddersfield County Court and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_2",
                        "label": "Bradford Combined Court Centre",
                        "order": null
                    },
                    {
                        "code": "FR_nw_yorkshire_hc_list_1",
                        "label": "Harrogate Justice Centre",
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
            "show_condition": "regionList=\"northeast\" AND northEastFRCList=\"nwyorkshire\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "humberCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_humber_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_humber_hc_list_5",
                        "label": "Barnsley Law Courts",
                        "order": null
                    },
                    {
                        "code": "FR_humber_hc_list_4",
                        "label": "Great Grimsby Combined Court Centre",
                        "order": null
                    },
                    {
                        "code": "FR_humber_hc_list_3",
                        "label": "Doncaster Justice Centre North",
                        "order": null
                    },
                    {
                        "code": "FR_humber_hc_list_2",
                        "label": "Kingston-upon-Hull Combined Court Centre",
                        "order": null
                    },
                    {
                        "code": "FR_humber_hc_list_1",
                        "label": "Sheffield Family Hearing Centre",
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
            "show_condition": "regionList=\"northeast\" AND northEastFRCList=\"hsyorkshire\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "kentSurreyCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_kent_surrey_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_kent_surrey_hc_list_10",
                        "label": "HORSHAM COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_9",
                        "label": "HASTINGS COUNTY COURT AND FAMILY COURT HEARING CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_8",
                        "label": "WORTHING COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_7",
                        "label": "BRIGHTON COUNTY AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_6",
                        "label": "STAINES COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_5",
                        "label": "GUILDFORD COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_4",
                        "label": "MEDWAY COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_3",
                        "label": "DARTFORD COUNTY COURT AND FAMILY COURT",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_2",
                        "label": "MAIDSTONE COMBINED COURT CENTRE",
                        "order": null
                    },
                    {
                        "code": "FR_kent_surrey_hc_list_1",
                        "label": "CANTERBURY FAMILY COURT HEARING CENTRE",
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
            "show_condition": "regionList=\"southeast\" AND southEastFRCList=\"kentfrc\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "newportCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_newport_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_newport_hc_list_5",
                        "label": "Blackwood Civil and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_newport_hc_list_4",
                        "label": "Pontypridd County and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_newport_hc_list_3",
                        "label": "Merthyr Tydfil Combined Court Centre",
                        "order": null
                    },
                    {
                        "code": "FR_newport_hc_list_2",
                        "label": "Cardiff Civil & Family Justice Centre",
                        "order": null
                    },
                    {
                        "code": "FR_newport_hc_list_1",
                        "label": "Newport Civil and Family Court",
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
            "show_condition": "regionList=\"wales\" AND walesFRCList=\"newport\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "swanseaCourtList",
            "label": "Where is the Applicant’s Local Court?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
            "field_type": {
                "id": "FixedList-FR_swansea_hc_list",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "FR_swansea_hc_list_6",
                        "label": "Port Talbot Justice Centre",
                        "order": null
                    },
                    {
                        "code": "FR_swansea_hc_list_5",
                        "label": "Llanelli Law Courts",
                        "order": null
                    },
                    {
                        "code": "FR_swansea_hc_list_4",
                        "label": "Carmarthen County and Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_swansea_hc_list_3",
                        "label": "Haverfordwest County & Family Court",
                        "order": null
                    },
                    {
                        "code": "FR_swansea_hc_list_2",
                        "label": "Aberystwyth Justice Centre",
                        "order": null
                    },
                    {
                        "code": "FR_swansea_hc_list_1",
                        "label": "Swansea Civil & Family Justice Centre",
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
            "show_condition": "regionList=\"wales\" AND walesFRCList=\"swansea\"",
            "show_summary_change_option": true,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-financialremedy-judiciary",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-financialremedy-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJpcTlxNWs5NW85cWllNTk5NnU1MmEyNGhqYiIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NzA2NSwiZXZlbnQtaWQiOiJGUl9zb2xpY2l0b3JDcmVhdGUiLCJjYXNlLXR5cGUtaWQiOiJGaW5hbmNpYWxSZW1lZHlDb250ZXN0ZWQiLCJqdXJpc2RpY3Rpb24taWQiOiJESVZPUkNFIiwiY2FzZS12ZXJzaW9uIjoiYmYyMWE5ZThmYmM1YTM4NDZmYjA1YjRmYTA4NTllMDkxN2IyMjAyZiJ9.QXtddQWsWbl8H8tKvM-SViK-E9JrFeU6bS0wlt5eJ0o",
    "wizard_pages": [
        {
            "id": "FR_solicitorCreate1",
            "label": null,
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "beforeYouStart",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "beforeYouStartPara1",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "beforeYouStartPara2",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "isAdmin",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/contested/set-defaults",
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate2",
            "label": null,
            "order": 2,
            "wizard_page_fields": [
                {
                    "case_field_id": "applicantRepresentedLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantRepresented",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantContactLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantAddress",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantPhone",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantEmail",
                    "order": 7,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorDetailLabel",
                    "order": 8,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorName",
                    "order": 9,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorFirm",
                    "order": 10,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "solicitorReference",
                    "order": 11,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorAddressLabel",
                    "order": 12,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorAddress",
                    "order": 13,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorPhone",
                    "order": 14,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorEmail",
                    "order": 15,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorDXnumber",
                    "order": 16,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantSolicitorConsentForEmails",
                    "order": 17,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate3",
            "label": null,
            "order": 3,
            "wizard_page_fields": [
                {
                    "case_field_id": "divorceDetailsLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceCaseNumber",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "dateOfMarriage",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "dateOfSepration",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "nameOfCourtDivorceCentre",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceStageReached",
                    "order": 7,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceUploadEvidence1",
                    "order": 8,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceDecreeNisiDate",
                    "order": 9,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceUploadEvidence2",
                    "order": 10,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceDecreeAbsoluteDate",
                    "order": 11,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorceUploadPetition",
                    "order": 12,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "divorcePetitionIssuedDate",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate4",
            "label": null,
            "order": 4,
            "wizard_page_fields": [
                {
                    "case_field_id": "applicantDetailsLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantFMName",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantLName",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate5",
            "label": null,
            "order": 5,
            "wizard_page_fields": [
                {
                    "case_field_id": "respondentDetailsLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "respondentFMName",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "respondentLName",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate6",
            "label": null,
            "order": 6,
            "wizard_page_fields": [
                {
                    "case_field_id": "respondentRepresentedLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "respondentRepresented",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorName",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorFirm",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorReference",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorAddressLabel",
                    "order": 7,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorAddress",
                    "order": 8,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorPhone",
                    "order": 9,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorEmail",
                    "order": 10,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rSolicitorDXnumber",
                    "order": 11,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "rRespondentLabel2",
                    "order": 12,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "respondentAddress",
                    "order": 13,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "respondentPhone",
                    "order": 14,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "respondentEmail",
                    "order": 15,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate7",
            "label": null,
            "order": 7,
            "wizard_page_fields": [
                {
                    "case_field_id": "natureOfApplicationLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "natureOfApplicationChecklist",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate8",
            "label": null,
            "order": 8,
            "wizard_page_fields": [
                {
                    "case_field_id": "propertyAdjutmentOrderDetailLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "propertyAddress",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "mortgageDetail",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "additionalPropertyOrderLabel",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "additionalPropertyOrderDecision",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "propertyAdjutmentOrderDetail",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "natureOfApplicationChecklistCONTAINS\"propertyAdjustmentOrder\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate9",
            "label": null,
            "order": 9,
            "wizard_page_fields": [
                {
                    "case_field_id": "paymentForChildrenLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "paymentForChildrenDecision",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "natureOfApplicationChecklistCONTAINS\"periodicalPaymentOrder\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate10",
            "label": null,
            "order": 10,
            "wizard_page_fields": [
                {
                    "case_field_id": "benefitForChildrenLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "benefitForChildrenDecision",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "benefitPaymentChecklistLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "benefitPaymentChecklist",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "natureOfApplicationChecklistCONTAINS\"periodicalPaymentOrder\" AND paymentForChildrenDecision=\"Yes\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate11",
            "label": null,
            "order": 11,
            "wizard_page_fields": [
                {
                    "case_field_id": "fastTrackDecisionLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "fastTrackDecision",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "fastTrackDecisionReasonLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "fastTrackDecisionReason",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "fastTrackMoreInfoContent1",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate12",
            "label": null,
            "order": 12,
            "wizard_page_fields": [
                {
                    "case_field_id": "addToComplexityListOfCourtsLbl",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "addToComplexityListOfCourts",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "estimatedAssetsLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "estimatedAssetsChecklist",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "netValueOfHomeLabel",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "netValueOfHome",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "potentialAllegationLabel",
                    "order": 7,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "potentialAllegationChecklist",
                    "order": 8,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "detailPotentialAllegationLabel",
                    "order": 9,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "detailPotentialAllegation",
                    "order": 10,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "otherReasonForComplexityLabel",
                    "order": 11,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "otherReasonForComplexity",
                    "order": 12,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "otherReasonForComplexityText",
                    "order": 13,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate13",
            "label": null,
            "order": 13,
            "wizard_page_fields": [
                {
                    "case_field_id": "chooseCourtLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "specialAssistanceRequiredLabel",
                    "order": 20,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "specialAssistanceRequired",
                    "order": 21,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "specificArrangementsRequiredLabel",
                    "order": 22,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "specificArrangementsRequired",
                    "order": 23,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "isApplicantsHomeCourt",
                    "order": 24,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "reasonForLocalCourt",
                    "order": 25,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "regionList",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "midlandsFRCList",
                    "order": 8,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "londonFRCList",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "northWestFRCList",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "northEastFRCList",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "southEastFRCList",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "walesFRCList",
                    "order": 7,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "nottinghamCourtList",
                    "order": 9,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "cfcCourtList",
                    "order": 10,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "birminghamCourtList",
                    "order": 11,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "liverpoolCourtList",
                    "order": 12,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "manchesterCourtList",
                    "order": 13,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "cleavelandCourtList",
                    "order": 14,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "nwyorkshireCourtList",
                    "order": 15,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "humberCourtList",
                    "order": 16,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "kentSurreyCourtList",
                    "order": 17,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "newportCourtList",
                    "order": 18,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "swanseaCourtList",
                    "order": 19,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate15",
            "label": null,
            "order": 15,
            "wizard_page_fields": [
                {
                    "case_field_id": "applicantAttendedMIAMLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "applicantAttendedMIAM",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "claimingExemptionMIAMLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "claimingExemptionMIAM",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "familyMediatorMIAMLabel",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "familyMediatorMIAM",
                    "order": 6,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/miam-attend-exempt-check",
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate16",
            "label": null,
            "order": 16,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMExemptionsLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMExemptionsSelectAll",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMExemptionsChecklist",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\" AND familyMediatorMIAM=\"No\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate17",
            "label": null,
            "order": 17,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMDomesticViolenceLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMDomesticViolenceSelectAll",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMDomesticViolenceChecklist",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\" AND familyMediatorMIAM=\"No\" AND MIAMExemptionsChecklistCONTAINS\"domesticViolence\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate18",
            "label": null,
            "order": 18,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMUrgencyReasonLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMUrgencyReasonSelectAll",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMUrgencyReasonChecklist",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\" AND familyMediatorMIAM=\"No\" AND MIAMExemptionsChecklistCONTAINS\"urgency\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate19",
            "label": null,
            "order": 19,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMPreviousAttendanceLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMPreviousAttendanceChecklist",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\" AND familyMediatorMIAM=\"No\" AND MIAMExemptionsChecklistCONTAINS\"previousMIAMattendance\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate20",
            "label": null,
            "order": 20,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMOtherGroundsLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMOtherGroundsChecklist",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\" AND familyMediatorMIAM=\"No\" AND MIAMExemptionsChecklistCONTAINS\"other\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate21",
            "label": null,
            "order": 21,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMCertificationPageLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "mediatorRegistrationNumber",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "familyMediatorServiceName",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "soleTraderName",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMCertificationPageMessage",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "applicantAttendedMIAM=\"Yes\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate22",
            "label": null,
            "order": 22,
            "wizard_page_fields": [
                {
                    "case_field_id": "MIAMCertificationPageLabel1",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "mediatorRegistrationNumber1",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "familyMediatorServiceName1",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "soleTraderName1",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "MIAMCertificationPageMessage1",
                    "order": 5,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "claimingExemptionMIAM=\"Yes\" AND applicantAttendedMIAM=\"No\" AND familyMediatorMIAM=\"Yes\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate23",
            "label": null,
            "order": 23,
            "wizard_page_fields": [
                {
                    "case_field_id": "promptForAnyDocumentLabel",
                    "order": 1,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "promptForAnyDocument",
                    "order": 2,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "uploadOtherDocumentLabel",
                    "order": 3,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "uploadAdditionalDocument",
                    "order": 4,
                    "page_column_no": 1,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "FR_solicitorCreate24",
            "label": null,
            "order": 24,
            "wizard_page_fields": [
                {
                    "case_field_id": "beforeSavePreConfirmation",
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
