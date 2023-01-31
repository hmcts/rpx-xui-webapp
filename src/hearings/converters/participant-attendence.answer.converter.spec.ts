import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { initialState, partyChannelsRefData, partySubChannelsRefData } from '../hearing.test.data';
import { State } from '../store';
import { ParticipantAttendenceAnswerConverter } from './participant-attendence.answer.converter';

describe('ParticipantAttendenceAnswerConverter', () => {

  let converter: ParticipantAttendenceAnswerConverter;
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
              },
            },
          },
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new ParticipantAttendenceAnswerConverter(router);
  });

  it('should transform hearing stage', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE), 0);
    const room = 'Jane Smith - In person<br>DWP - By video';
    const expected = cold('(b|)', { b: room });
    expect(result$).toBeObservable(expected);
  });
});
