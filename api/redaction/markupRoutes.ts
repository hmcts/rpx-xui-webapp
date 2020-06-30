import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import {deleteMarkup, getMarkup, postMarkup, putMarkup} from './markup'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/*', getMarkup)
router.post('/*', postMarkup)
router.put('/*', putMarkup)
router.delete('/*', deleteMarkup)
