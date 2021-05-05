const data = {
    users: [
        { 
            idamId: "12b6a360-7f19-4985-b065-94320a891eaa", 
            email: "xui_auto_co_r1@justice.gov.uk", 
            release:"wa_release_1", roleIdentifier:"CaseOfficer_R1"
        },
        {
            idamId: "3db21928-cbbc-4364-bd91-137c7031fe17",
            email: "xui_auto_co_r2@justice.gov.uk",
            release: "wa_release_2", roleIdentifier: "CaseOfficer_R2"
        },
        {
            idamId: "7cfa4921-ecbe-4a0c-ba67-543201b9cde9",
            email: "xui_auto_adm_r1@justice.gov.uk",
            release: "wa_release_1", roleIdentifier: "AdmOfficer_R1"
        },
        {
            idamId: "4beb7bbe-5cc9-4f92-9c4d-620bd705dc8a",
            email: "xui_auto_adm_r2@justice.gov.uk",
            release: "wa_release_2", roleIdentifier: "AdmOfficer_R2"
        },
        {
            idamId: "4fd5803c-a1ae-4790-b735-dc262e8322b8",
            email: "xui_iac_judge_1@mailinator.com",
            release: "wa_release_1", roleIdentifier: "Judge_WA_R1"
        },
        {
            idamId: "38eb0c5e-29c7-453e-b92d-f2029aaed6c3",
            email: "xui_iac_judge_2@mailinator.com",
            release: "wa_release_1", roleIdentifier: "Judge_WA_R2"
        }
    ],
    appFeatures: {
        primaryTabs: {
            judge: {
                wa_release_1: ["Case list"],
                wa_release_2: ["Case list", "My work", "All work","Find case"]
            },
            caseworker: {
                wa_release_1: ["Case list", "Create case", "Task list", "Task manager","Find case"],
                wa_release_2: ["Case list", "Create case", "My work", "All work","Find case"]
            }
        },
        taskListColumns: {
            myTasks: {
                wa_release_1: ["Case reference", "Case name", "Case category", "Location", "Task", "Date", "Assignee"],
                wa_release_2: ["Case name", "Case category", "Location", "Task", "Age of task"]
            },
            availableTasks: {
                wa_release_1: ["Case reference", "Case name", "Case category", "Location", "Task", "Date"],
                wa_release_2: ["Case name", "Case category", "Location", "Task", "Age of task"]
            }

        }

    }

};

module.exports = data;

