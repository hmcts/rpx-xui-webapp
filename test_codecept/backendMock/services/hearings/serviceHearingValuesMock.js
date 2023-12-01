
const loadServicehearingValues = require('./mockData/serviceHearingValues')

const { v4 } = require('uuid');

class ServiceHearingValues{

    constructor(){
        this.serviceHearingValues = JSON.parse(JSON.stringify(loadServicehearingValues))
    }

    getServiceHearingValuesTemplate(){
        return JSON.parse(JSON.stringify(loadServicehearingValues))
    }

    setCaseFlags(caseFlags, serviceHearingValues){
        const shvToUpdate = serviceHearingValues ? serviceHearingValues : this.serviceHearingValues
        const newFlags = [];
        for (const caseFlag of caseFlags){
            newFlags.push({
                partyID: caseFlag.partyId ? caseFlag.partyId: 'P1',
                partyName: caseFlag.partyName ? caseFlag.partyName: 'Jane Smith',
                flagParentId: caseFlag.flagParentId ? caseFlag.flagParentId : 'PARENT_0',
                flagId: caseFlag.flagId ? caseFlag.flagId : 'RA001',
                flagDescription: caseFlag.flagDescription ? caseFlag.flagDescription : 'Sign language interpreter required',
                flagStatus: caseFlag.flagStatus ? caseFlag.flagStatus : 'ACTIVE'
            })
        }

        shvToUpdate.caseFlags.flags = newFlags
        return shvToUpdate;
    }

    setParties(parties, serviceHearingValues){
        const shvToUpdate = serviceHearingValues ? serviceHearingValues : this.serviceHearingValues
        const newParties = [];
        for (const party of parties) {

            const partyObj = {
                "partyID": party.partyID ? party.partyID : v4(),
                "partyType": party.type ? party.type : "IND",
                "partyName": party.partyName ? party.partyName : "First Applicant FN First Applicant LN updateeeeed",
                "partyRole": party.partyRole ? party.partyRole : "APPL",
            }

            const relatedParty = {
                "relationshipType":"mock relationship",
                "relatedPartyID": party.partyID ? party.partyID : v4(),
                "relatedPartyType": party.partyType ? party.partyType : "IND",
                "relatedPartyName": party.partyName ? `Related ${party.partyName}` : "Related party 1 name",
                "relatedPartyRole": party.partyRole ? party.partyRole : "APPL",
                "individualDetails": {
                    "firstName": party.individualDetails?.firstName ? `Related ${party.individualDetails.firstName}` : "Realted party First Applicant FN updated",
                    "lastName": party.individualDetails?.lastName ? `Related ${party.individualDetails.lastName}` : "Related party First Applicant LN updated",
                    "interpreterLanguage": party.individualDetails?.interpreterLanguage ? party.individualDetails.interpreterLanguage : "",
                }
            };

            const partyIndividualDetails ={
                "firstName": party.individualDetails?.firstName ?party.individualDetails.firstName: "First Applicant FN updated",
                "lastName": party.individualDetails?.lastName ?party.individualDetails.lastName: "First Applicant LN updated",
                "interpreterLanguage": party.individualDetails?.interpreterLanguage ?party.individualDetails.interpreterLanguage: "",
                "reasonableAdjustments": party.individualDetails?.reasonableAdjustments ?party.individualDetails.reasonableAdjustments.split(',') : [
                    'RA0042',
                    'RA0053',
                    'RA0013',
                    'RA0016',
                    'RA0042',
                    'RA0009'
                ],
                "vulnerableFlag": false,
                "vulnerabilityDetails": "",
                "hearingChannelEmail": [
                    "applicant@test.com"
                ],
                "hearingChannelPhone": [
                    "1234567890"
                ],
                "relatedParties": [relatedParty]
            }

            const partyOrgDetails =  {
                "name": party.partyName ? `${party.partyName}` : "Related party 1 name",
                "organisationType": "ORG",
                "cftOrganisationID": "ECKZ4BE"
            }

            if(party.type === 'ORG'){
                partyObj['organisationDetails'] = partyOrgDetails
            }else{
                partyObj['individualDetails'] = partyIndividualDetails 
            }
                

            newParties.push(partyObj)
        }

        shvToUpdate.parties = newParties
        return shvToUpdate;
    }


}

module.exports = new ServiceHearingValues()


