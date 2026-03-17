import * as express from 'express';
import getAppConfigCheckRouter from './configuration/appConfigCheckRouter';
import getUiConfigRouter from './configuration/uiConfigRouter';

const router = express.Router({ mergeParams: true });

// EXUI-3967 - Removed almost all instances of 'configuration-ui' in favour of 'config/ui' - kept for backwards compatibility
router.use('/configuration-ui', getUiConfigRouter);
router.use('/config/ui', getUiConfigRouter);
router.use('/config/check', getAppConfigCheckRouter);

export default router;
