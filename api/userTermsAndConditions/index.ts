import * as express from 'express'
import { config } from '../config'
import { application } from '../config/application.config'
import { http } from '../lib/http'
import { getUserTermsAndConditionsUrl, postUserTermsAndConditionsUrl } from './userTermsAndConditionsUtil'

export async function getUserTermsAndConditions(req: express.Request, res: express.Response) {
    let errReport: any
    if (!req.params.userId) {
        errReport = {
            apiError: 'UserId is missing',
            apiStatusCode: '400',
            message: 'User Terms and Conditions route error',
        }
        res.status(400).send(errReport)
    }
    try {
        const url = getUserTermsAndConditionsUrl(config.services.termsAndConditions, req.params.userId, application.idamClient)
        // const response = await http.get(url)
        res.send(true)
    } catch (error) {
        // we get a 404 if the user has not agreed to Terms and conditions
        if (error.status === 404) {
            res.send(false)
            return
        }
        errReport = {
            apiError: error.data.message,
            apiStatusCode: error.status,
            message: 'User Terms and Conditions route error',
        }
        res.status(error.status).send(errReport)
    }
}

export async function postUserTermsAndConditions(req: express.Request, res: express.Response) {
    let errReport: any
    if (!req.body.userId) {
        errReport = {
            apiError: 'UserId is missing',
            apiStatusCode: '400',
            message: 'User Terms and Conditions route error',
        }
        res.status(400).send(errReport)
    }
    try {
        const data = {userId: req.body.userId}
        const url = postUserTermsAndConditionsUrl(config.services.termsAndConditions, application.idamClient)
        //const response = await http.post(url, data)
        res.send(true)
    } catch (error) {
        errReport = {
            apiError: error.data.message,
            apiStatusCode: error.status,
            message: 'User Terms and Conditions route error',
        }
        res.status(error.status).send(errReport)
    }
}
