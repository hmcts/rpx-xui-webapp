import * as express from 'express'
import * as formidable from 'formidable'
import {EnhancedRequest} from '../lib/models'
import * as DMStore from './DMStore'

/**
 * retrieve a document from dm-store by the document_id
 * @param req
 * @param res
 */
export async function getDocumentRoute(req: express.Request, res: express.Response) {
    const documentId = req.params.document_id
    const document = await DMStore.getDocument(documentId)
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
    const binary = await DMStore.getDocumentBinary(req.params.document_id)

    if (binary) {
      const headers = binary.headers
      res.set({
        'Content-Disposition': `inline; ${headers['content-disposition']}`,
        'Content-Length': headers['content-length'],
        'Content-Type': headers['content-type'],
      })
      binary.pipe(res)
    } else {
      res.status(500).send(`Error getting document ${req.params.document_id}`)
    }
}

/**
 * Upload new documents to the dm-store
 * @param req
 * @param res
 */
export async function postDocuments(req: EnhancedRequest, res: express.Response) {
  const form: formidable.IncomingForm = new formidable.IncomingForm()

  await form.parse(req, async (err, fields: formidable.Fields, files: formidable.Files) => {

    const documents = await DMStore.postDocuments(fields, files)

    if (documents) {
      res.status(200).send(documents)
    } else {
      res.status(500).send({ error: `Error posting documents`, thirdPartyError: err })
    }

  })
}
