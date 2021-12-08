import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-check-answers',
  templateUrl: './check-answers.component.html',
})
export class CheckAnswersComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
