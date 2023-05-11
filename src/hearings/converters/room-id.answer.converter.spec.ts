import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { of } from 'rxjs';
import { hearingStageRefData, initialState } from '../hearing.test.data';
import { State } from '../store';
import { RoomIdAnswerConverter } from './room-id.answer.converter';

describe('RoomIdAnswerConverter', () => {
  let converter: RoomIdAnswerConverter;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let store: Store<any>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    converter = new RoomIdAnswerConverter();
  });

  it('should transform hearing stage', () => {
    const STATE: State = initialState.hearings;
    const result$ = converter.transformAnswer(of(STATE), 0);
    const room = 'room 3';
    const expected = cold('(b|)', { b: room });
    expect(result$).toBeObservable(expected);
  });
});
