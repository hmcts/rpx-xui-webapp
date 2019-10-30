import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import { handleGet } from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
// router.post('/annotation-sets', handlePost)
router.get('/*', handleGet)
// router.delete('/annotations/:uuid', handleDelete)
// router.post('/annotations', handleAdd)
