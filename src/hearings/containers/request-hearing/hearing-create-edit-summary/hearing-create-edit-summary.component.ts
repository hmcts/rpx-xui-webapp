import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ACTION, Mode } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HEARING_CREATE_EDIT_SUMMARY_TEMPLATE } from '../../../templates/hearing-create-edit-summary.template';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';
import { Section } from '../../../../hearings/models/section';
import { ScreenNavigationModel } from 'api/hearings/models/screenNavigation.model';

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

  public getScreenFlowFromStore(hearingStore) {
    let workFlow = [];
    hearingStore.subscribe((str) => {
      if (!str || !str.hearings) {
        return;
      }
      const hearing = str.hearings;
      workFlow = hearing.hearingValues?.serviceHearingValuesModel?.screenFlow;
    });
    return workFlow;
  }

  public removeUnnecessarySummaryTemplateItems() {
    let filteredTemplate: Section[] = [];
    const sFlow: ScreenNavigationModel[] = this.getScreenFlowFromStore(this.hearingStore);
    if (sFlow.length) {
      const isFlowWithoutLinkedHearing = sFlow.some((fL: ScreenNavigationModel) => fL.screenName.includes('hearing-link'));

      if (!isFlowWithoutLinkedHearing) {
        const template = this.template.filter((csl) => !csl.sectionHTMLTitle.includes('Linked hearings'));
        filteredTemplate = template;
      } else {
        filteredTemplate = this.template;
      }
    }
    return filteredTemplate;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
