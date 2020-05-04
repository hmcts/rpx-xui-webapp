import { Request, Response } from 'express'
import { generate } from 'shortid'
import {getConfigValue} from '../../configuration'
import {
  COOKIES_SESSION_ID,
} from '../../configuration/references'
import { EnhancedRequest } from '../models'

// TODO!!!: remove this entire file.
// concerns: the last request/response from any user is now stored to node memory

const sessionId = getConfigValue(COOKIES_SESSION_ID)

let res = null
let req = null

export default function setReqRes(expressReq: Request, expressRes: Response, next) {
    res = expressRes
    req = expressReq

    // set response object to get session in logging
    res.cookie(sessionId, generate())

    next()
}

export function response(): Response {
    return res
}

export function request(): EnhancedRequest {
    return req
}

export function isReqResSet(): boolean {
    return !!res && !!req
}
