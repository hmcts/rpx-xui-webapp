import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {metaReducers} from '../../app/app.module';
import {reducers} from '../../app/store';
import {LovRefDataModel} from '../models/lovRefData.model';
import {LovRefDataService} from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import {HearingActualRoleResolverService} from './hearing-actual-role-resolver.service';

describe('HearingActualRoleResolverService', () => {
  let lovRefDataService: LovRefDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: LovRefDataModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          HearingActualRoleResolverService,
          LovRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    lovRefDataService = TestBed.get(LovRefDataService) as LovRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: HearingActualRoleResolverService = TestBed.get(HearingActualRoleResolverService);
    expect(service).toBeTruthy();
  });

  it('resolves reference data for the hearing stage', inject([HearingActualRoleResolverService], (service: HearingActualRoleResolverService) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(lovRefDataService, 'getListOfValues').and.returnValue(of(dataRef));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Hearings | Request Hearing | Hearing Stage'
    };
    service.resolve(route).subscribe((refData: LovRefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(lovRefDataService.getListOfValues).toHaveBeenCalled();
      expect(refData).toEqual([]);
    });
  }));
});
