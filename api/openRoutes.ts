import * as express from 'express';
import getUiConfigRouter from './configuration/uiConfigRouter';

const router = express.Router({ mergeParams: true });

router.use('/configuration-ui', getUiConfigRouter);

export default router;
