import * as chai from 'chai'
import { expect } from 'chai'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { mockReq, mockRes } from 'sinon-express-mock'
chai.use(sinonChai)

import { http } from '../lib/http'
import * as emAnno from '.'

import { config } from '../config'

describe('emAnno', () => {

    let res

    const url = config.services.em_anno_api

    let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPut: any

    beforeEach(() => {
        // this doesn't change much but it is different for createHearing
        // so is just set by default and overridden in that test, to be reset after
        res = {
            data: 'okay',
            headers: {
                'x-emannotationapp-alert': 'deleted annotation',
            },
            status: 200,
        }

        spy = sinon.stub(http, 'get').callsFake(() => {
            return Promise.resolve(res)
        })

        spyDelete = sinon.stub(http, 'delete').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPost = sinon.stub(http, 'post').callsFake(() => {
            return Promise.resolve(res)
        })

        spyPut = sinon.stub(http, 'put').callsFake(() => {
            return Promise.resolve(res)
        })
    })

    afterEach(() => {
        spy.restore()
        spyPost.restore()
        spyPut.restore()
        spyDelete.restore()
    })

    describe('getAnnotionSet', () => {
        it('Should make a http.get call based on  a uuid', async () => {
            await emAnno.getAnnotionSet('test')
            expect(spy).to.be.calledWith(`${url}/api/annotation-sets/filter?documentId=test`)
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await emAnno.getAnnotionSet('test')).to.equal('okay')
        })
    })

    describe('createAnnotationSet', () => {
        it('Should make a http.post call based on a given payload', async () => {
            await emAnno.createAnnotationSet('test')
            expect(spyPost).to.be.calledWith(`${url}/api/annotation-sets/`, 'test')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await emAnno.createAnnotationSet('test')).to.equal('okay')
        })
    })

    describe('addAnnotation', () => {
        it('Should make a http.post call based on a given payload', async () => {
            await emAnno.addAnnotation('test')
            expect(spyPost).to.be.calledWith(`${url}/api/annotations`, 'test')
        })
        it('Should return the data property of the return ofa http.get call', async () => {
            expect(await emAnno.addAnnotation('test')).to.equal('okay')
        })
    })

    describe('postAnnotation', () => {
        it('Should make a http.post call based on a given payload', async () => {
            await emAnno.deleteAnnotation('test')
            expect(spyDelete).to.be.calledWith(`${url}/api/annotations/test`)
        })
        it('Should return the data property of the return of a http.get call', async () => {
            expect(await emAnno.deleteAnnotation('test')).to.deep.equal({
                status: 200,
                statusText: 'deleted annotation',
            })
        })
    })

    describe('handlePost', () => {
        it('Should return a status of 200 if internal calls are successful', async () => {

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handlePost(request, response)


            expect(response.status).to.be.calledWith(200)
        })

        it('Should not return a status of 200 if internal calls are successful', async () => {

            // lets override the post spy to fail
            spyPost.restore()

            spyPost = sinon.stub(http, 'post').callsFake(() => {
                return Promise.reject(res)
            })

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handlePost(request, response)

            expect(response.status).not.to.be.calledWith(200)
        })
    })

    describe('handleGet', () => {
        it('Should return a status of 200 if internal calls are successful', async () => {

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handleGet(request, response)


            expect(response.status).to.be.calledWith(200)
        })

        it('Should not return a status of 200 if internal calls are successful', async () => {

            // lets override the post spy to fail
            spy.restore()

            spy = sinon.stub(http, 'get').callsFake(() => {
                return Promise.reject(res)
            })

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handleGet(request, response)

            expect(response.status).not.to.be.calledWith(200)
        })
    })

    describe('handleDelete', () => {
        it('Should return a status of 200 if internal calls are successful', async () => {

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handleDelete(request, response)

            expect(response.status).to.be.calledWith(200)
        })

        it('Should not return a status of 200 if internal calls are successful', async () => {

            // lets override the post spy to fail
            spyPost.restore()

            spyPost = sinon.stub(http, 'post').callsFake(() => {
                return Promise.reject(res)
            })

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handlePost(request, response)

            expect(response.status).not.to.be.calledWith(200)
        })
    })

    describe('handleAdd', () => {
        it('Should return a status of 200 if internal calls are successful', async () => {

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handleAdd(request, response)

            expect(response.status).to.be.calledWith(200)
        })

        it('Should not return a status of 200 if internal calls are successful', async () => {

            // lets override the post spy to fail
            spyPost.restore()

            spyPost = sinon.stub(http, 'post').callsFake(() => {
                return Promise.reject(res)
            })

            const request = mockReq({})
            const response = mockRes({})

            await emAnno.handleAdd(request, response)

            expect(response.status).not.to.be.calledWith(200)
        })
    })

})
