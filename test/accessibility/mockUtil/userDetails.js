

const nodeAppDataModels = require('../../dataModels/nodeApp');
const workAllocationDataModels = require('../../dataModels/workAllocation');

const testUsers = require('../../e2e/config/appTestConfig');
const MockApp = require('../../nodeMock/app');

class UserDetails{


    withIACJudicialUser(forUserIndetifier) {
        this.mockUserDetailsWithIdentifierAndRoles(forUserIndetifier, ['caseworker', 'caseworker-ia','caseworker-ia-iacjudge']);

    }

    withIACLegalOpsUser(forUserIndetifier) {
        this.mockUserDetailsWithIdentifierAndRoles(forUserIndetifier, ['caseworker', 'caseworker-ia','caseworker-ia-caseofficer']);

    }

    mockUserDetailsWithIdentifierAndRoles(forUserIndetifier, roles) {
        const userDetails = nodeAppDataModels.getUserDetails_oidc();

        const testUser = testUsers.users.filter(user => user.userIdentifier === forUserIndetifier);
        if (testUser.length === 0) {
            throw new Error(`User with idenifier ${forUserIndetifier} not found is test uers config`);
        }
        userDetails.userInfo.uid = testUser[0].idamId;
        userDetails.roles = roles;

        MockApp.onGet('/api/user/details', (req, res) => {
            res.send(userDetails);
        })
    }

}

module.exports = new UserDetails();
