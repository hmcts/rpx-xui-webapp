import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { metaReducers } from '../../app/app.module';
import { reducers } from '../../app/store';
import { LocationModel } from '../models/location.model';
import { LocationsDataService } from '../services/locations-data.service';
import * as fromHearingStore from '../store';
import { CourtLocationsDataResolver } from './court-locations-resolver.resolve';

describe('CourtLocationsData Resolver', () => {
  let locationsDataService: LocationsDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: LocationModel = {
    court_venue_id: '164',
    epims_id: '815833',
    is_hearing_location: 'N',
    is_case_management_location: 'Y',
    site_name: 'Birmingham Social Security and Child Support Tribunal',
    court_name: 'BIRMINGHAM SSCS  ',
    court_status: 'Closed',
    region_id: '3',
    region: 'Midlands',
    court_type_id: '31',
    court_type: 'Social Security and Child Support Tribunal',
    cluster_id: '18',
    cluster_name: 'West Midlands and Warwickshire',
    open_for_public: 'No',
    court_address: '54 HAGLEY ROAD, EDGBASTON ',
    postcode: 'B16 8PE'
  };

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
    service.resolve().subscribe((refData: LocationModel) => {
      expect(service.getLocationId$).toHaveBeenCalled();
      expect(locationsDataService.getCourtLocations).toHaveBeenCalled();
      expect(refData).toEqual(dataRef);
    });
  }));
});
