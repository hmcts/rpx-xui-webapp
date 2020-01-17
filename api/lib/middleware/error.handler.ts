import { NextFunction, Request, Response } from 'express'
import * as log4jui from '../log4jui'

const logger = log4jui.getLogger('error')

/**
 * Note that the next, NextFunction is required here.
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500
    // TODO: we can keep the logs clean and use appInsights in the future
    logger.error(err)
    res.status(status).send({ message: err.message, status })
}
