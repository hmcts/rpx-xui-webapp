import { NextFunction, Request, Response } from 'express'
import * as log4jui from './log4jui'

const logger = log4jui.getLogger('errorHandler')

/**
 * Note that the next, NextFunction is required here.
 */
// eslint-disable-next-line no-unused-vars, no-shadow,
export default function errorHandler(err, req: Request, res: Response, next: NextFunction) {
    logger.error(err)
    res.status(500).send({ message: 'Internal Server Error' })
}
