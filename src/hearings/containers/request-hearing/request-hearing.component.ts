import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ScreenNavigationModel} from '../../models/screenNavigation.model';
import * as fromHearingStore from '../../store';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent implements OnInit, OnDestroy {
  public backLink: string;
  public referenceId: string;
  public hearingListSub: Subscription;
  public screensNaviagations$: Observable<ScreenNavigationModel[]>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly pageFlow: AbstractPageFlow,
              private readonly router: Router) {
    this.hearingListSub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.referenceId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
      }
    );
    this.screensNaviagations$ = this.hearingStore.pipe(select(fromHearingStore.getHearingValues)).pipe(
      map(hearingValuesStateData => hearingValuesStateData.serviceHearingValuesModel.screenFlow));
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
  }

  public onContinue(): void {
    console.log('continue');
    // validate the route component form group
    const isValid = this.validateForm();
    if (isValid) {
      const nextPage = this.pageFlow.getNextPage(this.screensNaviagations$);
      this.router.navigate(['hearings', 'request', nextPage]);
    }
  }

  public validateForm(): boolean {
    // TODO
    return true;
  }

  public ngOnDestroy(): void {
    if (this.hearingListSub) {
      this.hearingListSub.unsubscribe();
    }
  }
}
