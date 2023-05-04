import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingStageRefData, initialState } from '../hearing.test.data';
import { ParticipantChannelAttendenceAmendedConverter } from './participant-channel-attendence.amended.converter';

describe('ParticipantChannelAttendenceAmendedConverter', () => {
  let converter: ParticipantChannelAttendenceAmendedConverter;
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
                hearingStageOptions: hearingStageRefData
              }
            }
          }
        }
      ]
    });
    store = TestBed.inject(Store);
    router = TestBed.inject(ActivatedRoute);
    converter = new ParticipantChannelAttendenceAmendedConverter();
  });

  it('should transform the amended flag when previous vs current party attending type are not equal', () => {
    const result$ = converter.transformIsAmended(of(initialState.hearings));
    const isAmended = true;
    const expected = cold('(b|)', { b: isAmended });
    expect(result$).toBeObservable(expected);
  });
});

