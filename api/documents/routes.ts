import * as express from 'express'
import {getDocumentBinaryRoute, getDocumentRoute, postDocuments} from './index'

export const router = express.Router({ mergeParams: true })

router.get('/:document_id', getDocumentRoute)
router.get('/:document_id/binary', getDocumentBinaryRoute)
router.post('/', postDocuments)
