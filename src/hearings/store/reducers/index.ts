import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {HearingReferenceStateData} from '../../models/hearingReferenceStateData.model';
import {HearingConditions} from '../../models/hearingConditions';
import {HearingListStateData} from '../../models/hearingListStateData.model';
import {HearingRequestStateData} from '../../models/hearingRequestStateData.model';
import {HearingValuesStateData} from '../../models/hearingValuesStateData';
import * as fromHearingConditions from './hearing-conditions.reducer';
import * as fromHearingList from './hearing-list.reducer';
import * as fromHearingRequest from './hearing-request.reducer';
import * as fromHearingValues from './hearing-values.reducer';
import * as fromHearingReferenceData from './hearing-refdata.reducer';

export interface State {
  hearingList: HearingListStateData;
  hearingValues: HearingValuesStateData;
  hearingRequest: HearingRequestStateData;
  hearingConditions: HearingConditions;
  hearingReferenceData: HearingReferenceStateData;
}

export const reducers: ActionReducerMap<State> = {
  hearingList: fromHearingList.hearingListReducer,
  hearingValues: fromHearingValues.hearingValuesReducer,
  hearingRequest: fromHearingRequest.hearingRequestReducer,
  hearingConditions: fromHearingConditions.hearingConditionsReducer,
  hearingReferenceData: fromHearingReferenceData.hearingRefDataReducer,
};

export const getHearingsFeatureState = createFeatureSelector<State>(
  'hearings'
);

export * from './hearing-list.reducer';
export * from './hearing-request.reducer';
export * from './hearing-values.reducer';
export * from './hearing-conditions.reducer';
export * from './hearing-refdata.reducer';
