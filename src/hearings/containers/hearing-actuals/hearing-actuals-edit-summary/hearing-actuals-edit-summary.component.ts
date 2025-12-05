import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HearingActualsSummaryBaseComponent } from '../hearing-actuals-summary-base/hearing-actuals-summary-base.component';

@Component({
  standalone: false,
  selector: 'exui-hearing-actuals-edit-summary',
  templateUrl: './hearing-actuals-edit-summary.component.html',
  styleUrls: ['./hearing-actuals-edit-summary.component.scss'],
  providers: [DatePipe]
})
export class HearingActualsEditSummaryComponent extends HearingActualsSummaryBaseComponent {
  constructor(
    public readonly location: Location,
    public readonly hearingStore: Store<fromHearingStore.State>,
    public readonly hearingsService: HearingsService,
    public readonly route: ActivatedRoute,
    public readonly router: Router,
    public readonly ccdDatePipe: DatePipe

  ) {
    super(hearingStore, hearingsService, route, router, ccdDatePipe);
    this.partyChannels = [...this.route.snapshot.data.partyChannels, ...this.route.snapshot.data.partySubChannels];
  }

  public hearingActualAddEditUrl(): string {
    return `/hearings/actuals/${this.hearingRequestID}/hearing-actual-add-edit-summary`;
  }

  public onSubmitHearingDetails(): void {
    this.hearingStore.dispatch(new fromHearingStore.SubmitHearingActuals(this.id));
  }

  // Note: Already onBack on extended component but does not work for this use case
  public onBackPage(): void {
    // Prefer an in-app back when we can
    const sameOriginReferrer =
      document.referrer && new URL(document.referrer).origin === location.origin;

    if (sameOriginReferrer && history.length > 1) {
      this.location.back();
    } else {
      // Fallback when opened in a new tab/deep link (no useful history)
      this.router.navigate([this.hearingActualAddEditUrl()]);
    }
  }
}
