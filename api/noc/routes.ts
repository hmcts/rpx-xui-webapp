import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import {getNoCQuestions, noCEvents, validateNoCQuestions} from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/NoCQuestions', getNoCQuestions)
router.post('/ValidateNoCQuestions', validateNoCQuestions)
router.post('/NoCEvents', noCEvents)
