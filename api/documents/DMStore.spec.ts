import * as chai from 'chai'
import {expect} from 'chai'
import {Fields, File, Files} from 'formidable'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

import {http} from '../lib/http'
import * as DMStore from './DMStore'

import {config} from '../config'

describe('DMStore', () => {
    const res = {
        data: 'okay',
    }

    const url: string = config.services.documents.api

    let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPatch: any

    beforeEach(() => {

        spy = sinon.stub(http, 'get').resolves(res)
        spyPost = sinon.stub(http, 'post').resolves(res)
        spyPatch = sinon.stub(http, 'patch').resolves(res)
        spyDelete = sinon.stub(http, 'delete').resolves(res)
    })

    afterEach(() => {

        spy.restore()
        spyPost.restore()
        spyPatch.restore()
        spyDelete.restore()
    })

    describe('getDocument()', () => {

        const documentId = 'document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocument(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await DMStore.getDocument(documentId)).to.equal('okay')
        })

    })

    describe('getDocumentBinary()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentBinary(documentId)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/binary`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentBinary(documentId)).to.equal('okay')
        })
    })

    describe('postDocument()', () => {

        const fields: Fields =  {'classification': 'PUBLIC' }

        const file: File = {
          toJSON(): object {
            return undefined
          },
          name: 'dummy.pdf',
          path: '/tmp/uploads/dummy.pdf',
          size: 1,
          type: 'application/pdf',
        }

        const files: Files = { file }

        it('Should make a http.post call', async () => {
            await DMStore.postDocuments(fields, files)
            expect(spyPost).to.be.calledWith(`${url}/documents/`)
        })

        it('Should return the data property of the return of the http.post call', async () => {
            expect(await DMStore.postDocuments(fields, files)).to.equal('okay')
        })
    })

})
