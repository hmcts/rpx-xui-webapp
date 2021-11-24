import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {cold, hot} from 'jasmine-marbles';
import {of} from 'rxjs';
import {Go} from '../../../app/store/actions';
import {RequirementType} from '../../models/hearings.enum';
import {ServiceHearingValuesModel} from '../../models/serviceHearingValues.model';
import {HearingsService} from '../../services/hearings.service';
import * as hearingValuesActions from '../actions/hearing-values.action';
import {HearingListEffects} from './hearing-list.effects';
import {HearingValuesEffects} from './hearing-values.effects';

describe('Hearing Values Effects', () => {
  let actions$;
  let effects: HearingValuesEffects;
  const hearingsServiceMock = jasmine.createSpyObj('HearingsService', [
    'loadHearingValues',
  ]);
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HearingsService,
          useValue: hearingsServiceMock,
        },
        HearingValuesEffects,
        provideMockActions(() => actions$)
      ]
    });
    effects = TestBed.get(HearingValuesEffects);
  });

  describe('loadHearingValue$', () => {
    const SERVICE_HEARING_VALUES: ServiceHearingValuesModel = {
      autoListFlag: false,
      hearingType: 'Final',
      caseType: 'Personal Independence Payment',
      caseSubTypes: ['Conditions of Entitlement', 'Good cause', 'Rate of Assessment / Payability Issues - complex'],
      hearingWindow: {
        range: {
          start: '2021-11-23T09:00:00.000+0000',
          end: '2021-11-30T09:00:00.000+0000',
        },
        firstDateTimeMustBe: '',
      },
      duration: 45,
      hearingPriorityType: 'Standard',
      numberOfPhysicalAttendees: 2,
      hearingInWelshFlag: false,
      hearingLocations: [],
      facilitiesRequired: [],
      listingComments: '',
      hearingRequester: '',
      privateHearingRequiredFlag: false,
      leadJudgeContractType: '',
      judiciary: {
        roleType: [''],
        authorisationTypes: [''],
        authorisationSubType: [''],
        panelComposition: [{
          memberType: '',
          count: 1,
        }],
        judiciaryPreferences: [
          {
            memberID: '',
            memberType: '',
            requirementType: RequirementType.EXCLUDE,
          },
        ],
        judiciarySpecialisms: [''],
      },
      hearingIsLinkedFlag: false,
      parties: [
        {
          partyName: 'Jane and Smith',
          partyChannel: '',
          unavailability: [
            {
              start: '2021-12-10T09:00:00.000+0000',
              end: '2021-12-31T09:00:00.000+0000',
            },
          ],
        },
        {
          partyName: 'DWP',
          partyChannel: '',
          unavailability: [
            {
              start: '2021-12-20T09:00:00.000+0000',
              end: '2021-12-31T09:00:00.000+0000',
            },
          ],
        }],
      caseFlags: {
        flags: [
          {
            partyName: 'Jane and Smith',
            flagId: 'Language Interpreter',
            flagDescription: 'Spanish interpreter required',
            flagStatus: 'ACTIVE',
          },
          {
            partyName: 'DWP',
            flagId: 'case flag 1',
            flagDescription: 'case flag 1 description',
            flagStatus: 'ACTIVE',
          },
        ],
        flagAmendURL: '/',
      },
      screenFlow: [
      ],
      vocabulary: [
        {
          word1: '',
        },
      ],
    };
    it('should return a response with service hearing values', () => {
      hearingsServiceMock.loadHearingValues.and.returnValue(of(SERVICE_HEARING_VALUES));
      const action = new hearingValuesActions.LoadHearingValues('1111222233334444');
      const completion = new hearingValuesActions.LoadHearingValuesSuccess(SERVICE_HEARING_VALUES);
      actions$ = hot('-a', {a: action});
      const expected = cold('-b', {b: completion});
      expect(effects.loadHearingValue$).toBeObservable(expected);
    });
  });

  describe('handleError', () => {
    it('should handle 500', () => {
      const action$ = HearingListEffects.handleError({
        status: 500,
        message: 'error'
      });
      action$.subscribe(action => expect(action).toEqual(new Go({path: ['/service-down']})));
    });
  });
});
