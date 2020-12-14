module.exports = {
   get: {

        '/workallocation/location': (req, res) => {
            res.send([
                {
                    id: "1234",
                    locationName: "testloc2",
                    services: ['test 1', 'test2']
                }, {
                    id: "2345",
                    locationName: "testloc2",
                    services: ['test 1', 'test2']
                }
            ]);
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
            res.send([
                {
                    "firstName": "Jane",
                    "lastName": "Doe",
                    "idamId": "2",
                    "location": {
                        "id": "a",
                        "locationName": "Location A",
                        "services": [
                            "a"
                        ]
                    }
                },
                {
                    "firstName": "John",
                    "lastName": "Smith",
                    "idamId": "1",
                    "location": {
                        "id": "a",
                        "locationName": "Location A",
                        "services": [
                            "a"
                        ]
                    }
                },
                {
                    "firstName": "Joseph",
                    "lastName": "Bloggs",
                    "idamId": "3",
                    "location": {
                        "id": "b",
                        "locationName": "Location B",
                        "services": [
                            "a",
                            "b"
                        ]
                    }
                },
                {
                    "firstName": "Noah",
                    "lastName": "Body",
                    "idamId": "4",
                    "location": {
                        "id": "b",
                        "locationName": "Location B",
                        "services": [
                            "a",
                            "b"
                        ]
                    }
                }
            ]);
        }
   } 
}