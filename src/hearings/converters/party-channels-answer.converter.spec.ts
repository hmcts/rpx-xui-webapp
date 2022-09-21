import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import * as _ from 'lodash';
import {of} from 'rxjs';
import {initialState, partyChannelsRefData} from '../hearing.test.data';
import {MemberType, PartyType, RequirementType} from '../models/hearings.enum';
import {State} from '../store';
import {PartyChannelsAnswerConverter} from './party-channels-answer.converter';

describe('PartyChannelsAnswerConverter', () => {

  let converter: PartyChannelsAnswerConverter;
  let store: Store<any>;
  let router: any;
  const partyDetails = [
    {
      partyID: 'P1',
      partyName: 'Jane and Smith',
      partyType: PartyType.IND,
      partyRole: 'appellant',
      individualDetails: {
        title: null,
        firstName: 'Jane',
        lastName: 'Smith',
        preferredHearingChannel: 'inPerson',
      }
    },
    {
      partyID: 'P2',
      partyName: 'DWP',
      partyType: PartyType.ORG,
      partyRole: 'claimant',
      individualDetails: {
        title: null,
        firstName: 'DWP',
        lastName: null,
        preferredHearingChannel: 'byVideo',
      },
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                partyChannels: partyChannelsRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new PartyChannelsAnswerConverter(router);
  });

  it('should transform party channel value', () => {
    const STATE: State = _.cloneDeep(initialState.hearings);
    STATE.hearingRequest.hearingRequestMainModel.partyDetails = partyDetails;
    const result$ = converter.transformAnswer(of(STATE));
    const option = '<ul><li>Jane and Smith - In person</li></ul>';
    const expected = cold('(b|)', {b: option});
    expect(result$).toBeObservable(expected);
  });
});
