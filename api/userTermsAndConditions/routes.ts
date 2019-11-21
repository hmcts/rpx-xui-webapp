
import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { getUserTermsAndConditions, postUserTermsAndConditions } from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/api/userTermsAndConditions/:userId', getUserTermsAndConditions)
router.post('/api/userTermsAndConditions', postUserTermsAndConditions)
