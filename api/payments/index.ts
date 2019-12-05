import * as express from 'express'
import { config } from '../config'
import { EnhancedRequest } from '../lib/models'
import { handleGet } from './paymentsService'

const baseUrl: string = config.services.payments

/**
 * getPayments
 */
export async function getPayments(req: EnhancedRequest, res: express.Response) {

  try {

    const paymentsPath: string = baseUrl + req.originalUrl.replace('/payments/', '/')

    const jsonResponse = await handleGet(paymentsPath)
    res.status(200)
    res.send(jsonResponse)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }

}
