import { Store } from '@ngrx/store';
import { initApplication } from './app-initilizer';
import * as fromApp from './store';

describe('initApplication', () => {
  const storeSpy = jasmine.createSpyObj<Store<fromApp.State>>('store', ['dispatch']);

  it('should return a function', () => {
    expect(initApplication(storeSpy)).toEqual(jasmine.any(Function));
  });
});
