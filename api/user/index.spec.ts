/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { getUserDetails, getUserRoleAssignments } from './index'

chai.use(sinonChai)
describe('getUserDetails', () => {

    let sandbox
    let next
    let req
    let res

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        next = sandbox.spy()
        res = mockRes()
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should return a true response when case share permission is existent', async () => {
      const reqQuery = {
        session: {
          passport: {
            user: {
              tokenset: {
                accessToken: '124'
              },
              userinfo: {
                roles: ['pui-case-manager'],
              },
            },
          },
        },
      }
      req = mockReq(reqQuery)
      await getUserDetails(req, res, next)
      const response = {
        canShareCases: true,
      }
      expect(res.send).to.have.been.calledWith(sinon.match(response))
    })

    it('should return a false response when case share permission is non-existent', async () => {
      const reqQuery = {
        session: {
          passport: {
            user: {
              tokenset: {
                accessToken: '124'
              },
              userinfo: {
                roles: ['dummy'],
              },
            },
          },
        },
      }
      req = mockReq(reqQuery)
      await getUserDetails(req, res, next)
      const response = {
        canShareCases: false
      }
      expect(res.send).to.have.been.calledWith(sinon.match(response))
    })

    it('should catch an error', async () => {
      const reqQuery = {
        session: {
          passport: {
            user: {
              tokenset: {
                accessToken: '124'
              },
              userinfo: {
                roles: [],
              },
            },
          },
        },
      }
      req = mockReq(reqQuery)
      res.send.throws()

      await getUserDetails(req, res, next)

      expect(next).to.have.been.calledWith()
    })
});

describe('getUserRoleAssignments', async () => {

    it('use session', async () =>  {
    const userInfo = {
      forename: 'foreName',
      surname: 'surName',
      email: 'email@email.com',
      active: true,
      id: '223',
      uid: '223',
      roles: ['role1', 'role3']
    }
    const req = {
      session: {
        roleAssignmentResponse: [{attributes: {primaryLocation: {location: '123'} } }]
      }
    }
    const locationInfo = await getUserRoleAssignments(userInfo, req)
    expect(locationInfo[0].primaryLocation.location).to.equal('123')
  });
});
