import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Person } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { RefDataModel } from '../../../models/refData.model';
import { HearingJudgeNamesListComponent } from '../../../../hearings/components';
import { ACTION, HearingPanelSelectionEnum, ControlTypeEnum } from '../../../models/hearings.enum';
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
  public multiLevelSelections: RefDataModel[] = [];
  public panelSelectionError: string;
  public hasValidationRequested: boolean = false;
  public configLevels: { level: number, controlType: ControlTypeEnum }[];
  @ViewChild('includedJudge') public includedJudge: HearingJudgeNamesListComponent;
  @ViewChild('excludedJudge') public excludedJudge: HearingJudgeNamesListComponent;

  constructor(
    protected readonly hearingStore: Store<fromHearingStore.State>,
    protected readonly hearingsService: HearingsService,
    protected readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder) {
    super(hearingStore, hearingsService);
    this.multiLevelSelections = this.route.snapshot.data.otherPanelRoles;
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

  public childNodesValidation(): boolean {
    let childNodeValid: boolean = true;
    const panelRoles = this.convertArrayToRefDataModel(this.panelJudgeForm.controls.multiLevelSelect as FormArray);
    panelRoles.filter(panelRole => panelRole.selected && panelRole.child_nodes && panelRole.child_nodes.length)
      .forEach(selectedPanelRole => {
        if (selectedPanelRole.child_nodes.filter(node => node.selected).length === 0) {
          childNodeValid = false;
        }
      });
    return childNodeValid;
  }

  public initForm(): void {
    this.panelJudgeForm = this.formBuilder.group({
      specificPanel: ['', Validators.required],
      multiLevelSelect: this.formBuilder.array([])
    });

    this.loadHearingPanels();
    this.panelJudgeForm.controls.multiLevelSelect = this.convertRefDataModelToArray(this.multiLevelSelections);
  }

  public loadPanel(multi: RefDataModel, panelSpecialism: string): boolean {
    let skip = false;
    if (multi.child_nodes && multi.child_nodes.length) {
      multi.child_nodes.forEach(node => {
        if (node.key.toLowerCase().trim() === panelSpecialism.toLocaleLowerCase().trim() && !skip && !multi.selected) {
          node.selected = multi.selected = true;
          if (node.child_nodes && node.child_nodes.length) {
            skip = this.loadPanel(node, panelSpecialism);
          } else {
            skip = true;
          }
        }
      });
    } else {
      if (multi.key === panelSpecialism) {
        multi.selected = true;
        skip = true;
      }
    }
    return skip;
  }

  public loadHearingPanels(): void {
    this.panelSelection = '';
    if (
      this.hearingRequestMainModel.hearingDetails &&
      this.hearingRequestMainModel.hearingDetails.panelRequirements &&
      this.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms) {
      // tslint:disable-next-line: prefer-for-of
      let skip: boolean = false;
      this.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms.forEach(panelSpecialism => {
        skip = false;
        this.multiLevelSelections.forEach(multiLevelSelectionFiltered => {
          if (!skip) {
            skip = this.loadPanel(multiLevelSelectionFiltered, panelSpecialism);
          }
        });
      });

      this.hearingRequestMainModel.hearingDetails.panelRequirements.panelSpecialisms.length ?
        this.showSpecificPanel('Yes') : this.showSpecificPanel('No');
    }
  }

  public preparePanelChildren(panelRoles: RefDataModel[], accummulation: string[]) {
    if (panelRoles) {
      panelRoles.forEach(panelRole => {
        if (panelRole.selected && (!panelRole.child_nodes || !panelRole.child_nodes.length)) {
          accummulation.push(panelRole.key);
        } else {
          this.preparePanelChildren(panelRole.child_nodes, accummulation);
        }
      });
    }
  }

  public prepareData(): void {
    const panelRoles: RefDataModel[] = this.convertArrayToRefDataModel(this.panelJudgeForm.controls.multiLevelSelect as FormArray);
    const panelRolesSelected: string[] = [];
    this.preparePanelChildren(panelRoles, panelRolesSelected);
    this.hearingRequestMainModel = {
      ...this.hearingRequestMainModel,
      hearingDetails: {
        ...this.hearingRequestMainModel.hearingDetails,
        panelRequirements: {
          panelSpecialisms: [...panelRolesSelected]
        }
      }
    };
  }

  public convertArrayToRefDataModel(array: FormArray): RefDataModel[] {
    const panelRoles: RefDataModel[] = [];
    array.controls.forEach(control => {
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
      panelRoles.push(refDataModel);
    });
    return panelRoles;
  }

  public convertRefDataModelToArray(dataSource: RefDataModel[]): FormArray {
    const dataSourceArray = this.formBuilder.array([]);
    dataSource.forEach(otherPanelRoles => {
      dataSourceArray.push(this.patchValues({
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

  public showSpecificPanel(judgeSelection: string): void {
    this.panelSelection = judgeSelection;
    this.panelJudgeForm.controls.specificPanel.setValue(this.panelSelection);
  }

  public executeAction(action: ACTION): void {
    if (action === ACTION.CONTINUE) {
      this.checkFormData();
      if (this.isFormValid()) {
        this.prepareData();
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
    this.hasValidationRequested = true;
    if (!this.childNodesValidation()) {
      this.validationErrors.push({ id: 'panel-role-selector', message: HearingPanelSelectionEnum.PanelRowChildError });
      return false;
    }
    return this.panelJudgeForm.valid;
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    super.unsubscribe();
  }
}
