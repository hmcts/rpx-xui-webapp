

const nodeAppDataModels = require('../../dataModels/nodeApp');
const workAllocationDataModels = require('../../dataModels/workAllocation');

const testUsers = require('../../e2e/config/appTestConfig');
const MockApp = require('../../nodeMock/app');

const {getAuthCookie} = require('../helpers/pa11yUtil')
const backendMockClient = require('../../backendMock/client/index')

class UserDetails{


    async withIACJudicialUser() {
        return await this.mockUserDetailsWithIdentifierAndRoles( ['caseworker', 'caseworker-ia','caseworker-ia-iacjudge','case-allocator', 'task-supervisor']);

    }

    async withIACLegalOpsUser() {
        return await this.mockUserDetailsWithIdentifierAndRoles(['caseworker', 'caseworker-ia', 'caseworker-ia-caseofficer','case-allocator', 'task-supervisor']);

    }

   async  mockUserDetailsWithIdentifierAndRoles( roles) {
        // const userDetails = nodeAppDataModels.getUserDetails_oidc();

        // const testUser = testUsers.users['aat'].filter(user => user.userIdentifier === forUserIndetifier);
        // if (testUser.length === 0) {
        //     throw new Error(`User with idenifier ${forUserIndetifier} not found is test uers config`);
        // }
        // userDetails.userInfo.uid = testUser[0].idamId;
        // userDetails.roles = roles;

        await backendMockClient.updateAuthSessionWithRoles(getAuthCookie(),roles)

        // MockApp.onGet('/api/user/details', (req, res) => {
        //     res.send(userDetails);
        // })
        // return userDetails;
    }

}

module.exports = new UserDetails();
