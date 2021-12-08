
module.exports = {
    caseworker: {
        "WA1": ["caseworker", "caseworker-ia", "caseworker-ia-caseofficer" ],
        "WA2": ["caseworker", "caseworker-ia", "caseworker-ia-caseofficer"],
        "WA2-SUPERVISOR": ["caseworker", "caseworker-ia", "caseworker-ia-caseofficer","task-supervisor"],
        "NON-WA": ["caseworker", "caseworker-divorce", "caseworker-divorce-financialremedy","caseworker-divorce-financialremedy-courtadmin"],
        "GLOBAL-SEARCH": ["caseworker", "caseworker-ia", "caseworker-ia-caseofficer"],
        "REFUNDS": ["caseworker", "caseworker-divorce", "caseworker-divorce-financialremedy", "caseworker-divorce-financialremedy-courtadmin", "payments-refund", "payments-refund-approver"],
       
    },
    judicial:{
        "WA2": ["caseworker", "caseworker-ia", "caseworker-ia-iacjudge"],
        "WA2-SUPERVISOR": ["caseworker", "caseworker-ia", "caseworker-ia-iacjudge", "task-supervisor"],
        "NON-WA": ["caseworker", "caseworker-divorce", "caseworker-divorce-financialremedy","caseworker-divorce-judge"],
        "GLOBAL-SEARCH": ["caseworker", "caseworker-ia", "caseworker-ia-iacjudge"]
    },
    solicitor:{
        "NOC": ["pui-caa", "pui-case-manager", "pui-user-manager","pui-organisation-manager","caseworker", "caseworker-divorce", "caseworker-divorce-financialremedy","caseworker-divorce-financialremedy-solicitor"],
        "NON-NOC": ["pui-caa", "pui-case-manager", "pui-user-manager", "pui-organisation-manager", "caseworker", "caseworker-divorce", "caseworker-divorce-financialremedy", "caseworker-divorce-financialremedy-solicitor"]
    }
   
}