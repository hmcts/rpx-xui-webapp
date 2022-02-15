const nodeAppDataModel = require('../../dataModels/nodeApp');

class NodeAppMockData {

    constructor(){

    }

    init(){
        const roles = ['task-supervisor', 'case-allocator', 'caseworker', 'caseworker-ia', 'caseworker-ia-caseofficer', 'task-supervisor', 'case-allocator'];
        this.userDetails = this.getUserDetailsWithRoles(roles); 
    }

    getConfigurationValue(configurationKey) {
        return configurations[configurationKey];
    }

    getUserDetailsWithRoles(roles) {
        const userDetails = nodeAppDataModel.getUserDetails_oidc();
        userDetails.userInfo.roles = roles;
        userDetails.userInfo.roleCategory = this.getUserRoleType(roles);
        this.userDetails = userDetails;
 
        return userDetails;
    }

    setUserDetailsWithRolesAndIdamId(roles,idamId) {
        const userDetails = nodeAppDataModel.getUserDetails_oidc();
        userDetails.userInfo.roles = roles;
        userDetails.userInfo.id = idamId;
        userDetails.userInfo.uid = idamId;
        userDetails.userInfo.roleCategory = this.getUserRoleType(roles);
        this.userDetails = userDetails; 

        return userDetails;
    }

    getUserRoleType(roles) {
        let roleType = '';
        for (const role of roles) {
            if (role.includes('pui-case-manager')) {
                roleType = 'SOLICITOR';
                break;
            } else if (role.includes('judge')) {
                roleType = 'JUDICIAL';
                break;
            }
        }

        return roleType !== '' ? roleType : 'LEGAL_OPS'
    }

    getUIConfiguration() {
        return {
            "googleAnalyticsKey": "UA-124734893-4",
            "idamWeb": "https://idam-web-public.aat.platform.hmcts.net",
            "launchDarklyClientId": "5de6610b23ce5408280f2268",
            "manageCaseLink": "https://xui-webapp-aat.service.core-compute-aat.internal/cases",
            "manageOrgLink": "https://xui-mo-webapp-aat.service.core-compute-aat.internal",
            "protocol": "http",
            "ccdGatewayUrl":"http://localhost:3001"
        };
    }

    getUserDetailsTemplate() {
        return {
            "canShareCases": true,
            "sessionTimeout": {
                "idleModalDisplayTime": 10,
                "pattern": "-solicitor",
                "totalIdleTime": 50
            },
            "userInfo": {
                "id": "02d1f898-4109-4a28-a978-2ba14f42de22",
                "forename": "Luke",
                "surname": "Wilson",
                "email": "lukesuperuserxui@mailnesia.com",
                "active": true,
                "roles": [
                    "caseworker-ia-caseofficer",
                    "caseworker",
                    "caseworker-divorce",
                    "caseworker-divorce-financialremedy",
                    "caseworker-divorce-financialremedy-solicitor",
                    "caseworker-divorce-solicitor",
                    "caseworker-ia",
                    "caseworker-ia-legalrep-solicitor",
                    "caseworker-probate",
                    "caseworker-probate-authoriser",
                    "caseworker-probate-solicitor",
                    "caseworker-publiclaw",
                    "caseworker-publiclaw-solicitor",
                    "payments",
                    "pui-caa",
                    "pui-case-manager",
                    "pui-finance-manager",
                    "pui-organisation-manager",
                    "pui-user-manager"
                ]
            }
        };
    }
}



const configurations = {
    'feature.termsAndConditionsEnabled': false,
    'termsAndConditionsEnabled': false

}

module.exports = new NodeAppMockData();

