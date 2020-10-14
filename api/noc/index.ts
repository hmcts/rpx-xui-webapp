import {NextFunction, Response} from 'express'
import {getConfigValue} from '../configuration'
import {SERVICES_CCD_DATA_STORE_API_PATH} from '../configuration/references'
import {EnhancedRequest} from '../lib/models'
import {NoCQuestions} from './models/noCQuestions.interface'
import {handleGet, handlePost} from './noCService'
import * as mock from './noCService.mock'

mock.init()

const url: string = getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH)

/**
 * getNoCQuestions
 */
export async function getNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {

    const markupPath: string = url + req.originalUrl

    try {
        const {status, data}: { status: number, data: NoCQuestions } = await handleGet(markupPath, req)
        res.status(status).send(data)
    } catch (error) {
        next(error)
    }
}

export async function validateNoCQuestions(req: EnhancedRequest, res: Response, next: NextFunction) {
    const markupPath: string = url + req.originalUrl
    const body: any = req.body

    try {
        const {status, data}: { status: number, data: NoCQuestions } = await handlePost(markupPath, body, req)
        res.status(status).send(data)
    } catch (error) {
        next(error)
    }
}

export async function noCEvents(req: EnhancedRequest, res: Response, next: NextFunction) {
    const markupPath: string = url + req.originalUrl
    const body: any = req.body

    try {
        const {status, data}: { status: number, data: NoCQuestions } = await handlePost(markupPath, body, req)
        res.status(status).send(data)
    } catch (error) {
        next(error)
    }
}
