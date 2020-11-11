import * as express from 'express'
import { EnhancedRequest } from '../lib/models'
import { handleTaskGet, taskPost } from './taskService'
import { prepareGetTaskUrl, preparePostTaskUrl } from './util'

const baseUrl: string = 'http://localhost:8080'

/**
 * getTask
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

/**
 * getTask
 */
export async function postTask(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
  try {
    const getTaskPath: string = preparePostTaskUrl(baseUrl)

    const response = await taskPost(getTaskPath, req.body, req)
    res.status(200)
    res.send(response.body)
  } catch (error) {
    next(error)
  }
}
