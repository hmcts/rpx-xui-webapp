import * as express from 'express'
import { EnhancedRequest } from './models'

let request = null

export function errorStack(req: EnhancedRequest, res: express.Response, next: express.NextFunction) {
    request = req

    if (req.session) {
        request.session.errorStack = []
    }

    next()
}
// if the data is ana rray the first entry will be a key when returned by get()
export function push(data: any): void {
    if (request && request.session) {
        request.session.errorStack.push(data)
    }
}

export function pop(): any {
    return request && request.session ? request.session.errorStack.pop() : {}
}

export function get() {
    const outArray = {}
    let count = 0

    if (request && request.session) {
        request.session.errorStack.reverse().map(error => {
            if (Array.isArray(error)) {
                outArray[error[0]] = error[1]
            } else {
                outArray[count] = error
                count++
            }
        })
    }

    return outArray
}
