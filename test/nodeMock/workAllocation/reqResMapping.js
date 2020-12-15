module.exports = {

    get: {
        '/workallocation/location': (req, res) => {
            const locations = [];
            for(let i = 0; i < 60 ; i++){
                locations.push({
                    id: "1234"+i,
                    locationName: "testloc 2"+i,
                    services: ['test 1'+1, 'test2'+1]
                });
            }
            res.send(locations);
        },
        '/workallocation/location/:locationId': (req, res) => {
            res.send({
                id: "1234",
                locationName: "testloc",
                services: ['test 1', 'test2']
            });
        },
        '/workallocation/task/:taskId': (req, res) => {
            res.send({
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
            });
        },
        '/workallocation/caseworker': (req, res) => {
            const caseWorkers = [];
            for(let ctr = 0; ctr < 40; ctr++){
                caseWorkers.push({
                    "firstName": "Jane "+ctr,
                    "lastName": "Doe",
                    "idamId": "2",
                    "email": "testemail"+ctr+"@testdomain.com",
                    "location": {
                        "id": "a",
                        "locationName": "Location A",
                        "services": [
                            "a"
                        ]
                    }
                });
            }
            res.send(caseWorkers);
        }
    },
    post: {
        '/workallocation/task/' : (req,res) => {
            const tasks = [];
            for(let  i = 0; i < 20; i++){
                tasks.push({
                    "id": "56789012345678"+i,
                    "caseReference": "5678 9012 3456 78"+i,
                    "caseName": "Oliver Twist"+1,
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

            res.send({ tasks : tasks});
        }
    } 
}
