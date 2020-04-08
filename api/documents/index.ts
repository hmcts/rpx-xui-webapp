import axios from 'axios'
import * as express from 'express'
import * as formidable from 'formidable'
import * as http from 'http'
import {RequestOptions} from 'http'
import {config} from '../config'
import {EnhancedRequest} from '../lib/models'
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
    const url = new URL(config.services.documents.api)

    const options = {
        headers: {
            'Authorization': axios.defaults.headers.common.Authorization,
            'ServiceAuthorization': axios.defaults.headers.common.ServiceAuthorization,
            'user-roles': axios.defaults.headers.common['user-roles'],
        },
        host: `${url.host}/documents/${documentId}/binary`,
    } as RequestOptions

    const request = http.get(options, response => {
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
