import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import {HttpError} from '../../../models/httpError.model';
import {Mode} from '../../models/hearings.enum';
import {ScreenNavigationModel} from '../../models/screenNavigation.model';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingReducers from '../../store/reducers';
import * as fromHearingSelectors from '../../store/selectors';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';
import * as hearingRequestActions from '../actions/hearing-request.action';

@Injectable()
export class HearingRequestEffects {
  public screenNavigations$: Observable<ScreenNavigationModel[]>;
  public caseId: string;
  public mode: Mode;

  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
    private readonly pageFlow: AbstractPageFlow,
    private readonly router: Router
  ) {
    this.screenNavigations$ = this.hearingStore.pipe(select(fromHearingSelectors.getHearingValuesModel)).pipe(
      map(hearingValuesModel => hearingValuesModel.screenFlow));
    this.hearingStore.pipe(select(fromHearingReducers.getHearingsFeatureState)).subscribe(
      state => {
        this.caseId = state.hearingList.hearingListMainModel ? state.hearingList.hearingListMainModel.caseRef : '';
        this.mode = state.hearingConditions.hasOwnProperty('mode') ? state.hearingConditions['mode'] : Mode.CREATE;
      }
    );
  }

  @Effect({dispatch: false})
  public backNavigation$ = this.actions$.pipe(
    ofType(hearingRequestActions.NAVIGATE_BACK_HEARING_REQUEST),
    tap(() => {
      switch (this.mode) {
        case Mode.CREATE:
          const backPage = this.pageFlow.getLastPage(this.screenNavigations$);
          if (backPage) {
            return this.router.navigate(['hearings', 'request', backPage]);
          }
          return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']);
        case Mode.CREATE_EDIT:
          return this.router.navigate(['hearings', 'request', 'hearing-create-edit-summary']);
        case Mode.VIEW:
          return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']);
        case Mode.VIEW_EDIT:
          return this.router.navigate(['hearings', 'request', 'hearing-view-edit-summary']);
        default:
          return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']);
      }
    })
  );

  @Effect({dispatch: false})
  public continueNavigation$ = this.actions$.pipe(
    ofType(hearingRequestActions.UPDATE_HEARING_REQUEST),
    tap(() => {
      switch (this.mode) {
        case Mode.CREATE:
          const nextPage = this.pageFlow.getNextPage(this.screenNavigations$);
          if (nextPage) {
            return this.router.navigate(['hearings', 'request', nextPage]);
          } else {
            throw new Error('Next page not found');
          }
        case Mode.CREATE_EDIT:
          return this.router.navigate(['hearings', 'request', 'hearing-create-edit-summary']);
        case Mode.VIEW_EDIT:
          return this.router.navigate(['hearings', 'request', 'hearing-view-edit-summary']);
        default:
          return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']);
      }
    })
  );

  @Effect({dispatch: false})
  public submitHearingRequest$ = this.actions$.pipe(
    ofType(hearingRequestActions.SUBMIT_HEARING_REQUEST),
    map((action: hearingRequestActions.SubmitHearingRequest) => action.payload),
    switchMap(payload => {
      return this.hearingsService.submitHearingRequest(payload).pipe(
        tap(
          () => {
            return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']);
          }),
        catchError(error => {
          return HearingRequestEffects.handleError(error);
        })
      );
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status && error.status >= 400) {
      return of(new fromAppStoreActions.Go({path: ['/service-down']}));
    }
  }
}
