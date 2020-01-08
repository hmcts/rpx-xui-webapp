import * as express from 'express'
import authInterceptor from '../lib/middleware/auth'
import {getDocumentBinaryRoute, getDocumentRoute, postDocuments} from './index'

export const router = express.Router({ mergeParams: true })

router.use(authInterceptor)
router.get('/:document_id', getDocumentRoute)
router.get('/:document_id/binary', getDocumentBinaryRoute)
router.post('/', postDocuments)
