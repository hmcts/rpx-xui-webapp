import * as express from 'express'
import {getPrintout} from './index'

export const router = express.Router({ mergeParams: true })

router.get('/*', getPrintout)
