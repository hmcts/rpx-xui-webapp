import { NextFunction } from 'express'
import { handlePost } from '../common/mockService'
import { StaffDataUser } from './models/staff-data-user.model'
import * as mock from './staff-ref-data.mock'

mock.init()

export async function addNewUser(req, res, next: NextFunction) {
    const reqBody = req.body
    const apiPath: string = `/refdata/case-worker/profile`

    try {
        const { status, data }: { status: number; data: StaffDataUser } = await handlePost(apiPath, reqBody, req)
        res.status(status).send(data)
    } catch (error) {
        next(error)
    }
}

