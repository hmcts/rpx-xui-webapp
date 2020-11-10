import * as express from 'express'
import { getConfigValue } from '../configuration'
import { SERVICES_PAYMENTS_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { handleTaskGet } from './taskService'

const baseUrl: string = 'http://localhost:8080'

/**
 * getPayments
 */
export async function getTask(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {

  try {
        const getTaskPath: string = prepareGetTaskUrl(baseUrl, req.params.taskId)

        const jsonResponse = await handleTaskGet(getTaskPath, req)
        res.status(200)
        res.send(jsonResponse)
  } catch (error) {
    next(error)
  }

}

export function prepareGetTaskUrl(url: string, taskId: string): string {
    return `${url}/task/${taskId}`
}
