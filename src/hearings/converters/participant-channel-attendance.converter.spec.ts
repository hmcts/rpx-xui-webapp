import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState } from '../hearing.test.data';
import { LovRefDataModel } from '../models/lovRefData.model';
import { State } from '../store';
import { ParticipantChannelAttendenceAnswerConverter } from './participant-channel-attendance.converter';

describe('ParticipantChannelAttendance', () => {

  let converter: ParticipantChannelAttendenceAnswerConverter;
  let store: Store<any>;
  let router: any;
  const PARTY_CHANNELS: LovRefDataModel[] = [
    {
      key: 'inPerson',
      value_en: 'In person',
      value_cy: '',
      hint_text_en: 'in person',
      hint_text_cy: 'Wyneb yn wyneb',
      lov_order: 1,
      parent_key: null,
      category_key: 'HearingChannel',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: null,
    },
    {
      key: 'byPhone',
      value_en: 'By phone',
      value_cy: '',
      hint_text_en: 'By Phone',
      hint_text_cy: 'Ffôn',
      lov_order: 2,
      parent_key: null,
      category_key: 'HearingChannel',
      parent_category: '',
      active_flag: 'Y',
      child_nodes: [],
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
                partyChannels: PARTY_CHANNELS,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new ParticipantChannelAttendenceAnswerConverter(router);
  });

  it('should transform hearing attendance', () => {
    initialState.hearings.hearingRequest.hearingRequestMainModel.hearingDetails.hearingLevelParticipantAttendance = ['byPhone']
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const room = '<ul><li>By phone</li></ul>';
    const expected = cold('(b|)', { b: room });
    expect(result$).toBeObservable(expected);
  });

});
