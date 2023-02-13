import * as express from 'express';
import authInterceptor from '../lib/middleware/auth';
import {
  orchestrationRequestMoreInformation,
  orchestrationSpecificAccessRequest,
  specificAccessRequestUpdateAttributes, specificAccessRequestUpdateAttributesForDeleted
} from './index';

export const router = express.Router({mergeParams: true});

router.use(authInterceptor);
router.post('/', orchestrationSpecificAccessRequest);

router.post('/request-more-information', orchestrationRequestMoreInformation);
router.post('/update-attributes', specificAccessRequestUpdateAttributes);
router.post('/update-attributes-for-deleted', specificAccessRequestUpdateAttributesForDeleted,);
