const data = {
    users: [
        { 
            idamId: "12b6a360-7f19-4985-b065-94320a891eaa", 
            email: "xui_auto_co_r1@justice.gov.uk", 
            release:"wa_release_1", userIdentifier:"IAC_CaseOfficer_R1"
        },
        {
            idamId: "3db21928-cbbc-4364-bd91-137c7031fe17",
            email: "xui_auto_co_r2@justice.gov.uk",
            release: "wa_release_2", userIdentifier: "IAC_CaseOfficer_R2"
        },
        {
            idamId: "7cfa4921-ecbe-4a0c-ba67-543201b9cde9",
            email: "xui_auto_adm_r1@justice.gov.uk",
            release: "wa_release_1", userIdentifier: "IAC_AdmOfficer_R1"
        },
        {
            idamId: "4beb7bbe-5cc9-4f92-9c4d-620bd705dc8a",
            email: "xui_auto_adm_r2@justice.gov.uk",
            release: "wa_release_2", userIdentifier: "IAC_AdmOfficer_R2"
        },
        {
            idamId: "4fd5803c-a1ae-4790-b735-dc262e8322b8",
            email: "xui_iac_judge_1@mailinator.com",
            release: "wa_release_1", userIdentifier: "IAC_Judge_WA_R1"
        },
        {
            idamId: "38eb0c5e-29c7-453e-b92d-f2029aaed6c3",
            email: "xui_iac_judge_2@mailinator.com",
            release: "wa_release_2", userIdentifier: "IAC_Judge_WA_R2"
        },

        {
            idamId: "10c6b21d-5bd0-4047-8ca6-bb3dd4e83c9c",
            email: "xui_auto_co_r1_withPagination@justice.gov.uk",
            release: "wa_release_1", userIdentifier: "IAC_CaseOfficer_R1_withPagination"
        },


         {
             idamId: "16ce0689-bea9-4bd8-add0-722291656529",
            email: "xui_auto_co_r1_withoutPagination@justice.gov.uk",
             release: "wa_release_1", userIdentifier: "IAC_CaseOfficer_R1_withoutPagination"
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
                wa_release_1: ["Case reference", "Case name", "Case category", "Location", "Task", "Date"],
                wa_release_2: ["Case name", "Case category", "Location", "Task", "Date"]
            },
            availableTasks: {
                wa_release_1: ["Case reference", "Case name", "Case category", "Location", "Task", "Date"],
                wa_release_2: ["Case name", "Case category", "Location", "Task", "Date"]
            }

        }

    }

};

module.exports = data;

