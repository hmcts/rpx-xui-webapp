import * as express from 'express'
import * as formidable from 'formidable'
import * as fs from 'fs'
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
    const documentId = req.params.document_id
    const filePath = `/tmp/${documentId}`

    console.log('NEW REQUEST')

    const {F_OK, R_OK} = fs.constants
    // tslint:disable-next-line:no-bitwise
    fs.access(filePath, F_OK | R_OK, async err => {
        if (err) {
            // no file/not readable, so create it
            await downloadFile(documentId, filePath)
            console.log('file awaited, downloaded')
            return streamFile(filePath, req, res)
        }
        console.log('streaming file from route')
        streamFile(filePath, req, res)
    })
}

export function streamFile(file, req, res) {

    fs.stat(file, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).send()
            }
        }

        let start
        let end
        let total = 0
        let contentRange = false
        let contentLength = 0

        const range = req.headers.range
        if (range) {
            const positions = range.replace(/bytes=/, "").split("-")
            start = parseInt(positions[0], 10)
            total = stats.size
            end = positions[1] ? parseInt(positions[1], 10) : total - 1
            const chunksize = (end - start) + 1
            contentRange = true
            contentLength = chunksize
        } else {
            start = 0
            end = stats.size
            contentLength = stats.size
        }

        if (start <= end) {
            let responseCode = 200
            const responseHeader = {
                "Accept-Ranges": "bytes",
                "Content-Length": contentLength,
                'Content-Type': stats.size,
            }
            if (contentRange) {
                responseCode = 206
                responseHeader["Content-Range"] = "bytes " + start + "-" + end + "/" + total
            }
            console.log('streaming cached file')
            res.writeHead(responseCode, responseHeader)

            const stream = fs.createReadStream(file, {start, end})
                .on("readable", () => {
                    let chunk
                    while (null !== (chunk = stream.read(1024))) {
                        res.write(chunk)
                    }
                }).on("error", error => {
                    res.end(error)
                }).on("end", () => {
                    res.end()
                })
        }
    })
}

export async function downloadFile(documentId, filePath) {

    const binary = await DMStore.getDocumentBinary(documentId)
    if (binary) {
        console.log('saving file')
        const writer = fs.createWriteStream(filePath)
        binary.pipe(writer)

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                console.log('file saved!')
                resolve()
            })
            writer.on('error', error => {
                console.log('error occurred')
                reject(error)
            })
        })
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
