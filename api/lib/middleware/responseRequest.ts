import { Request, Response } from 'express'
import { generate } from 'shortid'
import { config } from '../../config'
import { EnhancedRequest } from '../models'

const sessionId = config.cookies.sessionId

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
