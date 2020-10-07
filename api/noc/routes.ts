import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import {getNoCQuestions} from './index'

export const router = express.Router({ mergeParams: true })

// router.use(authInterceptor)
router.get('/NoCQuestions', getNoCQuestions)
/*router.post('/!*', postMarkup)
router.put('/!*', putMarkup)
router.delete('/!*', deleteMarkup)*/
