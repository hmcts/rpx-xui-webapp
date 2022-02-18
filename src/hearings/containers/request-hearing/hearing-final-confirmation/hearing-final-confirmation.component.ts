import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { HearingConfirmationSource } from 'src/hearings/models/hearings.enum';
import * as fromHearingStore from '../../../store';

@Component({
  selector: 'exui-hearing-final-confirmation',
  templateUrl: './hearing-final-confirmation.component.html'
})
export class HearingFinalConfirmationComponent implements OnInit {

  public readonly hearingConfirmationSource = HearingConfirmationSource.HEARING_REQUEST;
  public heading: string;
  public headingDescription: string;
  public subheading: string;
  public subheadingDescription: string;
  public additionalDescription: string;
  public caseId: string;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>) {
  }

  public ngOnInit(): void {
    this.hearingStore.pipe(select(fromHearingStore.getHearingList)).subscribe(
      hearingList => {
        this.caseId = hearingList.hearingListMainModel ? hearingList.hearingListMainModel.caseRef : '';
        this.heading = 'Hearing request submitted';
        this.headingDescription = 'Your hearing request will now be processed';
        this.subheading = 'What happens next';
        this.additionalDescription = `If the hearing cannot be listed automatically, it will be sent to a member of staff to be processed.<br>
          A notice of hearing will be issued once the hearing is listed, you will not be notified of the listing.`;
      });
  }
}
