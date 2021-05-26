import * as express from 'express'
import * as log4js from 'log4js'

export interface JurisdictionObject {
    caseType: string
    filter: string
    jur: string
}

export interface JUILogger {
    _logger: log4js.Logger
    debug: (...message: any[]) => void
    error: (...message: any[]) => void
    info: (...message: any[]) => void
    trackRequest: (obj: any) => void
    warn: (...message: any[]) => void
}

export function isJUILogger(object: any): object is JUILogger {
    return '_logger' in object && 'debug' in object && 'error' in object && 'info' in object && 'warn' in object
}
export interface EnhancedRequest extends express.Request {
    auth?: {
        roles: string[]
        token: string
        userId: string
        expires: number
        data?: any
    }
    body,
    headers,
    session,
    url: string
}

export interface Token {
    token: string
}
