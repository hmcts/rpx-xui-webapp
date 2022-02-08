import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { ControlTypeEnum } from '../../../models/hearings.enum';
import { RefDataModel } from '../../../models/refData.model';
import { HearingJudgeNamesListComponent } from '../../../../hearings/components';
import { ACTION, HearingPanelSelectionEnum } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { RequestHearingPageFlow } from '../request-hearing.page.flow';

@Component({
  selector: 'exui-hearing-panel',
  templateUrl: './hearing-panel.component.html',
})
export class HearingPanelComponent extends RequestHearingPageFlow implements OnInit, AfterViewInit, OnDestroy {
  public multiSelectArray: FormArray;
  public panelJudgeForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public includedJudgeList: Person[] = [];
  public excludedJudgeList: Person[] = [];
  public panelSelection: string;
  public multiLevelSelection: RefDataModel[];
  public panelSelectionError: string;
  public configLevels: { level: number, controlType: ControlTypeEnum }[];
  @ViewChild('includedJudge') public includedJudge: HearingJudgeNamesListComponent;
  @ViewChild('excludedJudge') public excludedJudge: HearingJudgeNamesListComponent;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder) {
    super(hearingStore, hearingsService);
    this.multiLevelSelection = this.route.snapshot.data.otherPanelRoles;
    this.configLevels = [
      {
        controlType: ControlTypeEnum.CHECK_BOX,
        level: 1,
      },
      {
        controlType: ControlTypeEnum.SELECT,
        level: 2,
      }
    ];
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.panelJudgeForm = this.formBuilder.group({
      specificPanel: ['', Validators.required],
      multiLevelSelect: this.formBuilder.array([])
    });

    this.panelJudgeForm.controls.multiLevelSelect = this.convertRefDataModelToArray(this.multiLevelSelection);
  }

  public convertArrayToRefDataModel(array: FormArray): RefDataModel[] {
    const listValues: RefDataModel[] = [];
    (array as FormArray).controls.forEach(control => {
      const refDataModel: RefDataModel = {
        key: control.value.key,
        value_en: control.value.value_en,
        value_cy: control.value.value_cy,
        hintText_EN: control.value.hintText_EN,
        hintTextCY: control.value.hintTextCY,
        order: control.value.order,
        parentKey: control.value.parentKey,
        child_nodes: control.value && control.value.child_nodes ? control.value.child_nodes : [],
        selected: control.value.selected,
      };
      listValues.push(refDataModel);
    });
    return listValues;
  }

  public convertRefDataModelToArray(dataSource: RefDataModel[]): FormArray {
    const dataSourceArray = this.formBuilder.array([]);
    dataSource.forEach(otherPanelRoles => {
      (dataSourceArray as FormArray).push(this.patchValues({
        key: otherPanelRoles.key,
        value_en: otherPanelRoles.value_en,
        value_cy: otherPanelRoles.value_cy,
        hintText_EN: otherPanelRoles.hintText_EN,
        hintTextCY: otherPanelRoles.hintTextCY,
        order: otherPanelRoles.order,
        parentKey: otherPanelRoles.parentKey,
        child_nodes: otherPanelRoles.child_nodes,
        selected: !otherPanelRoles.selected ? false : true,
      } as RefDataModel) as FormGroup);
    });
    return dataSourceArray;
  }

  public patchValues(refDataModel: RefDataModel): FormGroup {
    return this.formBuilder.group({
      key: [refDataModel.key],
      value_en: [refDataModel.value_en],
      value_cy: [refDataModel.value_cy],
      hintText_EN: [refDataModel.hintText_EN],
      hintTextCY: [refDataModel.hintText_EN],
      order: [refDataModel.order],
      parentKey: [refDataModel.parentKey],
      selected: [refDataModel.selected, Validators.required],
      child_nodes: refDataModel.child_nodes && refDataModel.child_nodes.length > 0 ? this.convertRefDataModelToArray(refDataModel.child_nodes) : []
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
    this.convertArrayToRefDataModel(this.panelJudgeForm.controls.multiLevelSelect as FormArray);
    this.panelSelectionError = null;
    if (!this.panelJudgeForm.controls.specificPanel.valid) {
      this.panelSelectionError = HearingPanelSelectionEnum.SelectionError;
      this.validationErrors.push({ id: 'specific-panel-selection', message: HearingPanelSelectionEnum.SelectionError });
    }
  }

  public isFormValid(): boolean {
    return this.panelJudgeForm.valid;
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
