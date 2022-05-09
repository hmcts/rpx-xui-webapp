import * as express from 'express';
import {router as caseShareRoutes} from './caseshare/routes';
import {getConfigValue, showFeature} from './configuration';
import {APP_INSIGHTS_KEY} from './configuration/references';
import healthCheck from './healthCheck';
import {router as hearingsRouter} from './hearings/routes';
import authInterceptor from './lib/middleware/auth';
import { router as locationsRouter } from './locations/routes';
import { router as nocRouter } from './noc/routes';
import { router as organisationRouter } from './organisations';
import { router as serviceRefDataRouter } from './serviceRefData';
import { router as waSupportedJurisdictionRouter } from './waSupportedJurisdictions';
import roleAccessRouter from './roleAccess/routes';
import {router as prdRouter} from './prd/routes';
import userRouter from './user/routes';
import { router as SpecificAccessRouter } from './specificAccessOrchastrator/routes';

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

router.use('/locations', locationsRouter);
// TODO: potentially can be moved to proxy but with onRes callback
router.use('/caseshare', caseShareRoutes);
router.use('/noc', nocRouter);
router.use('/organisation', organisationRouter);
router.use('/wa-supported-jurisdiction', waSupportedJurisdictionRouter);
router.use('/locations', locationsRouter);
router.use('/service-ref-data', serviceRefDataRouter);
router.use('/prd', prdRouter);
router.use('/hearings', hearingsRouter);

//http://localhost:3000/am/role-assignments1
// router.post('/specific-access-request', function (req, res, next) {
//   res.send('This is specific-access-request');
// });
// router.post('/api/specific-access-request', function (req, res, next) {
//   res.send('This is specific-access-request');
// });
// router.use('/am/role-assignments1', SpecificAccessRouter);
router.use('/specific-access-request', SpecificAccessRouter);

// @ts-ignore
export default router;
