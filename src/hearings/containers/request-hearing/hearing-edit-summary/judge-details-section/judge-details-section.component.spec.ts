import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../../../../hearings/hearing.test.data';
import { MemberType, RequirementType } from '../../../../models/hearings.enum';
import { JudicialUserModel } from '../../../../models/judicialUser.model';
import { LovRefDataModel } from '../../../../models/lovRefData.model';
import { PanelRequirementsModel } from '../../../../models/panelRequirements.model';
import { JudgeDetailsSectionComponent } from './judge-details-section.component';

describe('JudgeDetailsSectionComponent', () => {
  let component: JudgeDetailsSectionComponent;
  let fixture: ComponentFixture<JudgeDetailsSectionComponent>;

  const panelRequirements: PanelRequirementsModel = {
    panelPreferences: [
      {
        memberID: '7007496',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.MUSTINC
      },
      {
        memberID: '6006842',
        memberType: MemberType.JUDGE,
        requirementType: RequirementType.EXCLUDE
      }
    ],
    roleType: ['Tribunal', 'dtj', 'rtj']
  };

  const judicialUsers: JudicialUserModel[] = [
    {
      title: 'Mr',
      knownAs: 'Jacky Collins',
      surname: 'Jacky Collins',
      fullName: 'Jacky Collins',
      emailId: 'jacky.collins@judicial.com',
      idamId: '1102839232',
      initials: 'JC',
      postNominals: 'JP',
      personalCode: '7007496',
      isJudge: '',
      isMagistrate: '',
      isPanelMember: ''
    },
    {
      title: 'Mr',
      knownAs: 'Ramon',
      surname: 'Herrera',
      fullName: 'Ramon Herrera',
      emailId: '7007496EMP-@ejudiciary.net',
      idamId: 'a229ec37-d84d-4eed-bd7f-0c77a6721da6',
      initials: 'RH',
      postNominals: 'JP',
      personalCode: '6006842',
      isJudge: '',
      isMagistrate: '',
      isPanelMember: ''
    }
  ];

  const judgeTypes: LovRefDataModel[] = [
    {
      key: 'Tribunal',
      value_en: 'Tribunal Judge',
      value_cy: '',
      hint_text_en: 'Tribunal',
      hint_text_cy: '',
      lov_order: 1,
      parent_key: null,
      category_key: 'JudgeType',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
      from: 'exui-default'
    },
    {
      key: 'dtj',
      value_en: 'Deputy Tribunal Judge',
      value_cy: '',
      hint_text_en: 'Deputy',
      hint_text_cy: '',
      lov_order: 2,
      parent_key: null,
      category_key: 'JudgeType',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
      from: 'exui-default'
    },
    {
      key: 'rtj',
      value_en: 'Regional Tribunal Judge',
      value_cy: '',
      hint_text_en: 'Regional',
      hint_text_cy: '',
      lov_order: 3,
      parent_key: null,
      category_key: 'JudgeType',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
      from: 'exui-default'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        JudgeDetailsSectionComponent
      ],
      providers: provideMockStore({ initialState })
    }).compileComponents();

    fixture = TestBed.createComponent(JudgeDetailsSectionComponent);
    component = fixture.componentInstance;
    component.judgeTypesRefData = judgeTypes;
    component.judicialUsers = judicialUsers;
    component.panelRequirements = panelRequirements;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOninit', () => {
    component.ngOnInit();
    expect(component.showAmmendedForNeedJudge).toEqual(false);
    expect(component.showAmmendedForJudgeName).toEqual(false);
    expect(component.showAmmendedForExcludedJudgeNames).toEqual(false);
    expect(component.showAmmendedForJudgeType).toEqual(undefined);
  });

  it('should set judge details', () => {
    expect(component.needJudge).toEqual('No');
    expect(component.judgeName).toEqual('Jacky Collins');
    expect(component.judgeTypes).toEqual('Tribunal Judge, Deputy Tribunal Judge, Regional Tribunal Judge');
    expect(component.excludedJudgeNames).toEqual('Ramon Herrera');
  });

  it('should verify onChange', () => {
    spyOn(component.changeEditHearing, 'emit');
    component.onChange('needJudge');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'needJudge', changeLink: '/hearings/request/hearing-judge#specificJudgeName'
    });
    component.onChange('judgeName');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'judgeName', changeLink: '/hearings/request/hearing-judge#inputSelectPerson'
    });
    component.onChange('judgeTypes');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'judgeTypes', changeLink: '/hearings/request/hearing-judge#judgeTypes'
    });
    component.onChange('judgeExclusion');
    expect(component.changeEditHearing.emit).toHaveBeenCalledWith({
      fragmentId: 'judgeExclusion', changeLink: '/hearings/request/hearing-judge#inputSelectPersonExclude'
    });
  });

  afterEach(() => {
    fixture.destroy();
  });
});
