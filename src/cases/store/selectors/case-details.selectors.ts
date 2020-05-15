import {createSelector} from '@ngrx/store';
import { getRouterState } from '../../../app/store';

export const getCaseId = createSelector(
  getRouterState,
  (router): string => {
    return router.state && router.state.params.cid;
  }
);
