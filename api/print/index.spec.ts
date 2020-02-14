/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import {getConfigValue} from '../configuration'
import {
  SERVICES_CCD_COMPONENT_API_PATH,
} from '../configuration/references'
import { getPrintout } from './index'
import * as printService from './printService'

chai.use(sinonChai)
describe('print - getPrintout', () => {

    let sandbox
    let spy: any
    const service: string = getConfigValue(SERVICES_CCD_COMPONENT_API_PATH)
    const reqQuery = {
        originalUrl: '/print/12345',
    }
    const req = mockReq(reqQuery)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        spy = sandbox.stub(printService , 'getCcdPrintout').returns('<p>test</p>')
    })

    afterEach(() => {
        sandbox.restore()
    })

    // it('should call getCcdPrintout and return the html response', async () => {
    //     const printPath = `${service}${reqQuery.originalUrl}`
    //     await getPrintout(req, res)
    //     expect(printService.getCcdPrintout).to.have.been.calledWith(printPath)
    //     expect(res.status).to.have.been.calledWith(200)
    //     expect(res.send).to.have.been.calledWith('<p>test</p>')
    // })

    it('should return the error', async () => {

        sandbox.restore()
        const response = {
            data: 'unathorised',
            status: 403,
            statusText: 'Access denied',
        }
        spy = sandbox.stub(printService , 'getCcdPrintout').throws(response)

        const printPath = `${service}${reqQuery.originalUrl}`
        await getPrintout(req, res)
        expect(printService.getCcdPrintout).to.have.been.calledWith(printPath)
        expect(res.status).to.have.been.calledWith(response.status)
        expect(res.send).to.have.been.calledWith({
            errorMessage: response.data,
            errorStatusText: response.statusText,
        })
    })

})
