import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { HearingActualsStateData } from '../../models/hearingActualsStateData.model';
import { HearingConditions } from '../../models/hearingConditions';
import { HearingListStateData } from '../../models/hearingListStateData.model';
import { HearingRequestStateData } from '../../models/hearingRequestStateData.model';
import { HearingValuesStateData } from '../../models/hearingValuesStateData';
import * as fromHearingActuals from './hearing-actuals.reducer';
import * as fromHearingConditions from './hearing-conditions.reducer';
import * as fromHearingList from './hearing-list.reducer';
import * as fromHearingRequest from './hearing-request.reducer';
import * as fromHearingValues from './hearing-values.reducer';

export interface State {
  hearingList: HearingListStateData;
  hearingValues: HearingValuesStateData;
  hearingRequest: HearingRequestStateData;
  hearingConditions: HearingConditions;
  hearingActuals: HearingActualsStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  hearingValues: fromHearingValues.hearingValuesReducer,
  hearingRequest: fromHearingRequest.hearingRequestReducer,
  hearingConditions: fromHearingConditions.hearingConditionsReducer,
  hearingActuals: fromHearingActuals.hearingActualsReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
export * from './hearing-request.reducer';
export * from './hearing-values.reducer';
export * from './hearing-conditions.reducer';
export * from './hearing-actuals.reducer';
