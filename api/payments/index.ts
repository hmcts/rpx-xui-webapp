import * as express from 'express'
import { EnhancedRequest } from '../lib/models'
import { handleGet } from './paymentsService'
import { preparePaymentsUrl } from './paymentsUtil'
import { getConfigValue } from 'configuration'
import { SERVICES_PAYMENTS_URL } from '../configuration/references'

const baseUrl: string = getConfigValue(SERVICES_PAYMENTS_URL)

/**
 * getPayments
 */
export async function getPayments(req: EnhancedRequest, res: express.Response) {

  try {

    const paymentsPath: string = preparePaymentsUrl(baseUrl, req.originalUrl)

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
