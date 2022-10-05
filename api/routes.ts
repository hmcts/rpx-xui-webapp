import * as express from 'express';
import accessManagementRouter from './accessManagement/routes';
import { router as caseShareRoutes } from './caseshare/routes';
import { router as challengedAccessRouter } from './challengedAccess/routes';
import {getConfigValue, showFeature} from './configuration';
import {APP_INSIGHTS_KEY} from './configuration/references';
import { router as globalSearchRoutes } from './globalSearch/routes';
import healthCheck from './healthCheck';
import { router as hearingsRouter } from './hearings/routes';
import authInterceptor from './lib/middleware/auth';
import { router as locationsRouter } from './locations/routes';
import { router as nocRouter } from './noc/routes';
import { router as organisationRouter } from './organisations';
import { router as prdRouter } from './prd/routes';
import roleAccessRouter from './roleAccess/routes';
import { router as serviceRefDataRouter } from './serviceRefData';
import { router as specificAccessRouter } from './specificAccessOrchastrator/routes';
import userRouter from './user/routes';
import { router as waSupportedJurisdictionRouter } from './waSupportedJurisdictions';

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

router.use('/am', accessManagementRouter);

router.use('/role-access', roleAccessRouter);

router.use('/am', accessManagementRouter);

router.use('/role-access', roleAccessRouter);

router.use('/locations', locationsRouter);
// TODO: potentially can be moved to proxy but with onRes callback
router.use('/caseshare', caseShareRoutes);
router.use('/noc', nocRouter);
router.use('/organisation', organisationRouter);
router.use('/wa-supported-jurisdiction', waSupportedJurisdictionRouter);
router.use('/globalSearch', globalSearchRoutes);
router.use('/locations', locationsRouter);
router.use('/service-ref-data', serviceRefDataRouter);
router.use('/prd', prdRouter);
router.use('/hearings', hearingsRouter);
router.use('/specific-access-request', specificAccessRouter);
router.use('/challenged-access-request', challengedAccessRouter);

// @ts-ignore
export default router;
