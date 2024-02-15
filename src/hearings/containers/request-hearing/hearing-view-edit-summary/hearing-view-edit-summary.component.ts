import { Component, OnDestroy, OnInit } from '@angular/core';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { HearingRequestStateData } from '../../../models/hearingRequestStateData.model';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HEARING_VIEW_EDIT_SUMMARY_TEMPLATE } from '../../../templates/hearing-view-edit-summary.template';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';
import { Section } from '../../../../hearings/models/section';
import { ScreenNavigationModel } from '../../../../hearings/models/screenNavigation.model';

@Component({
  selector: 'exui-hearing-view-edit-summary',
  templateUrl: './hearing-view-edit-summary.component.html'
})
export class HearingViewEditSummaryComponent extends RequestHearingPageFlow implements OnDestroy, OnInit {
  public template = HEARING_VIEW_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.VIEW_EDIT;
  public validationErrors: { id: string, message: string }[] = [];
  private initialAndCurrentStates$: Observable<[HearingRequestStateData, HearingRequestStateData]>;
  private initialAndCurrentStatesSubscription: Subscription;
  private readonly notUpdatedMessage = 'The request has not been updated';
  public screenFlow: ScreenNavigationModel[] = [];

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              protected readonly featureToggleService: FeatureToggleService) {
    super(hearingStore, hearingsService, featureToggleService);
  }

  private getInitialAndCurrentState(): Observable<[HearingRequestStateData, HearingRequestStateData]> {
    const initialHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequestToCompare);
    const currentHearingState$ = this.hearingStore.select(fromHearingStore.getHearingRequest);
    return combineLatest([initialHearingState$, currentHearingState$]);
  }

  ngOnInit(): void {
    this.removeUnnecessarySummaryTemplateItems();
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.VIEW_EDIT_REASON) {
      this.initialAndCurrentStates$ = this.getInitialAndCurrentState();
      this.initialAndCurrentStatesSubscription = this.initialAndCurrentStates$.pipe(take(1)).subscribe((state) => {
        const stateChanged = !_.isEqual(state[0], state[1]);
        if (stateChanged) {
          super.navigateAction(action);
        } else {
          this.validationErrors = [{ id: 'no-update', message: this.notUpdatedMessage }];
        }
      });
    } else {
      super.navigateAction(action);
    }
  }

  public getScreenFlowFromStore(): Observable<any> {
    return this.hearingStore;
  }

  public removeUnnecessarySummaryTemplateItems(): Section[] {
    this.getScreenFlowFromStore().subscribe((storeData: any) => {
      if (storeData && storeData.hearings) {
        this.screenFlow = storeData?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow;
        this.template = this.template.filter((tp: Section) => {
          return this.screenFlow.some((sr: ScreenNavigationModel) => {
            return tp.screenName.includes(sr.screenName) || tp.screenName.includes('edit-hearing') || tp.screenName.includes('hearing-listing-info');
          });
        });
      }
    });
    return this.template;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
    this.initialAndCurrentStatesSubscription?.unsubscribe();
  }
}
