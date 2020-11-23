import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import {getNoCQuestions, submitNoCEvents, validateNoCQuestions} from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/nocQuestions', getNoCQuestions)
router.post('/validateNoCQuestions', validateNoCQuestions)
router.post('/submitNocEvents', submitNoCEvents)
