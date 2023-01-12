import { NextFunction } from 'express'
import { handlePost } from '../common/mockService'
import { StaffDataUser } from './models/staff-data-user.model'
import * as mock from './staff-ref-data.mock'

mock.init()

 // mock the user details data
const mockUser = {
    results: [{
        firstName: 'Prl',
        lastName: 'Court admin',
        email: 'prl_courtadmin@justice.gov.uk',
        services: [ 'Family Public Law', 'Family Private Law'],
        region: 'Midlands',
        region_id: 2,
        roles: ['CTSC Administrator'],
        task_supervisor: false,
        case_allocator: false,
        suspended: false,
        staff_admin: false,
        primaryLocation: 'Birmingham',
        locations: [
                'BIRMINGHAM CIVIL AND FAMILY JUSTICE CENTRE',
        ],
        userType: 'CTSC',
        skills: ['Skill1', 'Skill2'],
        jobTitle: 'Administrator',
    }],
};

export async function getStaffRefUserDetails(req, res, next: NextFunction) {
    // Mock the user data as we don't have actorId
    // const id = req.params.id
    // const apiPath: string = `/refdata/case-worker/user-details/${id}`

    try {
        // const { status, data }: { status: number; data: StaffDataUser } = await handleGet(apiPath, req)
        res.status(200).send(mockUser)
    } catch (error) {
        next(error)
    }
}

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

export async function updateUserStatus(req, res, next: NextFunction) {
    // Call the real api when we have actual user data
    // const reqBody = req.body
    // const apiPath: string = `/refdata/case-worker/profile`

    try {
       // const { status, data }: { status: number; data: StaffDataUser } = await handlePut(apiPath, reqBody, req)
       mockUser.results[0].suspended =  !mockUser.results[0].suspended;
       res.status(200).send(mockUser.results[0])
    } catch (error) {
        next(error)
    }
}
