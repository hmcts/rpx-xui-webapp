import { NextFunction, Response } from 'express'
import { EnhancedRequest } from '../lib/models'
import { handleTaskGet, handleTaskPost, taskPost } from './taskService'
import { prepareGetTaskUrl, preparePostTaskUrl, preparePostTaskUrlAction } from './util'

const baseUrl: string = 'http://localhost:8080'

/**
 * getTask
 */
export async function getTask(req: EnhancedRequest, res: Response, next: NextFunction) {

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
export async function postTask(req: EnhancedRequest, res: Response, next: NextFunction) {
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
 * postTask Action
 */
export async function postTaskAction(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const getTaskPath: string = preparePostTaskUrlAction(baseUrl, req.params.taskId, req.params.action)

    const { status, data } = await handleTaskPost(getTaskPath, req.body, req)
    res.status(status)
    res.send(data)
  } catch (error) {
    next(error)
  }
}
