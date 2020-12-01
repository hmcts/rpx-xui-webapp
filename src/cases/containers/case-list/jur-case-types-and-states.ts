export const JURISDICTIONS_CASE_TYPE_AND_STATES = [
  {
    "id": "DIVORCE",
    "name": "Family Divorce",
    "description": "Family Divorce: dissolution of marriage",
    "caseTypes": [
      {
        "id": "FinancialRemedyForDAC",
        "description": "Financial Remedy MVP_v0.3 For DAC",
        // "version": null,
        "name": "Financial Remedy MVP_v0.3-DAC",
        "states": [
          {
            "id": "caseAdded",
            "name": "Application Drafted",
            "description": null,
            "order": 1,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingHWFDecision",
            "name": "Awaiting HWF Decision",
            "description": null,
            "order": 2,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPayment",
            "name": "Solicitor - Awaiting Payment",
            "description": null,
            "order": 3,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPaymentResponse",
            "name": "Awaiting Payment Response",
            "description": null,
            "order": 4,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationSubmitted",
            "name": "Application Submitted",
            "description": null,
            "order": 5,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationIssued",
            "name": "Application Issued",
            "description": null,
            "order": 6,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "referredToJudge",
            "name": "Awaiting Judicial Response",
            "description": null,
            "order": 7,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "orderMade",
            "name": "Order Made",
            "description": null,
            "order": 8,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderApproved",
            "name": "Consent Order Approved",
            "description": null,
            "order": 9,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderMade",
            "name": "Consent Order Made",
            "description": null,
            "order": 10,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingResponse",
            "name": "Awaiting Response",
            "description": null,
            "order": 11,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-test",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
                "create": true,
                "read": false,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
            "role": "caseworker-test",
            "create": true,
            "read": true,
            "update": true,
            "delete": true
          },
          {
            "role": "caseworker-divorce-financialremedy-judiciary",
            "create": true,
            "read": true,
            "update": true,
            "delete": true
          },
          {
            "role": "caseworker-divorce-financialremedy",
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
        "id": "FinancialRemedyMVP2Respondent",
        "description": "Financial Remedy Consented Respondent",
        "version": null,
        "name": "Financial Rem Consented Resp",
        "states": [
          {
            "id": "caseAdded",
            "name": "Application Drafted",
            "description": null,
            "order": 1,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
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
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "newPaperCase",
            "name": "New Paper Case",
            "description": null,
            "order": 2,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
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
            "id": "awaitingHWFDecision",
            "name": "Awaiting HWF Decision",
            "description": null,
            "order": 3,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPayment",
            "name": "Solicitor - Awaiting Payment",
            "description": null,
            "order": 4,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPaymentResponse",
            "name": "Awaiting Payment Response",
            "description": null,
            "order": 5,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationSubmitted",
            "name": "Application Submitted",
            "description": null,
            "order": 6,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationIssued",
            "name": "Application Issued",
            "description": null,
            "order": 7,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "referredToJudge",
            "name": "Awaiting Judicial Response",
            "description": null,
            "order": 8,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "orderMade",
            "name": "Consent Order Not Approved",
            "description": null,
            "order": 9,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderApproved",
            "name": "Consent Order Approved",
            "description": null,
            "order": 10,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderMade",
            "name": "Consent Order Made",
            "description": null,
            "order": 11,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingResponse",
            "name": "Awaiting Response",
            "description": null,
            "order": 12,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "responseReceived",
            "name": "Response Received",
            "description": null,
            "order": 13,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingInfo",
            "name": "Awaiting Information",
            "description": null,
            "order": 14,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "close",
            "name": "Close",
            "description": null,
            "order": 15,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
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
            "role": "caseworker-divorce-financialremedy-judiciary",
            "create": true,
            "read": true,
            "update": true,
            "delete": true
          },
          {
            "role": "caseworker-divorce-financialremedy",
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
          },
          {
            "role": "caseworker-divorce-systemupdate",
            "create": true,
            "read": true,
            "update": true,
            "delete": true
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
        "id": "MyAddressBook",
        "description": "This is my address book",
        "version": null,
        "name": "My Address Book",
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
      },
      {
        "id": "FinancialRemedyContested",
        "description": "Contested Financial Remedy – Form A",
        "version": null,
        "name": "Contested Financial Remedy",
        "states": [
          {
            "id": "caseAdded",
            "name": "Application Drafted",
            "description": null,
            "order": 1,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingHWFDecision",
            "name": "Awaiting HWF Decision",
            "description": null,
            "order": 2,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPaymentResponse",
            "name": "Awaiting Payment Response",
            "description": null,
            "order": 3,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationSubmitted",
            "name": "Application Submitted",
            "description": null,
            "order": 4,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationIssued",
            "name": "Application Issued",
            "description": null,
            "order": 5,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "gateKeepingAndAllocation",
            "name": "Gate Keeping And Allocation",
            "description": null,
            "order": 6,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "schedulingAndHearing",
            "name": "Scheduling And Hearing",
            "description": null,
            "order": 7,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "prepareForHearing",
            "name": "Prepare For Hearing",
            "description": null,
            "order": 8,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "caseFileSubmitted",
            "name": "Ready for Hearing",
            "description": null,
            "order": 9,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "close",
            "name": "Close",
            "description": null,
            "order": 10,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentProcess",
            "name": "Consent Process",
            "description": null,
            "order": 11,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingJudiciaryResponse",
            "name": "Awaiting Judiciary Response",
            "description": null,
            "order": 12,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderApproved",
            "name": "Consent Order Approved",
            "description": null,
            "order": 13,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderNotApproved",
            "name": "Consent Order Not Approved",
            "description": null,
            "order": 14,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderMade",
            "name": "Consent Order Made",
            "description": null,
            "order": 15,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "caseWorkerReview",
            "name": "Case Worker Review",
            "description": null,
            "order": 16,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "judgeDraftOrder",
            "name": "Judge Draft Order",
            "description": null,
            "order": 17,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "solicitorDraftOrder",
            "name": "Solicitor Draft Order",
            "description": null,
            "order": 18,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "reviewOrder",
            "name": "Review Order",
            "description": null,
            "order": 19,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "draftOrderNotApproved",
            "name": "Draft Order Not Approved",
            "description": null,
            "order": 20,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "scheduleRaiseDirectionsOrder",
            "name": "Schedule & Raise Directions Order",
            "description": null,
            "order": 21,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "orderDrawn",
            "name": "Order Drawn",
            "description": null,
            "order": 22,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "orderSent",
            "name": "Order Sent",
            "description": null,
            "order": 23,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentedOrderSubmitted",
            "name": "Consented Order Submitted",
            "description": null,
            "order": 24,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingJudiciaryResponseConsent",
            "name": "Awaiting Judiciary Response (Consent)",
            "description": null,
            "order": 25,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentedOrderAssignJudge",
            "name": "Consent Assigned to Judge",
            "description": null,
            "order": 26,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentedOrderApproved",
            "name": "Consented Order Approved",
            "description": null,
            "order": 27,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "responseReceived",
            "name": "Response Received",
            "description": null,
            "order": 28,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentedOrderNotApproved",
            "name": "Consented Order Not Approved",
            "description": null,
            "order": 29,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "generalApplication",
            "name": "General Application",
            "description": null,
            "order": 30,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "generalApplicationAwaitingJudiciaryResponse",
            "name": "Awaiting Judiciary Response (Application)",
            "description": null,
            "order": 31,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-courtadmin",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "generalApplicationOutcome",
            "name": "General Application Outcome",
            "description": null,
            "order": 32,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${respondentLName}**",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-systemupdate",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
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
            "role": "caseworker-divorce-financialremedy-judiciary",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-divorce-financialremedy-courtadmin",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-divorce-financialremedy-solicitor",
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
            "role": "caseworker-divorce-bulkscan",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-caa",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          }
        ]
      },
      {
        "id": "FinancialRemedyMVP2",
        "description": "Financial Remedy",
        "version": null,
        "name": "Financial Remedy Consented",
        "states": [
          {
            "id": "caseAdded",
            "name": "Application Drafted",
            "description": null,
            "order": 1,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "newPaperCase",
            "name": "New Paper Case",
            "description": null,
            "order": 2,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingHWFDecision",
            "name": "Awaiting HWF Decision",
            "description": null,
            "order": 3,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPayment",
            "name": "Solicitor - Awaiting Payment",
            "description": null,
            "order": 4,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingPaymentResponse",
            "name": "Awaiting Payment Response",
            "description": null,
            "order": 5,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationSubmitted",
            "name": "Application Submitted",
            "description": null,
            "order": 6,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "applicationIssued",
            "name": "Application Issued",
            "description": null,
            "order": 7,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "referredToJudge",
            "name": "Awaiting Judicial Response",
            "description": null,
            "order": 8,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "orderMade",
            "name": "Consent Order Not Approved",
            "description": null,
            "order": 9,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderApproved",
            "name": "Consent Order Approved",
            "description": null,
            "order": 10,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": true,
                "read": true,
                "update": true,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "consentOrderMade",
            "name": "Consent Order Made",
            "description": null,
            "order": 11,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingResponse",
            "name": "Awaiting Response",
            "description": null,
            "order": 12,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "responseReceived",
            "name": "Response Received",
            "description": null,
            "order": 13,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "awaitingInfo",
            "name": "Awaiting Information",
            "description": null,
            "order": 14,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "infoReceived",
            "name": "Information Received",
            "description": null,
            "order": 15,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy",
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
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
                "role": "caseworker-divorce-bulkscan",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "close",
            "name": "Close",
            "description": null,
            "order": 16,
            "title_display": "**${[CASE_REFERENCE]}  ${applicantLName}  vs ${appRespondentLName}**",
            "acls": [
              {
                "role": "caseworker-divorce-financialremedy-judiciary",
                "create": false,
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
                "delete": false
              },
              {
                "role": "caseworker-divorce-financialremedy-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-caa",
                "create": false,
                "read": true,
                "update": false,
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
            "role": "caseworker-divorce-financialremedy-judiciary",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-divorce-financialremedy",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-divorce-financialremedy-courtadmin",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-divorce-financialremedy-solicitor",
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
            "role": "caseworker-divorce-bulkscan",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          },
          {
            "role": "caseworker-caa",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          }
        ]
      },
      {
        "id": "DIVORCE_NOTICE_OF_ACTING",
        "description": "Solicitor Notice of Acting",
        "version": null,
        "name": "Notice Of Acting - v0.1",
        "states": [
          {
            "id": "Created",
            "name": "Noticed of Acting case created",
            "description": "Noticed of Acting case created",
            "order": 1,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-divorce-solicitor",
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
            "role": "caseworker-divorce-solicitor",
            "create": true,
            "read": true,
            "update": true,
            "delete": false
          }
        ]
      },
      {
        "id": "DIVORCE",
        "description": "Handling of the dissolution of marriage",
        "version": null,
        "name": "Divorce case - v115.00",
        "states": [
          {
            "id": "RemovedFromBulkCaseList",
            "name": "Removed from bulk case list",
            "description": "Removed from bulk case list",
            "order": 1,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin_beta",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingPayment",
            "name": "Petition awaiting payment",
            "description": "Petition awaiting online payment",
            "order": 1,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingHWFDecision",
            "name": "Awaiting HWF decision",
            "description": "Awaiting HWF decision",
            "order": 2,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingDocuments",
            "name": "Awaiting petitioner",
            "description": "Case created and awaiting action by the petitioner",
            "order": 3,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "Submitted",
            "name": "Petition submitted",
            "description": "Petition paid and submitted",
            "order": 4,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "Issued",
            "name": "Petition issued",
            "description": "Petition issued",
            "order": 5,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "Rejected",
            "name": "Petition rejected",
            "description": "Petition rejected",
            "order": 6,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "PendingRejection",
            "name": "Pending rejection",
            "description": "Petition pending rejection",
            "order": 7,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "SOTAgreementPayAndSubmitRequired",
            "name": "Statement of Truth, Pay and Submit Required",
            "description": "Statement of Truth, Pay and Submit Required",
            "order": 8,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "caseworker-divorce-solicitor",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "solicitorAwaitingPaymentConfirmation",
            "name": "Solicitor - Awaiting Payment Confirmation",
            "description": "Solicitor - Awaiting Payment Confirmation",
            "order": 9,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosAwaiting",
            "name": "AOS Awaiting",
            "description": "AOS Awaiting",
            "order": 10,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosStarted",
            "name": "AOS Started",
            "description": "AOS Started",
            "order": 11,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosDrafted",
            "name": "AOS Drafted",
            "description": "AOS Drafted",
            "order": 12,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosSubmittedAwaitingAnswer",
            "name": "AOS Submitted Awaiting Answer",
            "description": "AOS Submitted Awaiting Answer",
            "order": 12,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingDecreeNisi",
            "name": "Awaiting DN application",
            "description": "Awaiting DN application",
            "order": 14,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DNDrafted",
            "name": "Decree Nisi Application Drafted",
            "description": "Decree Nisi Application Drafted",
            "order": 15,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingService",
            "name": "Awaiting Service",
            "description": "Awaiting Service",
            "order": 15,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosOverdue",
            "name": "AOS Overdue",
            "description": "AOS Overdue",
            "order": 16,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingReissue",
            "name": "Awaiting reissue",
            "description": "Awaiting reissue",
            "order": 17,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingLegalAdvisorReferral",
            "name": "Awaiting legal advisor referral",
            "description": "Awaiting legal advisor referral",
            "order": 18,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingConsideration",
            "name": "Awaiting consideration",
            "description": "Awaiting consideration",
            "order": 19,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AmendPetition",
            "name": "Amend petition",
            "description": "Amend petition",
            "order": 20,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingClarification",
            "name": "Awaiting clarification",
            "description": "Awaiting clarification",
            "order": 21,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "ClarificationSubmitted",
            "name": "Clarification Response Submitted",
            "description": "Decree Nisi Clarification Response Submitted",
            "order": 22,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingAdminClarification",
            "name": "Awaiting admin clarification",
            "description": "Awaiting admin clarification",
            "order": 22,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DefendedDivorce",
            "name": "Defended divorce",
            "description": "Defended divorce",
            "order": 22,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOTranslationRequested",
            "name": "Translation Requested",
            "description": "Translation Requested",
            "order": 23,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingAmendCase",
            "name": "Awaiting Amend Case",
            "description": "Awaiting Amend Case",
            "order": 24,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin-la",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingPronouncement",
            "name": "Listed; Awaiting pronouncement",
            "description": "Has been Listed; Awaiting pronouncement",
            "order": 24,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingDecreeAbsolute",
            "name": "Awaiting DA Application",
            "description": "Awaiting DA application",
            "order": 26,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "WelshResponseAwaitingReview",
            "name": "Welsh AOS",
            "description": "Welsh AOS",
            "order": 28,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DivorceGranted",
            "name": "Divorce granted",
            "description": "Divorce granted",
            "order": 30,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "WelshLADecision",
            "name": "Welsh LA Decision",
            "description": "Welsh LA Decision",
            "order": 30,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-superuser",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "WelshDNReceived",
            "name": "Welsh DN Received",
            "description": "Welsh DN Received",
            "order": 31,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "Withdrawn",
            "name": "Withdraw",
            "description": "Withdraw petition",
            "order": 32,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingServicePayment",
            "name": "Awaiting Service Payment",
            "description": "Awaiting service payment",
            "order": 32,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosCompleted",
            "name": "AOS Completed",
            "description": "AOS Completed",
            "order": 33,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingServiceConsideration",
            "name": "Awaiting Service Consideration",
            "description": "Awaiting Service Consideration",
            "order": 33,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DNisRefused",
            "name": "DN application refused",
            "description": "DN application has been refused",
            "order": 34,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
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
                "create": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "ServiceApplicationNotApproved",
            "name": "Service Application Not Approved",
            "description": "Service Application Not Approved",
            "order": 34,
            "title_display": null,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosAwaitingSol",
            "name": "Awaiting AOS (Solicitor)",
            "description": "Awaiting AOS from solicitor",
            "order": 35,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingGeneralReferralPayment",
            "name": "Awaiting General Referral Payment",
            "description": "Awaiting General Referral Payment",
            "order": 35,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin-la",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-superuser",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingBailiffService",
            "name": "Awaiting Bailiff Service",
            "description": "Awaiting Bailiff Service",
            "order": 35,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AosPreSubmit",
            "name": "AOS PreSubmit",
            "description": "AOS PreSubmit (Intermediary state)",
            "order": 36,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin_beta",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingGeneralConsideration",
            "name": "Awaiting General Consideration",
            "description": "Awaiting General Consideration",
            "order": 36,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DNPronounced",
            "name": "Decree Nisi Pronounced",
            "description": "Decree Nisi Pronounced",
            "order": 37,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "GeneralConsiderationComplete",
            "name": "General consideration complete",
            "description": "General consideration complete",
            "order": 37,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DARequested",
            "name": "Decree Absolute Requested",
            "description": "Decree Absolute Requested",
            "order": 38,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin_beta",
                "create": false,
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
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-superuser",
                "create": false,
                "read": true,
                "update": true,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingProcessServerService",
            "name": "Awaiting process server service",
            "description": "Awaiting process server service",
            "order": 38,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin-la",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-superuser",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-bulkscan",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "DAOverdue",
            "name": "Decree Absolute Overdue",
            "description": "Decree Absolute Overdue",
            "order": 39,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingAlternativeService",
            "name": "Awaiting alternative service",
            "description": "Awaiting alternative service",
            "order": 39,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-superuser",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "AwaitingDWPResponse",
            "name": "Awaiting DWP response",
            "description": "Awaiting DWP response",
            "order": 40,
            "title_display": "${[CASE_REFERENCE]}: ${D8PetitionerLastName} vs ${D8RespondentLastName}",
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-courtadmin",
                "create": false,
                "read": true,
                "update": false,
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
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-divorce-superuser",
                "create": false,
                "read": true,
                "update": false,
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
          },
          {
            "role": "caseworker-divorce-pcqextractor",
            "create": false,
            "read": true,
            "update": false,
            "delete": false
          }
        ]
      }
    ]
  },
  {
    "id": "PROBATE",
    "name": "Manage probate application",
    "description": "Services (grant of representation, caveats, will lodgment, standing search, settlers, pre lodgement)",
    "caseTypes": [
      {
        "id": "Caveat",
        "description": "Probate - Caveat",
        "version": null,
        "name": "Caveat",
        "states": [
          {
            "id": "SolAppCreated",
            "name": "Caveat created",
            "description": "Caveat created (Solicitor)",
            "order": 2,
            "title_display": null,
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
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "SolAppUpdated",
            "name": "Caveat updated",
            "description": "Caveat updated (Solicitor)",
            "order": 3,
            "title_display": null,
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
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "CaveatRaised",
            "name": "Caveat raised",
            "description": "Caveat raised",
            "order": 4,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
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
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "CaveatClosed",
            "name": "Caveat closed",
            "description": "Caveat closed",
            "order": 7,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "CaveatMatching",
            "name": "Caveat matching",
            "description": "Caveat matching",
            "order": 8,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "AwaitingCaveatResolution",
            "name": "Awaiting caveat resolution",
            "description": "Awaiting caveat resolution",
            "order": 9,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "WarningValidation",
            "name": "Warning validation",
            "description": "Warning validation",
            "order": 10,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "CaveatPermanent",
            "name": "Caveat Permanent",
            "description": "Caveat Permanent",
            "order": 15,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
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
            "delete": true
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
            "role": "caseworker-probate-systemupdate",
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
          },
          {
            "role": "caseworker-probate-pcqextractor",
            "create": false,
            "read": true,
            "update": false,
            "delete": false
          }
        ]
      },
      {
        "id": "GrantOfRepresentation",
        "description": "Probate - Grant of Representation",
        "version": null,
        "name": "Grant of representation",
        "states": [
          {
            "id": "SolAppCreated",
            "name": "Application created",
            "description": "Application created (Solicitor)",
            "order": 2,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "SolAppUpdated",
            "name": "Application updated",
            "description": "Application updated (Solicitor)",
            "order": 3,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "SolProbateCreated",
            "name": "Grant of probate created",
            "description": "Grant of probate created (Solicitor)",
            "order": 4,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "SolIntestacyCreated",
            "name": "Intestacy grant created",
            "description": "Intestacy grant created (Solicitor)",
            "order": 5,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "SolAdmonCreated",
            "name": "Admon will grant created",
            "description": "Admon will grant created (Solicitor)",
            "order": 6,
            "title_display": null,
            "acls": [
              {
                "role": "caseworker-probate-solicitor",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              }
            ]
          },
          {
            "id": "CaseCreated",
            "name": "Case created",
            "description": "Case created",
            "order": 4,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": true,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "Stopped",
            "name": "Stopped",
            "description": "Stopped",
            "order": 6,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "CasePrinted",
            "name": "Awaiting documentation",
            "description": "Awaiting documentation",
            "order": 7,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOReadyForExamination",
            "name": "Ready for examination",
            "description": "Ready for examination",
            "order": 8,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOExamining",
            "name": "Examining",
            "description": "Examining",
            "order": 9,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseStopped",
            "name": "Case stopped",
            "description": "Case stopped",
            "order": 10,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaveatPermenant",
            "name": "Caveat permenant",
            "description": "Caveat permenant",
            "order": 11,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BORegistrarEscalation",
            "name": "Registrar escalation",
            "description": "Registrar escalation",
            "order": 12,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOReadyToIssue",
            "name": "Ready to issue",
            "description": "Ready to issue",
            "order": 13,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseQA",
            "name": "Case selected for QA",
            "description": "Case selected for QA",
            "order": 14,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOGrantIssued",
            "name": "Grant issued",
            "description": "Grant issued",
            "order": 17,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseMatchingIssueGrant",
            "name": "Case Matching (Issue grant)",
            "description": "Case Matching (Issue grant)",
            "order": 15,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseMatchingExamining",
            "name": "Case Matching (Examining)",
            "description": "Case Matching (Examining)",
            "order": 16,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
              },
              {
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseClosed",
            "name": "Case closed",
            "description": "Case closed",
            "order": 18,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-issuer",
                "create": true,
                "read": true,
                "update": true,
                "delete": true
              },
              {
                "role": "caseworker-probate-systemupdate",
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOExaminingReissue",
            "name": "Examining (reissue)",
            "description": "Case Imported",
            "order": 21,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseMatchingReissue",
            "name": "Case Matching (Reissue grant)",
            "description": "Case Matching (Reissue grant)",
            "order": 22,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseStoppedReissue",
            "name": "Case stopped (reissue)",
            "description": "Case stopped",
            "order": 23,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOCaseStoppedAwaitRedec",
            "name": "Awaiting redeclaration",
            "description": "Awaiting redeclaration",
            "order": 24,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BORedecNotificationSent",
            "name": "Redeclaration notifications sent",
            "description": "Redeclaration notifications sent",
            "order": 26,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              }
            ]
          },
          {
            "id": "BOSotGenerated",
            "name": "SOT generated",
            "description": "SOT generated",
            "order": 27,
            "title_display": null,
            "acls": [
              {
                "role": "citizen",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
              },
              {
                "role": "caseworker-probate-solicitor",
                "create": false,
                "read": true,
                "update": false,
                "delete": false
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
                "role": "caseworker-probate-pcqextractor",
                "create": false,
                "read": true,
                "update": false,
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
            "delete": true
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
            "role": "caseworker-probate",
            "create": true,
            "read": true,
            "update": true,
            "delete": true
          },
          {
            "role": "caseworker-probate-systemupdate",
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
          },
          {
            "role": "caseworker-probate-pcqextractor",
            "create": false,
            "read": true,
            "update": false,
            "delete": false
          }
        ]
      }
    ]
  }
]
