import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { metaReducers } from '../../app/app.module';
import { reducers } from '../../app/store';
import { HearingCategory } from '../models/hearings.enum';
import { LocationModel } from '../models/location.model';
import { LocationsDataService } from '../services/locations-data.service';
import * as fromHearingStore from '../store';
import { CourtLocationsDataResolver } from './court-locations-resolver.resolve';

describe('CourtLocationsData Resolver', () => {
  let locationsDataService: LocationsDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: LocationModel = {} as LocationModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        CourtLocationsDataResolver,
        LocationsDataService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }
    );
    locationsDataService = TestBed.get(LocationsDataService) as LocationsDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: CourtLocationsDataResolver = TestBed.get(CourtLocationsDataResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([CourtLocationsDataResolver], (service: CourtLocationsDataResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(locationsDataService, 'getCourtLocations').and.returnValue(of(dataRef));
    spyOn(service, 'getLocationId$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
      category: HearingCategory.Priority
    };
    service.resolve().subscribe((refData: LocationModel) => {
      expect(service.getLocationId$).toHaveBeenCalled();
      expect(locationsDataService.getCourtLocations).toHaveBeenCalled();
      expect(refData).toEqual({} as LocationModel);
    });
  }));
});
