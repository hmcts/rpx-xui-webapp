import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { Mode } from '../../../models/hearings.enum';
import * as fromHearingStore from '../../../store';
import { HEARING_CANCELLED_SUMMARY_TEMPLATE } from '../../../templates/hearing-cancelled-summary.template';

@Component({
  standalone: false,
  selector: 'exui-hearing-cancelled-summary',
  templateUrl: './hearing-cancelled-summary.component.html',
  styleUrls: ['./hearing-cancelled-summary.component.scss'],
})
export class HearingCancelledSummaryComponent implements OnInit, OnDestroy {
  public template = HEARING_CANCELLED_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW;
  public showEditButton = false;
  private allowEditButton = false;
  private caseRef: string;
  private hearingId: string;
  private hearingActualsMainModel: HearingActualsMainModel;
  private subscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly hearingStore: Store<fromHearingStore.State>
  ) {}

  public ngOnInit(): void {
    const navState = this.router.getCurrentNavigation()?.extras?.state ?? history.state;
    this.hearingId = this.route.snapshot.params.id;
    this.caseRef = navState?.caseRef;
    this.allowEditButton = !!navState?.showEditButton;

    this.subscription = this.hearingStore.select(fromHearingStore.getHearingsFeatureState).subscribe((state) => {
      this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
      this.showEditButton = this.allowEditButton && this.hasHearingActuals(this.hearingActualsMainModel);
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onEdit(): void {
    this.router.navigate(['/', 'hearings', 'actuals', this.hearingId, 'hearing-actual-add-edit-summary'], {
      state: { caseId: this.caseRef || this.hearingActualsMainModel?.caseDetails?.caseRef, hideConfirmButtons: true },
    });
  }

  private hasHearingActuals(hearingActualsMainModel: HearingActualsMainModel): boolean {
    return !!hearingActualsMainModel?.hearingActuals;
  }
}
