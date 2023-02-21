
const { v4 } = require('uuid');
const userApiData = require('../userApiData')

class TaskManagementApi{
  

    setOnSearchTasks(token, response){
        userApiData.setUserData(token, "onSearchTasks", response)
    }

    getSearchTasks(count){
        const tasks = []
        for(let i = 0; i< count; i++){
            tasks.push(this.getTaskTemplate());
        }
        return { tasks:tasks , 'total_records' : count};
    }



    getTaskTemplate(){
        return {
            "id": v4(),
            "name": "Follow-up overdue respondent evidence",
            "type": "followUpOverdueRespondentEvidence",
            "task_state": "unassigned",
            "task_system": "SELF",
            "security_classification": "PUBLIC",
            "task_title": "Follow-up overdue respondent evidence",
            "created_date": "2022-12-12T16:00:02+0000",
            "due_date": "2022-12-14T16:00:00+0000",
            "location_name": "Taylor House",
            "location": "765324",
            "execution_type": "Case Management Task",
            "jurisdiction": "IA",
            "region": "1",
            "case_type_id": "Asylum",
            "case_id": "1669646436529598",
            "case_category": "Protection",
            "case_name": "José González",
            "auto_assigned": false,
            "warnings": false,
            "warning_list": {
                "values": [
                ]
            },
            "case_management_category": "Protection",
            "work_type_id": "decision_making_work",
            "work_type_label": "Decision-making work",
            "permissions": {
                "values": [
                    "Read",
                    "Own",
                    "Manage",
                    "Execute",
                    "Cancel",
                    "Complete",
                    "Claim",
                    "Unclaim",
                    "Assign",
                    "Unassign"
                ]
            },
            "description": "",
            "role_category": "LEGAL_OPERATIONS",
            "minor_priority": 500,
            "major_priority": 5000,
            "priority_date": "2022-12-14T16:00:00+0000"
        }
    }


}

module.exports = new TaskManagementApi();


