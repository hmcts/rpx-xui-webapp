import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'
import { getTermsAndConditionsUrl, postTermsAndConditionsUrl } from './termsAndConditionsUtil'

export async function getTermsAndConditions(req: express.Request, res: express.Response) {
    let errReport: any
    if (!req.params.userId) {
        errReport = {
            apiError: 'UserId is missing',
            apiStatusCode: '400',
            message: 'Terms and Conditions route error',
        }
        res.status(400).send(errReport)
    }
    try {
        const url = getTermsAndConditionsUrl(config.services.termsAndConditions, req.params.userId)
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
            message: 'Terms and Conditions route error',
        }
        res.status(500).send(errReport)
    }
}

export async function postTermsAndConditions(req: express.Request, res: express.Response) {
    let errReport: any
    if (!req.body.userId) {
        errReport = {
            apiError: 'UserId is missing',
            apiStatusCode: '400',
            message: 'Terms and Conditions route error',
        }
        res.status(400).send(errReport)
    }
    try {
        const data = {userId: req.body.userId}
        const url = postTermsAndConditionsUrl(config.services.termsAndConditions)
        //const response = await http.post(url, data)
        res.send(true)
    } catch (error) {
        errReport = {
            apiError: error.data.message,
            apiStatusCode: error.status,
            message: 'Terms and Conditions route error',
        }
        res.status(500).send(errReport)
    }
}
