import * as express from 'express';
import { applicationConfiguration } from './appConfig';

export const router = express.Router({mergeParams: true});

router.get('/', configurationCheckRoute);

/**
 * Application Configuration Check Route
 *
 * This is used to check that the application has been setup correctly on all environments by a
 * Developer.
 *
 * ie. The developer is able to hit this open route to check how the application is configured.
 */
async function configurationCheckRoute(req, res) {
  res.status(200).send(applicationConfiguration());
}

export default router;
