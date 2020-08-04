
const caseworkerJurisdictions  = require("./caseworkerJurisdictions");
const {divorce, probate, ia, publicLaw} = require('./workBasketInputs');

const divorceCreateCaseConfig = require('./solicitorCreate/divorceCaseCreateConfig');
const frConsentedCreaCaseConfig = require('./solicitorCreate/frConsentedConfig');
const frContestedCreaCaseConfig = require('./solicitorCreate/frContestedConfig');

const probateGrantOfRepresentationConfig = require('./solicitorCreate/probateGrantOfRepresentationConfig');
const probateCreateCaveatConfig = require('./solicitorCreate/probateCreateCaveatConfig');

const iaCreateConfig = require('./solicitorCreate/iaCreateConfig');



class CCDApi{

    getJurisdictions(){
        return caseworkerJurisdictions; 
    }

    getWorkbasketInputs(jurisdiction){
        let workbasketInputs = {};
        switch (jurisdiction){
            case 'DIVORCE':
                workbasketInputs = divorce;
                break;
            case 'GrantOfRepresentation':
                workbasketInputs = probate;
                break;
            case 'Asylum':
                workbasketInputs = probate;
                break
            case 'TRIB_MVP_3_TYPE':
                workbasketInputs = publicLaw;
                break;
        }
    }

    getSolicitorCreateCaseConfig(caseType,event){
        if (caseType === 'DIVORCE'){
            return divorceCreateCaseConfig; 
       } 
        if (caseType === 'FinancialRemedyMVP2' && event === 'FR_solicitorCreate'){
            return frConsentedCreaCaseConfig; 
       }
        if (caseType === 'FinancialRemedyContested' && event === 'FR_solicitorCreate') {
            return frContestedCreaCaseConfig;
        }

        if (caseType === 'GrantOfRepresentation' && event === 'solicitorCreateApplication') {
            return probateGrantOfRepresentationConfig;
        }

        if (caseType === 'Caveat' && event === 'solicitorCreateCaveat') {
            return probateCreateCaveatConfig;
        }

        if (caseType === 'Asylum' && event === 'startAppeal') {
            return iaCreateConfig;
        }

    }

}

module.exports = new CCDApi();



