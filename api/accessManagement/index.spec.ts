import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { mockReq, mockRes } from 'sinon-express-mock'
import * as accessManagement from './index'

describe('Judicial Booking', () => {
    let res;
    let req;

    beforeEach(() => {
        res = mockRes()
        req = mockReq({
           params: {}
        })
    })

    afterEach(() => {
    })

    describe('access management', () => {
        it('should return some test bookings', async () => {
            req.body.userId = "21334a2b-79ce-44eb-9168-2d49a744be9c";
            const response = await accessManagement.getBookings(req, res, null)
            expect(response).to.not.equal(undefined)
        })

        it('should return a sample booking response', async () => {
            const response = await accessManagement.createBooking(req, res, null)
            expect(response).to.not.equal(undefined)
        })

        it('should return a role assignment success message response', async () => {
            const response = await accessManagement.refreshRoleAssignments(req, res, null)
            expect(response).to.not.equal(undefined)
        })
    })
})
