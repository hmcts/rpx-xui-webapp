import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState, partyChannelsRefData, partySubChannelsRefData } from '../hearing.test.data';
import { State } from '../store';
import { ParticipantChannelAttendenceAnswerConverter } from './participant-channel-attendance.converter';

describe('ParticipantChannelAttendance', () => {
  let converter: ParticipantChannelAttendenceAnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                partyChannels: partyChannelsRefData,
                partySubChannels: partySubChannelsRefData
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new ParticipantChannelAttendenceAnswerConverter(router);
  });

  it('should transform hearing attendance', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE));
    const room = '<ul><li>By phone</li></ul>';
    const expected = cold('(b|)', { b: room });
    expect(result$).toBeObservable(expected);
  });
});
