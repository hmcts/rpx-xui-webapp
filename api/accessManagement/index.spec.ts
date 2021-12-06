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
            const response = await accessManagement.getBookings(req, res, null)
            expect(response).to.not.equal(undefined)
        })

        it('should return a sample booking response', async () => {
            const response = await accessManagement.postBooking(req, res, null)
            expect(response).to.not.equal(undefined)
        })

        it('should return a role assignment success message response', async () => {
            const response = await accessManagement.refreshRoleAssignments(req, res, null)
            expect(response).to.not.equal(undefined)
        })
    })
})
