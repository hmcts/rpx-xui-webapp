import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';
import {ACTION} from '../../models/hearings.enum';
import {ScreenNavigationModel} from '../../models/screenNavigation.model';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent implements OnInit, OnDestroy {

  private static HEARING_CHECK_ANSWERS = 'hearing-check-answers';
  public referenceId: string;
  public hearingListSub: Subscription;
  public screensNavigations$: Observable<ScreenNavigationModel[]>;

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly pageFlow: AbstractPageFlow,
              private readonly hearingsService: HearingsService) {
    this.hearingListSub = this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.referenceId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
      }
    );
    this.screensNavigations$ = this.hearingStore.pipe(select(fromHearingStore.getHearingValues)).pipe(
      map(hearingValuesStateData => hearingValuesStateData.serviceHearingValuesModel.screenFlow));
  }

  public ngOnInit(): void {
    this.hearingStore.dispatch(new fromHearingStore.LoadHearingValues(this.referenceId));
  }

  public onBack(): void {
    this.hearingsService.navigateAction(ACTION.BACK);
  }

  public onContinue(): void {
    this.hearingsService.navigateAction(ACTION.CONTINUE);
  }

  public onSubmit(): void {
    this.hearingsService.navigateAction(ACTION.SUBMIT);
  }

  public isCheckAnswerPage(): boolean {
    return this.pageFlow.getCurrentPage() === RequestHearingComponent.HEARING_CHECK_ANSWERS;
  }

  public ngOnDestroy(): void {
    if (this.hearingListSub) {
      this.hearingListSub.unsubscribe();
    }
  }
}
