import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HearingRequestMainModel } from '../../models/hearingRequestMain.model';
import { HearingSummaryEnum } from '../../models/hearings.enum';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-edit-hearing',
  templateUrl: './edit-hearing.component.html'
})
export class EditHearingComponent implements OnInit, OnDestroy {
  public hearingState$: Observable<fromHearingStore.State>;
  public hearingStateSub: Subscription;
  public hearingRequestMainModel: HearingRequestMainModel;
  public showSpinner$: Observable<boolean>;
  public validationErrors: { id: string, message: string }[] = [];

  constructor(private readonly hearingStore: Store<fromHearingStore.State>,
    private readonly loadingService: LoadingService) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    // this.showSpinner$ = this.loadingService.isLoading as any;
    // const loadingToken = this.loadingService.register();
    this.hearingStateSub = this.hearingState$.subscribe((state) => {
      this.hearingRequestMainModel = state.hearingRequest.hearingRequestMainModel;
      if (state.hearingRequest.lastError) {
        this.validationErrors = [];
        this.validationErrors.push({
          id: '', message: HearingSummaryEnum.BackendError
        });
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      }
    //   this.loadingService.unregister(loadingToken);
    }, () => {
    //   this.loadingService.unregister(loadingToken);
    });
  }

  public ngOnDestroy(): void {
    this.hearingStateSub?.unsubscribe();
  }
}
