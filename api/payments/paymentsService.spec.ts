import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { http } from '../lib/http'
import { handleGet } from './paymentsService'

chai.use(sinonChai)
describe('paymentsService', () => {

    let sandbox
    let spy: any
    const res = mockRes({
        data: 'ok',
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('handleGet', () => {

        it('should make a get request', async () => {
            spy = sandbox.stub(http, 'get').resolves(res)
            const paymentsPath = '/payments/12345'
            const response = await handleGet(paymentsPath)
            expect(response).to.equal('ok')
        })
    })

})
