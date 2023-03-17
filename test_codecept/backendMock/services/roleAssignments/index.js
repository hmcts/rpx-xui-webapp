



class RoleAssignments{

    constructor(){
    
    }   

    getActorRoles(actorID){
        const role = this.getMockRoleAssignment();
        role.actorId = actorID;
        return {
            roleAssignmentResponse : [role]}
    }

    getBookings(reqBody){
        return {
            "bookings": [
                {
                    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "userId": "string",
                    "regionId": "string",
                    "locationId": "string",
                    "created": "2023-03-16T15:35:52.582Z",
                    "beginTime": "2023-03-16T15:35:52.582Z",
                    "endTime": "2023-03-16T15:35:52.582Z",
                    "log": "string"
                }
            ]
        }
    }
  

    getMockRoleAssignment(){
        return {
            "actorId": "0fb93311-47fe-4df2-b712-d541779cd565",
            "actorIdType": "IDAM",
            "classification": "PUBLIC",
            "created": "2022-01-13T17:44:42.15304Z",
            "grantType": "STANDARD",
            "id": "92aef8e3-ef7b-4bd4-a0c7-13b6414db239",
            "readOnly": false,
            "roleCategory": "LEGAL_OPERATIONS",
            "roleName": "senior-tribunal-caseworker",
            "roleType": "ORGANISATION",
            "attributes": {
                "substantive": "Y",
                "primaryLocation": "219164",
                "jurisdiction": "IA",
                "workTypes": "hearing_work, routine_work, decision_making_work, applications"
            }
        }
    }


}

module.exports = new RoleAssignments();
