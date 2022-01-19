import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {ACTION} from '../../models/hearings.enum';
import {HearingsService} from '../../services/hearings.service';
import * as fromHearingStore from '../../store';
import {AbstractPageFlow} from '../../utils/abstract-page-flow';

@Component({
  selector: 'exui-request-hearing',
  templateUrl: './request-hearing.component.html',
  styleUrls: ['./request-hearing.component.scss']
})
export class RequestHearingComponent {

  private static HEARING_CHECK_ANSWERS = 'hearing-check-answers';

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
              private readonly pageFlow: AbstractPageFlow,
              private readonly hearingsService: HearingsService) {
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

}
