import * as express from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_MARKUP_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { handlePostBlob } from './redactionService'

const url: string = getConfigValue(SERVICES_MARKUP_API_URL)

/**
 * postRedaction
 */
export async function postRedaction(req: EnhancedRequest, res: express.Response) {

  const redactionPath: string = url + req.originalUrl
  const body: Blob = req.body

  try {
    const {status, data, headers}: {status: number, data: Blob, headers} = await handlePostBlob(redactionPath, body, req)
    
    res.status(status).header(headers).send(data)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
