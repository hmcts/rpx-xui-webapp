import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { metaReducers } from '../../app/app.module';
import { reducers } from '../../app/store';
import { JudicialUserModel } from '../models/judicialUser.model';
import { JudicialRefDataService } from '../services/judicial-ref-data.service';
import * as fromHearingStore from '../store';
import { JudicialUserSearchResponseResolver } from './ judicial-user-search-response-resolver.resolve';

describe('Ref Data Resolver', () => {
  let judicialRefDataService: JudicialRefDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: JudicialUserModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        JudicialUserSearchResponseResolver,
        JudicialRefDataService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }
    );
    judicialRefDataService = TestBed.get(JudicialRefDataService) as JudicialRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: JudicialUserSearchResponseResolver = TestBed.get(JudicialUserSearchResponseResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([JudicialUserSearchResponseResolver], (service: JudicialUserSearchResponseResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(judicialRefDataService, 'searchJudicialUserByPersonalCodes').and.returnValue(of(dataRef));
    spyOn(service, 'getUsersByPanelRequirements$').and.callThrough();
    spyOn(service, 'getUsersData$').and.callThrough();
    service.resolve().subscribe((refData: JudicialUserModel[]) => {
      expect(service.getUsersByPanelRequirements$).toHaveBeenCalled();
      expect(service.getUsersData$).not.toHaveBeenCalled();
      expect(refData).toEqual([]);
      service.getUsersData$([]);
      expect(judicialRefDataService.searchJudicialUserByPersonalCodes).toHaveBeenCalled();
    });
  }));
});
