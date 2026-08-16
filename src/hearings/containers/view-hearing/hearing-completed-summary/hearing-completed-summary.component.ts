import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HearingActualsMainModel } from '../../../models/hearingActualsMainModel';
import { LovRefDataModel } from '../../../models/lovRefData.model';
import * as fromHearingStore from '../../../store';

@Component({
  standalone: false,
  selector: 'exui-hearing-completed-summary',
  templateUrl: './hearing-completed-summary.component.html',
  styleUrls: ['./hearing-completed-summary.component.scss'],
})
export class HearingCompletedSummaryComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingActualsMainModel: HearingActualsMainModel;
  public sub: Subscription;
  public showSpinner$: Observable<boolean>;
  public hearingStageOptions: LovRefDataModel[];
  public showEditButton = false;
  private caseRef: string;
  private hearingId: string;

  constructor(
    private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly loadingService: LoadingService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
    this.hearingStageOptions = this.route.snapshot.data.hearingStageOptions;
  }

  public ngOnInit(): void {
    const navState = this.router.getCurrentNavigation()?.extras?.state ?? history.state;
    this.hearingId = this.route.snapshot.params.id;
    this.caseRef = navState?.caseRef;
    this.showEditButton = !!navState?.showEditButton;

    this.showSpinner$ = this.loadingService.isLoading as Observable<boolean>;
    const loadingToken = this.loadingService.register();
    this.hearingState$ = this.hearingStore
      .select(fromHearingStore.getHearingsFeatureState)
      .pipe(filter((state) => !!state.hearingActuals.hearingActualsMainModel));

    this.sub = this.hearingState$.subscribe(
      (state) => {
        this.hearingActualsMainModel = state.hearingActuals.hearingActualsMainModel;
        this.loadingService.unregister(loadingToken);
      },
      () => {
        this.loadingService.unregister(loadingToken);
      }
    );
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public onEdit(): void {
    this.router.navigate(['/', 'hearings', 'actuals', this.hearingId, 'hearing-actual-add-edit-summary'], {
      state: { caseId: this.caseRef || this.hearingActualsMainModel?.caseDetails?.caseRef, hideConfirmButtons: true },
    });
  }
}
