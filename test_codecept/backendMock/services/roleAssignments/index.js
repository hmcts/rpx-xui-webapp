

const roles = require('./roles')
class RoleAssignments{

    constructor(){
       this.serviceUsersRoleAssignments = []


    }   

    getActorRoles(actorID){
        const role = this.getRoleAssignmentTemplate();
        role.actorId = actorID;
        return {
            roleAssignmentResponse : [role]}
    }

    getServiceUsersRolesAssignments(reqBody){
        return this.serviceUsersRoleAssignments.filter(roleAssignment => {
            return reqBody.attributes.jurisdiction.includes(roleAssignment.attributes.jurisdiction)
        })
    }

    getQueryResults(queryRequests){
        const roleAssignments = []
        const query = queryRequests[0];
        const roleType = query.roleType ? query.roleType[0] : null;
        const roleCategory = query.roleCategory ? query.roleCategory[0]: null;
        const actorId = query.actorId ? query.actorId[0] : null;
        const jurisdiction = query.attributes.jurisdiction ? query.attributes.jurisdiction[0] : null

        for(let i = 0 ; i< 150; i++){
            const roleAssignmentTemplate = this.getRoleAssignmentTemplate();
            roleAssignmentTemplate.roleType = roleType;
            roleAssignmentTemplate.roleCategory = roleCategory ? roleCategory : roleAssignmentTemplate.roleCategory;
            roleAssignmentTemplate.actorId = actorId ? actorId : roleAssignmentTemplate.actorId;
            roleAssignmentTemplate.attributes.jurisdiction = jurisdiction;

            if (roleType === 'CASE'){
                roleAssignmentTemplate.attributes.caseType = 'Asylum'
                roleAssignmentTemplate.attributes.caseId = '12345678123456' + (i > 9 ? i : '0'+i)
            }
            roleAssignments.push(roleAssignmentTemplate)

        }

        return roleAssignments;
    }

    getRoleAssignmentsRoles(){
        return roles;
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
  

    getRoleAssignmentTemplate(){
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
