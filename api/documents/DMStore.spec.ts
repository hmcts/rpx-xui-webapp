import * as chai from 'chai'
import { expect } from 'chai'
import { Fields, File, Files } from 'formidable'
import 'mocha'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { getConfigValue } from '../configuration'
import { SERVICES_DOCUMENTS_API_PATH } from '../configuration/references'
import { http } from '../lib/http'
import { EnhancedRequest } from '../lib/models'
import * as DMStore from './DMStore'

chai.use(sinonChai)

describe('DMStore', () => {
    const res = {
        data: 'okay',
    }

    const url: string = getConfigValue(SERVICES_DOCUMENTS_API_PATH)

    let spy: any
    let spyDelete: any
    let spyPost: any
    let spyPatch: any

    beforeEach(() => {

        // @ts-ignore
        spy = sinon.stub(http, 'get').resolves(res)
        // @ts-ignore
        spyPost = sinon.stub(http, 'post').resolves(res)
        // @ts-ignore
        spyPatch = sinon.stub(http, 'patch').resolves(res)
        // @ts-ignore
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

            await DMStore.getDocument(documentId, {} as EnhancedRequest)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}`)
        })

        it('Should return the data property of the return of a http.get call', async () => {

            expect(await DMStore.getDocument(documentId, {} as EnhancedRequest)).to.equal('okay')
        })

    })

    describe('getDocumentBinary()', () => {

        const documentId = 'Document Id'

        it('Should make a http.get call based on the document Id', async () => {

            await DMStore.getDocumentBinary(documentId, {} as EnhancedRequest)
            expect(spy).to.be.calledWith(`${url}/documents/${documentId}/binary`)
        })

        it('Should return the data property of the return of the http.get call', async () => {

            expect(await DMStore.getDocumentBinary(documentId, {} as EnhancedRequest)).to.equal('okay')
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
            await DMStore.postDocuments(fields, files, {} as EnhancedRequest)
            expect(spyPost).to.be.calledWith(`${url}/documents/`)
        })

        it('Should return the data property of the return of the http.post call', async () => {
            expect(await DMStore.postDocuments(fields, files, {} as EnhancedRequest)).to.equal('okay')
        })
    })

})
