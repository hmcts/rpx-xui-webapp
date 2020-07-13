import {expect} from 'chai'
import {DEFAULT_SESSION_TIMEOUT, getUserSessionTimeout} from './userTimeout'

describe('userTimeout', () => {

    /**
     * The Session Timeouts array is in PRIORITY ORDER ie. The FIRST Session Timeout object will be used
     * if the FIRST Session Timeout regex pattern matches a User's role.
     *
     * If the first pattern is not matched, then the second one is tried, etc. If there are no matches
     * then the final wildcard regex pattern is used - the DEFAULT.
     */
    describe('getUserSessionTimeout()', () => {

        it('should return the FIRST matching Session Timeout, if one of a User\'s Roles matches that Session Timeout\'s pattern.', () => {

            const roles = [
                'pui-organisation-manager',
                'pui-case-manager',
            ]

            const roleGroupSessionTimeouts = [
                {
                    idleModalDisplayTime: 5,
                    pattern: 'pui-',
                    totalIdleTime: 50,
                },
                {
                    idleModalDisplayTime: 2,
                    pattern: '.',
                    totalIdleTime: 12,
                },
            ]

            const usersSessionTimeout = getUserSessionTimeout(roles, roleGroupSessionTimeouts);

            expect(usersSessionTimeout).to.equal(roleGroupSessionTimeouts[0])
        })

        it('should return the LAST MATCHING Session Timeout, if there are NO User Role\'s that match the previous reg ex patterns ie.', () => {

            const DEFAULT_SESSION_TIMEOUT = [{
                idleModalDisplayTime: 2,
                pattern: '.',
                totalIdleTime: 12,
            }]

            const roles = [
                'pui-organisation-manager',
                'pui-case-manager',
                'pui-finance-manager',
            ]

            const roleGroupSessionTimeouts = [
                {
                    idleModalDisplayTime: 5,
                    pattern: 'doesnotmatch',
                    totalIdleTime: 50,
                },
                // The last item is the default so that we can easily configure the default as IT will change on Go Live, informed by BA.
                ...DEFAULT_SESSION_TIMEOUT,
            ]

            expect(getUserSessionTimeout(roles, roleGroupSessionTimeouts)).to.equal(DEFAULT_SESSION_TIMEOUT[0])
        })

        it('should return the SECOND matching Session Timeout, if the Session Timeout reg ex pattern DOES NOT match' +
            'the FIRST Session Timeout pattern.', () => {

            const roles = [
                'pui-organisation-manager',
            ]

            const roleGroupSessionTimeouts = [
                {
                    idleModalDisplayTime: 5,
                    pattern: 'doesnotmatch',
                    totalIdleTime: 50,
                },
                {
                    idleModalDisplayTime: 10,
                    pattern: 'organisation',
                    totalIdleTime: 80,
                },
                {
                    idleModalDisplayTime: 2,
                    pattern: '.',
                    totalIdleTime: 12,
                },
            ]

            expect(getUserSessionTimeout(roles, roleGroupSessionTimeouts)).to.equal(roleGroupSessionTimeouts[1])
        })

        it('should return the DEFAULT_SESSION_TIMEOUT if the XUI team accidentally sets an incorrect default reg ex pattern.', () => {

            const roles = [
                'pui-organisation-manager',
            ]

            const roleGroupSessionTimeouts = [{
                idleModalDisplayTime: 6,
                pattern: 'a-non-descript-pattern',
                totalIdleTime: 60,
            }]

            expect(getUserSessionTimeout(roles, roleGroupSessionTimeouts)).to.equal(DEFAULT_SESSION_TIMEOUT)
        })

        it('should return the DEFAULT_SESSION_TIMEOUT if the XUI team accidentally does not set a DEFAULT Session Timeout via the' +
            'configuration.', () => {

            const roles = [
                'pui-organisation-manager',
            ]

            const roleGroupSessionTimeouts = []

            expect(getUserSessionTimeout(roles, roleGroupSessionTimeouts)).to.equal(DEFAULT_SESSION_TIMEOUT)
        })

        /**
         * The following should never happen but the production code should be resilient to this edge case.
         */
        it('should return the DEFAULT_SESSION_TIMEOUT if there are no User Roles.', () => {

            const roles = []

            const roleGroupSessionTimeouts = [
                {
                    idleModalDisplayTime: 10,
                    pattern: 'organisation',
                    totalIdleTime: 80,
                },
            ]

            expect(getUserSessionTimeout(roles, roleGroupSessionTimeouts)).to.equal(DEFAULT_SESSION_TIMEOUT)
        })

        it('should give preference to Session Timeout patterns in a PRIORITY ORDER. A pattern nearer to the top of the list is' +
            'higher priority.', () => {

            // Roles are sorted by sortUserRoles() which is a side effect within getUserSessionTimeout(), but we are
            // showing the sorted roles here, as it's easier to understand what happens.
            const roles = [
                'caseworker',
                'caseworker-divorce-financialremedy',
                'caseworker-divorce-solicitor',
                'caseworker-probate',
                'caseworker-probate-solicitor',
                'pui-user-manager',
                'pui-finance-manager',
            ]

            const roleGroupSessionTimeouts = [
                {
                    idleModalDisplayTime: 10,
                    pattern: 'pui-user-manager',
                    totalIdleTime: 80,
                },
                {
                    idleModalDisplayTime: 20,
                    pattern: 'caseworker-probate',
                    totalIdleTime: 200,
                },
            ]

            expect(getUserSessionTimeout(roles, roleGroupSessionTimeouts)).to.equal(roleGroupSessionTimeouts[0])
        })
    })
})
