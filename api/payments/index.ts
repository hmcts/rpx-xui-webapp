import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'

const url: string = config.services.payments

export async function getPaymentDetails(req: express.Request, res: express.Response) {

  try {
    const paymentsPath: string = url + req.originalUrl
    const response = await http.get(`${paymentsPath}`)
    res.status(200)
    res.send(response.data)
  } catch (e) {
    res.status(e.response.status)
    res.send(e.response.data)
  }
}
