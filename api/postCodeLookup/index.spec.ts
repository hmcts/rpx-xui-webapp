/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { config } from '../config'
import { http } from '../lib/http'
import { doLookup } from './index'

chai.use(sinonChai)
describe('postCodeLookup - doLookup', () => {

    let sandbox
    let spy: any
    const postcode = 'E1 8FA'
    const reqQuery = {
        query: { postcode },
    }
    const req = mockReq(reqQuery)
    const res = mockRes({
        data: 'ok'
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        spy = sandbox.stub(http, 'get').resolves(res)
    })

    afterEach(() => {
        sandbox.restore()
    })

    it('should make a http.get call', async () => {
        const url =  `${config.services.ccd.componentApi}/addresses?postcode=${postcode}`
        await doLookup(req, res)
        expect(spy).to.have.been.calledWith(url)
        expect(res.send).to.have.been.calledWith('ok')
    })

    it('should catch an error', async () => {
        sandbox.restore()
        const error = {
            data: {
                errorDescription: 'You do not have sufficient privileges',
            },
            message: 'access denied',
            status: 403,
        }
        const errReport = {
            apiError: error.message,
            apiErrorDescription: error.data.errorDescription,
            statusCode: error.status,
        }
        spy = sandbox.stub(http, 'get').throws(error)
        await doLookup(req, res)
        expect(res.status).to.have.been.calledWith(errReport.statusCode)
        expect(res.send).to.have.been.calledWith(errReport)
    })
})
