class WorkAllocationMockData {

    getMyTasks(count) {
        const taskActions = [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Unassign task" },
            { "id": "go", "title": "Go to case" }
        ];
        return this.getTaskList(count, taskActions);
    }

    getAvailableTasks(count) {
        const taskActions = [
            { "id": "claim", "title": "Assign to me" },
            { "id": "claim-and-go", "title": "Assign to me and go to case" }
        ];
        let tasks = this.getTaskList(count, taskActions);
        tasks.tasks.forEach(task => task.assignee = null);
        return tasks;
    }

    getTaskManagerTasks(count) {
        const taskActions = [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Unassign task" },
            { "id": "complete", "title": "Mark as done" },
            { "id": "cancel", "title": "Cancel task" }
        ];
        return this.getTaskList(count, taskActions);
    }

    getTaskList(count, actions) {
        const taskActions = actions ? actions : [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Release this task" }
        ];
        const tasks = [];
        for (let i = 0; i < count; i++) {
            const taskDueDate = `"2021-02-16T18:58:48.987+0000"`;
            tasks.push({
                "id": "00b8bef2-7089-11eb-b34d-4e1650b0295"+i,
                "name": "task name "+i,
                "assignee": "b8c3049c-af32-4230-bf6c-33b29df6847"+i,
                "type": "wa-task-configuration-api-task",
                "task_state": "assigned",
                "task_system": "SELF",
                "security_classification": "PUBLIC",
                "task_title": "task name"+i,
                "created_date": "2021-02-16T18:58:48.987+0000",
                "due_date": "2021-02-16T18:58:48.987+0000",
                "location_name": "Taylor House "+i,
                "location": "76532"+i,
                "execution_type": "Case Management Task",
                "jurisdiction": "IA",
                "region": "1",
                "case_type_id": "Asylum",
                "case_id": "161350192272981"+i,
                "case_category": "protection",
                "case_name": "Bob Smith",
                "auto_assigned": false,
                "warnings": false,
                "actions": taskActions,
                "dueDate": "2021-02-16T18:58:48.987+0000",
                "taskName": "task name "+i,
                "caseName": "Bob Smith"+i,
                "caseCategory": "protection",
                "assigneeName": null
            });
        }
        return { tasks: tasks };
    }

    getCaseworkersList(count) {
        const caseWorkers = [];
        for (let ctr = 0; ctr < count; ctr++) {
            caseWorkers.push({
                "firstName": "Jane " + ctr,
                "lastName": "Doe",
                "idamId": "41a90c39-d756-4eba-8e85-5b5bf56b31f"+ctr,
                "email": "testemail" + ctr + "@testdomain.com",
                "location": {
                    "id": "a",
                    "locationName": "Location A",
                    "services": [
                        "a"
                    ]
                }
            });
        }
        return caseWorkers;
    }

    getTaskDetails() {
        return {
            "task": {
                "assignee": "test assignee",
                "auto_assigned": true,
                "case_category": "testcat",
                "case_id": "1122-2233-3344-4455",
                "case_name": "test accesibility case",
                "case_type_id": "Test_IAC",
                "created_date": "2020-09-05T14:47:01.250542+01:00",
                "due_date": "2020-09-05T14:47:01.250542+01:00",
                "execution_type": "strtestExecutionTypeing",
                "id": "1122-1122-1122-1122",
                "jurisdiction": "TestJurisdiction",
                "location": "TestLocation",
                "location_name": "locationName",
                "name": "name",
                "region": "regon",
                "security_classification": "PUBLIC",
                "task_state": "tasktate",
                "task_system": "taskSystem",
                "task_title": "task title",
                "type": "testType"
            }
        }
    }


    getLocation(locationId) {
        locationId = locationId ? locationId : 10001
        return {
            id: locationId,
            locationName: "testloc " + locationId,
            services: ['Test service 1', 'Test service 2']
        }
    }

    getLocationList(count) {
        const locations = [];
        for (let i = 0; i < count - 1; i++) {
            locations.push(this.getLocation(9000 + i));
        }
        locations.push({
            id: 'a', locationName: 'Taylor House', services: ['a']
        });
        return locations;
    }

}

module.exports = new WorkAllocationMockData();
