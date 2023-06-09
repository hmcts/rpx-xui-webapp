
const RolesAccessDataModel = require('../../../dataModels/roleAccess');
class RoleAccess{

    constructor(){
        this.dataModel = RolesAccessDataModel; 
        this.caseRoles = [];
    }

    getAccessRolesByCaseId(mockRoles){

        RolesAccessDataModel.getCaseRole();
        const response = [];
        response.push(RolesAccessDataModel.getCaseRole()) 
        response.push(RolesAccessDataModel.getCaseRole()) 

        return response;
    }
}

module.exports = new RoleAccess();

