import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ControlTypeEnum } from 'src/hearings/models/hearings.enum';
import { RefDataModel } from 'src/hearings/models/refData.model';
import { MultiLevelSelectorComponent } from '..';

class DataModelConvertor {
  constructor(private fb: FormBuilder) { }
  public patchValues = (refDataModel: RefDataModel) => {
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

  public convertRefDataModelToArray = (dataSource: RefDataModel[]) => {
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
        selected: !listOfValue.selected ? false : true,
      } as RefDataModel) as FormGroup);
    });
    return dataSourceArray;
  }
}

describe('MultiLevelSelectorComponent', () => {
  let component: MultiLevelSelectorComponent;
  let fixture: ComponentFixture<MultiLevelSelectorComponent>;

  const LIST_OFF_VALUES_REF: RefDataModel[] = [
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
    const modelConvertor = new DataModelConvertor(component.fb);
    component.level = 1;
    component.multiSelect = modelConvertor.convertRefDataModelToArray(LIST_OFF_VALUES_REF);
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
});
