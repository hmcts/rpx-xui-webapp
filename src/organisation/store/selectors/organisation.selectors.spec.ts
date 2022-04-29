import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import { OrganisationState } from '../reducers/organisation.reducer';

describe('Organisation selectors', () => {
  let store: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        StoreModule.forFeature('organisation', reducers),
      ],
    });
    store = TestBed.inject(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

});
