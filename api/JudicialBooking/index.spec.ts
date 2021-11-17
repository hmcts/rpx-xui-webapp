import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
import { mockReq, mockRes } from 'sinon-express-mock'
import { http } from '../lib/http'
import * as booking from './index'

describe('Judicial Booking', () => {
    let res
    let req
    let proxyRes
    let spy: any

    beforeEach(() => {
        res = {
            data: 'okay',
        }
        spy = sinon.stub(http, 'get').callsFake(() => {
            return Promise.resolve(res)
        })
        proxyRes = {}
        res = mockRes()
        req = mockReq({
            baseUrl: '/am/bookings',
            cookies: [],
            headers: {
                accept: '*/*',
                'content-type': 'text/test',
                experimental: 'experiment/test',
            },
            session: {
                save: (fun) => {
                    fun()
                },
            },
            url: 'am/booking',
        })
    })

    afterEach(() => {
        spy.restore()
    })

    describe('getUser', () => {
        it('for service call getbookings should return response', async () => {
            const response = await booking.getBookings(proxyRes, req, res)
            expect(response).to.not.equal(undefined)
        })
    })
})
