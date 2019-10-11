/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockRes } from 'sinon-express-mock'
import { http } from '../lib/http'
import { getCcdPrintout } from './printService'

chai.use(sinonChai)
describe('printService - getCcdPrintout', () => {

    let sandbox
    let spy: any
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

    it('should make a get request', async () => {
        const printPath = '/print/12345'
        const response = await getCcdPrintout(printPath)
        expect(response).to.equal('ok')
    })

})
