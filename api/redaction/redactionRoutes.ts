import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { postRedaction } from './redaction'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.post('/*', postRedaction)
