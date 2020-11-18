import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as redactionService from '../common/crudService'
import {getConfigValue} from '../configuration'
import {
    SERVICES_MARKUP_API_URL,
} from '../configuration/references'
import { postRedaction } from './redaction'

chai.use(sinonChai)
describe('redaction', () => {

    let next
    let sandbox
    let spy: any
    const service: string = getConfigValue(SERVICES_MARKUP_API_URL)
    const reqQuery = {
        originalUrl: '/redaction/12345',
    }
    const req = mockReq(reqQuery)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        next = sandbox.spy()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('postRedaction', () => {
        beforeEach(() => {
            spy = sandbox.stub(redactionService, 'handlePostBlob').returns({status: 200, data: {}})
        })
        it('should call postRedaction and return the json response', async () => {
            const redactionPath = `${service}${reqQuery.originalUrl}`
            await postRedaction(req, res, next)
            expect(redactionService.handlePostBlob).to.have.been.calledWith(redactionPath, req.body)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith({})
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(redactionService, 'handlePostBlob').throws(response)

            const redactionPath = `${service}${reqQuery.originalUrl}`
            await postRedaction(req, res, next)
            expect(redactionService.handlePostBlob).to.have.been.calledWith(redactionPath, req.body)
            expect(next).to.have.been.called
        })

    })
})
