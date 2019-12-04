import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'

const baseUrl: string = config.services.payments

export async function handleGet(req: express.Request, res: express.Response) {

  try {

    const paymentsPath: string = baseUrl + req.originalUrl.replace('/payments/', '/')

    const response = await http.get(`${paymentsPath}`)
    res.status(200)
    res.send(response.data)
  } catch (e) {
    res.status(e.status)
    res.send(e.data)
  }

}
