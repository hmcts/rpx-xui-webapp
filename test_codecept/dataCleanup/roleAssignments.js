
const axios = require('axios')
const { getS2SToken } = require('./support');
class RoleAssignments{

    constructor(){
       
        this.roleAssigmentIds = [];
        this.authToken = null;
        this.env = process.env.TEST_ENV ? process.env.TEST_ENV : 'aat';

        this.http = axios.create({
            baseURL: `http://am-role-assignment-service-${this.env}.service.core-compute-${this.env}.internal`,
            timeout: 30000,
        })
    }

    addRoleAssignmentid(id){

        console.log(`******************************* Adding role assignment to cleanup ${id}`);
        this.roleAssigmentIds.push(id);
    }


    async runCleanup(auth){
        const s2sToken = await getS2SToken(); 
        
        const headers = {
            "accept":"application/vnd.uk.gov.hmcts.role-assignment-service.delete-assignments+json;charset=UTF-8;version=1.0",
            "Authorization": `Bearer ${auth}`,
            "ServiceAuthorization": s2sToken,
                    // "Content-Type": "application/json"
        };

        const reqConfig = {
            headers: headers
        }

        console.log("********************** test Role assignments cleanup **********************");
        for (const assignmentId of this.roleAssigmentIds){
            try{
                const response = await this.http.delete(`/am/role-assignments/${assignmentId}`, reqConfig)
                console.log(`Deleted role assignment "${assignmentId}" => ${response.status}`);
            }
            catch(err){
                console.log(err);
            }
           
         }
        console.log("********************** test Role assignments cleanup **********************");

    }


}

module.exports = new RoleAssignments();
