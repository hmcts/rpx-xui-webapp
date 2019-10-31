/* tslint:disable:no-unused-expression no-var-requires */
import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { config } from '../config'
import { http } from '../lib/http'
import { handleDelete, handleGet, handlePost, handlePut } from './emAnnoService'

chai.use(sinonChai)
describe('enAnnoService', () => {

    let sandbox
    let spy: any
    const req = mockReq()
    const res = mockRes({
        data: 'ok'
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
            const emAnnoPath = '/em-anno/12345'
            const response = await handleGet(emAnnoPath)
            expect(response).to.equal('ok')
        })
    })

    describe('handlePost', () => {
        it('should make a post request', async () => {
            spy = sandbox.stub(http, 'post').resolves(res)
            const emAnnoPath = '/em-anno/12345'
            const response = await handlePost(emAnnoPath, {})
            expect(response).to.equal('ok')
        })
    })

    describe('handlePut', () => {
        it('should make a put request', async () => {
            spy = sandbox.stub(http, 'put').resolves(res)
            const emAnnoPath = '/em-anno/12345'
            const response = await handlePut(emAnnoPath, {})
            expect(response).to.equal('ok')
        })
    })

    describe('handleDelete', () => {
        it('should make a delete request', async () => {
            spy = sandbox.stub(http, 'delete').resolves(res)
            const emAnnoPath = '/em-anno/12345'
            const response = await handleDelete(emAnnoPath)
            expect(response).to.equal('ok')
        })
    })

})
