import * as express from 'express'
import striptags = require('striptags')
import { config } from '../config'
import { http } from '../lib/http'

const baseUrl: string = config.services.payments

export async function handleGet(req: express.Request, res: express.Response) {

  try {
    console.log(req.originalUrl)

    const caseId: string = req.originalUrl.split('/')[3]
    const type: string = req.originalUrl.split('/')[4]

    const paymentDetails = await http.get(`${baseUrl}/payments?ccd_case_number=${caseId}`)

    let paymentsPath: string
    console.log(paymentDetails.data)
    switch (type) {
      case 'paymentgroups':
        paymentsPath = `${baseUrl}/payment-groups/${paymentDetails.data.payment_group_reference}`
        break
      default:
        break
    }

    const response = await http.get(`${paymentsPath}`)
    res.status(200)
    res.send(response.data)
  } catch (e) {
    res.status(e.status)
    res.send(e.data)
  }

  // try {
  //   let link = striptags(req.url)
  //   const ref = url.split('/')[2]
  //   link = req.baseUrl + url

  //   const paymentUrl = /\/[a-z\-]*\/\d{16}\/[a-z\-]*/

  //   let response;
  //   if (paymentUrl.test(url)) {
  //     response = await http.get(`${config.services.payments.api}/payments?ccd_case_number=${ref}`)
  //   } else if (url.startsWith('/payments/payment-groups/')) {
  //     response = await http.get(`${config.services.payments.api}/payment-groups/${ref}`)
  //   } else if (url.startsWith('/payments/card-payments/') && url.endsWith('statuses')) {
  //     response = await http.get(`${config.services.payments.api}/card-payments/${ref}/statuses`)
  //   } else if (url.startsWith('/payments/card-payments/') && url.endsWith('details')) {
  //     response = await http.get(`${config.services.payments.api}/card-payments/${ref}/details`)
  //   }
  //   res.status(200)
  //   res.send(response.data)
  // } catch (e) {
  //   res.status(e.status)
  //   res.send(e.data)
  // }
}
