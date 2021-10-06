import * as express from 'express'
import { getJurisdictions } from './index'

export const router = express.Router({ mergeParams: true })

router.use('/', getJurisdictions)
// router.use('/globalsearch', getGlobalSearchJurisdictions)
