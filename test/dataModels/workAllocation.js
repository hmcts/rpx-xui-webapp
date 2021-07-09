const { v4 } = require('uuid');

class WorkAllocationModels{
    getRelease1Task(){
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

    getRelease2Task(){
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

    getLocation(){
        return {
            id:"12345",
            locationName:"test location"
        }
    }

    getCaseWorkerOrperson(){
        return {
            email:"test_person@test.gov.uk",
            firstName:"testfn",
            lastName:"testln",
            idamId:"004b7164-0943-41b5-95fc-39794af4a9fe",
            location: this.getLocation()
        }
    }

    getFindPersonObj(){
        return {
            domain: 1,
            email: "andy.kings@email.com",
            id: "id131",
            name: "Andy Kings"
        }
    }

    getRelease2TaskActions(permissions, view, assignState) {
        const actions = [];
        let actionsView = {};
        view = view.toLowerCase();
        assignState = assignState ? assignState.toLowerCase() : '';
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
            let permissionActions = actionsView[permissions[i]];

            for (let i = 0; i < permissionActions.length; i++) {
                allowedActions[permissionActions[i].id] = permissionActions[i];
            }
        }

        return Object.values(allowedActions);
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
const taskActionsMatrix = {
    mytasks: {
        Read: [],
        Refer: [],
        Manage: [ACTIONS.Reassign, ACTIONS.Unassign, ACTIONS.GoToTasks],
        Execute: [],
        Cancel: []

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


module.exports = new WorkAllocationModels();
