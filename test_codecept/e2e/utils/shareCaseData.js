
  const  cases = [ ];



class ShareCaseData
{

    AddCaseShareData(caseid, sharedWith, tobeShared, tobeRemoved) {
        let caseData = this.getCaseWithId(caseid);
        if (caseData !== null) {
            // caseData.sharedWith = sharedWith; 
            // caseData.markedForShare = tobeShared;
            // caseData.markedForUnShare = tobeRemoved; 
        } 
        else{
            caseData = {
                caseId: caseid,
                sharedWith: sharedWith,
                markedForShare: tobeShared,
                markedForUnShare: tobeRemoved 
            };
            cases.push(caseData); 
        }
    }

    MarkUserToShare(caseid,email){
        let caseData = this.getCaseWithId(caseid);
        if (caseData.sharedWith.indexOf(email) === -1 && caseData.markedForShare.indexOf(email) === -1){
            console.log("******* Test data Tracking: => Marking TO BE ADDED : " + caseid + " : " + email);
            caseData.markedForShare.push(email);
        }
    }

    MarkUserToUnShare(caseid, email) {
        let caseData = this.getCaseWithId(caseid);
        console.log("******* Test data Tracking: => Marking TO BE REMOVED : " + caseid + " : " + email);

        caseData.markedForUnShare.push(email);
    }

    CancelMarkedForShare(caseid, email){
        let caseData = this.getCaseWithId(caseid);
        var index = caseData.markedForShare.indexOf(email);
        if (index > -1) {
            console.log("******* Test data Tracking: => cancel TO BE ADDED : " + caseid + " : " + email);
            caseData.markedForShare.splice(index, 1);
        }
    }

    CancelMarkedForUnShare(caseid, email) {
        let caseData = this.getCaseWithId(caseid);
        var index = caseData.markedForUnShare.indexOf(email);
        if (index > -1) {
            console.log("******* Test data Tracking: => cancel TO BE REMOVED : " + caseid + " : " + email);
            caseData.markedForUnShare.splice(index, 1);
        };
    }

    ResetChanges(){
        for (let i = 0; i < cases.length; i++) {
            let caseData = cases[i];
            caseData.markedForShare = [];
            caseData.markedForUnShare = [];       
        }
    }

    ResetChagesForCase(caseId){
        for (let i = 0; i < cases.length; i++) {
            let caseData = cases[i];
            if (caseData.caseId = caseId){
                caseData.markedForShare = [];
                caseData.markedForUnShare = [];
            }
        }

    }

    changesCommited(){
        for (let i = 0; i < cases.length; i++) {
            let caseData = cases[i];
            for (let sharedWithUser = 0; sharedWithUser < caseData.markedForShare.length; sharedWithUser++){
                let email = caseData.markedForShare[sharedWithUser];
                if (caseData.sharedWith.indexOf(email) < 0) {
                    caseData.sharedWith.push(email); 
                }
            }    

            for (let sharedWithUser = 0; sharedWithUser < caseData.markedForUnShare.length; sharedWithUser++) {
                let email = caseData.markedForUnShare[sharedWithUser];

                let index = caseData.sharedWith.indexOf(email);
                if (index > -1) {
                    caseData.sharedWith.splice(index, email);
                }
            }   
        }

    }

    getCaseWithId(id) {
        for (let i = 0; i < cases.length; i++) {
            if (cases[i].caseId === id) {
                return cases[i];
            }
        }
        return null;
    }

    GetStoredData(){
        return cases;
    }
}

module.exports = new ShareCaseData();
