import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LovRefDataModel } from '../models/lovRefData.model';
import { AnswerConverter } from './answer.converter';
import { PanelMemberRolesAnswerConverter } from './panel-member-roles.answer.converter';
import { MemberType, RequirementType } from '../models/hearings.enum';

describe('PanelMemberRolesAnswerConverter', () => {
  let converter: AnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;
  let mockState;
  const OTHER_PANEL_ROLES: LovRefDataModel[] = [
    {
      category_key: 'PanelMemberType',
      key: '65',
      value_en: 'President of Tribunal',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
    },
    {
      category_key: 'PanelMemberType',
      key: '84',
      value_en: 'Tribunal Judge',
      value_cy: '',
      hint_text_en: '',
      hint_text_cy: '',
      lov_order: null,
      parent_category: '',
      parent_key: '',
      active_flag: 'Y',
      child_nodes: null
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
                otherPanelRoles: OTHER_PANEL_ROLES
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new PanelMemberRolesAnswerConverter(router);
  });

  it('should transform one hearing panel member', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [],
              roleType: ['84', '65']
            }
          }
        }
      }
    };

    const result$ = converter.transformAnswer(of(mockState));
    result$.subscribe((result) => {
      expect(result).toBe('President of Tribunal');
    });
  });

  it('should transform two hearing panel member2', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [{
                memberID: '123',
                memberType: MemberType.JUDGE,
                requirementType: RequirementType.MUSTINC
              }],
              roleType: ['84', '65']
            }
          }
        }
      }
    };

    const result$ = converter.transformAnswer(of(mockState));
    result$.subscribe((result) => {
      expect(result).toBe('President of Tribunal, Tribunal Judge');
    });
  });

  it('should transform none hearing panel member', () => {
    mockState = {
      hearingRequest: {
        hearingRequestMainModel: {
          hearingDetails: {
            panelRequirements: {
              panelPreferences: [],
              roleType: ['84']
            }
          }
        }
      }
    };

    const result$ = converter.transformAnswer(of(mockState));
    result$.subscribe((result) => {
      expect(result).toBe('');
    });
  });
});
