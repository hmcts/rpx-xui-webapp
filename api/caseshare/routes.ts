import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { handleGetOrganisationsRoute as organisationsRoute } from '../organisations/index'
import * as restAPI from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/orgs', organisationsRoute)
router.get('/users', restAPI.getUsers)
router.get('/cases', restAPI.getCases)
router.post('/case-assignments', restAPI.assignCasesToUsers)
router.get('/case-assignments', restAPI.getCases)
