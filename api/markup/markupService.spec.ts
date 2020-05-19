import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { http } from '../lib/http'
import { handleDelete, handleGet, handlePost, handlePut } from './markupService'
import { Markup } from './models'

chai.use(sinonChai)
describe('markupService', () => {

    const dummyMarkup: Markup = {
        redactionId: 'dummy',
        documentId: 'dummy',
        page: 1,
        rectangles: []
    }

    let sandbox
    let spy: any
    const req = mockReq()
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
            const markupPath = '/markup/12345'
            const response = await handleGet(markupPath, req)
            expect(response.data).to.equal('ok')
        })
    })

    describe('handlePost', () => {
        it('should make a post request', async () => {
            spy = sandbox.stub(http, 'post').resolves(res)
            const markupPath = '/markup/12345'
            const response = await handlePost(markupPath, dummyMarkup, req)
            expect(response.data).to.equal('ok')
        })
    })

    describe('handlePut', () => {
        it('should make a put request', async () => {
            spy = sandbox.stub(http, 'put').resolves(res)
            const markupPath = '/markup/12345'
            const response = await handlePut(markupPath, dummyMarkup, req)
            expect(response.data).to.equal('ok')
        })
    })

    describe('handleDelete', () => {
        it('should make a delete request', async () => {
            spy = sandbox.stub(http, 'delete').resolves(res)
            const markupPath = '/markup/12345'
            const response = await handleDelete(markupPath, req)
            expect(response.data).to.equal('ok')
        })
    })

})
