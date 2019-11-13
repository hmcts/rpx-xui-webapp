import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import { config } from '../config'
import * as emAnnoService from './emAnnoService'
import { deleteAnnotations, getAnnotations, postAnnotations, putAnnotations } from './index'

chai.use(sinonChai)
describe('emAnno', () => {

    let sandbox
    let spy: any
    const service: string = config.services.em_anno_api
    const reqQuery = {
        originalUrl: '/emAnno/12345',
    }
    const req = mockReq(reqQuery)
    const res = mockRes()

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('getAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handleGet').returns('{}')
        })
        it('should call getAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await getAnnotations(req, res)
            expect(emAnnoService.handleGet).to.have.been.calledWith(annotationsPath)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith('{}')
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(emAnnoService, 'handleGet').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await getAnnotations(req, res)
            expect(emAnnoService.handleGet).to.have.been.calledWith(annotationsPath)
            expect(res.status).to.have.been.calledWith(response.status)
            expect(res.send).to.have.been.calledWith({
                errorMessage: response.data,
                errorStatusText: response.statusText,
            })
        })

    })

    describe('postAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handlePost').returns('{}')
        })
        it('should call postAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await postAnnotations(req, res)
            expect(emAnnoService.handlePost).to.have.been.calledWith(annotationsPath, req.body)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith('{}')
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(emAnnoService, 'handlePost').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await postAnnotations(req, res)
            expect(emAnnoService.handlePost).to.have.been.calledWith(annotationsPath, req.body)
            expect(res.status).to.have.been.calledWith(response.status)
            expect(res.send).to.have.been.calledWith({
                errorMessage: response.data,
                errorStatusText: response.statusText,
            })
        })

    })

    describe('putAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handlePut').returns('{}')
        })
        it('should call putAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await putAnnotations(req, res)
            expect(emAnnoService.handlePut).to.have.been.calledWith(annotationsPath, req.body)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith('{}')
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(emAnnoService, 'handlePut').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await putAnnotations(req, res)
            expect(emAnnoService.handlePut).to.have.been.calledWith(annotationsPath, req.body)
            expect(res.status).to.have.been.calledWith(response.status)
            expect(res.send).to.have.been.calledWith({
                errorMessage: response.data,
                errorStatusText: response.statusText,
            })
        })

    })

    describe('deleteAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handleDelete').returns('{}')
        })
        it('should call deleteAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await deleteAnnotations(req, res)
            expect(emAnnoService.handleDelete).to.have.been.calledWith(annotationsPath)
            expect(res.status).to.have.been.calledWith(200)
            expect(res.send).to.have.been.calledWith('{}')
        })

        it('should return the error', async () => {

            sandbox.restore()
            const response = {
                data: 'unathorised',
                status: 403,
                statusText: 'Access denied',
            }
            spy = sandbox.stub(emAnnoService, 'handleDelete').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await deleteAnnotations(req, res)
            expect(emAnnoService.handleDelete).to.have.been.calledWith(annotationsPath)
            expect(res.status).to.have.been.calledWith(response.status)
            expect(res.send).to.have.been.calledWith({
                errorMessage: response.data,
                errorStatusText: response.statusText,
            })
        })

    })
})
