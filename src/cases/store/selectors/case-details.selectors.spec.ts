// import { TestBed } from '@angular/core/testing';
// import { StoreModule, Store, combineReducers } from '@ngrx/store';
//
// import * as fromRoot from '../../../app/store/';
// import * as fromReducers from '../reducers';
// import * as fromSelectors from './case-details.selectors';
//
//
// describe('App Selectors', () => {
//   let store: Store<fromReducers.State>;
//
//   const appConfig = {
//     config: {},
//     loaded: false,
//     loading: false
//   };
//
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         StoreModule.forRoot({
//           ...fromRoot.reducers,
//           products: combineReducers(fromReducers.reducers),
//         }),
//       ],
//     });
//
//     store = TestBed.get(Store);
//
//     spyOn(store, 'dispatch').and.callThrough();
//   });
//
//   describe('Configuration State', () => {
//     it('should return config initial state', () => {
//
//       let result;
//
//       store
//         .select(fromSelectors.getCaseId)
//         .subscribe(value => (result = value));
//
//       expect(result).toEqual({});
//   });
// });
