const { v4 } = require ('uuid');
const ArrayUtil = require("../../e2e/utils/ArrayUtil");
const WorkAllocationDataModels = require("../../dataModels/workAllocation");

class WorkAllocationMockData {

    getMyTasks(count) {
        const taskActions = [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Unassign task" },
            { "id": "go", "title": "Go to case" }
        ];
        return this.getRelease1TaskList(25, taskActions);
    }

    getAvailableTasks(count) {
        const taskActions = [
            { "id": "claim", "title": "Assign to me" },
            { "id": "claim-and-go", "title": "Assign to me and go to case" }
        ];
        let tasks = this.getRelease1TaskList(25, taskActions);
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
        return this.getRelease1TaskList(25, taskActions);
    }

    getMyWorkMyTasks(count){
        let tasks = { tasks : [], total_records : count};
        for(let i = 0; i < count;i++){
            tasks.tasks.push(this.getRelease2TaskWithPermissions(["Manage", "Read"],"MyTasks","assigned"));
        }
        return tasks;
    }

    getMyWorkAvailableTasks(count) {
        let tasks = { tasks: [], total_records: count };
        for (let i = 0; i < count; i++) {
            tasks.tasks.push(this.getRelease2TaskWithPermissions(["Manage", "Read"],"AvailableTasks",  null));
        }
        return tasks;
    }

    getAllWorkTasks(count) {
        let tasks = { tasks: [], total_records: count };
        for (let i = 0; i < count; i++) {
            tasks.tasks.push(this.getRelease2TaskWithPermissions(["Manage", "Read"],"AllWork",  null));
        }
        return tasks;
    }

    getRelease1TaskList(count, actions) {
        const taskActions = actions ? actions : [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Release this task" }
        ];
        const tasks = [];
        for (let i = 0; i < count; i++) {
            const taskDueDate = `"2021-02-16T18:58:48.987+0000"`;
            let task = WorkAllocationDataModels.getRelease1Task();;
            task.id = v4();
            task.assignee = v4();
            task.name = task.name+" "+i
            task.task_title = task.task_title + " " + i
            task.location = task.location + i
            task.case_id = task.case_id+1;
            task.taskName = task.taskName + 1;
            task.caseName = task.caseName + 1;
            task.actions = taskActions;

            tasks.push(task);
        }
        return { tasks: tasks, total_records:150 };
    }

    getPersonList(count){
        const persons = [];
        for (let ctr = 0; ctr < count; ctr++) {
            persons.push({
                "firstName": "Jane " + ctr,
                "lastName": "Doe",
                "idamId": "41a90c39-d756-4eba-8e85-5b5bf56b31f" + ctr,
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
        return persons;
    }

    getCaseworkersList(count) { 
        return this.getPersonList(count);
    }

    getTaskDetails() {
        return {
            "task": WorkAllocationDataModels.getRelease1Task()
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


    getRelease2TaskWithPermissions(permissions,view,assignState){
        view = view.replace(" ","");
        const task = WorkAllocationDataModels.getRelease2Task();;
        task.permissions = permissions;
        task.actions = WorkAllocationDataModels.getRelease2TaskActions(permissions, view, assignState);
       
        return task;
    }


}



module.exports = new WorkAllocationMockData();
