import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Action, select, Store} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as fromAppStoreActions from '../../../app/store/actions';
import {HttpError} from '../../../models/httpError.model';
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

  constructor(
    private readonly actions$: Actions,
    private readonly hearingStore: Store<fromHearingReducers.State>,
    private readonly hearingsService: HearingsService,
    private readonly pageFlow: AbstractPageFlow,
    private readonly router: Router
  ) {
    this.screenNavigations$ = this.hearingStore.pipe(select(fromHearingSelectors.getHearingValuesModel)).pipe(
      map(hearingValuesModel => hearingValuesModel.screenFlow));
    this.hearingStore.pipe(select(fromHearingSelectors.getHearingList)).subscribe(
      hearingList => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
      }
    );
  }

  @Effect({ dispatch: false })
  public backNavigation$ = this.actions$.pipe(
    ofType(hearingRequestActions.NAVIGATE_BACK_HEARING_REQUEST),
    tap(() => {
      const backPage = this.pageFlow.getLastPage(this.screenNavigations$);
      if (backPage) {
        return this.router.navigate(['hearings', 'request', backPage]).then();
      }
      return this.router.navigate(['cases', 'case-details', this.caseId, 'hearings']).then();
    })
  );

  @Effect({ dispatch: false })
  public continueNavigation$ = this.actions$.pipe(
    ofType(hearingRequestActions.UPDATE_HEARING_REQUEST),
    tap(() => {
      const nextPage = this.pageFlow.getNextPage(this.screenNavigations$);
      return this.router.navigate(['hearings', 'request', nextPage]).then();
    })
  );

  public static handleError(error: HttpError): Observable<Action> {
    if (error && error.status && error.status >= 400) {
      return of(new fromAppStoreActions.Go({path: ['/service-down']}));
    }
  }
}
