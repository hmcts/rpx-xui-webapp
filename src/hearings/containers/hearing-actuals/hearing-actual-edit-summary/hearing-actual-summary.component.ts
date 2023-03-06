import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HearingActualSummaryBaseComponent } from '../hearing-actual-summary-base/hearing-actual-summary-base.component';

@Component({
  selector: 'exui-hearing-actual-summary',
  templateUrl: './hearing-actual-summary.component.html',
  styleUrls: ['./hearing-actual-summary.component.scss']
})
export class HearingActualSummaryComponent extends HearingActualSummaryBaseComponent {

  constructor(
    public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router
  ) {
    super(hearingStore, hearingsService, route, router);
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
  }

  public hearingActualAddEditUrl(): string {
    return `/hearings/actuals/${this.hearingRequestID}/hearing-actual-add-edit-summary`;
  }

  public onSubmitHearingDetails(): void {
    this.submitted = true;
    this.hearingStore.dispatch(new fromHearingStore.SubmitHearingActuals(this.id));
  }
}
