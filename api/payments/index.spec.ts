import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { getPayments} from './index'
import * as paymentsService from './paymentsService'
import { getConfigValue } from '../configuration'
import { SERVICES_PAYMENTS_URL } from '../configuration/references'

chai.use(sinonChai)
describe('payments', () => {

    let sandbox
    let spy: any
    const service: string = getConfigValue(SERVICES_PAYMENTS_URL)
    const reqQuery = {
        originalUrl: '/payments-api/12345',
    }
    const req = mockReq(reqQuery)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('getPayments', () => {
        beforeEach(() => {
            spy = sandbox.stub(paymentsService, 'handleGet').returns('{}')
        })
        it('should call getPayments and return the json response', async () => {
            const paymentsPath = `${service}${reqQuery.originalUrl}`
            await getPayments(req, res)
            expect(paymentsService.handleGet).to.have.been.calledWith(paymentsPath)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith('{}')
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unauthorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(paymentsService, 'handleGet').throws(response)

            const paymentsPath = `${service}${reqQuery.originalUrl}`
            await getPayments(req, res)
            expect(paymentsService.handleGet).to.have.been.calledWith(paymentsPath)
            expect(res.status).to.have.been.calledWith(response.status)
            expect(res.send).to.have.been.calledWith({
                errorMessage: response.data,
                errorStatusText: response.statusText,
            })
        })

    })

})
