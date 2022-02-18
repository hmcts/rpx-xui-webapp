import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MultiLevelSelectorComponent} from '..';
import {ControlTypeEnum} from '../../models/hearings.enum';
import {LovRefDataModel} from '../../models/lovRefData.model';

class DataModelConvertor {
  constructor(private fb: FormBuilder) { }
  public patchValues = (refDataModel: LovRefDataModel) => {
    return this.fb.group({
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

  public convertRefDataModelToArray = (dataSource: LovRefDataModel[]) => {
    const dataSourceArray = this.fb.array([]);
    dataSource.forEach(listOfValue => {
      (dataSourceArray as FormArray).push(this.patchValues({
        key: listOfValue.key,
        value_en: listOfValue.value_en,
        value_cy: listOfValue.value_cy,
        hintText_EN: listOfValue.hintText_EN,
        hintTextCY: listOfValue.hintTextCY,
        order: listOfValue.order,
        parentKey: listOfValue.parentKey,
        child_nodes: listOfValue.child_nodes,
        selected: listOfValue.selected,
      } as LovRefDataModel) as FormGroup);
    });
    return dataSourceArray;
  }
}

describe('MultiLevelSelectorComponent', () => {
  let component: MultiLevelSelectorComponent;
  let fixture: ComponentFixture<MultiLevelSelectorComponent>;

  const LIST_OFF_VALUES_REF: LovRefDataModel[] = [
    {
      key: 'DisabilityQualifiedPanelMember',
      value_en: 'Disability qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      selected: false,
    }, {
      key: 'MedicallyQualifiedPanelMember1',
      value_en: 'Medically qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      selected: true,
      child_nodes: [{
        key: 'Cardiologist',
        value_en: 'Cardiologist',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: true,
      },
      {
        key: 'Carer',
        value_en: 'Carer',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      },
      {
        key: 'EyeSurgeon',
        value_en: 'Medically qualified panel member',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      },
      {
        key: 'GeneralPractitioner',
        value_en: 'General Practitioner',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      }]
    }, {
      key: 'MedicallyQualifiedPanelMember',
      value_en: 'Medically qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      selected: false,
      child_nodes: [{
        key: 'Cardiologist',
        value_en: 'Cardiologist',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      },
      {
        key: 'Carer',
        value_en: 'Carer',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      },
      {
        key: 'EyeSurgeon',
        value_en: 'Medically qualified panel member',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      },
      {
        key: 'GeneralPractitioner',
        value_en: 'General Practitioner',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: [],
        selected: false,
      }]
    }, {
      key: 'FinanciallyQualifiedPanelMember',
      value_en: 'Financially qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: [],
      selected: false,
    },
    {
      key: 'RegionalMedicalMember',
      value_en: 'Regional Medical Member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: [],
      selected: false,
    }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [MultiLevelSelectorComponent],
      providers: [
        FormBuilder
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(MultiLevelSelectorComponent);
    component = fixture.componentInstance;
    spyOn(component, 'ngAfterViewInit').and.callFake(() => { });
    const modelConvertor = new DataModelConvertor(component.fb);
    component.level = 2;
    component.hasValidationRequested = true;
    component.multiLevelSelect = modelConvertor.convertRefDataModelToArray(LIST_OFF_VALUES_REF);
    component.configLevels = [
      {
        controlType: ControlTypeEnum.CHECK_BOX,
        level: 1,
      },
      {
        controlType: ControlTypeEnum.SELECT,
        level: 2,
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.controlType).toEqual(component.configLevels[component.level - 1].controlType);
  });

  it('should return true for validation', () => {
    component.formGroup.controls.item.setValue({
      key: 'Cardiologist',
      value_en: 'Cardiologist',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: [],
      selected: false,
    });
    fixture.detectChanges();
    expect(component.checkValidationWhenRequested).toEqual(true);
  });

  it('should deselect node', () => {
    component.deSelectChildNodes(component.multiLevelSelect.controls[1]);
    fixture.detectChanges();
    component.multiLevelSelect.controls[1].value.child_nodes.forEach(node => {
      expect(node.selected).toEqual(false);
    });
  });

  it('should assign selected option to item control', () => {
    component.level = 2;
    component.multiLevelSelect = (component.multiLevelSelect.controls[1] as FormGroup).controls['child_nodes'] as FormArray;
    component.assignSelectedOptionToItemControl();
    fixture.detectChanges();
    expect(component.formGroup.controls.item.value).toEqual('Cardiologist');
  });
});
