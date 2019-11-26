import * as express from 'express'
import * as striptags from 'striptags'
import { config } from '../config'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'

const url: string = config.services.payments

export async function getPaymentDetails(req: express.Request, res: express.Response) {
  console.log('adn ', req.url)

  try {

    // const ref = url.split('/')[2]
    // url = req.baseUrl + url
    // const headers: any = setHeaders(req)

    // headers['content-type'] = 'application/json'
    // const paymentUrl = /\/[a-z\-]*\/\d{16}\/[a-z\-]*/

    // let response;
    // if (paymentUrl.test(url)) {
    //   response = await http.get(`${config.services.payments.api}/payments?ccd_case_number=${ref}`, { headers })
    // } else if (url.startsWith('/payments/payment-groups/')) {
    //   response = await http.get(`${config.services.payments.api}/payment-groups/${ref}`, { headers })
    // } else if (url.startsWith('/payments/card-payments/') && url.endsWith('statuses')) {
    //   response = await http.get(`${config.services.payments.api}/card-payments/${ref}/statuses`, { headers })
    // } else if (url.startsWith('/payments/card-payments/') && url.endsWith('details')) {
    //   response = await http.get(`${config.services.payments.api}/card-payments/${ref}/details`, { headers })
    // }
    const paymentsPath: string = url + req.originalUrl
    const response = await http.get(`${paymentsPath}`)
    res.status(200)
    res.send(response.data)
  } catch (e) {
    res.status(e.response.status)
    res.send(e.response.data)
  }
}
