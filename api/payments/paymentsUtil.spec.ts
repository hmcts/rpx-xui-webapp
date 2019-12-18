import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { preparePaymentsUrl } from './paymentsUtil'

chai.use(sinonChai)
describe('paymentsUtil', () => {

    let sandbox

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('preparePaymentsUrl', () => {

        it('should replace first occurence of "/payments/" and nothing else', async () => {
            const baseUrl = 'dummy'
            const paymentsPath = '/payments/12345/payments/payments_dummy'
            const response = preparePaymentsUrl(baseUrl, paymentsPath)
            const expectedResponse = 'dummy/12345/payments/payments_dummy'
            expect(response).to.equal(expectedResponse)
        })
    })

})
