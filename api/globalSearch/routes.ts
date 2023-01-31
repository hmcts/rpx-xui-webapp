import * as express from 'express'
import { getSearchResults, getServices } from './index'

export const router = express.Router({ mergeParams: true })

router.get('/services', getServices)
router.post('/results', getSearchResults)
