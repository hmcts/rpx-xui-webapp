const { v4 } = require('uuid');

class WorkAllocationModels {
    getRelease1Task() {
        return {
            "id": v4(),
            "name": "task name ",
            "assignee": v4(),
            "type": "wa-task-configuration-api-task",
            "task_state": "assigned",
            "task_system": "SELF",
            "security_classification": "PUBLIC",
            "task_title": "task name",
            "created_date": "2021-02-16T18:58:48.987+0000",
            "due_date": "2021-02-16T18:58:48.987+0000",
            "location_name": "Taylor House ",
            "location": "765320",
            "execution_type": "Case Management Task",
            "jurisdiction": "IA",
            "region": "1",
            "case_type_id": "Asylum",
            "case_id": "161350192272981",
            "case_category": "protection",
            "case_name": "Bob Smith",
            "auto_assigned": false,
            "warnings": false,
            "actions": [],
            "dueDate": "2021-02-16T18:58:48.987+0000",
            "taskName": "task name ",
            "caseName": "Bob Smith",
            "caseCategory": "protection",
            "assigneeName": null
        }
    }

    getRelease2Task() {
        return {
            "id": v4(),
            "task_title": "Review application decision",
            "dueDate": "2021-05-12T16:00:00.000+0000",
            "location_name": "Glasgow",
            "location": "765320",
            "case_id": "1620409659381330",
            "case_category": "Protection",
            "case_name": "Jo Fly " + Math.floor((Math.random() * 100) + 1),
            "permissions": [],
            "actions": []
        };
    }

    getRelease2Case() {
        return {
            "id": v4(),
            "task_title": "Review FTPA application",
            "location_name": "Glasgow",
            "case_id": "1620409659381330",
            "case_category": "Protection",
            "case_name": "Jo Fly " + Math.floor((Math.random() * 100) + 1),
            "permissions": [],
            "actions": [],
            "assignee": v4(),
            "startDate": "2021-02-16T18:58:48.987+0000",
            "endDate": "2021-02-16T18:58:48.987+0000",
            "jurisdiction":"Test jurisdiction",
            "case_role":"Test case role"
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
            cases: cases,
            total_records: 100
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
            location: this.getLocation()
        }
    }

    getFindPersonObj() {
        return {
            domain: 1,
            email: "andy.kings@email.com",
            id: "id131",
            name: "Andy Kings",
            knownAs:'Lead Judgee'
        }
    }

    getRelease2TaskActions(permissions, view, assignState) {
        const actions = [];
        let actionsView = {};
        view = view.toLowerCase();
        assignState = assignState ? assignState.toLowerCase() : '';
        if (taskActionsMatrix[view] === undefined) {
            throw new Error(`View ${view} is not modeled in Mock data model. test requires update`);
        }
        if (view.includes('my')) {
            actionsView = taskActionsMatrix['mytasks'];
        } else if (view.includes('available')) {
            actionsView = taskActionsMatrix['availabletasks'];
        } if (view.includes('all')) {
            actionsView = taskActionsMatrix['allwork'];
            actionsView = assignState.includes('un') ? taskActionsMatrix['allwork']['unassigned'] : taskActionsMatrix['allwork']['assigned'];
        }

        let allowedActions = {};
        for (let i = 0; i < permissions.length; i++) {
            if (actionsView[permissions[i]] === undefined) {
                throw new Error(`Permission ${permissions[i]} is not modeled in Mock data model. test requires update`);
            }
            let permissionActions = actionsView[permissions[i]];

            for (let i = 0; i < permissionActions.length; i++) {
                allowedActions[permissionActions[i].id] = permissionActions[i];
            }
        }

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

    getCaseRole(){
        return {
            actions: [{ id: "reallocate", title: "Reallocate" }, { id: "remove", title: "Remove Allocation" }],
            end: "2021-02-16T18:58:48.987+0000",
            id: v4(),
            location:"test location",
            name:"caserole name",
            roleCategory:"test-case-role",
            roleName:'',
            start: "2020-09-16T18:58:48.987+0000",
            end:'',
            email:'test@test.com',
            actorid: v4()
        }
    }

    getCaseExclusion() {
        return {
            "added": 1627776000000,
            "name": "Judge Birch",
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
}




const ACTIONS = {
    Reassign: { id: 'reassign', title: 'Reassign task' },
    Unassign: { id: 'unclaim', title: 'Unassign task' },
    GoToTasks: { id: 'go', title: 'Go to task' },
    AssignToMe: { id: 'claim', title: 'Assign to me' },
    AssignToMeAndGoToTasks: { id: 'claim-and-go', title: 'Assign to me and go to case' },
    Assign: { id: 'assign', title: 'Assign task' },
    MarkAsDone: { id: 'mark-as-done', title: 'Mark as done' },
    Cancel: { id: 'cancel', title: 'Cancel task' },
}

const CASE_ACTIONS = {
    ReAllocate: { id: 'reallocate', title: 'Reallocate' },
    RemoveAllocation: { id: 'remove', title: 'Remove' },
}
const taskActionsMatrix = {
    mytasks: {
        Read: [],
        Refer: [],
        Manage: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.GoToTasks],
        Execute: [ACTIONS.MarkAsDone],
        Cancel: [ACTIONS.Cancel]

    },
    availabletasks: {
        Read: [],
        Refer: [],
        Manage: [ACTIONS.AssignToMe, ACTIONS.AssignToMeAndGoToTasks],
        Execute: [],
        Cancel: []
    },
    allwork: {
        unassigned: {
            Read: [],
            Refer: [],
            Manage: [ACTIONS.Assign, ACTIONS.GoToTasks],
            Execute: [ACTIONS.MarkAsDone],
            Cancel: [ACTIONS.Cancel]
        },
        assigned: {
            Read: [],
            Refer: [],
            Manage: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.GoToTasks],
            Execute: [ACTIONS.MarkAsDone],
            Cancel: [ACTIONS.Cancel]
        }
    }
}

const caseActionsMatrix = {
    mycases: {
        "case-allocator": [CASE_ACTIONS.ReAllocate, CASE_ACTIONS.RemoveAllocation],
    },
    allworkcases:{
        "case-allocator": [CASE_ACTIONS.ReAllocate, CASE_ACTIONS.RemoveAllocation],
    }
}


module.exports = new WorkAllocationModels();
