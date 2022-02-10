import {TestBed} from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {hearingStageRefData, initialState} from '../hearing.test.data';
import {AbstractConverter} from './abstract.converter';
import {StageConverter} from './stage.converter';

describe('StageConverter', () => {

  let converter: AbstractConverter;
  let store: Store<any>;
  let router: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                hearingStageOptions: hearingStageRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new StageConverter(store, router);
  });

  it('should transform hearing stage', () => {
    const result$ = converter.transformAnswer();
    const hearingType = 'Final';
    const expected = cold('b', {b: hearingType});
    expect(result$).toBeObservable(expected);
  });

});
