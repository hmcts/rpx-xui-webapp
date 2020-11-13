import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';

export const getNocState = createSelector(
 fromFeature.getNocFeatureState,
 (state: fromFeature.State) => state.noc
);

export const currentNavigation = createSelector(
    getNocState,
    fromFeature.getNocActiveState
);

export const lastError = createSelector(
    getNocState,
    fromFeature.getLastError
);

export const questions = createSelector(
    getNocState,
    fromFeature.getQuestions
);

export const answers = createSelector(
    getNocState,
    fromFeature.getAnswers
);

export const affirmationAgreed = createSelector(
    getNocState,
    fromFeature.getAffirmationAgreed
);

export const validationErrors = createSelector(
    getNocState,
    fromFeature.getValidationErrors
);

export const caseReference = createSelector(
  getNocState,
  fromFeature.getCaseReference
);
