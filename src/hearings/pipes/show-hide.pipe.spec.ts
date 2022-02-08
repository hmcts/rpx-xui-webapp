import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {caseFlagsRefData, initialState} from '../hearing.test.data';
import {IsHiddenSource} from '../models/hearings.enum';
import {ShowHidePipe} from './show-hide.pipe';

describe('ShowHidePipe', () => {

  let showHidePipe: ShowHidePipe;
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
                caseFlags: caseFlagsRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    showHidePipe = new ShowHidePipe(store);
  });

  it('should transform is welsh page hidden', () => {
    const result$ = showHidePipe.transform(IsHiddenSource.WELSH_LOCATION);
    const isHidden = true;
    const expected = cold('b', {b: isHidden});
    expect(result$).toBeObservable(expected);
  });
});
