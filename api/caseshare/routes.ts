import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import * as restAPI from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/', restAPI.getRoot)
router.get('/db', restAPI.getDB)
router.get('/orgs', restAPI.getOrgs)
router.get('/orgs/:orgId/users', restAPI.getUsersByOrgId)
router.get('/orgs/:orgId/users/:uid', restAPI.getUserByOrgAndUserId)
router.get('/orgs/:orgId', restAPI.searchUsers)
router.get('/cases', restAPI.getCases)
router.get('/cases/:caseId', restAPI.getCaseById)
router.post('/case-assignments', restAPI.postShareCasesToUsers)
router.get('/case-assignments', restAPI.getCases)
