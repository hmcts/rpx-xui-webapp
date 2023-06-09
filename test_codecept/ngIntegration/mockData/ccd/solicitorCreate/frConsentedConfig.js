module.exports = {
  "id": "FR_solicitorCreate",
  "name": "Consent Order Application",
  "description": "Create an application for financial remedy by consent",
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
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "beforeYouStartPara1",
      "label": ">Financial Remedy Online is part of the Divorce project within the HMCTS reform programme. The Divorce project aim is to deliver a transformed end to end service for individuals and/or their legal representatives wishing to make an application to legally end their marriage or civil partnership and resolve associated financial issues.\n\n>Before you start completing this application you will need:\n\n*\tA copy of the decree nisi or decree absolute from the divorce case.\n*\tYour PBA number or an online help with fees reference number.\n*\tA scanned copy of the draft consent order that has been signed by both parties.\n*\tA copy of the D81 form signed by both parties.\n*\tAny other relevant documents e.g. pension forms, cover letters etc.\n\n>The pilot will continue to improve and add additional features based on the user feedback we receive. Please check the list below to ensure the application is within the current scope of the pilot:",
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
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "beforeYouStartPara2",
      "label": ">**Scope**\n\n>Currently, you can use the pilot for any cases that fit the following criteria only:\n\n*\tThe application is being made as part of a Divorce case (applications on Civil Partnership, judicial separation or nullity cases cannot be accepted at this time)\n*\tThe Divorce case must have reached at least Decree Nisi stage \n*\tThe Divorce case may have been submitted via paper or online, however, there must be no previous financial remedy proceedings on the case\n*\tYou must be representing the Applicant (the applicant for FR proceedings could be either the petitioner or respondent in the divorce proceedings)\n*\tThere cannot be a confidential address on the case\n\n>If your application does not meet this criteria, it will be returned and will have to be submitted via the normal paper process.",
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
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "applicantAddress",
      "label": "Their address",
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
      "id": "solicitorAbout_Para-1",
      "label": "#### SOLICITOR DETAILS",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Create an application for financial remedy by consent",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorName",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorFirm",
      "label": "Name of your firm",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "Your reference",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorAddress",
      "label": "Your address",
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorPhone",
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
      "show_condition": "applicantRepresented=\"Yes\" OR isAdmin=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorEmail",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorDXnumber",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorAgreeToReceiveEmails",
      "label": "Future email communications",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "I confirm I am willing to accept service of all correspondence and orders by email at the email address stated above.",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "solicitorAbout_Para-2",
      "label": "********************",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "divorceAbout_H1",
      "label": "#### DIVORCE DETAILS",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
        "id": "divorceCaseNumber-3b575856-292b-4e4c-a4a7-cd57885e92e2",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "display_context": "OPTIONAL",
      "display_context_parameter": null,
      "show_condition": "divorceStageReached=\"Decree Absolute\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "display_context": "OPTIONAL",
      "display_context_parameter": null,
      "show_condition": "divorceStageReached=\"Decree Absolute\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "applicantDetails",
      "label": "#### APPLICANT DETAILS",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "rRespondentLabel",
      "label": "#### RESPONDENT DETAILS",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "appRespondentFMName",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "appRespondentLName",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "appRespondentRep",
      "label": "Is the respondent represented ?",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "#### RESPONDENT SOLICITOR’S DETAILS",
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "Respondent Solicitor’s name",
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "Respondent solicitor’s firm",
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "Their  address",
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "show_condition": "appRespondentRep=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "#### RESPONDENT SERVICE ADDRESS DETAILS",
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
      "show_condition": "appRespondentRep=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "label": "Their address",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "AddressGlobalUK",
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
            "label": "County/State",
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
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
      "show_condition": "appRespondentRep=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "show_condition": "appRespondentRep=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "show_condition": "appRespondentRep=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication1",
      "label": "#### NATURE OF THE APPLICATION",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication2",
      "label": "The application is for:",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "The applicant is applying for an order by consent in terms of written agreement (a consent order). Within the draft consent order, the Applicant is applying to Court for;",
      "field_type": {
        "id": "MultiSelectList-FR_ms_natureApplication",
        "type": "MultiSelectList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "Property Adjustment Order",
            "label": "Property Adjustment Order",
            "order": null
          },
          {
            "code": "A settlement or a transfer of property",
            "label": "A settlement or a transfer of property for the benefit of the child(ren)",
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
            "code": "Periodical Payment Order",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication3a",
      "label": "Address details",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If the application includes an application for a Property Adjustment Order in relation to land, please provide the address(es) of the property or properties, if applicable",
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
      "show_condition": "natureOfApplication2CONTAINS\"Property Adjustment Order\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication3b",
      "label": "Mortgage details",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If the application includes an application for a Property Adjustment Order in relation to land, please provide the name(s) and address(es) of any mortgagee(s), if applicable",
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
      "show_condition": "natureOfApplication2CONTAINS\"Property Adjustment Order\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication4",
      "label": "#### ORDER FOR CHILDREN",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "orderForChildrenQuestion1",
      "label": "Does the application contain any application for periodical payments, or secured periodical payments for children?",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication5",
      "label": "Is there a written agreement?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If the application contains an application for periodical payments or secured periodical payments for children, has a written agreement made about maintenance for the benefit of children?",
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
      "show_condition": "orderForChildrenQuestion1=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication6",
      "label": "Select what the payments are for:",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "There is no agreement, but the applicant is applying for payments;",
      "field_type": {
        "id": "MultiSelectList-FR_ms_childrenOrder",
        "type": "MultiSelectList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "Other",
            "label": "Other",
            "order": null
          },
          {
            "code": "When not habitually resident",
            "label": "When either the child or the person with care of the child or the absent parent of the child is not habitually resident in the United Kingdom",
            "order": null
          },
          {
            "code": "training",
            "label": "To meet expenses incurred by a child in relation to being educated or training for work",
            "order": null
          },
          {
            "code": "disability expenses",
            "label": "To meet expenses arising from a child’s disability",
            "order": null
          },
          {
            "code": "In addition to child support",
            "label": "In addition to child support or maintenance already paid under a Child Support Agency assessment",
            "order": null
          },
          {
            "code": "Step Child or Step Children",
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
      "display_context": "OPTIONAL",
      "display_context_parameter": null,
      "show_condition": "orderForChildrenQuestion1=\"Yes\" AND natureOfApplication5=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "natureOfApplication7",
      "label": "Other – Please give details",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If Other, please provide details",
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
      "show_condition": "orderForChildrenQuestion1=\"Yes\" AND natureOfApplication5=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "consentOrderL",
      "label": "#### CONSENT ORDER",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "consentOrder",
      "label": "Draft Consent Order",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please upload a scanned copy of the draft consent order that has been signed by both parties. PLEASE NOTE: Pension documents should be uploaded separately on the pension upload page or they will not be returned with a court seal upon approval of the application. Where possible, documents should be scanned in Black and White.",
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
      "show_condition": null,
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "d81",
      "label": "#### D81",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "d81Question",
      "label": "Are you uploading a joint D81?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "You can either submit one joint D81 form for both parties or one for each applicant and respondent",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "d81Joint",
      "label": "Form D81 Joint Document",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Joint D81 form, signed by both parties",
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
      "show_condition": "d81Question=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "d81Applicant",
      "label": "Form D81 Applicant Document",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "D81 form, signed by Applicant",
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
      "show_condition": "d81Question=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "d81Respondent",
      "label": "Form D81 Respondent Document",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "D81 form, signed by Respondent",
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
      "show_condition": "d81Question=\"No\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "pensionCollectionL",
      "label": "#### PENSION DOCUMENTS",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "pensionCollection",
      "label": "Pension Documents",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If the application contains an application for a pension sharing, pension compensation sharing, pension attachment or pension compensation attachment order, please upload the relevant pension form(s) from the list below",
      "field_type": {
        "id": "pensionCollection-e24827e6-4e72-4da3-821e-59aff2de08bb",
        "type": "Collection",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": {
          "id": "FR_PensionType",
          "type": "Complex",
          "min": null,
          "max": null,
          "regular_expression": null,
          "fixed_list_items": [],
          "complex_fields": [
            {
              "id": "typeOfDocument",
              "label": "Type of document",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "FixedList-FR_fl_PensionDocument",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                  {
                    "code": "Form PPF2",
                    "label": "Form PPF2",
                    "order": null
                  },
                  {
                    "code": "Form PPF1",
                    "label": "Form PPF1",
                    "order": null
                  },
                  {
                    "code": "Form PPF",
                    "label": "Form PPF",
                    "order": null
                  },
                  {
                    "code": "Form P2",
                    "label": "Form P2",
                    "order": null
                  },
                  {
                    "code": "Form P1",
                    "label": "Form P1",
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
                  "create": true,
                  "read": true,
                  "update": false,
                  "delete": false
                },
                {
                  "role": "caseworker-divorce-financialremedy",
                  "create": true,
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
              "id": "uploadedDocument",
              "label": "Document",
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
                  "create": true,
                  "read": true,
                  "update": false,
                  "delete": false
                },
                {
                  "role": "caseworker-divorce-financialremedy",
                  "create": true,
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
      "show_condition": null,
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "otherCollectionL",
      "label": "#### OTHER DOCUMENTS",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "otherCollection",
      "label": "Other Documents",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Upload other documentation related to your application",
      "field_type": {
        "id": "otherCollection-3d57c11c-7863-425a-a4e0-53b5a3014961",
        "type": "Collection",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": {
          "id": "FR_DocumentType",
          "type": "Complex",
          "min": null,
          "max": null,
          "regular_expression": null,
          "fixed_list_items": [],
          "complex_fields": [
            {
              "id": "typeOfDocument",
              "label": "Type of document",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "FixedList-FR_fl_OtherDocument",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                  {
                    "code": "Other",
                    "label": "Other",
                    "order": null
                  },
                  {
                    "code": "Notice of acting",
                    "label": "Notice of acting",
                    "order": null
                  },
                  {
                    "code": "Letter",
                    "label": "Letter",
                    "order": null
                  },
                  {
                    "code": "ScheduleOfAssets",
                    "label": "Schedule of Assets",
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
                  "create": true,
                  "read": true,
                  "update": false,
                  "delete": false
                },
                {
                  "role": "caseworker-divorce-financialremedy",
                  "create": true,
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
              "id": "uploadedDocument",
              "label": "Document",
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
                  "create": true,
                  "read": true,
                  "update": false,
                  "delete": false
                },
                {
                  "role": "caseworker-divorce-financialremedy",
                  "create": true,
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
      "show_condition": null,
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "createCasePreConfirmationInfoText",
      "label": "# Saving your application\nOnce you have pressed ‘continue’ at the bottom of this page, you will have the opportunity to check your application and make any necessary amendments.\n\nTo save a copy of the application, please press the ‘submit’ button at the bottom of the page.\n\n# What happens next\nOnce you have saved a copy of your application, you will be directed to the case file. Here you can use the ‘Next Steps’ options on the top right of the file to administer the case.\n\nYou will have the option to:\n* Authorise, pay for and submit the application\n\nPlease note, your application will not be sent to the Court and your payment will not be taken until you authorise, pay for and submit the application.\n\n# If you need help \nYou can contact the court if you need help. \n************************************************************\nCourts and Tribunals Service Centre\nPO Box 12746, Harlow, CM20 9QZ\n<br/>Email: ContactFinancialRemedy@justice.gov.uk",
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
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
            "code": "southwest",
            "label": "South West",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "midlandsFRCList",
      "label": "This should be the FRC local to the applicant",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "This should be the FRC local to the applicant",
      "field_type": {
        "id": "FixedList-FR_midlands_frc_list",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "londonFRCList",
      "label": "This should be the FRC local to the applicant",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "This should be the FRC local to the applicant",
      "field_type": {
        "id": "FixedList-FR_london_frc_list",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "london",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "northWestFRCList",
      "label": "This should be the FRC local to the applicant",
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
            "code": "other",
            "label": "Other",
            "order": null
          },
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "northEastFRCList",
      "label": "This should be the FRC local to the applicant",
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
            "code": "cleveland",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "southEastFRCList",
      "label": "This should be the FRC local to the applicant",
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
            "code": "other",
            "label": "Other",
            "order": null
          },
          {
            "code": "kent",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "southWestFRCList",
      "label": "This should be the FRC local to the applicant",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "This should be the FRC local to the applicant",
      "field_type": {
        "id": "FixedList-FR_sw_frc_list",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "other",
            "label": "Other",
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
      "show_condition": "regionList=\"southwest\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "walesFRCList",
      "label": "This should be the FRC local to the applicant",
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
            "code": "other",
            "label": "Other",
            "order": null
          },
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "nottinghamCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_nottinghamList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_nottinghamList_8",
            "label": "BOSTON COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nottinghamList_7",
            "label": "MANSFIELD MAGISTRATES AND COUNTY COURT",
            "order": null
          },
          {
            "code": "FR_nottinghamList_6",
            "label": "CHESTERFIELD COUNTY COURT",
            "order": null
          },
          {
            "code": "FR_nottinghamList_5",
            "label": "NORTHAMPTON CROWN, COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nottinghamList_4",
            "label": "LINCOLN COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nottinghamList_3",
            "label": "LEICESTER COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nottinghamList_2",
            "label": "DERBY COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_nottinghamList_1",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "birminghamCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_birminghamList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_birminghamList_10",
            "label": "HEREFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_9",
            "label": "STAFFORD COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_8",
            "label": "WORCESTER COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_7",
            "label": "STOKE ON TRENT COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_6",
            "label": "WALSALL COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_5",
            "label": "DUDLEY COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_4",
            "label": "WOLVERHAMPTON COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_birminghamList_3",
            "label": "TELFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_birminghamList_2",
            "label": "COVENTRY COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_birminghamList_1",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "londonCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_londonList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_londonList_11",
            "label": "BROMLEY COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_10",
            "label": "CROYDON COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_9",
            "label": "EDMONTON COOUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_8",
            "label": "KINGSTON-UPON-THAMES COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_7",
            "label": "ROMFORD COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_6",
            "label": "BARNET CIVIL AND FAMILY COURTS CENTRE",
            "order": null
          },
          {
            "code": "FR_londonList_5",
            "label": "BRENTFORD COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_4",
            "label": "EAST LONDON FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_3",
            "label": "UXBRIDGE COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_2",
            "label": "WILLESDEN COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_londonList_1",
            "label": "CENTRAL FAMILY COURT",
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
      "show_condition": "regionList=\"london\" AND londonFRCList=\"london\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "liverpoolCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_liverpoolList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_liverpoolList_5",
            "label": "BIRKENHEAD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_liverpoolList_4",
            "label": "ST. HELENS COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_liverpoolList_3",
            "label": "CREWE COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_liverpoolList_2",
            "label": "CHESTER CIVIL AND FAMILY JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_liverpoolList_1",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "manchesterCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_manchesterList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_manchesterList_3",
            "label": "WIGAN COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_manchesterList_2",
            "label": "STOCKPORT COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_manchesterList_1",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "otherNWCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_NWOtherList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_NWList_8",
            "label": "BARROW IN FURNESS COUNTRY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_NWList_7",
            "label": "BLACKBURN COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_NWList_6",
            "label": "BLACKPOOL COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_NWList_5",
            "label": "BURNLEY COMBINED CENTRE",
            "order": null
          },
          {
            "code": "FR_NWList_4",
            "label": "CARLISLE COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_NWList_3",
            "label": "LANCASTER COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_NWList_2",
            "label": "PRESTON COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_NWList_1",
            "label": "WEST CUMBRIA COUNTY COURT AND FAMILY COURT",
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
      "show_condition": "regionList=\"northwest\" AND northWestFRCList=\"other\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "clevelandCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_clevelandList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_clevelandList_8",
            "label": "DARLINGTON COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_clevelandList_7",
            "label": "NORTH SHIELDS COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_clevelandList_6",
            "label": "SOUTH SHIELDS COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_clevelandList_5",
            "label": "GATESHEAD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_clevelandList_4",
            "label": "MIDDLESBROUGH COUNTY COURT AT TEESSIDE COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_clevelandList_3",
            "label": "SUNDERLAND COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_clevelandList_2",
            "label": "DURHAM JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_clevelandList_1",
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
      "show_condition": "regionList=\"northeast\" AND northEastFRCList=\"cleveland\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "nwyorkshireCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_nw_yorkshireList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_nw_yorkshireList_8",
            "label": "LEEDS COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_7",
            "label": "SKIPTON COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_6",
            "label": "SCARBOROUGH JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_5",
            "label": "YORK COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_4",
            "label": "WAKEFIELD CIVIL AND FAMILY JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_3",
            "label": "HUDDERSFIELD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_2",
            "label": "BRADFORD COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_nw_yorkshireList_1",
            "label": "HARROGATE JUSTICE CENTRE",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "humberCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_humberList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_humberList_5",
            "label": "BARNSLEY LAW COURTS",
            "order": null
          },
          {
            "code": "FR_humberList_4",
            "label": "GREAT GRIMSBY COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_humberList_3",
            "label": "DONCASTER JUSTICE CENTRE NORTH",
            "order": null
          },
          {
            "code": "FR_humberList_2",
            "label": "KINGSTON-UPON-HULL COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_humberList_1",
            "label": "SHEFFIELD FAMILY HEARING CENTRE",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "kentSurreyCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_kent_surreyList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_kent_surreyList_10",
            "label": "HORSHAM COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_9",
            "label": "HASTINGS COUNTY COURT AND FAMILY COURT HEARING CENTRE",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_8",
            "label": "WORTHING COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_7",
            "label": "BRIGHTON COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_6",
            "label": "STAINES COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_5",
            "label": "GUILDFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_4",
            "label": "MEDWAY COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_3",
            "label": "DARTFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_2",
            "label": "MAIDSTONE COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_kent_surreyList_1",
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
      "show_condition": "regionList=\"southeast\" AND southEastFRCList=\"kent\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "otherSECourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_SEOtherList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_SEList_21",
            "label": "THANET COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_20",
            "label": "WATFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_19",
            "label": "SOUTHEND ON SEA COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_18",
            "label": "SLOUGH COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_17",
            "label": "READING COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_16",
            "label": "PETERBOROUGH COUNTY",
            "order": null
          },
          {
            "code": "FR_SEList_15",
            "label": "OXFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_14",
            "label": "NORWICH MAGISTRATES' COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_13",
            "label": "MILTON KEYNES COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_12",
            "label": "LUTON COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_11",
            "label": "LEWES COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_SEList_10",
            "label": "IPSWICH COUNTY COURT AND FAMILY HEARING CENTRE",
            "order": null
          },
          {
            "code": "FR_SEList_9",
            "label": "HIGH WYCOMBE COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_8",
            "label": "HERTFORD COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_7",
            "label": "COLCHESTER MAGISTRATES' COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_6",
            "label": "CHELMSFORD COUNTY COUR AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_5",
            "label": "CAMBRIDGE COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_4",
            "label": "BURY ST EDMUNDS COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SEList_3",
            "label": "BRIGHTON FAMILY CENTRE",
            "order": null
          },
          {
            "code": "FR_SEList_2",
            "label": "BEDFORD COUNTY",
            "order": null
          },
          {
            "code": "FR_SEList_1",
            "label": "BASILDON MIGISTRATES' COURT AND FAMILY COURT",
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
      "show_condition": "regionList=\"southeast\" AND southEastFRCList=\"other\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "otherSWCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_SWOtherList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_SWList_22",
            "label": "BARNSTAPLE COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_21",
            "label": "BATH MAGISTRATES', COUNTY AND FAMILY COURTS",
            "order": null
          },
          {
            "code": "FR_SWList_20",
            "label": "BOURNEMOUTH AND POOLE COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_19",
            "label": "BASINGSTOKE COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_18",
            "label": "BODMIN COUNTY AND FAMILY OCURT",
            "order": null
          },
          {
            "code": "FR_SWList_17",
            "label": "BRISTOL CIVIL AND FAMILY JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_SWList_16",
            "label": "EXETER COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_SWList_15",
            "label": "GLOUCESTER AND CHELTENHAM COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_14",
            "label": "NEWPORT IOW COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_13",
            "label": "PLYMOUTH COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_SWList_12",
            "label": "PORTSMOUTH COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_SWList_11",
            "label": "SALISBURY LAW COURTS",
            "order": null
          },
          {
            "code": "FR_SWList_10",
            "label": "SWINDON COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_SWList_9",
            "label": "TAUNTON CROWN, COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_8",
            "label": "SOUTHAMPTON COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_7",
            "label": "TORQUAY AND NEWTON ABBOT COUNTY COURT AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_6",
            "label": "TRURO COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_5",
            "label": "WESTON SUPER MARE COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_SWList_4",
            "label": "WEYMOUTH COMBINED COURT",
            "order": null
          },
          {
            "code": "FR_SWList_3",
            "label": "WINCHESTER COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_SWList_2",
            "label": "YEOVIL COUNTY",
            "order": null
          },
          {
            "code": "FR_SWList_1",
            "label": "ALDERSHOT JUSTICE CENTRE",
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
      "show_condition": "regionList=\"southwest\" AND southWestFRCList=\"other\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "newportCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_newportList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_newportList_5",
            "label": "BLACKWOOD CIVIL AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_newportList_4",
            "label": "PONTYPRIDD COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_newportList_3",
            "label": "MERTHYR TYDFIL COMBINED COURT CENTRE",
            "order": null
          },
          {
            "code": "FR_newportList_2",
            "label": "CARDIFF CIVIL & FAMILY JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_newportList_1",
            "label": "NEWPORT CIVIL AND FAMILY COURT",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "swanseaCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_swanseaList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_swanseaList_6",
            "label": "PORT TALBOT JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_swanseaList_5",
            "label": "LLANELLI LAW COURTS",
            "order": null
          },
          {
            "code": "FR_swanseaList_4",
            "label": "CARMARTHEN COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_swanseaList_3",
            "label": "HAVERFORDWEST COUNTY & FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_swanseaList_2",
            "label": "ABERYSTWYTH JUSTICE CENTRE",
            "order": null
          },
          {
            "code": "FR_swanseaList_1",
            "label": "SWANSEA CIVIL & FAMILY JUSTICE CENTRE",
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
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
      "id": "welshOtherCourtList",
      "label": "Where is the Applicant’s Local Court?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Please give the name of the Court which is closest to the Applicants home postcode. If you are unsure, please check on http://courttribunalfinder.service.gov.uk",
      "field_type": {
        "id": "FixedList-FR_WalesOtherList",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "FR_WList_4",
            "label": "MOLD COUNTY",
            "order": null
          },
          {
            "code": "FR_WList_3",
            "label": "WREXHAM COUNTY AND FAMILY COURT",
            "order": null
          },
          {
            "code": "FR_WList_2",
            "label": "WELSHPOOL MAGISTRATES' COURST",
            "order": null
          },
          {
            "code": "FR_WList_1",
            "label": "PRESTATYN (RHYL) JUSTICE CENTRE",
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
      "show_condition": "regionList=\"wales\" AND walesFRCList=\"other\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-divorce-financialremedy-judiciary",
          "create": true,
          "read": true,
          "update": false,
          "delete": false
        },
        {
          "role": "caseworker-divorce-financialremedy",
          "create": true,
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
    }
  ],
  "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJoa2R0cDZscjJxdXFvcDk5Y3RtamNxOTlzbyIsInN1YiI6IjQxYTkwYzM5LWQ3NTYtNGViYS04ZTg1LTViNWJmNTZiMzFmNSIsImlhdCI6MTU5NjU0NjczMCwiZXZlbnQtaWQiOiJGUl9zb2xpY2l0b3JDcmVhdGUiLCJjYXNlLXR5cGUtaWQiOiJGaW5hbmNpYWxSZW1lZHlNVlAyIiwianVyaXNkaWN0aW9uLWlkIjoiRElWT1JDRSIsImNhc2UtdmVyc2lvbiI6ImJmMjFhOWU4ZmJjNWEzODQ2ZmIwNWI0ZmEwODU5ZTA5MTdiMjIwMmYifQ.5t8gV1D0eyeSvNRWoulB34EXXCZCkiRyEPOKh3YhN2M",
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
      "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/consented/set-defaults",
      "retries_timeout_mid_event": [
        3,
        4,
        5
      ]
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
          "case_field_id": "solicitorAbout_Para-1",
          "order": 8,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorName",
          "order": 9,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorFirm",
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
          "case_field_id": "solicitorAddress",
          "order": 12,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorPhone",
          "order": 13,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorEmail",
          "order": 14,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorDXnumber",
          "order": 15,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorAgreeToReceiveEmails",
          "order": 16,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "solicitorAbout_Para-2",
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
          "case_field_id": "divorceAbout_H1",
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
          "case_field_id": "divorceStageReached",
          "order": 3,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "divorceUploadEvidence1",
          "order": 4,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "divorceDecreeNisiDate",
          "order": 5,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "divorceUploadEvidence2",
          "order": 6,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "divorceDecreeAbsoluteDate",
          "order": 7,
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
          "case_field_id": "applicantDetails",
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
        },
        {
          "case_field_id": "regionList",
          "order": 4,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "midlandsFRCList",
          "order": 5,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "londonFRCList",
          "order": 6,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "northWestFRCList",
          "order": 7,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "northEastFRCList",
          "order": 8,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "southEastFRCList",
          "order": 9,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "southWestFRCList",
          "order": 10,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "walesFRCList",
          "order": 11,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "nottinghamCourtList",
          "order": 12,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "birminghamCourtList",
          "order": 13,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "londonCourtList",
          "order": 14,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "liverpoolCourtList",
          "order": 15,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "manchesterCourtList",
          "order": 16,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "otherNWCourtList",
          "order": 17,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "clevelandCourtList",
          "order": 18,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "nwyorkshireCourtList",
          "order": 19,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "humberCourtList",
          "order": 20,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "kentSurreyCourtList",
          "order": 21,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "otherSECourtList",
          "order": 22,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "otherSWCourtList",
          "order": 23,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "newportCourtList",
          "order": 24,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "swanseaCourtList",
          "order": 25,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "welshOtherCourtList",
          "order": 26,
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
          "case_field_id": "rRespondentLabel",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "appRespondentFMName",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "appRespondentLName",
          "order": 3,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "appRespondentRep",
          "order": 4,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorLabel",
          "order": 5,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorName",
          "order": 6,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorFirm",
          "order": 7,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorReference",
          "order": 8,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorAddress",
          "order": 9,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorPhone",
          "order": 10,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorEmail",
          "order": 11,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rSolicitorDXnumber",
          "order": 12,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "rRespondentLabel2",
          "order": 13,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "respondentAddress",
          "order": 14,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "respondentPhone",
          "order": 15,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "respondentEmail",
          "order": 16,
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
          "case_field_id": "natureOfApplication1",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "natureOfApplication2",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "natureOfApplication3a",
          "order": 3,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "natureOfApplication3b",
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
      "id": "FR_solicitorCreate7",
      "label": null,
      "order": 7,
      "wizard_page_fields": [
        {
          "case_field_id": "natureOfApplication4",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "orderForChildrenQuestion1",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "natureOfApplication5",
          "order": 3,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "natureOfApplication6",
          "order": 5,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "natureOfApplication7",
          "order": 6,
          "page_column_no": 1,
          "complex_field_overrides": []
        }
      ],
      "show_condition": "natureOfApplication2CONTAINS\"Periodical Payment Order\"",
      "callback_url_mid_event": null,
      "retries_timeout_mid_event": []
    },
    {
      "id": "FR_solicitorCreate8",
      "label": null,
      "order": 9,
      "wizard_page_fields": [
        {
          "case_field_id": "consentOrderL",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "consentOrder",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        }
      ],
      "show_condition": null,
      "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/field/consentOrder/file-upload-check",
      "retries_timeout_mid_event": [
        3,
        4,
        5
      ]
    },
    {
      "id": "FR_solicitorCreate9",
      "label": null,
      "order": 10,
      "wizard_page_fields": [
        {
          "case_field_id": "d81",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "d81Question",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "d81Joint",
          "order": 3,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "d81Applicant",
          "order": 4,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "d81Respondent",
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
      "id": "FR_solicitorCreate10",
      "label": null,
      "order": 11,
      "wizard_page_fields": [
        {
          "case_field_id": "pensionCollectionL",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "pensionCollection",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        }
      ],
      "show_condition": "natureOfApplication2CONTAINS\"Pension Sharing Order\" OR natureOfApplication2CONTAINS\"Pension Attachment Order\" OR natureOfApplication2CONTAINS\"Pension Compensation Sharing Order\" OR natureOfApplication2CONTAINS\"Pension Compensation Attachment Order\"",
      "callback_url_mid_event": "http://finrem-cos-aat.service.core-compute-aat.internal/case-orchestration/field/pensionCollection/file-upload-check",
      "retries_timeout_mid_event": [
        3,
        4,
        5
      ]
    },
    {
      "id": "FR_solicitorCreate11",
      "label": null,
      "order": 12,
      "wizard_page_fields": [
        {
          "case_field_id": "otherCollectionL",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "otherCollection",
          "order": 2,
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
      "order": 13,
      "wizard_page_fields": [
        {
          "case_field_id": "createCasePreConfirmationInfoText",
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
      "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/FinancialRemedyMVP2/event-triggers/FR_solicitorCreate?ignore-warning=false"
    }
  }
}
 