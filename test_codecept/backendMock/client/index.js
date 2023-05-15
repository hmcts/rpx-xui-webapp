
const axios = require('axios');

const axiosInstance = axios.create({
  
});

class BackendMockClient{

    constructor(){
        this.baseUrl = 'http://localhost:8080/client/'
;    }

    async updateAuthSessionWithRoles(auth, roles){
        return await axiosInstance.post(`${this.baseUrl}session/user/roles`,{
            auth: auth,
            roles: roles
        })
    }

    async updateAuthSessionWithRoleAssignments(auth, roleAssignments) {
        return await axiosInstance.post(`${this.baseUrl}session/user/roleAssignments`, {
            auth: auth,
            roleAssignments: roleAssignments
        })
    }

    async setUserApiData(auth, apiMethod, response) {
        return await axiosInstance.post(`${this.baseUrl}session/userApiData`, {
            auth: auth,
            apiMethod: apiMethod,
            apiResponse: response
        })
    }


    async getSessionRolesAndRoleAssignments(auth){
        return await axiosInstance.post(`${this.baseUrl}session/getUserRolesAndRoleAssignments`, {
            auth: auth
        })
    }

}


module.exports = new BackendMockClient();

