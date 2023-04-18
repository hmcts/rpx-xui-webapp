import * as express from 'express';
import getAppConfigCheckRouter from './configuration/appConfigCheckRouter';
import getUiConfigRouter from './configuration/uiConfigRouter';

const router = express.Router({ mergeParams: true });

/**
 * TODO: Deprecate due to naming
 */
router.use('/configuration-ui', getUiConfigRouter);
router.use('/config/ui', getUiConfigRouter);
router.use('/config/check', getAppConfigCheckRouter);

export default router;
