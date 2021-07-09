const { v4 } = require ('uuid');
const ArrayUtil = require("../../e2e/utils/ArrayUtil");
const WorkAllocationDataModels = require("../../dataModels/workAllocation");

class WorkAllocationMockData {

    constructor(){
        this.findPersonsAllAdata = [];
    }

   async getFindPersonsDataFrom(database){
        return await ArrayUtil.map(database, async (personDetails) => {
            let personModel = WorkAllocationDataModels.getFindPersonObj();
            let personDetailsKeys = Object.keys(personDetails);

            await ArrayUtil.map(personDetailsKeys,async (key) => {
                personModel[key] = personDetails[key];
            });
            return personModel;
        });
    }

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

    getCaseList(count, actions) {
        const caseActions = actions ? actions : [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Release this task" }
        ];
        const cases = [];
        for (let i = 0; i < count; i++) {
            const taskDueDate = `"2021-02-16T18:58:48.987+0000"`;
            cases.push({
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
        return { cases: cases, total_records:150 };
    }

    getMyCases() {
        const caseActions = [
            { "id": "reassign", "title": "Reassign task" },
            { "id": "unclaim", "title": "Unassign task" },
            { "id": "go", "title": "Go to case" }
        ];
        return this.getCaseList(25, caseActions);
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

    getRelease2TaskDetails(){
        return WorkAllocationDataModels.getRelease2Task()
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

    async findPersonResponse(searchTerm, personsData){
        
        if (this.findPersonsAllAdata.length === 0){
            this.findPersonsAllAdata = await this.getFindPersonsDataFrom(findPersonsDetails);
        }
        searchTerm = searchTerm.toLowerCase();
        const referenceData = personsData ? personsData: this.findPersonsAllAdata;
        const filteredUsers = await ArrayUtil.filter(referenceData,async (person) => {
            return person.email.toLowerCase().includes(searchTerm) || person.name.toLowerCase().includes(searchTerm);
        });
        return filteredUsers;
    }


}



module.exports = new WorkAllocationMockData();

const findPersonsDetails = [
    { domain: 1, email: "Aleena.Agarwal@justice.gov.uk", id: "", name:"Aleena Agarwal"},
    { domain: 1, email: "Tommy.Wong@justice.gov.uk", id: "", name: "Tommy Wong" },
    { domain: 1, email: "Adnan.Akgun@justice.gov.uk", id: "", name: "Adnan Akgun" },
    { domain: 1, email: "Andy.Wilkins@justice.gov.uk", id: "", name: "Andy Wilkins" },
    { domain: 1, email: "Connor.McElroy@justice.gov.uk", id: "", name: "Connor McElroy" },
    { domain: 1, email: "Daniel.Lam@justice.gov.uk", id: "", name: "Daniel Lam " },
    { domain: 1, email: "Ernest.Man@justice.gov.uk", id: "", name: "Ernest Man" },
    { domain: 1, email: "Ishita.Oswal@justice.gov.uk", id: "", name: "Ishita Oswal" },
    { domain: 1, email: "jamie.Mistry@justice.gov.uk", id: "", name: "jamie Mistry" },
    { domain: 1, email: "Kuda.Nyamainashe@justice.gov.uk", id: "", name: "Kuda Nyamainashe" },
    { domain: 1, email: " Lefkos.HadjiPavlou@justice.gov.uk", id: "", name: " Lefkos HadjiPavlou" },
    { domain: 1, email: "Mariana.Pereira@justice.gov.uk", id: "", name: "Mariana Pereira" },
    { domain: 1, email: "Mohammed.Lala@justice.gov.uk", id: "", name: "Mohammed Lala" },
    { domain: 1, email: "Paul.Graham@justice.gov.uk", id: "", name: "Paul Graham" },
    { domain: 1, email: "Paul.Howes@justice.gov.uk", id: "", name: "Paul Howes" },
    { domain: 1, email: "Ray.Liang @justice.gov.uk", id: "", name: "Ray Liang " },
    { domain: 1, email: "ritesh.dsouza@justice.gov.uk", id: "", name: "ritesh dsouza" },
    { domain: 1, email: "Ronald.Mansveld@justice.gov.uk", id: "", name: "Ronald Mansveld" },
    { domain: 1, email: "Sreekanth.Puligadda@justice.gov.uk", id: "", name: "Sreekanth Puligadda" },
    { domain: 1, email: "Uday.Denduluri @justice.gov.uk", id: "", name: "Uday Denduluri " },
    { domain: 1, email: "Vamshi.Muniganti @justice.gov.uk", id: "", name: "Vamshi Muniganti " },
];
