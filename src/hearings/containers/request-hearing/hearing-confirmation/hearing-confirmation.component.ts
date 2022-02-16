import { Component, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import { RequestHearingPageFlow } from "../request-hearing.page.flow";
import * as fromHearingStore from '../../../store';
import { HearingsService } from '../../../services/hearings.service';
import { ACTION } from "src/hearings/models/hearings.enum";

@Component({
  selector: 'exui-hearing-confirmation',
  templateUrl: './hearing-confirmation.component.html'
})
export class HearingConfirmationComponent extends RequestHearingPageFlow implements OnDestroy {
  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
