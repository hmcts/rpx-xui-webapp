import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { RequestHearingPageFlow } from "../request-hearing.page.flow";
import * as fromHearingStore from '../../../store';
import { HearingsService } from '../../../services/hearings.service';
import { ACTION } from "src/hearings/models/hearings.enum";

@Component({
  selector: 'exui-hearing-final-confirmation',
  templateUrl: './hearing-final-confirmation.component.html'
})
export class HearingFinalConfirmationComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {

  public heading: string;
  public headingDescription: string;
  public subheading: string;
  public subheadingDescription: string;
  public additionalDescription: string;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
    this.heading = 'Hearing request submitted';
    this.headingDescription = 'Your hearing request will now be processed';
    this.subheading = 'What happens next';
    this.subheadingDescription = `You can <a href="/cases/case-details/1584618195804035/hearings" class="govuk-link">view the status of this request in the hearings tab</a>.`;
    this.additionalDescription = `If the hearing cannot be listed automatically, it will be sent to a member of staff to be processed.<br>
      A notice of hearing will be issued once the hearing is listed, you will not be notified of the listing.`;
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
