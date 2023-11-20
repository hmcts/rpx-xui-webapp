
const loadServicehearingValues = require('./mockData/serviceHearingValues')

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
            newParties.push({
                "partyID": party.partyID ? party.partyID :  "209334d6-97e3-44ef-a206-58468f6bc43a",
                "partyType": party.partyType ? party.partyType : "IND",
                "partyName": party.partyName ? party.partyName : "First Applicant FN First Applicant LN updateeeeed",
                "partyRole": party.partyRole ? party.partyRole : "APPL",
                "individualDetails": {
                    "firstName": party.individualDetails.firstName ? party.individualDetails.firstName : "First Applicant FN updated",
                    "lastName": party.individualDetails.lastName ? party.individualDetails.lastName : "First Applicant LN updated",
                    "interpreterLanguage": party.individualDetails.interpreterLanguage ? party.individualDetails.interpreterLanguage : "",
                    "reasonableAdjustments": party.individualDetails.reasonableAdjustments ? party.individualDetails.reasonableAdjustments.split(',') : [
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
                    "relatedParties": []
                }
            })
        }

        shvToUpdate.parties = newParties
        return shvToUpdate;
    }


}

module.exports = new ServiceHearingValues()


