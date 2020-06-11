const pallyActions = require('../helpers/pallyActions');

function  divorceCaseCreationPages(){
   let actionsToPages = [];
   
   let actionsCollectionArray = [];
    for (let actionCounter = 0; actionCounter < allActions.length; actionCounter++){
        let action = allActions[actionCounter]
        console.log(action.action);
        // console.log(JSON.stringify(actionsToPages)); 
        if (action.action.startsWith("Nextpage")){
            let actionsToThisPage = [...actionsCollectionArray];
            actionsToPages.push({ id: actionCounter, steps: actionsToThisPage});

        }

        switch (action.action ){
            case "sendkeys":
                actionsCollectionArray.push(...pallyActions.inputField(action.locator,action.input));
                break;
            case "select":
                actionsCollectionArray.push(...pallyActions.clickElement(action.locator));
                actionsCollectionArray.push(...pallyActions.selectOptionClick(action.locator + " option[value = '" + action.input+"']"))
                break;
            case "click":
                if (action.locator.includes("option")){
                    let selectFieldcss = action.locator.split("option")[0];
                    actionsCollectionArray.push(...pallyActions.clickElement(selectFieldcss)); 
                }
                actionsCollectionArray.push(...pallyActions.clickElement(action.locator));
                break;
            case "pageUrlTobe":
                actionsCollectionArray.push(...pallyActions.waitForurl(action.input));
                break;

        }
     
   }

    return actionsToPages;

}

module.exports = divorceCaseCreationPages;

let allActions = [
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#PetitionerSolicitorName",
        "action": "sendkeys",
        "input": "test Petitioner Solicitor’s name"
    },
    {
        "locator": "#PetitionerSolicitorFirm",
        "action": "sendkeys",
        "input": "test Firm name"
    },
    {
        "locator": "#DerivedPetitionerSolicitorAddr",
        "action": "sendkeys",
        "input": "test Firm address/DX address"
    },
    {
        "locator": "#D8SolicitorReference",
        "action": "sendkeys",
        "input": "test Your reference number"
    },
    {
        "locator": "#PetitionerSolicitorPhone",
        "action": "sendkeys",
        "input": "0987654321"
    },
    {
        "locator": "#PetitionerSolicitorEmail",
        "action": "sendkeys",
        "input": "test@autotest.com "
    },
    {
        "locator": "#SolicitorAgreeToReceiveEmails-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolAboutThePetitioner"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8PetitionerFirstName",
        "action": "sendkeys",
        "input": "test First name(s)"
    },
    {
        "locator": "#D8PetitionerLastName",
        "action": "sendkeys",
        "input": "test Last name"
    },
    {
        "locator": "#D8PetitionerNameDifferentToMarriageCert-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8PetitionerNameChangedHow-other",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8PetitionerNameChangedHow-deedPoll",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8PetitionerNameChangedHow-marriageCertificate",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8DivorceWho",
        "action": "select",
        "input": "1: wife"
    },
    {
        "locator": "#D8InferredPetitionerGender",
        "action": "select",
        "input": "1: notGiven"
    },
    {
        "locator": "#D8MarriageIsSameSexCouple-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8DerivedPetitionerHomeAddress",
        "action": "sendkeys",
        "input": "test The Petitioner's home address"
    },
    {
        "locator": "#D8PetitionerPhoneNumber",
        "action": "sendkeys",
        "input": "--"
    },
    {
        "locator": "#D8PetitionerEmail",
        "action": "sendkeys",
        "input": "test@autotest.com "
    },
    {
        "locator": "#D8PetitionerContactDetailsConfidential",
        "action": "select",
        "input": "1: keep"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolAboutTheRespondent"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8RespondentFirstName",
        "action": "sendkeys",
        "input": "test Respondent's First name(s)"
    },
    {
        "locator": "#D8RespondentLastName",
        "action": "sendkeys",
        "input": "test Respondent's Last name"
    },
    {
        "locator": "#D8RespondentNameAsOnMarriageCertificate-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#RespNameDifferentToMarriageCertExplain",
        "action": "sendkeys",
        "input": "--"
    },
    {
        "locator": "#D8InferredRespondentGender",
        "action": "select",
        "input": "1: notGiven"
    },
    {
        "locator": "#D8DerivedRespondentHomeAddress",
        "action": "sendkeys",
        "input": "--"
    },
    {
        "locator": "#D8DerivedRespondentCorrespondenceAddr",
        "action": "sendkeys",
        "input": "test The Respondent's service address"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolMarriageCertificate"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8MarriageDate-day",
        "action": "sendkeys",
        "input": "01"
    },
    {
        "locator": "#D8MarriageDate-month",
        "action": "sendkeys",
        "input": "01"
    },
    {
        "locator": "#D8MarriageDate-year",
        "action": "sendkeys",
        "input": "2005"
    },
    {
        "locator": "#D8MarriagePetitionerName",
        "action": "sendkeys",
        "input": "test Petitioner's full name as on marriage certificate"
    },
    {
        "locator": "#D8MarriageRespondentName",
        "action": "sendkeys",
        "input": "test Respondent's full name as on marriage certificate"
    },
    {
        "locator": "#D8MarriedInUk-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolJurisdiction"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-G",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-F",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-E",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-D",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-C",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-B",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8JurisdictionConnection-A",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolReasonForDivorce"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8ReasonForDivorce",
        "action": "select",
        "input": "1: separation-5-years"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolSOCSeparation"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8MentalSeparationDate-day",
        "action": "sendkeys",
        "input": "01"
    },
    {
        "locator": "#D8MentalSeparationDate-month",
        "action": "sendkeys",
        "input": "01"
    },
    {
        "locator": "#D8MentalSeparationDate-year",
        "action": "sendkeys",
        "input": "2011"
    },
    {
        "locator": "#D8PhysicalSeparationDate-day",
        "action": "sendkeys",
        "input": "01"
    },
    {
        "locator": "#D8PhysicalSeparationDate-month",
        "action": "sendkeys",
        "input": "01"
    },
    {
        "locator": "#D8PhysicalSeparationDate-year",
        "action": "sendkeys",
        "input": "2012"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolSOCLivedApart"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolExistingCourtCases"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8LegalProceedings-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8LegalProceedingsDetails",
        "action": "sendkeys",
        "input": "test Legal proceeding details"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolDividingMoneyAndProperty"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8FinancialOrderFor-children",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "#D8FinancialOrderFor-petitioner",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolApplyToClaimCosts"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8DivorceCostsClaim-Yes",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/solicitorCreateSolUploadDocs"
    },
    {
        "locator": "none",
        "action": "Nextpage ",
        "input": "--"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentType",
        "action": "select",
        "input": "1: dnRefusalClarificationResponse"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentEmailContent",
        "action": "sendkeys",
        "input": "--"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentLink",
        "action": "sendkeys",
        "input": "/Users/sreekanth/work/moj/ex-ui/rpx-xui-webapp/test/e2e/documents/dummy.pdf"
    },
    {
        "locator": "none",
        "action": "sleep 1000",
        "input": "--"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentDateAdded-day",
        "action": "sendkeys",
        "input": "08"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentDateAdded-month",
        "action": "sendkeys",
        "input": "06"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentDateAdded-year",
        "action": "sendkeys",
        "input": "2020"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentComment",
        "action": "sendkeys",
        "input": "--"
    },
    {
        "locator": "#D8DocumentsUploaded_0_DocumentFileName",
        "action": "sendkeys",
        "input": "--"
    },
    {
        "locator": "button[type = submit]",
        "action": "click",
        "input": "--"
    },
    {
        "locator": "none",
        "action": "pageUrlTobe",
        "input": "https://manage-case.aat.platform.hmcts.net/cases/case-create/DIVORCE/DIVORCE/solicitorCreate/submit"
    }
]