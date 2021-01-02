class WorkAllocationMockData{

    getTaskList(count){
        const tasks = [];
        for (let i = 0; i < count; i++) {
            tasks.push({
                "id": "56789012345678" + i,
                "caseReference": "5678 9012 3456 78" + i,
                "caseName": "Oliver Twist" + 1,
                "caseCategory": "Protection",
                "location": "Orphanage",
                "taskName": "Give more gruel",
                "dueDate": "2020-12-19T09:41:38.695Z",
                "actions": [
                    {
                        "id": "reassign",
                        "title": "Reassign task"
                    },
                    {
                        "id": "unclaim",
                        "title": "Release this task"
                    }
                ]
            });
        }
        return { tasks: tasks };
    }

    getCaseworkersList(count){
        const caseWorkers = [];
        for (let ctr = 0; ctr < count; ctr++) {
            caseWorkers.push({
                "firstName": "Jane " + ctr,
                "lastName": "Doe",
                "idamId": "2",
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

    getTaskDetails(){
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


    getLocation(locationId){
        locationId = locationId ? locationId : 10001 
        return {
            id: locationId ,
            locationName: "testloc " + locationId,
            services: ['Test service 1', 'Test service 2']
        }
    }

    getLocationList(count){
        const locations = [];
        for(let i = 0; i < count ; i++){
            locations.push(this.getLocation(9000+i));
        }
        return locations;
    }

}

module.exports = new WorkAllocationMockData(); 