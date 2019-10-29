import * as express from 'express'
import * as striptags from 'striptags'
import { config } from '../config'
import { http } from '../lib/http'
import { setHeaders } from '../lib/proxy'


export async function getPaymentDetails(req: express.Request, res: express.Response) {
    let url = striptags(req.url)

    const ref = url.split('/')[2]
    url = req.baseUrl  + url
    console.log(url)
    const headers: any = setHeaders(req)
    try {
        headers['content-type'] = 'application/json'
        const p1 = /\/cases\/\d{16}\/payments/
        console.log(ref)
        let response;
        if (p1.test(url)) {
          response = await http.get(`${config.services.payments.api}/payments?ccd_case_number=${ref}`, { headers })
        } else if (url.startsWith('/payments/payment-groups/')) {
          response = await http.get(`${config.services.payments.api}/payment-groups/${ref}`, { headers })
        } else if (url.startsWith('/payments/card-payments/')) {{
          response = await http.get(`${config.services.payments.api}/card-payments/${ref}`, { headers })
        }
        res.status(200)
        res.send(response.data )
    } catch (e) {
        res.status(e.response.status)
        res.send(e.response.data)
    }
}
