import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import * as fromAppReducers from '../../../app/store/reducers';
import { HttpError } from '../../../models/httpError.model';
import { KEY_FRAGMENT_ID, KEY_MODE } from '../../models/hearingConditions';
import { Mode } from '../../models/hearings.enum';
import { ScreenNavigationModel } from '../../models/screenNavigation.model';
import { HearingsService } from '../../services/hearings.service';
import * as fromHearingReducers from '../../store/reducers';
import * as fromHearingSelectors from '../../store/selectors';
import { AbstractPageFlow } from '../../utils/abstract-page-flow';
import * as hearingRequestToCompareActions from '../actions/hearing-request-to-compare.action';
import * as hearingRequestActions from '../actions/hearing-request.action';
import { LoggerService } from '../../../app/services/logger/logger.service';

@Injectable()
export class HearingRequestEffects {
  public static WELSH_PAGE = 'hearing-welsh';
  public screenNavigations$: Observable<ScreenNavigationModel[]>;
  public caseId: string;
  public mode: Mode;
  public fragmentId: string;

  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
    private readonly pageFlow: AbstractPageFlow,
    private readonly router: Router,
    private readonly location: Location,
    private readonly appStore: Store<fromAppReducers.State>,
    private readonly loggerService: LoggerService
  ) {
    this.screenNavigations$ = this.hearingStore.pipe(select(fromHearingSelectors.getHearingValuesModel)).pipe(
      map((hearingValuesModel) => hearingValuesModel ? hearingValuesModel.screenFlow : []));
    this.hearingStore.pipe(select(fromHearingReducers.getHearingsFeatureState)).subscribe(
      (state) => {
        this.caseId = state.hearingList.hearingListMainModel ? state.hearingList.hearingListMainModel.caseRef : '';
        this.mode = state.hearingConditions.hasOwnProperty(KEY_MODE) ? state.hearingConditions[KEY_MODE] : Mode.CREATE;
        this.fragmentId = state.hearingConditions.hasOwnProperty(KEY_FRAGMENT_ID) ? state.hearingConditions[KEY_FRAGMENT_ID] : '';
      }
    );
  }

  @Effect({ dispatch: false })
  public backNavigation$ = this.actions$.pipe(
      ofType(hearingRequestActions.NAVIGATE_BACK_HEARING_REQUEST),
      switchMap(() => {
        switch (this.mode) {
          case Mode.CREATE:
          case Mode.CREATE_EDIT:
          case Mode.VIEW:
          case Mode.VIEW_EDIT:
            this.location.back();
            return of(null); // Return an observable that emits null and then completes
          default:
            return from(this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']));
        }
      })
    );

  @Effect({ dispatch: false })
  public continueNavigation$ = this.actions$.pipe(
      ofType(hearingRequestActions.UPDATE_HEARING_REQUEST),
      tap(() => {
        const nextPage = this.pageFlow.getNextPage(this.screenNavigations$);
        switch (this.mode) {
          case Mode.CREATE:
            if (nextPage) {
              this.router.navigate(['hearings', 'request', nextPage])
                .catch((err) => this.loggerService.error(`Error navigating to hearings/request/${nextPage} `, err));
              break;
            }

            throw new Error('Next page not found');

          case Mode.CREATE_EDIT:
            if (nextPage === HearingRequestEffects.WELSH_PAGE) {
              this.router.navigate(['hearings', 'request', nextPage])
                .catch((err) => this.loggerService.error(`Error navigating to hearings/request/${nextPage} `, err));
            } else {
              this.router.navigate(['hearings', 'request', 'hearing-create-edit-summary'], { fragment: this.fragmentId })
                .catch((err) => this.loggerService.error(`Error navigating to hearings/request/hearing-create-edit-summary#${this.fragmentId} `, err));
            }
            break;

          case Mode.VIEW_EDIT:
            if (nextPage === HearingRequestEffects.WELSH_PAGE) {
              this.router.navigate(['hearings', 'request', nextPage])
                .catch((err) => this.loggerService.error(`Error navigating to hearings/request/${nextPage} `, err));
              break;
            } else {
              this.router.navigate(['hearings', 'request', 'hearing-view-edit-summary'], { fragment: this.fragmentId })
                .catch((err) => this.loggerService.error(`Error navigating to hearings/request/hearing-view-edit-summary#${this.fragmentId} `, err));
            }
            break;

          default:
            this.router.navigate(['cases', 'case-details', this.caseId, 'hearings'])
              .catch((err) => this.loggerService.error('Error navigating to cases/case-details/caseId/hearings ', err));
            break;
        }
      })
    );

  @Effect({ dispatch: false })
  public loadHearingRequest$ = this.actions$.pipe(
      ofType(hearingRequestActions.LOAD_HEARING_REQUEST),
      map((action: hearingRequestActions.LoadHearingRequest) => action.payload),
      switchMap((payload) => {
        return this.hearingsService.loadHearingRequest(payload.hearingID).pipe(
          tap((hearingRequestMainModel) => {
            this.hearingStore.dispatch(new hearingRequestToCompareActions.InitializeHearingRequestToCompare(hearingRequestMainModel));
            this.hearingStore.dispatch(new hearingRequestActions.InitializeHearingRequest(hearingRequestMainModel));
            if (payload.targetURL) {
              this.router.navigateByUrl(payload.targetURL)
                .catch((err) => this.loggerService.error(`Error navigating to ${payload.targetURL}`, err));
            }
          }),
          catchError((error) => {
            this.appStore.dispatch(new fromAppStoreActions.Go({ path: ['/hearings/error'] }));
            return of(error);
          })
        );
      })
    );

  @Effect({ dispatch: false })
  public submitHearingRequest$ = this.actions$.pipe(
      ofType(hearingRequestActions.SUBMIT_HEARING_REQUEST),
      map((action: hearingRequestActions.SubmitHearingRequest) => action.payload),
      switchMap((payload) => {
        return this.hearingsService.submitHearingRequest(payload).pipe(
          tap(
            () => {
              this.router.navigate(['hearings', 'request', 'hearing-confirmation'])
                .catch((err) => this.loggerService.error('Error navigating to /hearings/request/hearing-confirmation', err));
            }),
          catchError((error) => {
            this.hearingStore.dispatch(new hearingRequestActions.SubmitHearingRequestFailure(error));
            return of(error);
          })
        );
      })
    );

  @Effect({ dispatch: false })
  public submitHearingReason$ = this.actions$.pipe(
      ofType(hearingRequestActions.VIEW_EDIT_SUBMIT_HEARING_REASON),
      tap(() => {
        this.router.navigate(['hearings', 'request', 'hearing-change-reason'])
          .catch((err) => this.loggerService.error('Error navigating to /hearings/request/hearing-change-reason', err));
      })
    );

  @Effect({ dispatch: false })
  public viewEditSubmitHearingRequest$ = this.actions$.pipe(
      ofType(hearingRequestActions.VIEW_EDIT_SUBMIT_HEARING_REQUEST),
      map((action: hearingRequestActions.ViewEditSubmitHearingRequest) => action.payload),
      switchMap((payload) => {
        return this.hearingsService.updateHearingRequest(payload).pipe(
          tap(
            () => {
              this.router.navigate(['hearings', 'request', 'hearing-confirmation'])
                .catch((err) => this.loggerService.error('Error navigating to /hearings/request/hearing-confirmation', err));
            }),
          catchError((error) => {
            this.hearingStore.dispatch(new hearingRequestActions.UpdateHearingRequestFailure(error));
            return of(error);
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
