import * as express from 'express'
import getConfigurationUIRouter from './configurationUI'

const router = express.Router({ mergeParams: true })

router.use('/configuration-ui', getConfigurationUIRouter)

export default router
