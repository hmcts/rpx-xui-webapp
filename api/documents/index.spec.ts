/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import * as express from 'express'
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

    it('getDocumentBinary', async () => {
        sandbox.stub(dmStore, 'getDocumentBinary').resolves(binaryPipe)
        await documents.getDocumentBinaryRoute(req, res)
        expect(binaryPipe.pipe).to.have.been.calledWith(res)
    })

})
