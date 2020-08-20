import { TestBed } from '@angular/core/testing';
import { select, Store, StoreModule } from '@ngrx/store';
import { reducers } from '../index';
import {  initialOrganisationsState, OrganisationsState } from '../reducers';
import { getAllOrganisationsState, getOrganisationsState } from './organisations-list.selectors';

describe('Organisation List selectors', () => {
    let store: Store<OrganisationsState>;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot({}),
          StoreModule.forFeature('cases', reducers),
        ],
      });
      store = TestBed.get(Store);
      spyOn(store, 'dispatch').and.callThrough();
    });

    describe('getOrganisationsState', () => {
      it('should return initial state', () => {
        let result;
        store.pipe(select(getOrganisationsState)).subscribe(value => {
          result = value;
          expect(result).toEqual(initialOrganisationsState);
        });

        store.pipe(select(getAllOrganisationsState)).subscribe(value => {
            result = value;
            expect(result).toEqual([]);
          });
      });
    });
  });
