import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {LocationModel} from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {metaReducers} from '../../app/app.module';
import {reducers} from '../../app/store';
import {LocationsDataService} from '../services/locations-data.service';
import * as fromHearingStore from '../store';
import {CourtLocationsDataResolver} from './court-locations-resolver.resolve';

describe('CourtLocationsData Resolver', () => {
  let locationsDataService: LocationsDataService;
  let store: Store<fromHearingStore.State>;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          CourtLocationsDataResolver,
          LocationsDataService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    locationsDataService = TestBed.get(LocationsDataService) as LocationsDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });
});
