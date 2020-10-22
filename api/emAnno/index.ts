import * as express from 'express'
import { handleDelete, handleGet, handlePost, handlePut } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { SERVICES_EM_ANNO_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { Annotation, Annotations } from './models'

const url: string = getConfigValue(SERVICES_EM_ANNO_API_URL)

//TODO: remove this entire folder in favour of proxy

/**
 * getAnnotations
 */
export async function getAnnotations(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const annotationsPath: string = url + req.originalUrl.replace('/em-anno/', '/api/')

  try {
    const {status, data}: {status: number, data: Annotations} = await handleGet(annotationsPath, req, next)
    res.status(status).send(data)
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
    const {status, data}: {status: number, data: Annotation} = await handlePost(annotationsPath, body, req, next)
    res.status(status).send(data)
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
    const {status, data}: {status: number, data: Annotation}  = await handlePut(annotationsPath, body, req, next)
    res.status(status).send(data)
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
    const {status, data}: {status: number, data: Annotation} = await handleDelete(annotationsPath, req, next)
    res.status(status).send(data)
  } catch (error) {
    next(error)
  }
}
