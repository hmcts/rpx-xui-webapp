import * as express from 'express'
import { config } from '../config'
import { http } from '../lib/http'

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
        // const response = await http.get(
        //     `${config.services.termsAndConditions}/api/v1/termsAndConditions/managecases/users/${req.params.userId}/1`
        //   )
        // console.log(response)
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
        // const response = await http.post(
        //     `${config.services.termsAndConditions}/api/v1/termsAndConditions/managecases/users/1`, data
        //   )
        // console.log(response)
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
