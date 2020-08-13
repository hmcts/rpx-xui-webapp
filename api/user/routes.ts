
import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { getUserDetails } from './index'

const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.use('/details', getUserDetails)

export default router
