import {TestBed} from '@angular/core/testing';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {cold} from 'jasmine-marbles';
import {facilitiesListRefData, initialState} from '../hearing.test.data';
import {AdditionalFacilitiesConverter} from './additional-facilities.converter';

describe('AdditionalFacilitiesConverter', () => {

  let converter: AdditionalFacilitiesConverter;
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
                additionFacilitiesOptions: facilitiesListRefData,
              },
            },
          },
        }
      ]
    });
    store = TestBed.get(Store);
    router = TestBed.get(ActivatedRoute);
    converter = new AdditionalFacilitiesConverter(store, router);
  });

  it('should transform additional facilities', () => {
    const result$ = converter.transformAnswer();
    const additionalFacilities = 'Immigration detention centre, In camera court';
    const expected = cold('b', {b: additionalFacilities});
    expect(result$).toBeObservable(expected);
  });
});
