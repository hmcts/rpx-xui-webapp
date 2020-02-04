import * as express from 'express'
import { config } from '../z'
import { application } from '../z.config/application.config'
import { GetUserAcceptTandCResponse, PostUserAcceptTandCResponse } from '../interface/userAcceptTandCResponse'
import { http } from '../lib/http'
import { isUserTandCPostSuccessful } from '../lib/util'
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
        const response = await http.get(url)
        const userTandCResponse = response.data as GetUserAcceptTandCResponse
        res.send(userTandCResponse.accepted)
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
        const response = await http.post(url, data)
        const postResponse = response.data as PostUserAcceptTandCResponse
        res.send(isUserTandCPostSuccessful(postResponse, req.body.userId))
    } catch (error) {
        errReport = {
            apiError: error.data.message,
            apiStatusCode: error.status,
            message: 'User Terms and Conditions route error',
        }
        res.status(error.status).send(errReport)
    }
}
