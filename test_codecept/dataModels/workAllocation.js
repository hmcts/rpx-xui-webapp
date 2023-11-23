const { v4 } = require('uuid');

const taskManagementApiMock = require('../backendMock/services/task-management-api/index')
class WorkAllocationModels {
    getRelease1Task() {

        return taskManagementApiMock.getTaskTemplate()
    }

    getRelease2Task() {
        return taskManagementApiMock.getTaskTemplate();
    }

    getRelease2Case() {
        return {
            "id": v4(),
            "assignee":"",
            "case_id": "1620409659381330",
            "case_category": "Protection",
            "case_type":"",
            "jurisdiction":"IA",
            "jurisdictionId":"IA",
            "location_id":"",
            "case_name": "Jo Fly " + Math.floor((Math.random() * 100) + 1),
            "actions": [],
            "assignee": v4(),
            "startDate": "2021-02-16T18:58:48.987+0000",
             "hearing_date": "2021-02-16T18:58:48.987+0000",
            "endDate": "2021-02-16T18:58:48.987+0000",
            "jurisdiction":"Test jurisdiction",
            "case_role":"Mock Test case role",
            "role" : "case role",
            "role_category" : "role-categpry",
            "hasAccess":true

        };
    }

    getRelease2Tasks(){
        const tasks = [];
        for(let i =0 ;i <25; i++){
            tasks.push(this.getRelease2Task());
        }
        return {
            tasks: tasks,
            total_records:100
        }
    }

    getRelease2Cases() {
        const cases = [];
        for (let i = 0; i < 25; i++) {
            cases.push(this.getRelease2Case());
        }
        return {
            case_types_results: [{ total: 13, case_type_id: "Asylum" }],
            cases: cases,
            total_records: 100,
            total:13,
            unique_cases:5
        }
    }

    getLocation() {
        return {
            id: "12345",
            locationName: "test location"
        }
    }

    getCaseWorkerOrperson() {
        return {
            email: "test_person@test.gov.uk",
            firstName: "testfn",
            lastName: "testln",
            idamId: "004b7164-0943-41b5-95fc-39794af4a9fe",
            roleCategory:'case-worker',
            location: this.getLocation()
        }
    }

    getFindPersonObj() {
        return {
            id:'',
            email: "andy.kings@email.com",
            emailId: "andy.kings@email.com",
            idamId: "id131",
            name: "Andy Kings",
            knownAs:'Lead Judgee',
            fullName:'Judge Robin',
            personalCode:'',
            surname:'test',
            title:'Mr'
        }
    }

    getRelease2TaskActions(permissions, forView, assignState) {
        const actions = [];
        let actionsView = {};
        const view = forView.toLowerCase();
        assignState = assignState ? assignState.toLowerCase() : '';
        if (taskActionsMatrix[view] === undefined && taskActionsMatrix[forView] === undefined) {
            throw new Error(`View ${view} is not modeled in Mock data model. test requires update`);
        }
        if (view.includes('my')) {
            actionsView = taskActionsMatrix['mytasks'];
        } else if (view.includes('available')) {
            actionsView = taskActionsMatrix['availabletasks'];
        }else if (view.includes('all')) {
            actionsView = taskActionsMatrix['allwork'];
            actionsView = assignState.includes('un') ? taskActionsMatrix['allwork']['unassigned'] : taskActionsMatrix['allwork']['assigned'];
        } else if (forView.includes('ActiveTasksAssignedCurrentUser')) {
            actionsView = taskActionsMatrix['ActiveTasksAssignedCurrentUser'];
        } else if (forView.includes('ActiveTasksAssignedOtherUser')) {
            actionsView = taskActionsMatrix['ActiveTasksAssignedOtherUser'];
        } else if (forView.includes('ActiveTasksUnassigned')) {
            actionsView = taskActionsMatrix['ActiveTasksUnassigned'];
        }

        let allowedActions = {};
    /*    for (let i = 0; i < permissions.length; i++) {
            if (actionsView[permissions[i]] === undefined) {
                throw new Error(`Permission ${permissions[i]} is not modeled in Mock data model. test requires update ${JSON.stringify(actionsView)}`);
            }
            let permissionActions = actionsView[permissions[i]];

            for (let i = 0; i < permissionActions.length; i++) {
                allowedActions[permissionActions[i].id] = permissionActions[i];
            } //remove from old mock framework
        }*/

        return Object.values(allowedActions);
    }

    getRelease2CaseActions(roles, view) {
        const actions = [];
        let actionsView = {};
        view = view.toLowerCase();
        if (caseActionsMatrix[view] === undefined) {
            throw new Error(`View ${view} is not modeled in Mock data model. test requires update`);
        }
        if (view.includes('mycases') || view.includes('cases')) {
            actionsView = caseActionsMatrix[view];
        }

        let allowedActions = {};
        for (let i = 0; i < roles.length; i++) {
            if (roles[i] === ''){
                continue;
            } else if (actionsView[roles[i]] === undefined) {
                throw new Error(`Role ${roles[i]} is not modeled in Mock data model. test requires update`);
            }
            let roleActions = actionsView[roles[i]];

            for (let i = 0; i < roleActions.length; i++) {
                allowedActions[roleActions[i].id] = roleActions[i];
            }
        }

        return Object.values(allowedActions);
    }

    getRoleCategory(){
        return { "roleId": "judicial", "roleName": "Judicial" }
    }

    getCaseRole(roleCategory){
        return {
            actions: [{ id: "reallocate", title: "Reallocate" }, { id: "remove", title: "Remove Allocation" }],
            end: "2021-02-16T18:58:48.987+0000",
            id: v4(),
            location:"test location",
            roleCategory: roleCategory ? roleCategory : "test-case-role",
            roleName:'',
            start: "2020-09-16T18:58:48.987+0000",
            end:'',
            actorId: v4()
        }
    }

    getCaseExclusion() {
        return {
            "actorId": "",
            "added": 1627776000000,
            "id":"",
            "notes": "this case been remitted from Upper Tribunal and required different judge",
            "type": "Other",
            "userType": "Judicial"
        }
    }

    getCompletableTasks(){
        return {
            task_required_for_event:true,
            tasks : []
        }
    }

    getRole(){
        return {
            roleId:'',
            roleName:'',
            roleType:''
        }
    }

    getValidRoles(){
        const roles = [];
        const leadJudge = this.getRole();
        const hearingJudge = this.getRole();
        const caseManager = this.getRole();

        leadJudge.roleId = 'lead-judge';
        leadJudge.roleName = 'Lead judge';
        leadJudge.roleCategory = 'JUDICIAL';

        hearingJudge.roleId = 'hearing-judge';
        hearingJudge.roleName = 'Hearing judge';
        hearingJudge.roleCategory = 'JUDICIAL';

        caseManager.roleId = 'case-manager';
        caseManager.roleName = 'Case manager';
        caseManager.roleCategory = 'LEGAL_OPERATIONS';

        roles.push(leadJudge);
        roles.push(hearingJudge);
        roles.push(caseManager);
        return roles;
    }


    getRefDataJudge(firstName,surname,email){
        const fn = firstName ? `${firstName} ${surname}` : 'fntest';
        const ln = surname ? surname : "snjudge";
        return {
            "sidam_id": v4(),
            "object_id": "018a0310-f122-4377-9504-f635301f39ed-test2",
            "known_as": `${fn} ${ln}` ,
            "surname": ln,
            "full_name":fn ,
            "personal_code":"330127",
            "post_nominals": "Ms",
            "email_id": email ? email : 'test@judicial.com',
            "appointments": [
                {
                    "base_location_id": "1032",
                    "epimms_id": null,
                    "court_name": "Social Entitlement",
                    "cft_region_id": "2",
                    "cft_region": "London",
                    "location_id": "14",
                    "location": "London",
                    "is_principal_appointment": "true",
                    "appointment": "Tribunal Member Disability",
                    "appointment_type": "Fee Paid",
                    "service_code": "BFA1",
                    "roles": [],
                    "start_date": "2018-12-05",
                    "end_date": null
                }
            ],
            "authorisations": [
                {
                    "jurisdiction": "Authorisation Tribunals",
                    "ticket_description": "Social Security and Child Support",
                    "ticket_code": "357",
                    "service_code": "BBA3",
                    "start_date": "2013-12-05T00:00",
                    "end_date": null
                },
                {
                    "jurisdiction": "Authorisation Tribunals",
                    "ticket_description": "03 - Disability Living Allowance",
                    "ticket_code": "365",
                    "service_code": "BBA3",
                    "start_date": "1901-01-01T00:00",
                    "end_date": null
                }
            ]
        }
    }

    getCaseEventTasksCompletable(){
        return {
            task_required_for_event:false,
            tasks:[]
        }
    }
}




const ACTIONS = {
    Reassign: { id: 'reassign', title: 'Reassign task' },
    Unassign: { id: 'unclaim', title: 'Unassign task' },
    GoToTasks: { id: 'go', title: 'Go to task' },
    AssignToMe: { id: 'claim', title: 'Assign to me' },
    AssignToMeAndGoToTasks: { id: 'claim-and-go', title: 'Assign to me and go to case' },
    Assign: { id: 'assign', title: 'Assign task' },
    MarkAsDone: { id: 'complete', title: 'Mark as done' },
    Cancel: { id: 'cancel', title: 'Cancel task' },
}

const CASE_ACTIONS = {
    ReAllocate: { id: 'reallocate', title: 'Reallocate' },
    RemoveAllocation: { id: 'remove', title: 'Remove' },
}
const taskActionsMatrix = {
    ActiveTasksAssignedCurrentUser: {
        Read: [], Refer: [], Manage: [],
        Cancel: [ACTIONS.Cancel],
        Own: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.MarkAsDone],
        Execute: [ACTIONS.MarkAsDone],

    },
    ActiveTasksAssignedOtherUser: {
        Read: [], Refer: [], Manage: [],
        Cancel: [ACTIONS.Cancel],
        Manage: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.MarkAsDone],
        Own: [ACTIONS.AssignToMe],
        Execute: [],

    },
    ActiveTasksUnassigned: {
        Read: [], Refer: [], Manage: [],
        Cancel: [ACTIONS.Cancel],
        Execute: [ACTIONS.AssignToMe],
        Manage: [ACTIONS.Assign],
        Own: [ACTIONS.AssignToMe, ACTIONS.MarkAsDone],
    },
    mytasks: {
        Read: [],
        Refer: [],
        Own: [ACTIONS.Unassign, ACTIONS.GoToTasks],
        Manage: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.GoToTasks],
        Execute: [ACTIONS.Unassign, ACTIONS.GoToTasks],
        Cancel: [ACTIONS.Cancel]

    },
    availabletasks: {
        Read: [],
        Refer: [],
        Own: [ACTIONS.AssignToMe, ACTIONS.AssignToMeAndGoToTasks],
        Manage: [],
        Execute: [ACTIONS.AssignToMe, ACTIONS.AssignToMeAndGoToTasks],
        Cancel: []
    },
    allwork: {
        unassigned: {
            Read: [],
            Refer: [],
            Own: [ACTIONS.MarkAsDone],
            Manage: [ACTIONS.Assign, ACTIONS.GoToTasks],
            Execute: [ACTIONS.MarkAsDone],
            Cancel: [ACTIONS.Cancel]
        },
        assigned: {
            Read: [],
            Refer: [],
            Own: [ACTIONS.MarkAsDone],
            Manage: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.GoToTasks],
            Execute: [ACTIONS.MarkAsDone],
            Cancel: [ACTIONS.Cancel]
        }
    }
}

const caseActionsMatrix = {
    mycases: {
        "case-allocator": [CASE_ACTIONS.ReAllocate, CASE_ACTIONS.RemoveAllocation],
        "task-supervisor": []
    },
    allworkcases:{
        "case-allocator": [CASE_ACTIONS.ReAllocate, CASE_ACTIONS.RemoveAllocation],
        "task-supervisor": []
    }
}


module.exports = new WorkAllocationModels();
