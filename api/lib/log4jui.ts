import * as log4js from 'log4js'
import {getConfigValue} from '../configuration'
import {
  LOG4_J_CONFIG,
  LOGGING,
} from '../configuration/references'
import { client } from './appInsights'
import { JUILogger } from './models'

// the longest category length we have currently
const maxCatLength = 14

// This is done to mimic log4js calls
log4js.configure(getConfigValue(LOG4_J_CONFIG))

// TODO: this should be moved into util but the import seems to fail
export function leftPad(str: string, length = 20): string {
    return `${' '.repeat(Math.max(length - str.length, 0))}${str}`
}

export function getLogger(category: string): JUILogger {
    const logger: log4js.Logger = log4js.getLogger(category)
    // @ts-ignore
    logger.level = getConfigValue(LOGGING) || 'off'

    const catFormatted = leftPad(category, maxCatLength)
    logger.addContext('catFormatted', `${catFormatted} `)

    return {
        _logger: logger,
        debug,
        error,
        info,
        trackRequest,
        warn,
    }
}

function info(...messages: any[]) {
    console.log(...messages)
    this._logger.info(...messages)
}

function warn(...messages: any[]) {
    this._logger.warn(...messages)
}

function debug(...messages: any[]) {
    this._logger.debug(...messages)
}

function trackRequest(obj: any) {
    if (client) {
        client.trackRequest(obj)
    }
}

function error(...messages: any[]) {
    this._logger.error(...messages)

}
