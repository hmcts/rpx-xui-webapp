import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { HearingJudgeNamesListComponent } from '../../../../hearings/components';
import { ACTION, HearingPanelSelectionEnum } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-panel',
  templateUrl: './hearing-panel.component.html',
})
export class HearingPanelComponent extends RequestHearingPageFlow implements OnInit, OnDestroy {
  public panelJudgeForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public includedJudgeList: Person[] = [];
  public excludedJudgeList: Person[] = [];
  public panelSelection: string;
  public panelSelectionError: string;
  @ViewChild('includedJudge') public includedJudge: HearingJudgeNamesListComponent;
  @ViewChild('excludedJudge') public excludedJudge: HearingJudgeNamesListComponent;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly hearingsService: HearingsService,
              private readonly formBuilder: FormBuilder) {
    super(hearingStore, hearingsService);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.panelJudgeForm = this.formBuilder.group({
      specificPanel: ['', Validators.required],
    });
  }

  public showSpecificPanel(judgeSelection: string) {
    this.panelSelection = judgeSelection;
    this.panelJudgeForm.controls.specificPanel.setValue(this.panelSelection);
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      this.checkFormData();
      if (this.isFormValid()) {
        super.navigateAction(action);
      }
    } else if (action === ACTION.BACK) {
      super.navigateAction(action);
    }
  }

  public checkFormData(): void {
    this.validationErrors = [];
    this.panelSelectionError = null;
    if (!this.panelJudgeForm.controls.specificPanel.valid) {
      this.panelSelectionError = HearingPanelSelectionEnum.SelectionError;
      this.validationErrors.push({ id: 'specific-panel-selection', message: HearingPanelSelectionEnum.SelectionError });
    }
  }
  public isFormValid(): boolean {
    return this.panelJudgeForm.valid;
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
