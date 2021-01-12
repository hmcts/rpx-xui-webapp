import * as express from 'express'
import { router as caseShareRoutes } from './caseshare/routes'
import {getConfigValue, showFeature} from './configuration'
import {APP_INSIGHTS_KEY} from './configuration/references'
import healthCheck from './healthCheck'
import authInterceptor from './lib/middleware/auth'
import userRouter from './user/routes'
import { router as nocRouter } from './noc/routes'

// import {router as termsAndCRoutes} from './termsAndConditions/routes'
// import {router as userTandCRoutes} from './userTermsAndConditions/routes'

const router = express.Router({ mergeParams: true })

router.use('/healthCheck', healthCheck)

router.get('/monitoring-tools', (req, res) => {
    res.send({key: getConfigValue(APP_INSIGHTS_KEY)})
})

router.get('/configuration', (req, res) => {
    res.send(showFeature(req.query.configurationKey as string))
})

router.use(authInterceptor)

router.use('/user', userRouter)

// TODO: potentially can be moved to proxy but with onRes callback
router.use('/caseshare', caseShareRoutes)
router.use('/noc', nocRouter)

/*if (showFeature(FEATURE_TERMS_AND_CONDITIONS_ENABLED)) {
    router.use('/userTermsAndConditions',  userTandCRoutes)
    router.use('/termsAndConditions', termsAndCRoutes)
}*/

// @ts-ignore
export default router
