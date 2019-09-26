import {EnhancedRequest} from '../lib/models'
import * as express from 'express'
import {getCcdPrintout} from './printService'
import {config} from '../config'

/**
 * getPrintout
 *
 * Note that within the config.json file the 'print_service_url' property is set as '/print'.
 *
 * The Case Viewer CCD Component uses the 'print_service_url' property in conjunction with 'remote_print_service_url'.
 *
 * 'remote_print_service_url' is a default url and this is overwritten by 'print_service_url'
 *
 * We overwrite the 'remote_print_service_url' to point to '/print'. '/print' hits our Node layer, so that
 * we are able to attach an authorisation token to the request.
 *
 * TODO: Path to print should be taken from the Azure key values pairs, so that it doesn't just work on AAT.
 * TODO: Unit test
 *
 * @see ccd-case-ui-toolkit print-url.pipe.ts
 */
export async function getPrintout(req: EnhancedRequest, res: express.Response) {

  //const url: string = config.services.documents.api
  const basePrintUrl = `https://gateway-ccd.aat.platform.hmcts.net`
  const printoutPath = basePrintUrl + req.originalUrl

  try {
    const htmlResponse = await getCcdPrintout(printoutPath)
    res.status(200).send(htmlResponse)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
