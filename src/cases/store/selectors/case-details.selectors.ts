import {createSelector} from '@ngrx/store';
import * as fromRoot from '../../../app/store';

export const getCaseId = createSelector(
  fromRoot.getRouterState,
  (router): string => {
    return router && router.state && router.state.params.caseId;
  }
);
