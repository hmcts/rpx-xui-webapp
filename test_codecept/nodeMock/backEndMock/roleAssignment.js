const {isRequestMatch} = require('./common') 
const { v4 } = require('uuid');

const rdCaseworkerRefApi= require('./rdCaseworkerRefApi')

const roleTemplates = {
    caseRole: (roleDetails) => ({
        id: v4(),
        actorIdType: "IDAM",
        actorId: roleDetails.actorId ? roleDetails.actorId: v4(),
        roleType: "CASE",
        roleName: roleDetails.roleName ? roleDetails.roleName: 'case-manager',
        classification: "PUBLIC",
        grantType: roleDetails.grantType ? roleDetails.grantType: "SPECIFIC",
        roleCategory: roleDetails.roleCategory ? roleDetails.roleCategory: "LEGAL_OPERATIONS",
        readOnly: false,
        beginTime: "2022-11-21T00:00:00Z",
        created: "2022-11-21T12:38:28.169889Z",
        attributes: {
            substantive: "Y",
            caseId: roleDetails.caseId ? roleDetails.caseId : "1624436047084546",
            jurisdiction: roleDetails.jurisdiction ? roleDetails.jurisdiction: "IA",
            caseType: roleDetails.caseType ? roleDetails.caseType: "Asylum",
        }
    })
}





class RoleAssignments{
   
    constructor(){
        this.mockDataFor = {
            ctscRoles :[
                { roleCategory: 'CTSC', roleId: 'ctsc-admin', roleName: 'CTSC admin' },
                { roleCategory: 'CTSC', roleId: 'ctsc-mock', roleName: 'CTSC mock role' },
            ]
        }


        this.caseRoles = []; 
        
        this.setupData();
    }

    setupData(){
        this.setCTSCCaseRoles();
    }

    getQueryFor(response){
        const reqBody = JSON.parse(response.config.data);
        const bodyKeys = Object.keys(reqBody)
        if (bodyKeys.length === 3 && bodyKeys.includes('roleName')){
            return 'SERVICE_ORGANISATION_USERS'
        }

        if (bodyKeys.includes('queryRequests') && 
        reqBody.queryRequests[0].grantType && 
        reqBody.queryRequests[0].grantType.includes('EXCLUDED')){
            return 'EXCLUDED'
        }

        if (bodyKeys.includes('queryRequests') &&
            reqBody.queryRequests[0].attributes.caseId ) {
            return 'CASE_ROLES'
        }
    }

    processResponse(response) {
        if ( isRequestMatch('GET','/am/role-assignments/roles', response) ) {
            this.addCTSCRoleTypes(response)
        }
        if (isRequestMatch('POST', '/am/role-assignments', response ) ) {
            this.createRoleAssignment(response)
        }
        if (isRequestMatch('POST','/am/role-assignments/query', response)){
            const queryFor = this.getQueryFor(response);
            switch (queryFor){
                case 'SERVICE_ORGANISATION_USERS':
                    this.mockCTSCOrganisationRoles(response)
                   break; 
                case 'CASE_ROLES':
                    response.data.roleAssignmentResponse.push(... this.caseRoles) 
                    break;
               

            }
            
          
            
        }
    }

    mockCTSCOrganisationRoles(response){
        rdCaseworkerRefApi.iacCTSCUsers.forEach(ctscUser => {
            const roleTemplate = response.data.roleAssignmentResponse[0]; 
            const newRole = JSON.parse(JSON.stringify(roleTemplate))
            newRole.actorId = ctscUser.id;
            newRole.roleCategory = 'CTSC'
            newRole.roleName = 'ctsc-admin'
            response.data.roleAssignmentResponse.push(newRole) 
        })
    }

    caseRoles(response){
        console.log(response.data)
    }

    addCTSCRoleTypes(response){
        for (const roleType of this.mockDataFor.ctscRoles)  {
            let ctscRole = response.data[0];
            ctscRole = JSON.parse(JSON.stringify(ctscRole))
            ctscRole.category = 'CTSC'
            ctscRole.name = roleType.roleId
            ctscRole.label = roleType.roleName
            ctscRole.substantive = true
            ctscRole.patterns = [{
                attributes:{ 
                    jurisdiction: {mandatory:true, values:['IA']},
                    caseId:{mandatory:true},
                    caseType: { mandatory: true, values: ['Asylum'] },
                },
                classification:{mandatory:true},
                grantType:{mandatory:true, values:['SPECIFIC']},
                roleType:{mandatory:true, values:['CASE']}
            }] 
            response.data.push(ctscRole)
        }
    }
    setCTSCCaseRoles(){
        let ctscuserCtr = 0;
        const ctscRoles = [
            { roleCategory: 'CTSC', roleId: 'ctsc-admin', roleName: 'CTSC admin' },
            { roleCategory: 'CTSC', roleId: 'ctsc-mock', roleName: 'CTSC mock role' },
        ]

        for (const roleType of ctscRoles) {
            let iadamId = rdCaseworkerRefApi.iacCTSCUsers[ctscuserCtr].id;
            ctscuserCtr++; 
            this.caseRoles.push(roleTemplates.caseRole(
                {
                    actorId: iadamId,
                   roleCategory:roleType.roleCategory,
                   roleName:roleType.roleId 
                }
            )) 
        }
        
    }


    createRoleAssignment(response){

        if (response.isAxiosError){
            const res = response.response
            Object.keys(response).forEach(key => delete response[key])
            Object.keys(res).forEach(key => response[key] = res[key] )
            response.status = 200
            response.statusText = 'OK'
        }
      
        console.log(response)
        // Promise.resolve(response)
    }
}

module.exports =  new RoleAssignments();


