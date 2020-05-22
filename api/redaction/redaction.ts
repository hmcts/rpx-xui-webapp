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
  const body: any = req.body

  try {
    const {status, data, headers}: {status: number, data: any, headers: any} = await handlePostBlob(redactionPath, body, req)

    res.set(headers).status(status).send(data)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
