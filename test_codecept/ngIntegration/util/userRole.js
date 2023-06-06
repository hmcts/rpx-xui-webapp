
class User{


    getUserRoleType(roles){
        let roleType = '';
        for(const role of roles){
            if(role.includes('pui-case-manager')){
                roleType = 'SOLICITOR';
                break;
            } else if (role.includes('judge')){
                roleType = 'JUDICIAL';
                break; 
            }
        }

        return roleType !== '' ? roleType : 'LEGAL_OPS' 
    }
}
module.exports = new User();


