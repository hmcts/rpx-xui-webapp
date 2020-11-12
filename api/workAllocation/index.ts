import { NextFunction, Response } from 'express'

import { EnhancedRequest } from '../lib/models'
import { handleTaskGet, handleTaskPost } from './taskService'

const baseUrl: string = 'http://localhost:8080'

/**
 * getTasks
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

export function prepareGetTaskUrl(url: string, taskId: string): string {
    return `${url}/task/${taskId}`
}

/**
 * postTask
 */
export async function postTask(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const getTaskPath: string = preparePostTaskUrl(baseUrl, req.params.taskId, req.params.action)

    const { status, data } = await handleTaskPost(getTaskPath, req.params.payload, req)
    res.status(status)
    res.send(data)
  } catch (error) {
    next(error)
  }
}

export function preparePostTaskUrl(url: string, taskId: string, action: string): string {
  return `${url}/task/${taskId}/${action}`
}
