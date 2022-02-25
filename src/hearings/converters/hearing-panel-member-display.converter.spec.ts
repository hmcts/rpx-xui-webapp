import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { ALL_JUDICIAL_USERS, hearingPriorityRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { AnswerConverter } from './answer.converter';
import { HearingPanelMemberDisplayConverter } from './hearing-panel-member-display.converter';
import { HttpClient } from '@angular/common/http';
import { MemberType, RequirementType } from '../models/hearings.enum';

describe('Hearing Panel include/exclude Member Converter', () => {
  let converter: AnswerConverter;
  let router: any;

  const httpClientMock = jasmine.createSpyObj<HttpClient>('HttpClient', [
    'get',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingPriorities: hearingPriorityRefData,
              },
            },
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: { panelDetails: ALL_JUDICIAL_USERS },
            },
          },
        },
      ],
    });
    router = TestBed.get(ActivatedRoute)
  });

  it('should transform include panel members as expected', () => {
    converter = new HearingPanelMemberDisplayConverter(router, RequirementType.MUSTINC);
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
        panelPreferences: [
          {
            memberID: 'p1000000',
            memberType: MemberType.PANEL_MEMBER,
            requirementType: RequirementType.MUSTINC,
        },
        {
            memberID: 'p1000003',
            memberType: MemberType.PANEL_MEMBER,
            requirementType: RequirementType.EXCLUDE,
        },
        ],
        panelSpecialisms: ['DisabilityQualifiedPanelMember', 'Cardiologist'],
    }
    const result$ = converter.transformAnswer(of(STATE));
    const transformedValue = '<ul><li>Jacky Collins</li></ul>';
    const expected = cold('(b|)', { b: transformedValue });
    expect(result$).toBeObservable(expected);
  });
  it('should transform exclude panel members as expected', () => {
    converter = new HearingPanelMemberDisplayConverter(router, RequirementType.EXCLUDE);
    const STATE: State = initialState.hearings;
    STATE.hearingRequest.hearingRequestMainModel.hearingDetails.panelRequirements = {
        panelPreferences: [
          {
            memberID: 'p1000000',
            memberType: MemberType.PANEL_MEMBER,
            requirementType: RequirementType.MUSTINC,
        },
        {
            memberID: 'p1000003',
            memberType: MemberType.PANEL_MEMBER,
            requirementType: RequirementType.EXCLUDE,
        },
        ],
        panelSpecialisms: ['DisabilityQualifiedPanelMember', 'Cardiologist'],
    }
    const result$ = converter.transformAnswer(of(STATE));
    const transformedValue = '<ul><li>James Priest</li></ul>';
    const expected = cold('(b|)', { b: transformedValue });
    expect(result$).toBeObservable(expected);
  });
});
