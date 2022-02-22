import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlTypeEnum } from '../../../models/hearings.enum';
import { LovRefDataModel } from '../../../models/lovRefData.model';

@Component({
  selector: 'exui-hearing-stage-result',
  templateUrl: './hearing-stage-result.component.html'
})
export class HearingStageResultComponent implements OnInit {
  public hearingStageResultForm: FormGroup;
  public validationErrors: { id: string, message: string }[] = [];
  public hearingResultSelectedOption: string;
  public multiLevelSelections: LovRefDataModel[] = [];
  public hasValidationRequested: boolean = false;
  public configLevels: { level: number, controlType: ControlTypeEnum }[];
  
  constructor(private readonly formBuilder: FormBuilder) {
    this.multiLevelSelections = [
      {
        key: 'Decision',
        value_en: 'Decision',
        value_cy: null,
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 0,
        parentKey: null,
        selected: false,
        child_nodes: [
          {
            key: 'Decision type 1',
            value_en: 'Decision type 1',
            value_cy: null,
            hintText_EN: null,
            hintTextCY: null,
            order: 0,
            parentKey: 'Decision',
            selected: false,
            child_nodes: null
          }
        ]
      },
      {
        key: 'Adjourned',
        value_en: 'Adjourned',
        value_cy: null,
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 0,
        parentKey: null,
        selected: false,
        child_nodes: [
          {
            key: 'Medial evidence essential',
            value_en: 'Medial evidence essential',
            value_cy: null,
            hintText_EN: null,
            hintTextCY: null,
            order: 0,
            parentKey: 'Adjourned',
            selected: false,
            child_nodes: null
          },
          {
            key: 'Evidence or further response from respondent required',
            value_en: 'Evidence or further response from respondent required',
            value_cy: null,
            hintText_EN: null,
            hintTextCY: null,
            order: 0,
            parentKey: 'Adjourned',
            selected: false,
            child_nodes: null
          },
          {
            key: 'Evidence or submission from appellant required',
            value_en: 'Evidence or submission from appellant required',
            value_cy: null,
            hintText_EN: null,
            hintTextCY: null,
            order: 0,
            parentKey: 'Adjourned',
            selected: false,
            child_nodes: null
          }
        ]
      },
      {
        key: 'Postponed',
        value_en: 'Postponed',
        value_cy: null,
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 0,
        parentKey: null,
        selected: false,
        child_nodes: [
          {
            key: 'Postponed reason 1',
            value_en: 'Postponed reason 1',
            value_cy: null,
            hintText_EN: null,
            hintTextCY: null,
            order: 0,
            parentKey: 'Postponed',
            selected: false,
            child_nodes: null
          }
        ]
      }
    ];
    this.configLevels = [
      {
        controlType: ControlTypeEnum.RADIO_BUTTON,
        level: 1
      },
      {
        controlType: ControlTypeEnum.SELECT,
        level: 2,
      }
    ];
  }

  public ngOnInit(): void {
    this.hearingStageResultForm = this.formBuilder.group({
      hearingResult: ['', Validators.required],
      multiLevelSelect: this.formBuilder.array([])
    });

    this.hearingStageResultForm.controls.multiLevelSelect = this.convertRefDataModelToArray(this.multiLevelSelections);
  }

  public convertRefDataModelToArray(dataSource: LovRefDataModel[]): FormArray {
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
      } as LovRefDataModel) as FormGroup);
    });
    return dataSourceArray;
  }

  public patchValues(refDataModel: LovRefDataModel): FormGroup {
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
}
