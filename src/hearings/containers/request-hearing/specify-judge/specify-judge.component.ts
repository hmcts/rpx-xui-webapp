import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ACTION} from '../../../models/hearings.enum';
import {HearingsService} from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import {RequestHearingPageFlow} from '../request-hearing.page.flow';

@Component({
  selector: 'exui-specify-judge',
  templateUrl: './specify-judge.component.html',
})
export class SpecifyJudgeComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
  }

  public executeAction(action: ACTION): void {
    if (this.isFormValid()) {
      super.navigateAction(action);
    }
  }

  public isFormValid(): boolean {
    // TODO verify if form group is valid
    return true;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
