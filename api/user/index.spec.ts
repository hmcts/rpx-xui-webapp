/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { getUserDetails } from './index'

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

    it('should return a response', async () => {
      const reqQuery = {
          session: { user: { roles: ['pui-case-manager'] } },
      }
      req = mockReq(reqQuery)
      await getUserDetails(req, res, next)
      const response = {
        canShareCases: true,
        sessionTimeout: { idleModalDisplayTime: 10, pattern: ".", totalIdleTime: 480 }
      }
      expect(res.send).to.have.been.calledWith(response)
    })

    it('should catch an error', async () => {
      const reqQuery = {
          session: { user: { roles: [] } },
      }
      req = mockReq(reqQuery)
      res.send.throws()

      await getUserDetails(req, res, next)

      expect(next).to.have.been.calledWith()
    })
})
