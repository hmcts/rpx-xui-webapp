import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { mockRes } from 'sinon-express-mock'
import * as accessManagement from './index'
import 'mocha';
import * as sinon from 'sinon';

describe('Judicial Booking', () => {
    let res;
    let req;
    let spy: any;
    let sandbox;

    beforeEach(() => {
      res = mockRes()
      sandbox = sinon.createSandbox();
    })

    afterEach(() => {
      sandbox.restore();
    })

    describe('access management', () => {
      it('should return a role assignment success message response', async () => {
          const response = await accessManagement.refreshRoleAssignments(req, res, null)
          expect(response).to.not.equal(undefined)
      })
    })
})
