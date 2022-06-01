import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HMCLocationType } from 'src/hearings/models/hearings.enum';
import { ServiceHearingValuesModel } from 'src/hearings/models/serviceHearingValues.model';
import { SessionStorageService } from '../../../app/services';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as hearingValuesActions from '../../../hearings/store/actions/hearing-values.action';
import { HttpError } from '../../../models/httpError.model';
import { HearingsService } from '../../services/hearings.service';
import * as fromHearingReducers from '../../store/reducers';

@Injectable()
export class HearingValuesEffects {

  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
    private readonly sessionStorage: SessionStorageService,
  ) {
  }
  screenFlow = [
    {
      screenName: 'hearing-requirements',
      navigation: [
        {
          resultValue: 'hearing-facilities',
        },
      ],
    },
    {
      screenName: 'hearing-facilities',
      navigation: [
        {
          resultValue: 'hearing-stage',
        },
      ],
    },
    {
      screenName: 'hearing-stage',
      navigation: [
        {
          resultValue: 'hearing-attendance',
        },
      ],
    },
    {
      screenName: 'hearing-attendance',
      navigation: [
        {
          resultValue: 'hearing-venue',
        },
      ],
    },
    {
      screenName: 'hearing-venue',
      conditionKey: 'region',
      navigation: [
        {
          conditionOperator: 'INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'hearing-welsh',
        },
        {
          conditionOperator: 'NOT INCLUDE',
          conditionValue: 'Wales',
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-welsh',
      navigation: [
        {
          resultValue: 'hearing-judge',
        },
      ],
    },
    {
      screenName: 'hearing-judge',
      navigation: [
        {
          resultValue: 'hearing-panel',
        },
      ],
    },
    {
      screenName: 'hearing-panel',
      navigation: [
        {
          resultValue: 'hearing-timing',
        },
      ],
    },
    {
      screenName: 'hearing-timing',
      navigation: [
        {
          resultValue: 'hearing-link',
        },
      ],
    },
    {
      screenName: 'hearing-link',
      navigation: [
        {
          resultValue: 'hearing-additional-instructions',
        },
      ],
    },
    {
      screenName: 'hearing-additional-instructions',
      navigation: [
        {
          resultValue: 'hearing-create-edit-summary',
        },
      ],
    },
  ];

  /**
   * TODO: Remove hardcoding values
   * Effect  of hearing values effects
   */
  @Effect()
  public loadHearingValue$ = this.actions$.pipe(
    ofType(hearingValuesActions.LOAD_HEARING_VALUES),
    map((action: hearingValuesActions.LoadHearingValues) => action.payload),
    switchMap(payload => {
      const caseInfo = JSON.parse(this.sessionStorage.getItem('caseInfo'));
      const jurisdictionId = caseInfo && caseInfo.jurisdiction;
      return this.hearingsService.loadHearingValues(jurisdictionId, payload).pipe(
        map((response: ServiceHearingValuesModel) => {
          return response = {
            ...response, screenFlow: this.screenFlow, hmctsServiceID: "BBA3", hearingType: "BBA3-SUB", hearingWindow: {
              dateRangeStart: "2022-11-23T09:00:00.000Z",
              dateRangeEnd: "2022-11-30T09:00:00.000Z",
              firstDateTimeMustBe: ""
            }
          }
        }),
        map(
          (response) => new hearingValuesActions.LoadHearingValuesSuccess(response)),
        catchError(error => {
          this.hearingStore.dispatch(new hearingValuesActions.LoadHearingValuesFailure(error));
          return HearingValuesEffects.handleError(error);
        })
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status) {
      return of(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
    }
  }
}
