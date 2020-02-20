/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as dmStore from './DMStore'
import * as documents from './index'

chai.use(sinonChai)
describe('Documents', () => {

    let sandbox
    const reqParams = {
        params: {
            document_id: 'documentId',
        },
    }
    const req = mockReq(reqParams)
    const res = mockRes()
    const doc = {
        test: 1,
    }
    const binaryPipe = {
        headers: {
          "connection": "close",
          "content-disposition": "fileName=\"DraftDivorcePetition.pdf\"",
          "content-length": "55945",
          "content-type": "application/pdf",
          "data-source": "contentURI",
          "date": "Mon, 23 Sep 2019 08:45:03 GMT",
          "originalfilename": "DraftDivorcePetition.pdf",
          "request-context": "appId=cid-v1:59871fc9-bac4-41d8-ad63-e64e5ce709d4",
          "x-application-context": "dm-store:dev:13990",
          "x-content-type-options": "nosniff",
          "x-frame-options": "DENY",
          "x-powered-by": "ASP.NET",
          "x-xss-protection": "1; mode=block",
        },
        pipe: sinon.spy(),
    }

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('getDocument', () => {

        it('success', async () => {
            sandbox.stub(dmStore, 'getDocument').resolves(doc)
            await documents.getDocumentRoute(req, res)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith(doc)
        })

        it('error', async () => {
            sandbox.stub(dmStore, 'getDocument').resolves(false)
            await documents.getDocumentRoute(req, res)
            expect(res.status).to.have.been.calledWith(500)
            expect(res.send).to.have.been.calledWith(`Error getting document ${req.params.document_id}`)
        })

    })

    xit('getDocumentBinary', async () => {
        sandbox.stub(dmStore, 'getDocumentBinary').resolves(binaryPipe)
        await documents.getDocumentBinaryRoute(req, res)
        expect(binaryPipe.pipe).to.have.been.calledWith(res)
        expect(res.set).to.have.been.calledWith({
          'Content-Disposition': `inline; ${binaryPipe.headers['content-disposition']}`,
          'Content-Length': binaryPipe.headers['content-length'],
          'Content-Type': binaryPipe.headers['content-type'],
        })
    })

})
