import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_CCD_CASE_ASSIGNMENT_API_PATH } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { generateErrorMessageWithCode } from './errorCodeConverter'
import { NoCQuestions } from './models/noCQuestions.interface'
import { handleGet, handlePost } from './noCService'

const url: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH)

/**
 * getNoCQuestions
 */
export async function getNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const caseId = req.query.caseId
  const markupPath: string = `${url}/noc/noc-questions?case_id=${caseId}`

  try {
    const {status, data}: { status: number, data: NoCQuestions } = await handleGet(markupPath, req)
    res.status(status).send(data)
  } catch (error) {
    next(generateErrorMessageWithCode(error))
  }
}

export async function validateNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
  const markupPath: string = `${url}/noc/verify-noc-answers`
  const body: any = req.body

  try {
    const {status, data}: { status: number, data: NoCQuestions } = await handlePost(markupPath, body, req)
    res.status(status).send(data)
  } catch (error) {
    next(generateErrorMessageWithCode(error))
  }
}

export async function submitNoCEvents(req: EnhancedRequest, res: Response, next: NextFunction) {
  const markupPath: string = `${url}/noc/noc-requests`
  const body: any = req.body

  try {
    const {status, data}: { status: number, data: NoCQuestions } = await handlePost(markupPath, body, req)
    res.status(status).send(data)
  } catch (error) {
    next(generateErrorMessageWithCode(error))
  }
}
