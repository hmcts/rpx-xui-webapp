import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HEARING_CREATE_EDIT_SUMMARY_TEMPLATE } from '../../../templates/hearing-create-edit-summary.template';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';
import { Section } from '../../../../hearings/models/section';
import { ScreenNavigationModel } from 'api/hearings/models/screenNavigation.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'exui-hearing-create-edit-summary',
  templateUrl: './hearing-create-edit-summary.component.html'
})
export class HearingCreateEditSummaryComponent extends RequestHearingPageFlow implements OnDestroy, OnInit {
  public template = HEARING_CREATE_EDIT_SUMMARY_TEMPLATE;
  public mode = Mode.CREATE_EDIT;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService) {
    super(hearingStore, hearingsService);
  }

  ngOnInit(): void {
    this.template = this.removeUnnecessarySummaryTemplateItems();
  }

  public executeAction(action: ACTION): void {
    super.navigateAction(action);
  }

  public getScreenFlowFromStore(hearingStore): Observable<ScreenNavigationModel[]> {
    return hearingStore;
  }

  public removeUnnecessarySummaryTemplateItems() {
    let filteredTemplate;
    this.getScreenFlowFromStore(this.hearingStore).subscribe((storeData: any) => {
    
      if (storeData && storeData.hearings) {
        let screenFlow: any[] = storeData?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow;

        filteredTemplate = screenFlow.map((screenFl: any) => {
          if (screenFl && screenFl.screenName !== undefined) {
            const templateItems = this.template.find((tRef: any) => tRef.screenName.includes(screenFl.screenName));
            return templateItems;
          }
        });
      }
    });
    return filteredTemplate;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
