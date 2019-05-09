import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'

chai.use(sinonChai)

import * as log4js from 'log4js'
import * as responseRequest from './responseRequest'

describe('responseRequest', () => {
    describe('setReqRes', () => {
        it('Should set the request and response objects', () => {
            const req = mockReq({
                cookies: [],
                session: {
                    user: {
                        id: 'testId',
                    },
                },
            })
            const res = mockRes()

            responseRequest.default(req, res, () => { })
            expect(responseRequest.response()).to.not.equal(null)
            expect(responseRequest.request()).to.not.equal(null)
        })
    })

    describe('request', () => {
        it('Should return a request object', () => {
            expect(responseRequest.request()).to.not.equal(null)
        })
    })

    describe('response', () => {
        it('Should return a response object', () => {
            expect(responseRequest.response()).to.not.equal(null)
        })
    })

    describe('isReqResSet', () => {
        it('Should return true if request and response objects are set', () => {
            const res = mockRes()
            expect(responseRequest.isReqResSet()).to.equal(true)
        })
    })
})
