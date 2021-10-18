import * as express from 'express'
import { getServices } from './index'

export const router = express.Router({ mergeParams: true })

router.use('/services', getServices)
