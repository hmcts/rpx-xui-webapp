import * as express from 'express'
import { EnhancedRequest } from '../lib/models'
import { handleTaskGet, taskPost } from './taskService'
import { prepareGetTaskUrl, preparePostTaskUnClaimUrl, preparePostTaskUrl } from './util'

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
 * Post to Task
 */
export async function postTask(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
  try {
    const postTaskPath: string = preparePostTaskUrl(baseUrl)

    const response = await taskPost(postTaskPath, req.body, req)
    res.status(200)
    res.send(response.body)
  } catch (error) {
    next(error)
  }
}

/**
 * Post to Unclaim as Task
 */
export async function postTaskUnClaim(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
  try {
    const postTaskUnclaimPath: string = preparePostTaskUnClaimUrl(baseUrl, req.params.taskId)

    const response = await taskPost(postTaskUnclaimPath, req.body, req)
    res.status(200)
    res.send(response.body)
  } catch (error) {
    next(error)
  }
}
