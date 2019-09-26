import {http} from '../lib/http'
import {AxiosResponse} from 'axios'
import {asyncReturnOrError} from '../lib/util'
import * as log4jui from '../lib/log4jui'
import {JUILogger} from '../lib/models'

const logger: JUILogger = log4jui.getLogger('print-service')

/**
 * Get CCD Printout
 *
 * This returns a HTML document. Therefore we can just pass it on to the UI.
 *
 * TODO: Unit Test
 *
 * @param printPath
 * @returns {Promise<null>}
 */
export async function getCcdPrintout(printPath) {

  const response: AxiosResponse = await asyncReturnOrError(
    http.get(printPath),
    `Error getting ${printPath}`,
    null,
    logger,
    false
  )

  return response ? response.data : null
}
