import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
import * as emAnnoService from '../common/crudService'
import {getConfigValue} from '../configuration'
import {
  SERVICES_EM_ANNO_API_URL,
} from '../configuration/references'
import { deleteAnnotations, getAnnotations, postAnnotations, putAnnotations } from './index'

chai.use(sinonChai)
describe('emAnno', () => {

    let sandbox
    let spy: any
    const service: string = getConfigValue(SERVICES_EM_ANNO_API_URL)
    const reqQuery = {
        originalUrl: '/emAnno/12345',
    }
    const req = mockReq(reqQuery)
    const res = mockRes()
    let next: any

    beforeEach(() => {
        sandbox = sinon.createSandbox()
        next = sandbox.spy()
    })

    afterEach(() => {
        sandbox.restore()
    })

    describe('getAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handleGet').returns({status: 200, data: {}})
        })
        it('should call getAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await getAnnotations(req, res, next)
            expect(emAnnoService.handleGet).to.have.been.calledWith(annotationsPath)
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
            spy = sandbox.stub(emAnnoService, 'handleGet').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await getAnnotations(req, res, next)
            expect(emAnnoService.handleGet).to.have.been.calledWith(annotationsPath)
            expect(next).to.have.been.calledWith(response)
        })

    })

    describe('postAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handlePost').returns({status: 200, data: {}})
        })
        it('should call postAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await postAnnotations(req, res, next)
            expect(emAnnoService.handlePost).to.have.been.calledWith(annotationsPath, req.body)
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
            spy = sandbox.stub(emAnnoService, 'handlePost').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await postAnnotations(req, res, next)
            expect(emAnnoService.handlePost).to.have.been.calledWith(annotationsPath, req.body)
            expect(next).to.have.been.calledWith(response)
        })

    })

    describe('putAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handlePut').returns({status: 200, data: {}})
        })
        it('should call putAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await putAnnotations(req, res, next)
            expect(emAnnoService.handlePut).to.have.been.calledWith(annotationsPath, req.body)
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
            spy = sandbox.stub(emAnnoService, 'handlePut').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await putAnnotations(req, res, next)
            expect(emAnnoService.handlePut).to.have.been.calledWith(annotationsPath, req.body)
            expect(next).to.have.been.calledWith(response)
        })

    })

    describe('deleteAnnotations', () => {
        beforeEach(() => {
            spy = sandbox.stub(emAnnoService, 'handleDelete').returns({status: 200, data: {}})
        })
        it('should call deleteAnnotations and return the json response', async () => {
            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await deleteAnnotations(req, res, next)
            expect(emAnnoService.handleDelete).to.have.been.calledWith(annotationsPath)
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
            spy = sandbox.stub(emAnnoService, 'handleDelete').throws(response)

            const annotationsPath = `${service}${reqQuery.originalUrl}`
            await deleteAnnotations(req, res, next)
            expect(emAnnoService.handleDelete).to.have.been.calledWith(annotationsPath)
            expect(next).to.have.been.calledWith(response)
        })

    })
})
