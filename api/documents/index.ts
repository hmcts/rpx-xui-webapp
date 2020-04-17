import axios from 'axios'
import * as express from 'express'
import * as formidable from 'formidable'
import * as http from 'http'
import {RequestOptions} from 'http'
import {getConfigValue} from '../configuration'
import {SERVICES_DOCUMENTS_API_PATH} from '../configuration/references'
import {EnhancedRequest} from '../lib/models'
import {setHeaders} from '../lib/proxy'
import * as DMStore from './DMStore'

/**
 * retrieve a document from dm-store by the document_id
 * @param req
 * @param res
 */
export async function getDocumentRoute(req: express.Request, res: express.Response) {
    const documentId = req.params.document_id
    const document = await DMStore.getDocument(documentId, req)
    if (document) {
        res.status(200).send(document)
    } else {
        res.status(500).send(`Error getting document ${documentId}`)
    }
}

/**
 * get the document contents|stream from dm-store by document_id
 * @param req
 * @param res
 */
export async function getDocumentBinaryRoute(req: express.Request, res: express.Response) {
    const documentId = req.params.document_id
    const url = new URL(getConfigValue(SERVICES_DOCUMENTS_API_PATH))

    const headers = { ...{
            'ServiceAuthorization': axios.defaults.headers.common.ServiceAuthorization,
        }, ...setHeaders(req), ...req.headers,
    }

    const options = {
        headers,
        host: `${url.host}/documents/${documentId}/binary`,
    } as RequestOptions

    const request = http.get(options, response => {
        const responseHeaders = {...response.headers}
        delete responseHeaders.connection
        delete responseHeaders['set-cookie']
        delete responseHeaders['content-length']
        res.set(responseHeaders)
        response.pipe(res)
    })

    request.on('error', err => console.log(err))
}

/**
 * Upload new documents to the dm-store
 * @param req
 * @param res
 */
export async function postDocuments(req: EnhancedRequest, res: express.Response) {
  const form: formidable.IncomingForm = new formidable.IncomingForm()

  await form.parse(req, async (err, fields: formidable.Fields, files: formidable.Files) => {

    const documents = await DMStore.postDocuments(fields, files, req)

    if (documents) {
      res.status(200).send(documents)
    } else {
      res.status(500).send({ error: `Error posting documents`, thirdPartyError: err })
    }

  })
}
