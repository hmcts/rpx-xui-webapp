module.exports = {
  "id": "initiateCase",
  "name": "Initiate Case",
  "description": "Create a new case",
  "case_id": null,
  "case_fields": [
    {
      "id": "caseAssignee",
      "label": "Assigned Office",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "FixedList-TRIB_fl_Assigned_Office",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "Bristol",
            "label": "Bristol",
            "order": null
          },
          {
            "code": "Cardiff",
            "label": "Cardiff",
            "order": null
          },
          {
            "code": "Leeds",
            "label": "Leeds",
            "order": null
          },
          {
            "code": "London Central",
            "label": "London Central",
            "order": null
          },
          {
            "code": "London East",
            "label": "London East",
            "order": null
          },
          {
            "code": "London South",
            "label": "London South",
            "order": null
          },
          {
            "code": "Manchester",
            "label": "Manchester",
            "order": null
          },
          {
            "code": "Midlands East",
            "label": "Midlands East",
            "order": null
          },
          {
            "code": "Midlands West",
            "label": "Midlands West",
            "order": null
          },
          {
            "code": "Newcastle",
            "label": "Newcastle",
            "order": null
          },
          {
            "code": "Scotland",
            "label": "Scotland",
            "order": null
          },
          {
            "code": "Watford",
            "label": "Watford",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "caseType",
      "label": "Single or Multiple",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "FixedList-TRIB_fl_Case_Type",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "Single",
            "label": "Single",
            "order": null
          },
          {
            "code": "Multiple",
            "label": "Multiple",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "multipleType",
      "label": "Multiple case types",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "FixedList-TRIB_fl_Multiple_Type",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "Multiple – Lead",
            "label": "Multiple – Lead",
            "order": null
          },
          {
            "code": "Multiple – Follower",
            "label": "Multiple – Follower",
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
      "show_condition": "caseType=\"Multiple\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "multipleOthers",
      "label": "Other claimants",
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
      "show_condition": "caseType=\"Multiple\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "multipleReference",
      "label": "Multiple reference",
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
      "show_condition": "caseType=\"Multiple\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "claimantType",
      "label": "Claimant details",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "TRIB_ClaimantType",
        "type": "Complex",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [
          {
            "id": "claimant_L_1",
            "label": "Your details",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_title",
            "label": "Title",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "FixedList-TRIB_fl_Title",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Mr",
                  "label": "Mr",
                  "order": null
                },
                {
                  "code": "Mrs",
                  "label": "Mrs",
                  "order": null
                },
                {
                  "code": "Miss",
                  "label": "Miss",
                  "order": null
                },
                {
                  "code": "Ms",
                  "label": "Ms",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_first_name",
            "label": "First name",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_initials",
            "label": "Initials",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_last_name",
            "label": "Last name",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_date_of_birth",
            "label": "Date of birth",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_gender",
            "label": "Gender",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "FixedList-TRIB_fl_Gender",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Male",
                  "label": "Male",
                  "order": null
                },
                {
                  "code": "Female",
                  "label": "Female",
                  "order": null
                },
                {
                  "code": "Non-binary",
                  "label": "Non-binary",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_addressUK",
            "label": "Address",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_phone_number",
            "label": "Phone number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_mobile_number",
            "label": "Mobile number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_fax_number",
            "label": "Fax number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_email_address",
            "label": "Email address",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_contact_preference",
            "label": "Contact preference",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": "How would you prefer us to contact you? (please select only one option)",
            "field_type": {
              "id": "FixedList-TRIB_fl_Contact",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Email",
                  "label": "By email",
                  "order": null
                },
                {
                  "code": "Post",
                  "label": "By post",
                  "order": null
                },
                {
                  "code": "Fax",
                  "label": "By fax",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "claimantOtherType",
      "label": "Other details",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "TRIB_ClaimantOtherType",
        "type": "Complex",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [
          {
            "id": "claimant_L_2",
            "label": "Other work details",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_company_name",
            "label": "Company name",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_workplace",
            "label": "Workplace",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_occupation",
            "label": "Occupation",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_employed_from",
            "label": "Employed from",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_employed_currently",
            "label": "Employed currently ?",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_employed_to",
            "label": "Employed to",
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
            "show_condition": "claimant_employed_currently=\"No\"",
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_work_address",
            "label": "Work address",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_work_phone_number",
            "label": "Work phone number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_preferred_judge",
            "label": "Preferred judge",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "FixedList-TRIB_fl_Judges",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Judge 1",
                  "label": "Judge 1",
                  "order": null
                },
                {
                  "code": "Judge 2",
                  "label": "Judge 2",
                  "order": null
                },
                {
                  "code": "Judge 3",
                  "label": "Judge 3",
                  "order": null
                },
                {
                  "code": "Judge 4",
                  "label": "Judge 4",
                  "order": null
                },
                {
                  "code": "Judge 5",
                  "label": "Judge 5",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_preferred_date",
            "label": "Preferred dates",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_sit_alone_reason",
            "label": "Sit alone reason",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "FixedList-TRIB_fl_Sit_Alone_Reason",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Breach of Contract",
                  "label": "Breach of Contract",
                  "order": null
                },
                {
                  "code": "Insolvency",
                  "label": "Insolvency",
                  "order": null
                },
                {
                  "code": "Interim Relief",
                  "label": "Interim Relief",
                  "order": null
                },
                {
                  "code": "Not Contested",
                  "label": "Not Contested",
                  "order": null
                },
                {
                  "code": "Pre Hearing",
                  "label": "Pre Hearing",
                  "order": null
                },
                {
                  "code": "Preliminary Determination",
                  "label": "Preliminary Determination",
                  "order": null
                },
                {
                  "code": "Redundancy Payment",
                  "label": "Redundancy Payment",
                  "order": null
                },
                {
                  "code": "Wages Act",
                  "label": "Wages Act",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "claimant_judge_only_consent",
            "label": "Judge Only Consent",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "if_C_represented",
      "label": "Are you represented ?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If someone has agreed to represent you, please fill in the following. We will in future only contact your representative and not you.",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "c_RepresentedType",
      "label": "Claimant representation",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "TRIB_C_RepresentedType",
        "type": "Complex",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [
          {
            "id": "name_of_representative",
            "label": "Name of representative",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "name_of_organisation",
            "label": "Name of Organisation",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_address",
            "label": "Representative’s Address",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_dx_number",
            "label": "Representative’s DX_number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "Number",
              "type": "Number",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_phone_number",
            "label": "Representative’s Phone",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_mobile_number",
            "label": "Representative’s Mobile",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_fax_number",
            "label": "Representative’s Fax",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_email_address",
            "label": "Representative’s Email",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_reference",
            "label": "Representative’s Reference",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_preference",
            "label": "Representative’s Preference",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": "How would you prefer us to communicate with them? (Please select only one option)",
            "field_type": {
              "id": "FixedList-TRIB_fl_Contact",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Email",
                  "label": "By email",
                  "order": null
                },
                {
                  "code": "Post",
                  "label": "By post",
                  "order": null
                },
                {
                  "code": "Fax",
                  "label": "By fax",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
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
      "show_condition": "if_C_represented=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "claimantCollection",
      "label": "Details of other claimant(s)",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "claimantCollection-5d354932-22b5-458d-ba14-29c9549a37f1",
        "type": "Collection",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": {
          "id": "TRIB_ClaimantType",
          "type": "Complex",
          "min": null,
          "max": null,
          "regular_expression": null,
          "fixed_list_items": [],
          "complex_fields": [
            {
              "id": "claimant_L_1",
              "label": "Your details",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
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
              "security_classification": "PUBLIC",
              "live_from": null,
              "live_until": null,
              "show_condition": null,
              "acls": [
                {
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_title",
              "label": "Title",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "FixedList-TRIB_fl_Title",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                  {
                    "code": "Mr",
                    "label": "Mr",
                    "order": null
                  },
                  {
                    "code": "Mrs",
                    "label": "Mrs",
                    "order": null
                  },
                  {
                    "code": "Miss",
                    "label": "Miss",
                    "order": null
                  },
                  {
                    "code": "Ms",
                    "label": "Ms",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_first_name",
              "label": "First name",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_initials",
              "label": "Initials",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_last_name",
              "label": "Last name",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_date_of_birth",
              "label": "Date of birth",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_gender",
              "label": "Gender",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "FixedList-TRIB_fl_Gender",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                  {
                    "code": "Male",
                    "label": "Male",
                    "order": null
                  },
                  {
                    "code": "Female",
                    "label": "Female",
                    "order": null
                  },
                  {
                    "code": "Non-binary",
                    "label": "Non-binary",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_addressUK",
              "label": "Address",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
              "security_classification": "PUBLIC",
              "live_from": null,
              "live_until": null,
              "show_condition": null,
              "acls": [
                {
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_phone_number",
              "label": "Phone number",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "PhoneUK",
                "type": "PhoneUK",
                "min": null,
                "max": null,
                "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_mobile_number",
              "label": "Mobile number",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "PhoneUK",
                "type": "PhoneUK",
                "min": null,
                "max": null,
                "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_fax_number",
              "label": "Fax number",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "PhoneUK",
                "type": "PhoneUK",
                "min": null,
                "max": null,
                "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_email_address",
              "label": "Email address",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
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
              "security_classification": "PUBLIC",
              "live_from": null,
              "live_until": null,
              "show_condition": null,
              "acls": [
                {
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "claimant_contact_preference",
              "label": "Contact preference",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": "How would you prefer us to contact you? (please select only one option)",
              "field_type": {
                "id": "FixedList-TRIB_fl_Contact",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                  {
                    "code": "Email",
                    "label": "By email",
                    "order": null
                  },
                  {
                    "code": "Post",
                    "label": "By post",
                    "order": null
                  },
                  {
                    "code": "Fax",
                    "label": "By fax",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
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
      "display_context": "OPTIONAL",
      "display_context_parameter": "#COLLECTION(allowDelete,allowInsert)",
      "show_condition": "caseType=\"Multiple\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "receiptDate",
      "label": "Date of Receipt",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "feeGroupReference",
      "label": "Fee Group Reference",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "Fee Group Reference (13 digit number)",
      "field_type": {
        "id": "feeGroupReference-1e7ecd7b-5479-4e15-b3e2-e79cc7640a26",
        "type": "Text",
        "min": null,
        "max": null,
        "regular_expression": "[0-9]{13}$",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "respondentType",
      "label": "Respondent details",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "TRIB_RespondentType",
        "type": "Complex",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [
          {
            "id": "respondent_name",
            "label": "Respondent full name",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": "Give name of your employer or person or organisation you are claiming against",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "respondent_address",
            "label": "Address",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "respondent_phone1",
            "label": "Telephone number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "respondent_phone2",
            "label": "Alternative Telephone number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "respondent_fax",
            "label": "Fax number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "respondent_email",
            "label": "Email",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "respondent_contact_preference",
            "label": "Contact preference",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": "How would you prefer us to contact you? (please select only one option)",
            "field_type": {
              "id": "FixedList-TRIB_fl_Contact",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Email",
                  "label": "By email",
                  "order": null
                },
                {
                  "code": "Post",
                  "label": "By post",
                  "order": null
                },
                {
                  "code": "Fax",
                  "label": "By fax",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "if_R_represented",
      "label": "Are you represented ?",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "If someone has agreed to represent you, please fill in the following. We will in future only contact your representative and not you.",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "r_RepresentedType",
      "label": "Respondent representation",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "TRIB_R_RepresentedType",
        "type": "Complex",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [
          {
            "id": "name_of_representative",
            "label": "Name of representative",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "name_of_organisation",
            "label": "Name of Organisation",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_address",
            "label": "Representative’s Address",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
                      "role": "caseworker-publiclaw",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-localAuthority",
                      "create": true,
                      "read": true,
                      "update": true,
                      "delete": false
                    },
                    {
                      "role": "caseworker-publiclaw-courtadmin",
                      "create": true,
                      "read": true,
                      "update": true,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_dx_number",
            "label": "Representative’s DX_number",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "Number",
              "type": "Number",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_phone_number",
            "label": "Representative’s Phone",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_mobile_number",
            "label": "Representative’s Mobile",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_fax_number",
            "label": "Representative’s Fax",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": null,
            "field_type": {
              "id": "PhoneUK",
              "type": "PhoneUK",
              "min": null,
              "max": null,
              "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_email_address",
            "label": "Representative’s Email",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
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
            "security_classification": "PUBLIC",
            "live_from": null,
            "live_until": null,
            "show_condition": null,
            "acls": [
              {
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_reference",
            "label": "Representative’s Reference",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ],
            "complexACLs": [],
            "display_context": null,
            "display_context_parameter": null,
            "formatted_value": null
          },
          {
            "id": "representative_preference",
            "label": "Representative’s Preference",
            "hidden": null,
            "order": null,
            "metadata": false,
            "case_type_id": null,
            "hint_text": "How would you prefer us to communicate with them? (Please select only one option)",
            "field_type": {
              "id": "FixedList-TRIB_fl_Contact",
              "type": "FixedList",
              "min": null,
              "max": null,
              "regular_expression": null,
              "fixed_list_items": [
                {
                  "code": "Email",
                  "label": "By email",
                  "order": null
                },
                {
                  "code": "Post",
                  "label": "By post",
                  "order": null
                },
                {
                  "code": "Fax",
                  "label": "By fax",
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
                "role": "caseworker-publiclaw",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-localAuthority",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-publiclaw-courtadmin",
                "create": true,
                "read": true,
                "update": true,
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
      "show_condition": "if_R_represented=\"Yes\"",
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "respondentCollection",
      "label": "Other respondents",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": null,
      "field_type": {
        "id": "respondentCollection-288e78bd-91e6-4f97-b3bc-2d6f9b8724f9",
        "type": "Collection",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": {
          "id": "TRIB_RespondentType",
          "type": "Complex",
          "min": null,
          "max": null,
          "regular_expression": null,
          "fixed_list_items": [],
          "complex_fields": [
            {
              "id": "respondent_name",
              "label": "Respondent full name",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": "Give name of your employer or person or organisation you are claiming against",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "respondent_address",
              "label": "Address",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
                        "role": "caseworker-publiclaw",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-localAuthority",
                        "create": true,
                        "read": true,
                        "update": true,
                        "delete": false
                      },
                      {
                        "role": "caseworker-publiclaw-courtadmin",
                        "create": true,
                        "read": true,
                        "update": true,
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
              "security_classification": "PUBLIC",
              "live_from": null,
              "live_until": null,
              "show_condition": null,
              "acls": [
                {
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "respondent_phone1",
              "label": "Telephone number",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "PhoneUK",
                "type": "PhoneUK",
                "min": null,
                "max": null,
                "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "respondent_phone2",
              "label": "Alternative Telephone number",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "PhoneUK",
                "type": "PhoneUK",
                "min": null,
                "max": null,
                "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "respondent_fax",
              "label": "Fax number",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": null,
              "field_type": {
                "id": "PhoneUK",
                "type": "PhoneUK",
                "min": null,
                "max": null,
                "regular_expression": "^(((\\+44\\s?\\d{4}|\\(?0\\d{4}\\)?)\\s?\\d{3}\\s?\\d{3})|((\\+44\\s?\\d{3}|\\(?0\\d{3}\\)?)\\s?\\d{3}\\s?\\d{4})|((\\+44\\s?\\d{2}|\\(?0\\d{2}\\)?)\\s?\\d{4}\\s?\\d{4}))(\\s?\\#(\\d{4}|\\d{3}))?$",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "respondent_email",
              "label": "Email",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
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
              "security_classification": "PUBLIC",
              "live_from": null,
              "live_until": null,
              "show_condition": null,
              "acls": [
                {
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ],
              "complexACLs": [],
              "display_context": null,
              "display_context_parameter": null,
              "formatted_value": null
            },
            {
              "id": "respondent_contact_preference",
              "label": "Contact preference",
              "hidden": null,
              "order": null,
              "metadata": false,
              "case_type_id": null,
              "hint_text": "How would you prefer us to contact you? (please select only one option)",
              "field_type": {
                "id": "FixedList-TRIB_fl_Contact",
                "type": "FixedList",
                "min": null,
                "max": null,
                "regular_expression": null,
                "fixed_list_items": [
                  {
                    "code": "Email",
                    "label": "By email",
                    "order": null
                  },
                  {
                    "code": "Post",
                    "label": "By post",
                    "order": null
                  },
                  {
                    "code": "Fax",
                    "label": "By fax",
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
                  "role": "caseworker-publiclaw",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-localAuthority",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                },
                {
                  "role": "caseworker-publiclaw-courtadmin",
                  "create": true,
                  "read": true,
                  "update": true,
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
      "display_context": "OPTIONAL",
      "display_context_parameter": "#COLLECTION(allowDelete,allowInsert)",
      "show_condition": null,
      "show_summary_change_option": true,
      "show_summary_content_option": null,
      "acls": [
        {
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    },
    {
      "id": "caseNote",
      "label": "Case note",
      "hidden": null,
      "value": null,
      "metadata": false,
      "hint_text": "(150 character limit)",
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
          "role": "caseworker-publiclaw",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-localAuthority",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        },
        {
          "role": "caseworker-publiclaw-courtadmin",
          "create": true,
          "read": true,
          "update": true,
          "delete": false
        }
      ]
    }
  ],
  "event_token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJuajRwdGpnbXZoNTlsMnU5cjJmZGYxaXQ4Iiwic3ViIjoiNDFhOTBjMzktZDc1Ni00ZWJhLThlODUtNWI1YmY1NmIzMWY1IiwiaWF0IjoxNTk2NzkwMDExLCJldmVudC1pZCI6ImluaXRpYXRlQ2FzZSIsImNhc2UtdHlwZS1pZCI6IlRSSUJfTVZQXzNfVFlQRSIsImp1cmlzZGljdGlvbi1pZCI6IlBVQkxJQ0xBVyIsImNhc2UtdmVyc2lvbiI6ImJmMjFhOWU4ZmJjNWEzODQ2ZmIwNWI0ZmEwODU5ZTA5MTdiMjIwMmYifQ.NqdzCehTV2bJ3v6ByhQl8s2Vm_B8VZ9-DvfNmq9ncik",
  "wizard_pages": [
    {
      "id": "initiateCase1",
      "label": "Create a case",
      "order": 1,
      "wizard_page_fields": [
        {
          "case_field_id": "caseAssignee",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "caseType",
          "order": 4,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "multipleType",
          "order": 5,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "multipleOthers",
          "order": 6,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "multipleReference",
          "order": 7,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "receiptDate",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "feeGroupReference",
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
      "id": "initiateCase2",
      "label": "Claimant details",
      "order": 2,
      "wizard_page_fields": [
        {
          "case_field_id": "claimantType",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "claimantOtherType",
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
      "id": "initiateCase3",
      "label": "Claimant details",
      "order": 3,
      "wizard_page_fields": [
        {
          "case_field_id": "if_C_represented",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "c_RepresentedType",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "claimantCollection",
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
      "id": "initiateCase4",
      "label": "Respondent details",
      "order": 4,
      "wizard_page_fields": [
        {
          "case_field_id": "respondentType",
          "order": 1,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "if_R_represented",
          "order": 2,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "r_RepresentedType",
          "order": 3,
          "page_column_no": 1,
          "complex_field_overrides": []
        },
        {
          "case_field_id": "respondentCollection",
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
      "id": "initiateCase5",
      "label": "Case Note",
      "order": 5,
      "wizard_page_fields": [
        {
          "case_field_id": "caseNote",
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
      "href": "http://gateway-ccd.aat.platform.hmcts.net/internal/case-types/TRIB_MVP_3_TYPE/event-triggers/initiateCase?ignore-warning=false"
    }
  }
};
