

const { v4 } = require('uuid');

const rdcaseworkers = require('./rdCaseworker/index')
const roleAssignment = require('./roleAssignments/index');

const caseworkersConf = [
    { services: ['IA','CIVIL'], role: 'LEGAL_OPERATIONS', roleCategory: 'ORGANISATION', roleType: 'case-allocator', substantive:'Y',count: 10 },
    { services: ['IA', 'CIVIL'], role: 'ADMIN', roleCategory: 'ORGANISATION', roleType: 'case-allocator', substantive: 'Y', count: 10 },
    { services: ['IA', 'CIVIL'], role: 'CTSC', roleCategory: 'ORGANISATION', roleType: 'case-allocator', substantive: 'Y', count: 10 },

]


 const users = {
    caseworkers:[],
    judicial:[]
}

for (const conf of caseworkersConf){
    const service = conf.services.join('_');
    const role = conf.role;
    const roleType = conf.roleType;
    const roleName = conf.roleName;
    

    for(let i = 0; i < conf.count ;i++){
       

        conf.services.forEach(jurisdiction => {
            const cwTemplate = rdcaseworkers.getCaseworkerTemplate();
            cwTemplate.id = v4();
            cwTemplate.first_name = `${role} ${i + 1}`
            cwTemplate.last_name = `${service}`
            cwTemplate.email_id = `${service}_${role}_${i + 1}@justice.gov.uk`.toLowerCase()
            cwTemplate.roleCategory = role
            cwTemplate.base_location[0].location_id = '20001'
            rdcaseworkers.caseworkers.push(cwTemplate)



            const roleAssignmentTemplate = roleAssignment.getRoleAssignmentTemplate();
            roleAssignmentTemplate.actorId = cwTemplate.id;
            roleAssignmentTemplate.attributes.jurisdiction = jurisdiction;
            roleAssignmentTemplate.roleCategory = role;
            roleAssignmentTemplate.roleType = roleType;
            roleAssignmentTemplate.roleName = roleName;
            roleAssignmentTemplate.attributes.substantive = 'Y',
            roleAssignmentTemplate.attributes.primaryLocation = '';
            roleAssignmentTemplate.attributes.workTypes = [];

            roleAssignment.serviceUsersRoleAssignments.push(roleAssignmentTemplate)
        })
        
    }
}


module.exports = users;