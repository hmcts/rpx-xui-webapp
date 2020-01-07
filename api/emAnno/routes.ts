import * as express from 'express'
// import authInterceptor from '../lib/middleware/auth'
import {deleteAnnotations, getAnnotations, postAnnotations, putAnnotations} from './index'

export const router = express.Router({ mergeParams: true })

// router.use(authInterceptor)
router.get('/*', getAnnotations)
router.post('/*', postAnnotations)
router.put('/*', putAnnotations)
router.delete('/*', deleteAnnotations)
