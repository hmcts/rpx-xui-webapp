import { NextFunction, Request, Response } from 'express'
import * as log4jui from './log4jui'
import { propsExist } from './objectUtilities'

const logger = log4jui.getLogger('errorHandler')

/**
 * Note that the next, NextFunction is required here.
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    if (propsExist(err, ['config', 'headers'])) {
        // remove any sensitive data, such as bearer token from being logged
        delete err.config.headers
    }
    logger._logger.error(err)
    res.status(500).send({ message: 'Internal Server Error' })
}
