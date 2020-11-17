import * as express from 'express'
import { handlePostBlob } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { SERVICES_MARKUP_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'

const url: string = getConfigValue(SERVICES_MARKUP_API_URL)

/**
 * postRedaction
 */
export async function postRedaction(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const redactionPath: string = url + req.originalUrl
  const body: any = req.body

  try {
    const {status, data, headers}: {status: number, data: any, headers: any} = await handlePostBlob(
      redactionPath,
      body,
      req,
      next)

    res.set(headers).status(status).send(data)
  } catch (error) {
    next(error)
  }
}
