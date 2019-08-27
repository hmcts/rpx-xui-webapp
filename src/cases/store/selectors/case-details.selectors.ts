import {createSelector} from '@ngrx/store';
import * as fromRoot from '../../../app/store';

export const getCaseId = createSelector(
  fromRoot.getRouterState,
  (router): string => {
    console.log(router.state.params);
    return router.state && router.state.params.cid;
  }
);
