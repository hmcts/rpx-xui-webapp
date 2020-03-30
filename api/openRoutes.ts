import * as express from 'express'
import getConfigurationCheckRouter from './configurationCheck'
import getConfigurationUIRouter from './configurationUI'

const router = express.Router({ mergeParams: true })

router.use('/configuration-ui', getConfigurationUIRouter)
router.use('/configuration/check', getConfigurationCheckRouter)

export default router
