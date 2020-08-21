import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { getConfigValue } from '../configuration'
import { SERVICES_MARKUP_API_URL } from '../configuration/references'
import { deleteMarkup, getMarkup, postMarkup, putMarkup } from './markup'
import * as markupService from './redactionService'

chai.use(sinonChai)
describe('markup', () => {

    let next
    let sandbox
    let spy: any
    const service: string = getConfigValue(SERVICES_MARKUP_API_URL)
    const reqQuery = {
        originalUrl: '/markup/12345',
    }
    const req = mockReq(reqQuery)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        next = sandbox.spy()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('getMarkup', () => {
        beforeEach(() => {
            spy = sandbox.stub(markupService, 'handleGet').returns({status: 200, data: {}})
        })
        it('should call getMarkup and return the json response', async () => {
            const markupPath = `${service}${reqQuery.originalUrl}`
            await getMarkup(req, res, next)
            expect(markupService.handleGet).to.have.been.calledWith(markupPath)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith({})
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(markupService, 'handleGet').throws(response)

            const markupPath = `${service}${reqQuery.originalUrl}`
            await getMarkup(req, res, next)
            expect(markupService.handleGet).to.have.been.calledWith(markupPath)
            expect(next).to.have.been.called
        })

    })

    describe('postMarkup', () => {
        beforeEach(() => {
            spy = sandbox.stub(markupService, 'handlePost').returns({status: 200, data: {}})
        })
        it('should call postMarkup and return the json response', async () => {
            const markupPath = `${service}${reqQuery.originalUrl}`
            await postMarkup(req, res, next)
            expect(markupService.handlePost).to.have.been.calledWith(markupPath, req.body)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith({})
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(markupService, 'handlePost').throws(response)

            const markupPath = `${service}${reqQuery.originalUrl}`
            await postMarkup(req, res, next)
            expect(markupService.handlePost).to.have.been.calledWith(markupPath, req.body)
            expect(next).to.have.been.called
        })

    })

    describe('putMarkup', () => {
        beforeEach(() => {
            spy = sandbox.stub(markupService, 'handlePut').returns({status: 200, data: {}})
        })
        it('should call putMarkup and return the json response', async () => {
            const markupPath = `${service}${reqQuery.originalUrl}`
            await putMarkup(req, res, next)
            expect(markupService.handlePut).to.have.been.calledWith(markupPath, req.body)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith({})
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(markupService, 'handlePut').throws(response)

            const markupPath = `${service}${reqQuery.originalUrl}`
            await putMarkup(req, res, next)
            expect(markupService.handlePut).to.have.been.calledWith(markupPath, req.body)
            expect(next).to.have.been.called
        })

    })

    describe('deleteMarkup', () => {
        beforeEach(() => {
            spy = sandbox.stub(markupService, 'handleDelete').returns({status: 200, data: {}})
        })
        it('should call deleteMarkup and return the json response', async () => {
            const markupPath = `${service}${reqQuery.originalUrl}`
            await deleteMarkup(req, res, next)
            expect(markupService.handleDelete).to.have.been.calledWith(markupPath)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith({})
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(markupService, 'handleDelete').throws(response)

            const markupPath = `${service}${reqQuery.originalUrl}`
            await deleteMarkup(req, res, next)
            expect(markupService.handleDelete).to.have.been.calledWith(markupPath)
            expect(next).to.have.been.called
        })

    })
})
