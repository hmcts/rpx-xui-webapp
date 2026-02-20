import * as express from 'express';
import getUiConfigRouter from './configuration/uiConfigRouter';

const router = express.Router({ mergeParams: true });

/**
 * TODO: Consolidate duplicate config routes. Keep both for now as multiple teams use them both for performance testing.
 */
router.use('/configuration-ui', getUiConfigRouter);
router.use('/config/ui', getUiConfigRouter);

export default router;
