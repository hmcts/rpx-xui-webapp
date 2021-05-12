class NodeAppMockData {

    getConfigurationValue(configurationKey) {
        return configurations[configurationKey];
    }

    getUserDetailsWithRoles(roles) {
        const userDetails = this.getUserDetailsTemplate();
        userDetails.userInfo.roles = roles;
        return userDetails;
    }

    getUserDetailsWithRolesAndIdamId(roles,idamId) {
        const userDetails = this.getUserDetailsTemplate();
        userDetails.userInfo.roles = roles;
        userDetails.userInfo.id = idamId;
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
                "id": "3db21928-cbbc-4364-bd91-137c7031fe17",
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

