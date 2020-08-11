import * as express from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_MARKUP_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { Redaction } from './redactionModels'
import { handleDelete, handleGet, handlePost, handlePut } from './redactionService'

const url: string = getConfigValue(SERVICES_MARKUP_API_URL)

/**
 * getMarkup
 */
export async function getMarkup(req: EnhancedRequest, res: express.Response) {

  const markupPath: string = url + req.originalUrl

  try {
    const {status, data}: {status: number, data: Redaction[]} = await handleGet(markupPath, req)
    res.status(status).send(data)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

/**
 * postMarkup
 */
export async function postMarkup(req: EnhancedRequest, res: express.Response) {

  const markupPath: string = url + req.originalUrl
  const body: Redaction = req.body

  try {
    const {status, data}: {status: number, data: Redaction} = await handlePost(markupPath, body, req)
    res.status(status).send(data)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

/**
 * putMarkup
 */
export async function putMarkup(req: EnhancedRequest, res: express.Response) {

  const markupPath: string = url + req.originalUrl
  const body: Redaction = req.body

  try {
    const {status, data}: {status: number, data: Redaction}  = await handlePut(markupPath, body, req)
    res.status(status).send(data)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

/**
 * deleteMarkup
 */
export async function deleteMarkup(req: EnhancedRequest, res: express.Response) {

  const markupPath: string = url + req.originalUrl.replace('//', '/')

  try {
    const {status, data}: {status: number, data: Redaction} = await handleDelete(markupPath, req)
    res.status(status).send(data)
  } catch (error) {
    res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
