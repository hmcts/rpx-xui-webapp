import * as express from 'express'
import { handleDelete, handleGet, handlePost, handlePut } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { SERVICES_MARKUP_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { Redaction } from './redactionModels'

const url: string = getConfigValue(SERVICES_MARKUP_API_URL)

/**
 * getMarkup
 */
export async function getMarkup(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const markupPath: string = url + req.originalUrl

  try {
    const {status, data}: {status: number, data: Redaction[]} = await handleGet(markupPath, req, next)
    res.status(status).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * postMarkup
 */
export async function postMarkup(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const markupPath: string = url + req.originalUrl
  const body: Redaction = req.body

  try {
    const {status, data}: {status: number, data: Redaction} = await handlePost(markupPath, body, req, next)
    res.status(status).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * putMarkup
 */
export async function putMarkup(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const markupPath: string = url + req.originalUrl
  const body: Redaction = req.body

  try {
    const {status, data}: {status: number, data: Redaction}  = await handlePut(markupPath, body, req, next)
    res.status(status).send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * deleteMarkup
 */
export async function deleteMarkup(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  const markupPath: string = url + req.originalUrl.replace('//', '/')

  try {
    const {status, data}: {status: number, data: Redaction} = await handleDelete(markupPath, req, next)
    res.status(status).send(data)
  } catch (error) {
    next(error)
  }
}
