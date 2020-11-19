import { NextFunction, Response } from 'express'

import { EnhancedRequest } from '../lib/models'
import { handleTaskGet, handleTaskPost, handleTaskSearch } from './taskService'
import { prepareGetTaskUrl, prepareSearchTaskUrl, preparePostTaskUrlAction } from './util'

export const baseUrl: string = 'http://localhost:8080'

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
 * Post to search for a Task.
 */
export async function searchTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const postTaskPath: string = prepareSearchTaskUrl(baseUrl)

    const { status, data } = await handleTaskSearch(postTaskPath, req.body, req)
    res.status(status)
    res.send(data)
  } catch (error) {
    next(error)
  }
}

/**
 * Post to invoke an action on a Task.
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
