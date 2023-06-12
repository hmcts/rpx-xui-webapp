module.exports = {
    "id": "solicitorCreate",
    "name": "Apply for a divorce",
    "description": "Apply for a divorce",
    "case_id": null,
    "case_fields": [
        {
            "id": "D8DivorceWho",
            "label": "Who is petitioner divorcing?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Husband or Wife?",
            "field_type": {
                "id": "FixedList-whoDivorcingEnum",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "wife",
                        "label": "Wife",
                        "order": null
                    },
                    {
                        "code": "husband",
                        "label": "Husband",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MarriageIsSameSexCouple",
            "label": "Were the petitioner and the respondent a same-sex couple when they got married?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8InferredPetitionerGender",
            "label": "What is the petitioner's gender?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "The petitioner’s gender is collected for statistical purposes only.",
            "field_type": {
                "id": "FixedList-gender",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "notGiven",
                        "label": "Not given",
                        "order": null
                    },
                    {
                        "code": "female",
                        "label": "Female",
                        "order": null
                    },
                    {
                        "code": "male",
                        "label": "Male",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8InferredRespondentGender",
            "label": "What is the respondent's gender?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "The respondent’s gender is collected for statistical purposes only.",
            "field_type": {
                "id": "FixedList-gender",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "notGiven",
                        "label": "Not given",
                        "order": null
                    },
                    {
                        "code": "female",
                        "label": "Female",
                        "order": null
                    },
                    {
                        "code": "male",
                        "label": "Male",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MarriageDate",
            "label": "Marriage date",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MarriedInUk",
            "label": "Did the marriage take place in the UK?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MarriagePlaceOfMarriage",
            "label": "Place of marriage",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Enter the place of marriage as it appears on the marriage certificate",
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
            "show_condition": "D8MarriedInUk=\"No\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8CountryName",
            "label": "Country of marriage",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Enter the country in which the marriage took place",
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
            "show_condition": "D8MarriedInUk=\"No\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MarriagePetitionerName",
            "label": "Petitioner's full name as on marriage certificate",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Enter the petitioner's name exactly as it appears on the marriage certificate. Include any extra text such as \"formerly known as\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MarriageRespondentName",
            "label": "Respondent's full name as on marriage certificate",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Enter the respondent's name exactly as it appears on the marriage certificate. Include any extra text such as \"formerly known as\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerNameDifferentToMarriageCert",
            "label": "Has the petitioner changed their name since they got married?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Is the petitioner’s current name different to their married name or the name shown on their marriage certificate?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerEmail",
            "label": "Petitioner's email address",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerPhoneNumber",
            "label": "Petitioner's phone number",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "D8PetitionerPhoneNumber-f25da204-a5a5-43bf-abca-7f7bbee273b0",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": "^[0-9 +().-]{9,}$",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerFirstName",
            "label": "First name(s)",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Include all middle names here",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerLastName",
            "label": "Last name",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerNameChangedHow",
            "label": "How did the petitioner change their name?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-changedNameHowEnum",
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
                        "code": "deedPoll",
                        "label": "Deed poll",
                        "order": null
                    },
                    {
                        "code": "marriageCertificate",
                        "label": "Marriage certificate",
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
            "show_condition": "D8PetitionerNameDifferentToMarriageCert=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerNameChangedHowOtherDetails",
            "label": "Provide details of how they changed their name",
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
            "show_condition": "D8PetitionerNameChangedHow=\"other\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PetitionerContactDetailsConfidential",
            "label": "Keep the petitioner's contact details private from the respondent?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "FixedList-confidentialAddressEnum",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "keep",
                        "label": "Confidential Address",
                        "order": null
                    },
                    {
                        "code": "share",
                        "label": "-",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DerivedPetitionerHomeAddress",
            "label": "The Petitioner's home address",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8RespondentNameAsOnMarriageCertificate",
            "label": "Name changed since marriage?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Is the respondent’s current name different to their married name or the name shown on their marriage certificate?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8RespondentFirstName",
            "label": "Respondent's First name(s)",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Include all middle names here",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8RespondentLastName",
            "label": "Respondent's Last name",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DerivedRespondentHomeAddress",
            "label": "The Respondent's home address",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "If the respondent is to be served at their home address, enter the home address here and as the service address below",
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
            "display_context": "OPTIONAL",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DerivedRespondentCorrespondenceAddr",
            "label": "The Respondent's service address",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8LegalProceedings",
            "label": "Are there any existing or previous court proceedings relating to the petitioner's marriage, property or children?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8LegalProceedingsDetails",
            "label": "Legal proceeding details",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Include the case number(s), if known.",
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
            "show_condition": "D8LegalProceedings=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorce",
            "label": "Fact",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "The reason for the irretrievable breakdown of the marriage",
            "field_type": {
                "id": "FixedList-reasonForDivorceEnum",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "separation-5-years",
                        "label": "5-year separation",
                        "order": null
                    },
                    {
                        "code": "separation-2-years",
                        "label": "2-year separation (with consent)",
                        "order": null
                    },
                    {
                        "code": "desertion",
                        "label": "Desertion",
                        "order": null
                    },
                    {
                        "code": "adultery",
                        "label": "Adultery",
                        "order": null
                    },
                    {
                        "code": "unreasonable-behaviour",
                        "label": "Behaviour",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceBehaviourDetails",
            "label": "Behaviour details",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceDesertionDate",
            "label": "Desertion date",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceDesertionAgreed",
            "label": "Did the respondent leave without the petitioner’s agreement?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceDesertionDetails",
            "label": "Desertion details",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceSeperationDate",
            "label": "On what date did the petitioner and the respondent separate?",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceAdultery3rdPartyFName",
            "label": "Co-respondent's first name",
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
            "show_condition": "D8ReasonForDivorceAdulteryWishToName=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceAdultery3rdPartyLName",
            "label": "Co-respondent's last name",
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
            "show_condition": "D8ReasonForDivorceAdulteryWishToName=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceAdulteryDetails",
            "label": "Adultery details",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceAdulteryWishToName",
            "label": "Name co-respondent?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Does petitioner want to name co-respondent?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DerivedReasonForDivorceAdultery3rdAddr",
            "label": "The Co-respondent's address",
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
            "show_condition": "D8ReasonForDivorceAdulteryWishToName=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8FinancialOrder",
            "label": "Does the petitioner wish to apply for a financial order?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "The court will not start processing your request for a financial order until you submit the separate application and pay the fee.",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8FinancialOrderFor",
            "label": "Who is the financial order for?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-financialOrderForEnum",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "children",
                        "label": "Children",
                        "order": null
                    },
                    {
                        "code": "petitioner",
                        "label": "Petitioner",
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
            "show_condition": "D8FinancialOrder=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DivorceCostsClaim",
            "label": "Does the petitioner want to claim costs?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DivorceClaimFrom",
            "label": "Claim costs from",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "MultiSelectList-claimCostsFromEnum",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "correspondent",
                        "label": "Co-respondent",
                        "order": null
                    },
                    {
                        "code": "respondent",
                        "label": "Respondent",
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
            "show_condition": "D8ReasonForDivorceAdulteryWishToName=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8JurisdictionConnection",
            "label": "Legal connections",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Tick all the reasons that apply:",
            "field_type": {
                "id": "MultiSelectList-jurisdictionConnectionsEnum",
                "type": "MultiSelectList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                    {
                        "code": "G",
                        "label": "The courts of England and Wales have residual jurisdiction",
                        "order": null
                    },
                    {
                        "code": "F",
                        "label": "The Petitioner and Respondent are both domiciled in England and Wales",
                        "order": null
                    },
                    {
                        "code": "E",
                        "label": "The Petitioner is domiciled and habitually resident in England and Wales and has resided there for at least six months immediately prior to the petition",
                        "order": null
                    },
                    {
                        "code": "D",
                        "label": "The Petitioner is habitually resident in England and Wales and has resided there for at least a year immediately prior to the presentation of the petition",
                        "order": null
                    },
                    {
                        "code": "C",
                        "label": "The Respondent is habitually resident in England and Wales",
                        "order": null
                    },
                    {
                        "code": "B",
                        "label": "The Petitioner and Respondent were last habitually resident in England and Wales and one of them still resides there",
                        "order": null
                    },
                    {
                        "code": "A",
                        "label": "The Petitioner and the Respondent are habitually resident in England and Wales",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DocumentsUploaded",
            "label": "Documents uploaded",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "D8DocumentsUploaded-48192323-9a4d-40cd-bf28-9e0c86c5436d",
                "type": "Collection",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [],
                "complex_fields": [],
                "collection_field_type": {
                    "id": "DivorceDocument",
                    "type": "Complex",
                    "min": null,
                    "max": null,
                    "regular_expression": null,
                    "fixed_list_items": [],
                    "complex_fields": [
                        {
                            "id": "DocumentType",
                            "label": "Type",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
                            "hint_text": null,
                            "field_type": {
                                "id": "FixedList-d8documentsReceivedEnum",
                                "type": "FixedList",
                                "min": null,
                                "max": null,
                                "regular_expression": null,
                                "fixed_list_items": [
                                    {
                                        "code": "Welsh-translation",
                                        "label": "Welsh Translation",
                                        "order": null
                                    },
                                    {
                                        "code": "dnRefusalClarificationResponse",
                                        "label": "Decree Nisi Refusal - Clarification Response",
                                        "order": null
                                    },
                                    {
                                        "code": "adultery-co-respondent-aos-form",
                                        "label": "AOS Offline Adultery Form Co-Respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "adultery-respondent-aos-form",
                                        "label": "AOS Offline Adultery Form Respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "behaviour-desertion-aos-form",
                                        "label": "AOS Offline Unreasonable Behaviour / Desertion Form Respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "five-year-separation-aos-form",
                                        "label": "AOS Offline Five Year Separation Form Respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "two-year-separation-aos-form",
                                        "label": "AOS Offline Two Year Separation Form Respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "aosinvitationletter-offline-co-resp",
                                        "label": "AOS Offline Invitation Letter Co-respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "aosinvitationletter-offline-resp",
                                        "label": "AOS Offline Invitation Letter Respondent",
                                        "order": null
                                    },
                                    {
                                        "code": "personalService",
                                        "label": "Personal Service",
                                        "order": null
                                    },
                                    {
                                        "code": "other",
                                        "label": "Other",
                                        "order": null
                                    },
                                    {
                                        "code": "dnAnswers",
                                        "label": "Decree Nisi Answers",
                                        "order": null
                                    },
                                    {
                                        "code": "respondentAnswers",
                                        "label": "Respondent Answers",
                                        "order": null
                                    },
                                    {
                                        "code": "petition",
                                        "label": "Petition",
                                        "order": null
                                    },
                                    {
                                        "code": "nameChange",
                                        "label": "Name change evidence",
                                        "order": null
                                    },
                                    {
                                        "code": "marriageCertTranslation",
                                        "label": "Marriage certificate translation",
                                        "order": null
                                    },
                                    {
                                        "code": "marriageCert",
                                        "label": "Marriage certificate",
                                        "order": null
                                    },
                                    {
                                        "code": "email",
                                        "label": "Email",
                                        "order": null
                                    },
                                    {
                                        "code": "d9h",
                                        "label": "D9H",
                                        "order": null
                                    },
                                    {
                                        "code": "d9d",
                                        "label": "D9D",
                                        "order": null
                                    },
                                    {
                                        "code": "d84a",
                                        "label": "D84A",
                                        "order": null
                                    },
                                    {
                                        "code": "d79",
                                        "label": "D79 - Notice of refusal of entitlement to a DN",
                                        "order": null
                                    },
                                    {
                                        "code": "d30",
                                        "label": "D30 - Consideration of applications for DN",
                                        "order": null
                                    },
                                    {
                                        "code": "dispenseWithService",
                                        "label": "Dispense with Service",
                                        "order": null
                                    },
                                    {
                                        "code": "deemedService",
                                        "label": "Deemed Service",
                                        "order": null
                                    },
                                    {
                                        "code": "dnGranted",
                                        "label": "Decree Nisi Granted",
                                        "order": null
                                    },
                                    {
                                        "code": "dnApplication",
                                        "label": "Decree Nisi application (D84/D80)",
                                        "order": null
                                    },
                                    {
                                        "code": "daGranted",
                                        "label": "Decree Absolute Granted",
                                        "order": null
                                    },
                                    {
                                        "code": "daApplication",
                                        "label": "Decree Absolute application",
                                        "order": null
                                    },
                                    {
                                        "code": "costsOrder",
                                        "label": "Costs Order",
                                        "order": null
                                    },
                                    {
                                        "code": "costs",
                                        "label": "Costs",
                                        "order": null
                                    },
                                    {
                                        "code": "correspondence",
                                        "label": "Correspondence",
                                        "order": null
                                    },
                                    {
                                        "code": "coRespondentAnswers",
                                        "label": "Co-Respondent Answers",
                                        "order": null
                                    },
                                    {
                                        "code": "coe",
                                        "label": "Certificate Of Entitlement",
                                        "order": null
                                    },
                                    {
                                        "code": "baliffService",
                                        "label": "Bailiff Service",
                                        "order": null
                                    },
                                    {
                                        "code": "annexa",
                                        "label": "Annex A",
                                        "order": null
                                    },
                                    {
                                        "code": "aoscr",
                                        "label": "Acknowledgement of Service (Co-Respondent)",
                                        "order": null
                                    },
                                    {
                                        "code": "aos",
                                        "label": "Acknowledgement of Service",
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
                                    "role": "caseworker-divorce-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin_beta",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin-la",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-superuser",
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
                            "id": "DocumentEmailContent",
                            "label": "Email content",
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
                                    "role": "citizen",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin_beta",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin-la",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-superuser",
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
                            "id": "DocumentLink",
                            "label": "Document Url",
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
                                    "role": "citizen",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin_beta",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin-la",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-superuser",
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
                            "id": "DocumentDateAdded",
                            "label": "Date added",
                            "hidden": null,
                            "order": null,
                            "metadata": false,
                            "case_type_id": null,
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
                                    "role": "caseworker-divorce-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin_beta",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin-la",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-superuser",
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
                            "id": "DocumentComment",
                            "label": "Comment",
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
                                {
                                    "role": "citizen",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin_beta",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin-la",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-superuser",
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
                            "id": "DocumentFileName",
                            "label": "File name",
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
                                {
                                    "role": "citizen",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-solicitor",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin_beta",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-courtadmin-la",
                                    "create": true,
                                    "read": true,
                                    "update": true,
                                    "delete": true
                                },
                                {
                                    "role": "caseworker-divorce-superuser",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": true
                }
            ]
        },
        {
            "id": "D8SolicitorReference",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutTheSolPara-1",
            "label": "Please note that the information provided will be used as evidence by the court to decide if the petitioner is entitled to legally end their marriage. **A copy of this form is sent to the respondent**",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "PetitionerSolicitorName",
            "label": "Petitioner Solicitor’s name",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "PetitionerSolicitorFirm",
            "label": "Firm name",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "PetitionerSolicitorPhone",
            "label": "Petitioner Solicitor Phone number",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": null,
            "field_type": {
                "id": "PetitionerSolicitorPhone-65f61c82-019a-435d-b1b9-87183d9a43de",
                "type": "Text",
                "min": null,
                "max": null,
                "regular_expression": "^[0-9 +().-]{9,}$",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "PetitionerSolicitorEmail",
            "label": "Petitioner Solicitor Email",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "SolicitorAgreeToReceiveEmails",
            "label": "I confirm I am willing to accept service of all correspondence and orders by email at the email address stated above.",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutThePetPara-2",
            "label": "You’ll need to upload evidence of the name change (e.g. marriage certificate, change of name deed, statutory declaration) later in this application.",
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
            "show_condition": "D8PetitionerNameDifferentToMarriageCert=\"Yes\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "RespNameDifferentToMarriageCertExplain",
            "label": "Please explain, if known, how their name has changed since they were married.",
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
            "display_context": "OPTIONAL",
            "display_context_parameter": null,
            "show_condition": "D8RespondentNameAsOnMarriageCertificate=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolJurisdictionPara-1",
            "label": "The court has legal power to deal with this application because the following applies:",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolReasonForDivorcePara-1",
            "label": "Choose one of the following reasons to support the fact that the marriage has broken down irretrievably.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCAdulteryPara-1",
            "label": "Give some brief details to support the reason why the marriage has broken down irretrievably.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCAdulteryPara-2",
            "label": "Include the date on which the petitioner first became aware of the adultery.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCAdulteryPara-3",
            "label": "Include what the petitioner believes they know about the adultery (the adultery that forms the basis of this petition). If the petitioner doesn't know any details of the adultery, say that they are unknown and explain why.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCAdulteryPara-5",
            "label": "Do not name the person with whom the adultery was committed, unless the petitioner wishes to formally include them in the divorce proceedings.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCCoRespondentPara-1",
            "label": "The petitioner has the option to name the person with whom the respondent committed adultery.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCCoRespondentPara-2",
            "label": "Once named, they will usually become a co-respondent in the proceedings and will be sent copies of the application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCBehaviourPara-1",
            "label": "Give some brief details to support the reason why the marriage has broken down irretrievably.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCBehaviourPara-2",
            "label": "Include examples of the respondent's behaviour which affect the petitioner the most, and the most recent incidents. Try to include dates if available. If the petitioner thinks their health has been affected, state how it has been affected",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCBehaviourPara-3",
            "label": "Provide enough examples to satisfy the court that the petitioner cannot reasonably be expected to live with the respondent",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCDesertionPara-1",
            "label": "Give some brief details to support the reason why the marriage has broken down irretrievably.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolSOCDesertionPara-2",
            "label": "The respondent must have chosen to leave the petitioner for this reason to be valid. For example, you can't use desertion if the respondent has been sent to prison.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabSolSOCSeparation-Para1",
            "label": "Give some brief details to support the reason why the marriage has broken down irretrievably.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabSolSOCSeparation-Para2",
            "label": "You need to provide the following dates related to petitioner separation. The court will use the most recent separation date as the petitioner and respondent separated.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolClaimCostsPara-1",
            "label": "A claim for costs can include all the fees the petitioner has to pay during the divorce, such as application fees, solicitor fees and any extra court fees.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolUploadDocsPara-1",
            "label": "You need to upload a digital photo or scan of the marriage certificate.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolUploadDocsPara-2",
            "label": "You can also upload other documents that you need to send to the court, e.g.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolUploadDocsPara-3",
            "label": "• Certified translation of a non-English marriage certificate",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolUploadDocsPara-4",
            "label": "• Change of name deed",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolUploadDocsPara-5",
            "label": "The image must be of the entire document and has to be readable by court staff. You can upload jpg, bmp, png, tif, or PDF files (max file size 10MB per file)",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "DerivedPetitionerSolicitorAddr",
            "label": "Firm address/DX address",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolicitorOppositeSexRegulations",
            "label": "Divorce – *Opposite Sex Couple* – Article 3(1) of Council Regulation (EC) No 2201/2003 of 27 November 2003 ",
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
            "show_condition": "D8MarriageIsSameSexCouple=\"No\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSoliciorSameSexRegulations",
            "label": "Divorce – *Same Sex Couple* – Marriage (Same Sex Couples) (Jurisdiction and Recognition of Judgments) Regulations 2014 for matrimonial proceedings involving same sex couples",
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
            "show_condition": "D8MarriageIsSameSexCouple=\"Yes\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "labelResidualJurisdictionPara-1",
            "label": "## Residual Jurisdiction\n\nThe court may have residual jurisdiction if;\n\nnone of the other connections applies in relation to England and Wales;\n\neither the petitioner or the respondent is domiciled in England or Wales; and \n\nneither the petitioner nor the respondent is able to apply for a divorce in another member state of the EU on the basis of any of the other connections.\n\nIn addition, in the case of a same-sex marriage, the court may have residual jurisdiction if the following apply:\n\n- The petitioner and the respondent married each other in England or Wales; and\n- Neither the petitioner nor the respondent is able to apply for a divorce in any other country; and\n- It would be in the interests of justice for the court to consider the application (this may apply if, for example, the petitioner's or respondent’s home country doesn’t allow divorce between same-sex couples).",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8MentalSeparationDate",
            "label": "Date the petitioner decided the marriage was over",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Use the same date for both if they happened on the same day. If the Petitioner not sure of the exact dates, use the closest dates that they remember.",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-systemupdate",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8PhysicalSeparationDate",
            "label": "Date the petitioner and respondent started living apart",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Petitioner and respondent can both live in the same property and be considered by the court to be living apart, as long as they're living separate lives. For example, they don’t eat, sleep or socialise together.",
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
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-systemupdate",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8SeparationTimeTogetherPermitted",
            "label": "Period of time petitioner and respondent can have lived together and still use the selected reason.",
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
            "show_condition": "D8ReasonForDivorce=\"separation-*\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8LivedTogetherMoreTimeThanPermitted",
            "label": "Have the petitioner and respondent lived together for more than ${D8SeparationTimeTogetherPermitted} since ${D8SeparationReferenceDate} ?",
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
            "show_condition": "D8ReasonForDivorce=\"separation-*\" AND D8LivedApartSinceSeparation=\"No\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LivedTogetherSepPermittedPara-1",
            "label": "If the petitioner and respondent lived together for more than ${D8SeparationTimeTogetherPermitted} since ${D8SeparationReferenceDate} they won't have been separated for long enough to use the ${SepYears} years separation reason for divorce at this time.",
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
            "show_condition": "D8ReasonForDivorce=\"separation-*\" AND D8LivedApartSinceSeparation=\"No\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LivedTogetherDesertionPermittedPara-1",
            "label": "If the petitioner and respondent lived together for more than ${D8DesertionTimeTogetherPermitted} since ${D8SeparationReferenceDate} they won't have been separated for long enough to use desertion as  reason for divorce at this time.",
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
            "show_condition": "D8ReasonForDivorce=\"desertion\" AND D8LivedApartSinceDesertion=\"No\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceAdulteryAnyInfo2ndHand",
            "label": "Has any of the information about the adultery come from another person?",
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
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8ReasonForDivorceAdultery2ndHandDetails",
            "label": "Second hand information details",
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
            "show_condition": "D8ReasonForDivorceAdulteryAnyInfo2ndHand=\"Yes\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8LivedApartSinceSeparation",
            "label": "Have the petitioner and respondent lived apart for the entire time since they separated?",
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
            "show_condition": "D8ReasonForDivorce=\"separation-*\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "SepYears",
            "label": "Number of allowed separation years as part of the selected fact",
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
            "show_condition": "D8ReasonForDivorce=\"hiddenfield\"",
            "show_summary_change_option": false,
            "show_summary_content_option": null,
            "acls": [
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8SeparationReferenceDate",
            "label": "Reference date used for 6-month rule calculation of time petitioner and respondent can have lived together.",
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
                    "role": "citizen",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8LivedApartSinceDesertion",
            "label": "Has the petitioner lived apart from the respondent for the entire time since they deserted the petitioner?",
            "hidden": null,
            "value": null,
            "metadata": false,
            "hint_text": "Petitioner must have lived apart from the respondent for at least 2 years since  ${D8SeparationReferenceDate}. Any time that the petitioner & respondent have lived together doesn't count towards this 2 year desertion period",
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
            "show_condition": "D8ReasonForDivorce=\"desertion\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8DesertionTimeTogetherPermitted",
            "label": "Period of time petitioner and respondent can have lived together and still use the selected reason.",
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
            "show_condition": "D8ReasonForDivorce=\"desertion\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "D8LivedTogetherMoreTimeThanPermittedDesert",
            "label": "Have the petitioner and respondent lived together for more than ${D8DesertionTimeTogetherPermitted} since ${D8SeparationReferenceDate} ?",
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
            "show_condition": "D8ReasonForDivorce=\"desertion\" AND D8LivedApartSinceDesertion=\"No\"",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-AboutSolicitor",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-AboutPetitioner",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-AboutRespondent",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-CertificationDetails",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-Jurisdiction",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-ReasonForDivorce",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-Separation",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-Desertion",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-Adultery",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-AdulteryCoResp",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-Behaviour",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-LivedApart",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-LegalProceedings",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-FinancialOrders",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-ClaimCosts",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LabelSolAboutEditingApplication-UploadMarriageCert",
            "label": "You can make changes at the end of your application.",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": false,
                    "delete": false
                }
            ]
        },
        {
            "id": "LanguagePreferenceWelsh",
            "label": "Is the language preference Welsh?",
            "hidden": null,
            "value": "No",
            "metadata": false,
            "hint_text": "Select \"No\" for English or \"Yes\" for bilingual",
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
            "formatted_value": "No",
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
                    "role": "caseworker-divorce-solicitor",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin_beta",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-systemupdate",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-courtadmin-la",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-superuser",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                },
                {
                    "role": "caseworker-divorce-bulkscan",
                    "create": true,
                    "read": true,
                    "update": true,
                    "delete": false
                }
            ]
        }
    ],
    "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJycWpxYTJvbjA3bTVocjgyY2Q4MDlrcGI5YyIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NDQ4MywiZXZlbnQtaWQiOiJzb2xpY2l0b3JDcmVhdGUiLCJjYXNlLXR5cGUtaWQiOiJESVZPUkNFIiwianVyaXNkaWN0aW9uLWlkIjoiRElWT1JDRSIsImNhc2UtdmVyc2lvbiI6ImJmMjFhOWU4ZmJjNWEzODQ2ZmIwNWI0ZmEwODU5ZTA5MTdiMjIwMmYifQ.lmAg9chPqCAJinPcV9O4BPgKVZm1e6ZQA3cNFcrdSRE",
    "wizard_pages": [
        {
            "id": "solicitorCreateSolAboutTheSolicitor",
            "label": "About the Solicitor",
            "order": 1,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8SolicitorReference",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutTheSolPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "PetitionerSolicitorName",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "PetitionerSolicitorFirm",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "PetitionerSolicitorPhone",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "PetitionerSolicitorEmail",
                    "order": 7,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "SolicitorAgreeToReceiveEmails",
                    "order": 8,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "DerivedPetitionerSolicitorAddr",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-AboutSolicitor",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolAboutThePetitioner",
            "label": "About the petitioner",
            "order": 2,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8DivorceWho",
                    "order": 7,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8MarriageIsSameSexCouple",
                    "order": 9,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8InferredPetitionerGender",
                    "order": 8,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerNameDifferentToMarriageCert",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerEmail",
                    "order": 12,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerPhoneNumber",
                    "order": 11,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerFirstName",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerLastName",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerNameChangedHow",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerNameChangedHowOtherDetails",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PetitionerContactDetailsConfidential",
                    "order": 13,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8DerivedPetitionerHomeAddress",
                    "order": 10,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutThePetPara-2",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-AboutPetitioner",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolAboutTheRespondent",
            "label": "About the respondent",
            "order": 3,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8InferredRespondentGender",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8RespondentNameAsOnMarriageCertificate",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8RespondentFirstName",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8RespondentLastName",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8DerivedRespondentHomeAddress",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8DerivedRespondentCorrespondenceAddr",
                    "order": 9,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "RespNameDifferentToMarriageCertExplain",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-AboutRespondent",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolMarriageCertificate",
            "label": "Marriage certificate details",
            "order": 4,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8MarriageDate",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8MarriedInUk",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8MarriagePlaceOfMarriage",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8CountryName",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8MarriagePetitionerName",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8MarriageRespondentName",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-CertificationDetails",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolJurisdiction",
            "label": "Jurisdiction",
            "order": 5,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8JurisdictionConnection",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolJurisdictionPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolicitorOppositeSexRegulations",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSoliciorSameSexRegulations",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "labelResidualJurisdictionPara-1",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-Jurisdiction",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolReasonForDivorce",
            "label": "Reason for the divorce",
            "order": 6,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8ReasonForDivorce",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolReasonForDivorcePara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-ReasonForDivorce",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolSOCAdultery1",
            "label": "Statement of case - adultery",
            "order": 7,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8ReasonForDivorceAdulteryDetails",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCAdulteryPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCAdulteryPara-2",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCAdulteryPara-3",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCAdulteryPara-5",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8ReasonForDivorceAdulteryAnyInfo2ndHand",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8ReasonForDivorceAdultery2ndHandDetails",
                    "order": 7,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-Adultery",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "D8ReasonForDivorce=\"adultery\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolSOCCoRespondent",
            "label": "Statement of case - adultery",
            "order": 9,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8ReasonForDivorceAdultery3rdPartyFName",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8ReasonForDivorceAdultery3rdPartyLName",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8ReasonForDivorceAdulteryWishToName",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8DerivedReasonForDivorceAdultery3rdAddr",
                    "order": 7,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCCoRespondentPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCCoRespondentPara-2",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-AdulteryCoResp",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "D8ReasonForDivorce=\"adultery\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolSOCBehaviour1",
            "label": "Statement of case - behaviour",
            "order": 10,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8ReasonForDivorceBehaviourDetails",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCBehaviourPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCBehaviourPara-2",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCBehaviourPara-3",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-Behaviour",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "D8ReasonForDivorce=\"unreasonable-behaviour\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolSOCDesertion",
            "label": "Statement of case - desertion",
            "order": 12,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8ReasonForDivorceDesertionDate",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8ReasonForDivorceDesertionAgreed",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8ReasonForDivorceDesertionDetails",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCDesertionPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolSOCDesertionPara-2",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-Desertion",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "D8ReasonForDivorce=\"desertion\"",
            "callback_url_mid_event": "http://div-cos-aat.service.core-compute-aat.internal/calculate-separation-fields",
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolSOCSeparation",
            "label": "Statement of case - separation",
            "order": 13,
            "wizard_page_fields": [
                {
                    "case_field_id": "LabSolSOCSeparation-Para1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabSolSOCSeparation-Para2",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8MentalSeparationDate",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8PhysicalSeparationDate",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-Separation",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "D8ReasonForDivorce=\"separation-*\"",
            "callback_url_mid_event": "http://div-cos-aat.service.core-compute-aat.internal/calculate-separation-fields",
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolSOCLivedApart",
            "label": "Lived Apart for the entire time",
            "order": 14,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8ReasonForDivorceSeperationDate",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8SeparationTimeTogetherPermitted",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8LivedTogetherMoreTimeThanPermitted",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LivedTogetherSepPermittedPara-1",
                    "order": 10,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LivedTogetherDesertionPermittedPara-1",
                    "order": 11,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8LivedApartSinceSeparation",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "SepYears",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8SeparationReferenceDate",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8LivedApartSinceDesertion",
                    "order": 8,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8DesertionTimeTogetherPermitted",
                    "order": 7,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8LivedTogetherMoreTimeThanPermittedDesert",
                    "order": 9,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-LivedApart",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": "D8ReasonForDivorce=\"separation-*\" OR D8ReasonForDivorce=\"desertion\"",
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolExistingCourtCases",
            "label": "Other legal proceedings",
            "order": 15,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8LegalProceedings",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8LegalProceedingsDetails",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-LegalProceedings",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolDividingMoneyAndProperty",
            "label": "Financial orders",
            "order": 16,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8FinancialOrder",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8FinancialOrderFor",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-FinancialOrders",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolApplyToClaimCosts",
            "label": "Claim for costs",
            "order": 17,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8DivorceCostsClaim",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "D8DivorceClaimFrom",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolClaimCostsPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-ClaimCosts",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreateSolUploadDocs",
            "label": "Upload the marriage certificate",
            "order": 18,
            "wizard_page_fields": [
                {
                    "case_field_id": "D8DocumentsUploaded",
                    "order": 6,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolUploadDocsPara-1",
                    "order": 1,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolUploadDocsPara-2",
                    "order": 2,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolUploadDocsPara-3",
                    "order": 3,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolUploadDocsPara-4",
                    "order": 4,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolUploadDocsPara-5",
                    "order": 5,
                    "page_column_no": null,
                    "complex_field_overrides": []
                },
                {
                    "case_field_id": "LabelSolAboutEditingApplication-UploadMarriageCert",
                    "order": 0,
                    "page_column_no": null,
                    "complex_field_overrides": []
                }
            ],
            "show_condition": null,
            "callback_url_mid_event": null,
            "retries_timeout_mid_event": []
        },
        {
            "id": "solicitorCreatelangPref",
            "label": "Select Language",
            "order": 19,
            "wizard_page_fields": [
                {
                    "case_field_id": "LanguagePreferenceWelsh",
                    "order": 1,
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
    "end_button_label": "Save Petition",
    "can_save_draft": null,
    "_links": {
        "self": {
            "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/DIVORCE/event-triggers/solicitorCreate?ignore-warning=false"
        }
    }
}
