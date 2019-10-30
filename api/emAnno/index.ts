import * as express from 'express'
import {config} from '../config'
import {EnhancedRequest} from '../lib/models'
import {handleGet} from './emAnnoService'

/**
 * getAnnotations
 */
export async function getAnnotations(req: EnhancedRequest, res: express.Response) {

  const url: string = config.services.em_anno_api
  const annotationsPath = url + req.originalUrl

  try {
    const htmlResponse = await handleGet(annotationsPath)
    res.status(200).send(htmlResponse)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
