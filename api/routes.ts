import * as express from 'express';
import { router as caseShareRoutes } from './caseshare/routes';
import { getConfigValue, showFeature } from './configuration';
import { APP_INSIGHTS_KEY } from './configuration/references';
import { router as globalSearchRoutes } from './globalSearch/routes';
import healthCheck from './healthCheck';
import authInterceptor from './lib/middleware/auth';
import { router as nocRouter } from './noc/routes';
import { router as organisationRouter } from './organisations';
import { router as waSupportedJurisdictionRouter } from './waSupportedJurisdictions';
import roleAccessRouter from './roleAccess/routes';
import userRouter from './user/routes';

const router = express.Router({mergeParams: true});

router.use('/healthCheck', healthCheck);

router.get('/monitoring-tools', (req, res) => {
  res.send({key: getConfigValue(APP_INSIGHTS_KEY)});
});

router.get('/configuration', (req, res) => {
  res.send(showFeature(req.query.configurationKey as string));
});

router.use(authInterceptor);

router.use('/user', userRouter);

router.use('/role-access', roleAccessRouter);

// TODO: potentially can be moved to proxy but with onRes callback
router.use('/caseshare', caseShareRoutes);
router.use('/noc', nocRouter);
router.use('/organisation', organisationRouter);
router.use('/wa-supported-jurisdiction', waSupportedJurisdictionRouter);
router.use('/globalSearch', globalSearchRoutes);

// @ts-ignore
export default router;
