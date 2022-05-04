import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import { router as caseFlagRouter } from './caseFlag/routes';
import { router as judicialRouter } from './judicial/routes';
import { router as locationRouter } from './location/routes';
import { router as lovRouter } from './lov/routes';

export const router = express.Router({ mergeParams: true });
// This is a root router for all PRD(Professional Reference Data)
router.use(authInterceptor);
router.use('/caseFlag', caseFlagRouter);
router.use('/location', locationRouter);
router.use('/lov', lovRouter);
router.use('/judicial', judicialRouter);
