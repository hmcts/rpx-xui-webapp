module.exports = { 
  data: [
    {
      "id": "DIVORCE",
      "name": "Family Divorce",
      "description": "Family Divorce: dissolution of marriage",
      "caseTypes": [
        {
          "id": "MyAddressBook",
          "description": "This is my address book",
          "version": null,
          "name": "My Address Book",
          "events": [
            {
              "id": "createMyAddress",
              "name": "Create My Address",
              "description": "Create Address",
              "order": null,
              "case_fields": [],
              "pre_states": [],
              "post_state": null,
              "callback_url_about_to_start_event": null,
              "retries_timeout_about_to_start_event": null,
              "callback_url_about_to_submit_event": null,
              "retries_timeout_url_about_to_submit_event": null,
              "callback_url_submitted_event": null,
              "retries_timeout_url_submitted_event": null,
              "security_classification": null,
              "show_summary": null,
              "show_event_notes": null,
              "end_button_label": null,
              "can_save_draft": null,
              "acls": [
                {
                  "role": "caseworker-divorce",
                  "create": true,
                  "read": true,
                  "update": false,
                  "delete": false
                }
              ]
            }
          ],
          "states": [
            {
              "id": "created",
              "name": "Create",
              "description": "Create Address Book",
              "order": 8,
              "title_display": null,
              "acls": [
                {
                  "role": "caseworker-divorce",
                  "create": true,
                  "read": true,
                  "update": true,
                  "delete": false
                }
              ]
            }
          ],
          "searchAliasFields": [],
          "jurisdiction": null,
          "security_classification": null,
          "case_fields": [],
          "printable_document_url": null,
          "acls": [
            {
              "role": "citizen",
              "create": true,
              "read": true,
              "update": true,
              "delete": false
            },
            {
              "role": "caseworker-divorce",
              "create": true,
              "read": true,
              "update": true,
              "delete": false
            }
          ]
        }
      ]
    }
  ]
};
