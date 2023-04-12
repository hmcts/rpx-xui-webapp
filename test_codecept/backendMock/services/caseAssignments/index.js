


class CaseAssignments{


    getCaseAssignments(caseIds){

        const responseData =  {
            "status_message": "Case-User-Role assignments returned successfully",
            "case_assignments": []
        };

        const testCaseids = [
            '1234567812345671',
            '1234567812345672',
            '1234567812345673',
            '1234567812345674',
            '1234567812345675'
        ]
        for (const caseId of testCaseids){
            responseData.case_assignments.push({
                "case_id": "1588234985453946",
                "shared_with": [
                    {
                        "idam_id": "221a2877-e1ab-4dc4-a9ff-f9424ad58738",
                        "first_name": "Bill",
                        "last_name": "Roberts",
                        "email": "bill.roberts@greatbrsolicitors.co.uk",
                        "case_roles": [
                            "[Claimant]",
                            "[Defendant]"
                        ]
                    }
                ]
            })
        }
        return responseData;
    }
}

module.exports = new CaseAssignments();
