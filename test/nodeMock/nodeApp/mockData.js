const nodeAppDataModel = require('../../dataModels/nodeApp');

class NodeAppMockData {

    getConfigurationValue(configurationKey) {
        return configurations[configurationKey];
    }

    getUserDetailsWithRoles(roles) {
        const userDetails = nodeAppDataModel.getUserDetails_oidc();
        userDetails.userInfo.roles = roles;
        return userDetails;
    }

    getUserDetailsWithRolesAndIdamId(roles,idamId) {
        const userDetails = nodeAppDataModel.getUserDetails_oidc();
        userDetails.userInfo.roles = roles;
        userDetails.userInfo.id = idamId;
        userDetails.userInfo.uid = idamId;
        return userDetails;
    }

    getUIConfiguration() {
        return {
            "googleAnalyticsKey": "UA-124734893-4",
            "idamWeb": "https://idam-web-public.aat.platform.hmcts.net",
            "launchDarklyClientId": "5de6610b23ce5408280f2268",
            "manageCaseLink": "https://xui-webapp-aat.service.core-compute-aat.internal/cases",
            "manageOrgLink": "https://xui-mo-webapp-aat.service.core-compute-aat.internal",
            "protocol": "http"
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

