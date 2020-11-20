const ccdApiMock = require('./ccd/ccdApi');

const requestMapping = {
   get:{
       '/auth/isAuthenticated' : (req,res) => {
            res.send(true);
       },
       '/api/organisation': (req,res) => {
           res.send(getOrganisation());
       },
       '/external/configuration-ui': (req,res) => {
           res.send({"googleAnalyticsKey":"UA-124734893-4","idamWeb":"https://idam-web-public.aat.platform.hmcts.net","launchDarklyClientId":"5de6610b23ce5408280f2268","manageCaseLink":"https://xui-webapp-aat.service.core-compute-aat.internal/cases","manageOrgLink":"https://xui-mo-webapp-aat.service.core-compute-aat.internal","protocol":"http"});
       },
        '/external/config/ui': (req, res) => {
            res.send({ "googleAnalyticsKey": "UA-124734893-4", "idamWeb": "https://idam-web-public.aat.platform.hmcts.net", "launchDarklyClientId": "5de6610b23ce5408280f2268", "manageCaseLink": "https://xui-webapp-aat.service.core-compute-aat.internal/cases", "manageOrgLink": "https://xui-mo-webapp-aat.service.core-compute-aat.internal", "protocol": "http" });
        },
       '/external/configuration': (req,res) => {
           res.send(""+getConfigurationValue(req.query.configurationKey));
       },
        '/api/configuration': (req, res) => {
            res.send("" + getConfigurationValue(req.query.configurationKey));
        },
       '/api/healthCheck': (req,res) => {
           res.send({"healthState":true});
       },
       '/api/userList':(req,res) => {
            res.send(getUsersList());
       },
       '/api/jurisdictions':(req,res) => {
            res.send(getJurisdictions());
       },
       '/api/user/details': (req,res) => {
           res.send({"canShareCases":true,"sessionTimeout":{"idleModalDisplayTime":10,"pattern":"-solicitor","totalIdleTime":50}}); 
       },
       '/api/unassignedcases':(req,res) => {
           res.send(createCaseData(5));
       },
       '/api/caseshare/cases': (req,res) => {
           res.send(getShareCases());
       },
       '/api/caseshare/users': (req,res) => {
           res.send(organisationUsers());
       },
       '/aggregated/caseworkers/:uid/jurisdictions':(req,res) =>{
           res.send(ccdApiMock.getJurisdictions());
       },
       '/data/internal/case-types/:jurisdiction/work-basket-inputs' : (req,res) => {
           res.send(ccdApiMock.getWorkbasketInputs(req.params.jurisdiction));

       },
        '/data/internal/case-types/:jurisdiction/event-triggers/:caseType': (req, res) => {
            res.send(ccdApiMock.getSolicitorCreateCaseConfig(req.params.jurisdiction, req.params.caseType));

        }
        ,

        '/aggregated/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases': (req, res) => {
                     res.send(getWorkbasketCases());     
        }

        , '/data/caseworkers/:uid/jurisdictions/:jurisdiction/case-types/:caseType/cases/pagination_metadata' : (req,res) => {
          res.send({ "total_results_count": 400, "total_pages_count": 16 });
        }
    },
    post:{
        '/api/inviteUser': (req,res) => {
            res.send({"userIdentifier":"97ecc487-cdeb-42a8-b794-84840a4testc","idamStatus":null});
        },
        '/data/internal/searchCases' : (req,res) => {
            res.send(getWorkbasketCases());
        },
        '/api/caseshare/case-assignments': (req, res) => {
            res.send( []);
        }

    },
    put:{

    },
    delete:{

    }

}

const configurations = {
    'feature.termsAndConditionsEnabled':false,
    'termsAndConditionsEnabled':false

}

function getConfigurationValue(configurationKey){
    return configurations[configurationKey]; 
}

function getOrganisation(){
    return {"organisationIdentifier":"VRSFNPV","name":"Test sreekanth org","status":"ACTIVE","sraId":null,"sraRegulated":false,"companyNumber":null,"companyUrl":null,"superUser":{"firstName":"test","lastName":"test","email":"sreekanth_su1@mailinator.com"},"paymentAccount":[],"contactInformation":[{"addressLine1":"Flat 39","addressLine2":"Sheraton House","addressLine3":null,"townCity":"London","county":"Essex","country":null,"postCode":"SW1V 3BZ","dxAddress":[]}]}

}

function getUsersList(){
    return {"organisationIdentifier":"VRSFNPV","users":[{"userIdentifier":"41f7963b-4186-4463-b96d-32dfa31f6915","firstName":"test","lastName":"tes","email":"test65757@test7687.com","idamStatus":"PENDING","roles":null,"idamStatusCode":" ","idamMessage":"19 No call made to SIDAM to get the user roles as user status is not 'ACTIVE'"},{"userIdentifier":"4510b778-6a9d-4c53-918a-c3f80bd7aadd","firstName":"test","lastName":"test","email":"sreekanth_su1@mailinator.com","idamStatus":"ACTIVE","roles":["pui-finance-manager","pui-user-manager","caseworker-publiclaw","caseworker-divorce","caseworker-divorce-solicitor","pui-organisation-manager","caseworker-probate","caseworker-probate-solicitor","caseworker-ia","caseworker-publiclaw-solicitor","pui-case-manager","caseworker-divorce-financialremedy","caseworker-ia-legalrep-solicitor","caseworker-divorce-financialremedy-solicitor","caseworker"],"idamStatusCode":"200","idamMessage":"11 OK"}]}
}

function getJurisdictions(){
    return [{"id":"SSCS"},{"id":"AUTOTEST1"},{"id":"DIVORCE"},{"id":"PROBATE"},{"id":"PUBLICLAW"},{"id":"bulkscan"},{"id":"BULKSCAN"},{"id":"IA"},{"id":"EMPLOYMENT"},{"id":"CMC"}]
}


module.exports = { requestMapping,configurations};

function getShareCases(){
    return [
        {
            "caseId": "1573922332670942",
            "caseTitle": "Paul Saddlebrook Vs Jennifer Saddlebrook",
            "sharedWith": [
                {
                    "idamId": "u111111",
                    "firstName": "Joe",
                    "lastName": "Elliott",
                    "email": "joe.elliott@woodford.com"
                },
                {
                    "idamId": "u222222",
                    "firstName": "Steve",
                    "lastName": "Harrison",
                    "email": "steve.harrison@woodford.com"
                }
            ]
        },
        {
            "caseId": "1573925439311211",
            "caseTitle": "Neha Venkatanarasimharaj Vs Sanjet Venkatanarasimharaj",
            "sharedWith": []
        },
        {
            "caseId": "1574006431043307",
            "caseTitle": "Sam Green Vs Williams Lee",
            "sharedWith": [
                {
                    "idamId": "u666666",
                    "firstName": "Kate",
                    "lastName": "Grant",
                    "email": "kate.grant@lambbrooks.com"
                },
                {
                    "idamId": "u777777",
                    "firstName": "Nick",
                    "lastName": "Rodrigues",
                    "email": "nick.rodrigues@lambbrooks.com"
                },
                {
                    "idamId": "u888888",
                    "firstName": "Joel",
                    "lastName": "Molloy",
                    "email": "joel.molloy@lambbrooks.com"
                }
            ]
        }
    ];
}

function organisationUsers(){

    return [{ "idamId": "u111111", "firstName": "Joe", "lastName": "Elliott", "email": "joe.elliott@woodford.com" }, { "idamId": "u222222", "firstName": "Steve", "lastName": "Harrison", "email": "steve.harrison@woodford.com" }, { "idamId": "u333333", "firstName": "James", "lastName": "Priest", "email": "james.priest@woodford.com" }, { "idamId": "u444444", "firstName": "Shaun", "lastName": "Coldwell", "email": "shaun.coldwell@woodford.com" }];
}

function getWorkbasketCases(){
  let cols = [{
      "label": "Case reference",
      "order": 1,
      "metadata": true,
      "case_field_id": "[CASE_REFERENCE]",
      "case_field_type": {
        "id": "Number",
        "type": "Number",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      },
      "display_context_parameter": null
    },
    {
      "label": "Your reference",
      "order": 2,
      "metadata": false,
      "case_field_id": "solsSolicitorAppReference",
      "case_field_type": {
        "id": "solsSolicitorAppReference-1dfb2a37-bfdf-4ff8-a174-41de34b4598a",
        "type": "Text",
        "min": null,
        "max": 100,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      },
      "display_context_parameter": null
    },
    {
      "label": "First name(s) of deceased",
      "order": 3,
      "metadata": false,
      "case_field_id": "deceasedForenames",
      "case_field_type": {
        "id": "deceasedForenames-bae1ec6b-5cd4-41a2-bd4d-89258d36421e",
        "type": "Text",
        "min": 1,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      },
      "display_context_parameter": null
    },
    {
      "label": "Last name(s) of deceased",
      "order": 4,
      "metadata": false,
      "case_field_id": "deceasedSurname",
      "case_field_type": {
        "id": "deceasedSurname-4af50392-b07a-40a8-9e8a-e310faddb800",
        "type": "Text",
        "min": 1,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      },
      "display_context_parameter": null
    },
    {
      "label": "Date of death",
      "order": 5,
      "metadata": false,
      "case_field_id": "deceasedDateOfDeath",
      "case_field_type": {
        "id": "Date",
        "type": "Date",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [],
        "complex_fields": [],
        "collection_field_type": null
      },
      "display_context_parameter": null
    },
    {
      "label": "Case printed",
      "order": 6,
      "metadata": false,
      "case_field_id": "casePrinted",
      "case_field_type": {
        "id": "FixedList-casePrintedTypes",
        "type": "FixedList",
        "min": null,
        "max": null,
        "regular_expression": null,
        "fixed_list_items": [
          {
            "code": "Yes",
            "label": "Yes",
            "order": null
          }
        ],
        "complex_fields": [],
        "collection_field_type": null
      },
      "display_context_parameter": null
    }
  ];

  let rows = [];
  for(let rowCounter = 0; rowCounter< 25 ; rowCounter++){
    rows.push({
      "case_id": "1571254417214566",
      "case_fields": {
        "solsConfirmSignSOT2": "You will sign a statement of truth on your client’s behalf.",
        "solsConfirmSignSOT3": "The executor believes that all the information stated in the legal statement is true. They have authorised ${solsSolicitorFirmName} to sign a statement of truth on their behalf.",
        "immovableEstateInfo": "You are unable to apply online unless the estate in England and Wales consists wholly of immovable property.",
        "solicitorMainApplicantInfo": "You cannot apply for letters of administration if you are a solicitor applying as an executor.",
        "solsSolicitorPhoneNumber": "07963732122",
        "[LAST_STATE_MODIFIED_DATE]": null,
        "solsConfirmSignSOT1": "You won’t be able to make changes to the legal statement and declaration after continuing.",
        "solsDiedOrNotApplyingInfo": "You can’t use this service if an executor/residuary legatee/devisee in trust is alive or applying.",
        "solsLifeInterestInfo": "You can’t use this service if there is a life interest in respect of the estate.",
        "solsBeforeSubmitPage": "* Check the information you've given. You can do this on the next pagesn* Review the legal statement and declarationn* Get authorisation from your client to confirm and sign the statement of truth on their behalf",
        "solsEntitledMinorityInfo": "You can’t use this service if there is a beneficiary under the age of 18.",
        "[CASE_REFERENCE]": 1571254417214566,
        "solsStartPage": "# Check you can use this service to apply for a grant.",
        "[STATE]": "SolAppCreated",
        "solsSolicitorFirmName": "3ewq",
        "solsResiduaryInfo": "You can’t use this service if you are not named in the will as a residuary legatee or devisee.",
        "solsSolicitorEmail": "wdwedwe@gmail.com",
        "solsMinorityInterestInfo": "You can’t use this service if there is a minority interest.",
        "solsApplicantSiblingsInfo": "You can’t use this service if the applicant has any siblings.",
        "deceasedNameSection": "### What's the full name of the deceased? nUse the name on the death certificate",
        "solsIht400extraInfo": "You'll need to send a stamped (receipted) IHT 421 with this application.",
        "solsExecutorInfoSection": "Enter all executors named in the will. Only 4 lay executors can apply.",
        "[JURISDICTION]": "PROBATE",
        "[CREATED_DATE]": "2019-10-16T19:33:37.257",
        "solsApplicantNameSection": "## Applicant name",
        "solsSolicitorAddress": {
          "County": "",
          "Country": "United Kingdom",
          "PostCode": "SW20 0D",
          "PostTown": "Livingston",
          "AddressLine1": "69 Haymarket Crescent",
          "AddressLine2": "",
          "AddressLine3": ""
        },
        "solsReviewLegalStatement2": "You can print the legal statement and declaration and ask your client to sign it for your own records. A photocopy of the signed statement should be submitted along with your evidence in support. nIf you are providing a notarial copy or a court sealed copy of the will please also provide a cover letter with the application indicating where the original will is and why it cannot be released.",
        "solsReviewLegalStatement1": "This is the legal statement and declaration for you and your client to review. If there are no changes, your client can authorise you to declare on their behalf.",
        "[SECURITY_CLASSIFICATION]": "PUBLIC",
        "englishWillNo": "A translation will be required.",
        "[CASE_TYPE]": "GrantOfRepresentation",
        "solsSolicitorAppReference": "wdew",
        "noProofEntitlement": "The will is not entitled to proof in England and Wales.",
        "[LAST_MODIFIED_DATE]": "2020-07-23T15:19:16.093575"
      },
      "case_fields_formatted": {
        "solsConfirmSignSOT2": "You will sign a statement of truth on your client’s behalf.",
        "solsConfirmSignSOT3": "The executor believes that all the information stated in the legal statement is true. They have authorised ${solsSolicitorFirmName} to sign a statement of truth on their behalf.",
        "immovableEstateInfo": "You are unable to apply online unless the estate in England and Wales consists wholly of immovable property.",
        "solicitorMainApplicantInfo": "You cannot apply for letters of administration if you are a solicitor applying as an executor.",
        "solsSolicitorPhoneNumber": "07963732122",
        "[LAST_STATE_MODIFIED_DATE]": null,
        "solsConfirmSignSOT1": "You won’t be able to make changes to the legal statement and declaration after continuing.",
        "solsDiedOrNotApplyingInfo": "You can’t use this service if an executor/residuary legatee/devisee in trust is alive or applying.",
        "solsLifeInterestInfo": "You can’t use this service if there is a life interest in respect of the estate.",
        "solsBeforeSubmitPage": "* Check the information you've given. You can do this on the next pagesn* Review the legal statement and declarationn* Get authorisation from your client to confirm and sign the statement of truth on their behalf",
        "solsEntitledMinorityInfo": "You can’t use this service if there is a beneficiary under the age of 18.",
        "[CASE_REFERENCE]": 1571254417214566,
        "solsStartPage": "# Check you can use this service to ap.",
        "[STATE]": "SolAppCreated",
        "solsSolicitorFirmName": "3ewq",
        "solsResiduaryInfo": "You can’t use this sisee.",
        "solsSolicitorEmail": "wdwedwe@gmail.com",
        "solsMinorityInterestInfo": "You can’t use this service if there is a minority interest.",
        "solsApplicantSiblingsInfo": "You can’t use this service if the applicant has any siblings.",
        "deceasedNameSection": "### What's the full namn the death certificate",
        "solsIht400extraInfo": "You'll need to send a stamped (receipted) IHT 421 with this application.",
        "solsExecutorInfoSection": "Enter all executors named in the will. Only 4 lay executors can apply.",
        "[JURISDICTION]": "PROBATE",
        "[CREATED_DATE]": "2019-10-16T19:33:37.257",
        "solsApplicantNameSection": "## Applicant name",
        "solsSolicitorAddress": {
          "County": "",
          "Country": "United Kingdom",
          "PostCode": "SW20 0D",
          "PostTown": "Livingston",
          "AddressLine1": "69 Haymarket Crescent",
          "AddressLine2": "",
          "AddressLine3": ""
        },
        "solsReviewLegalStatement2": "You can print the legal statement and declaration and ask your client to sign it for your own records. A photocopy of the signed statement should be submitted along with your evidence in support. nIf you are providing a notarial copy or a court sealed copy of the will please also provide a cover letter with the application indicating where the original will is and why it cannot be released.",
        "solsReviewLegalStatement1": "This is the legal statement and declaration for you and your client to review. If there are no changes, your client can authorise you to declare on their behalf.",
        "[SECURITY_CLASSIFICATION]": "PUBLIC",
        "englishWillNo": "A translation will be required.",
        "[CASE_TYPE]": "GrantOfRepresentation",
        "solsSolicitorAppReference": "wdew",
        "noProofEntitlement": "The will is not entitled to proof in England and Wales.",
        "[LAST_MODIFIED_DATE]": "2020-07-23T15:19:16.093575"
      }
    });
  }
    return { columns: cols, results: rows };

 
}
