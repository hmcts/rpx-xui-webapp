module.exports =  LabelField = {
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
};