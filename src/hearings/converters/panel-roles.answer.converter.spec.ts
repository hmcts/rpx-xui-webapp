import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { PanelRolesAnswerConverter } from './panel-roles.answer.converter';

describe('PanelRolesAnswerConverter', () => {

  let converter: AnswerConverter;
  let store: Store<any>;
  let router: any;
  const OTHER_PANEL_ROLES: LovRefDataModel[] = [
    {
      key: 'DisabilityQualifiedPanelMember',
      value_en: 'Disability qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
    }, {
      key: 'MedicallyQualifiedPanelMember1',
      value_en: 'Medically qualified panel member',
      value_cy: '',
      hintText_EN: 'true',
      hintTextCY: 'false',
      order: 1,
      parentKey: '3',
      child_nodes: [{
        key: 'Cardiologist',
        value_en: 'Cardiologist',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'Carer',
        value_en: 'Carer',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'EyeSurgeon',
        value_en: 'Medically qualified panel member',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      },
      {
        key: 'GeneralPractitioner',
        value_en: 'General Practitioner',
        value_cy: '',
        hintText_EN: 'true',
        hintTextCY: 'false',
        order: 1,
        parentKey: '3',
        child_nodes: []
      }]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                otherPanelRoles: OTHER_PANEL_ROLES,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new PanelRolesAnswerConverter(router);
  });

  it('should transform hearing panel exclusion', () => {
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
      panelSpecialisms: ['DisabilityQualifiedPanelMember', 'Carer']
    };
    const result$ = converter.transformAnswer(of(STATE));
    const option = 'Disability qualified panel member<br>Medically qualified panel member - Carer';
    const expected = cold('(b|)', { b: option });
    expect(result$).toBeObservable(expected);
  });
});
