import { CommonLibraryModuleConfig } from '@hmcts/rpx-xui-common-lib/lib/module.config';
import { EnvironmentConfig } from '../models/environmentConfig.model';
import {Store} from '@ngrx/store';
import * as fromApp from './store';

import {initApplication} from './app-initilizer';

describe('initApplication', () => {

  const storeSpy = jasmine.createSpyObj<Store<fromApp.State>>('store', ['dispatch']);

  it('should return a function', () => {

    expect(initApplication(storeSpy, {} as EnvironmentConfig, {} as CommonLibraryModuleConfig)).toEqual(jasmine.any(Function));
  });
});
