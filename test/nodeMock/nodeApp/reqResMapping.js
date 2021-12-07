const nodeAppMockData = require('./mockData');

module.exports = {

    get: {
        '/auth/login': (req, res) => {
            res.set('Location', 'https://idam-web-public.aat.platform.hmcts.net/o/authorize?client_id=xuiwebapp&scope=profile%20openid%20roles%20manage-user%20create-user&response_type=code&redirect_uri=https%3A%2F%2Fmanage-case.aat.platform.hmcts.net%2Foauth2%2Fcallback&state=FqsiMTALn8m7qKRHNAAqlBoXUj57XSdenjnk_fplRzM&prompt=login&nonce=-XwicqlfV3vpe7GNIe9v5QFrlOzFR7VUDcjBBuYyUBc');
            res.status(302).send();
        },
        '/auth/isAuthenticated': (req, res) => {
            res.send(true);
        },
        '/external/configuration-ui': (req, res) => {
            res.send(nodeAppMockData.getUIConfiguration());
        },
        '/external/config/ui': (req, res) => {
            res.send(nodeAppMockData.getUIConfiguration());
        },
        '/external/configuration': (req, res) => {
            res.send("" + nodeAppMockData.getConfigurationValue(req.query.configurationKey));
        },
        '/api/configuration': (req, res) => {
            res.send("" + nodeAppMockData.getConfigurationValue(req.query.configurationKey));
        },
        '/api/healthCheck': (req, res) => {
            res.send({ "healthState": true });
        },
        '/data/internal/profile': (req, res) => {
            res.send(idamProfile);
        },

        '/api/user/details': (req, res) => {
            const roles = ['caseworker', 'caseworker-ia','caseworker-ia-iacjudge'];
            const idamid = '44d5d2c2-7112-4bef-8d05-baaa610bf463';
            res.send(nodeAppMockData.getUserDetailsWithRolesAndIdamId(roles, idamid));
        },
        '/auth/logout': (req,res) => {
            res.header('location','/auth/login');
            res.status(302).send();
        }

        

    },
    post: {
    }
}
