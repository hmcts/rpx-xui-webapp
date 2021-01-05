import * as express from 'express'
import { getUserDetails } from './index'

const router = express.Router({ mergeParams: true })

router.use('/details', getUserDetails)

export default router
