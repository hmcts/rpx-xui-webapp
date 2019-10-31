import * as express from 'express'
import {config} from '../config'
import {EnhancedRequest} from '../lib/models'
import {handleDelete, handleGet, handlePost, handlePut} from './emAnnoService'

const url: string = config.services.em_anno_api

/**
 * getAnnotations
 */
export async function getAnnotations(req: EnhancedRequest, res: express.Response) {

  const annotationsPath = url + req.originalUrl.replace('/em-anno/', '/api/')

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

/**
 * postAnnotations
 */
export async function postAnnotations(req: EnhancedRequest, res: express.Response) {

  const annotationsPath = url + req.originalUrl.replace('/em-anno/', '/api/')
  const body = req.body

  try {
    const htmlResponse = await handlePost(annotationsPath, body)
    res.status(200).send(htmlResponse)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

/**
 * putAnnotations
 */
export async function putAnnotations(req: EnhancedRequest, res: express.Response) {

  const annotationsPath = url + req.originalUrl.replace('/em-anno/', '/api/')
  const body = req.body

  try {
    const htmlResponse = await handlePut(annotationsPath, body)
    res.status(200).send(htmlResponse)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

/**
 * deleteAnnotations
 */
export async function deleteAnnotations(req: EnhancedRequest, res: express.Response) {

  const annotationsPath = url + req.originalUrl.replace('/em-anno/', '/api/')

  try {
    const htmlResponse = await handleDelete(annotationsPath)
    res.status(200).send(htmlResponse)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
