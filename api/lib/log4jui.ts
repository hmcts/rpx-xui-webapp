import * as log4js from 'log4js'
import { config } from '../config'
import * as errorStack from '../lib/errorStack'
import { JUILogger } from '../lib/models'

import { isReqResSet, request } from './middleware/responseRequest'

// the longest category length we have currently
const maxCatLength = 14
const sessionid = config.cookies.sessionId

// This is done to mimic log4js calls
log4js.configure(config.log4jui)

// TODO: this should be moved into util but the import seems to fail
export function leftPad(str: string, length = 20): string {
    return `${' '.repeat(Math.max(length - str.length, 0))}${str}`
}

export function getLogger(category: string): JUILogger {
    const logger: log4js.Logger = log4js.getLogger(category)
    logger.level = config.logging || 'off'

    const catFormatted = leftPad(category, maxCatLength)
    logger.addContext('catFormatted', `${catFormatted} `)

    return {
        _logger: logger,
        debug,
        error,
        info,
        warn,
    }
}

export function prepareMessage(fullMessage: string): string {
    let uid
    let sessionId

    if (isReqResSet()) {
        const req = request()

        uid = req.session && req.session.user ? req.session.user.id : null
        sessionId = req.cookies ? req.cookies[sessionid] : null
    }

    const userString: string = uid && sessionId ? `[${uid} - ${sessionId}] - ` : ''
    return `${userString}${fullMessage}`
}

function info(...messages: any[]) {
    const fullMessage = messages.join(' ')

    this._logger.info(prepareMessage(fullMessage))
}

function warn(...messages: any[]) {
    const fullMessage = messages.join(' ')

    this._logger.warn(prepareMessage(fullMessage))
}

function debug(...messages: any[]) {
    const fullMessage = messages.join(' ')

    this._logger.debug(prepareMessage(fullMessage))
}

function error(...messages: any[]) {
    const fullMessage = messages.join(' ')

    const category = this._logger.category
    this._logger.error(prepareMessage(fullMessage))

    if (config.logging === 'debug' || config.logging === 'error') {
        errorStack.push([category, fullMessage])
    }
}
