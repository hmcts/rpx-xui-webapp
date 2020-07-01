import * as express from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_EM_ANNO_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { handleDelete, handleGet, handlePost, handlePut } from './emAnnoService'
import { Annotation, Annotations } from './models'

const url: string = getConfigValue(SERVICES_EM_ANNO_API_URL)

//TODO: remove this entire folder in favour of proxy

/**
 * getAnnotations
 */
export async function getAnnotations(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const annotationsPath: string = url + req.originalUrl.replace('/em-anno/', '/api/')

  try {
    const jsonResponse: Annotations = await handleGet(annotationsPath, req)
    res.status(200).send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * postAnnotations
 */
export async function postAnnotations(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const annotationsPath: string = url + req.originalUrl.replace('/em-anno/', '/api/')
  const body: Annotation = req.body

  try {
    const jsonResponse: Annotation = await handlePost(annotationsPath, body, req)
    res.status(200).send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * putAnnotations
 */
export async function putAnnotations(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const annotationsPath: string = url + req.originalUrl.replace('/em-anno/', '/api/')
  const body: Annotation = req.body

  try {
    const jsonResponse: Annotation = await handlePut(annotationsPath, body, req)
    res.status(200).send(jsonResponse)
  } catch (error) {
    next(error)
  }
}

/**
 * deleteAnnotations
 */
export async function deleteAnnotations(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const annotationsPath: string = url + req.originalUrl.replace('/em-anno/', '/api/')

  try {
    const jsonResponse: Annotation = await handleDelete(annotationsPath, req)
    res.status(200).send(jsonResponse)
  } catch (error) {
    next(error)
  }
}
