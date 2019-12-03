import {AxiosResponse} from 'axios'
import * as FormData from 'form-data'
import {Fields, File, Files} from 'formidable'
import * as fs from 'fs'
import { config } from '../config'
import { http } from '../lib/http'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from "../lib/models"
import { asyncReturnOrError } from '../lib/util'
import {DMDocument, DMDocuments} from './document.interface'

const url: string = config.services.documents.api

const logger: JUILogger = log4jui.getLogger('dm-store')

/**
 * Retrieves JSON representation of a Stored Document
 * @param documentId
 * @returns Promise<DMDocument>|null
 */
export async function getDocument(documentId: string): Promise<DMDocument> {
    const response: AxiosResponse<DMDocument> = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}`),
        `Error getting document ${documentId}`,
        null,
        logger,
        false
    )

    return response ? response.data : null
}

/**
 * Streams contents of the most recent Document Content Version associated with the Stored Document.
 * @param documentId
 * @returns Promise<any>
 */
export async function getDocumentBinary(documentId: string): Promise<any> {
    const response: AxiosResponse<any> = await asyncReturnOrError(
        http.get(`${url}/documents/${documentId}/binary`, { responseType: 'stream' }),
        `Error getting Binary for document ${documentId}`,
        null,
        logger,
        false
    )

    return response ? response.data : null
}

/**
 * Uploads locally stored files and posted fields to dm-store
 * @param fields
 * @param files
 * @returns Promise<DMDocuments>
 */
export async function postDocuments(fields: Fields, files: Files): Promise<DMDocuments> {

  const formData: FormData = new FormData()

  Object.keys(files).forEach( field => {
    const file: File = files[field]
    formData.append(field, fs.createReadStream(file.path), {contentType: file.type, filename: file.name})
  })

  Object.keys(fields).forEach( field => {
    formData.append(field, fields[field])
  })

  // we explicitly set upload limit to Infinity here, rejection is handled by dm-store
  const response: AxiosResponse<DMDocuments> = await asyncReturnOrError(
    http.post(`${url}/documents/`, formData,
        {
            headers: formData.getHeaders(),
            maxContentLength: Infinity,
        }),
    `Error posting documents`,
    null,
    logger,
    false
  )

  return response.data
}
