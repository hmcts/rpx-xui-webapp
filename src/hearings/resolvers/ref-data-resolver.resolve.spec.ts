import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {Observable, of} from 'rxjs';
import {HearingCategory} from '../models/hearings.enum';
import {metaReducers} from '../../app/app.module';
import {reducers} from '../../app/store';
import {LovRefDataModel} from '../models/lovRefData.model';
import {LovRefDataService} from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import {RefDataResolver} from './ref-data-resolver.resolve';
import { SessionStorageService } from '../../app/services';

describe('Ref Data Resolver', () => {
  let lovRefDataService: LovRefDataService;
  let store: Store<fromHearingStore.State>;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const dataRef: LovRefDataModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          RefDataResolver,
          LovRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'},
          {provide: Router, useValue: mockRouter},
          {provide: SessionStorageService, useValue: mockSessionStorageService}
        ]
      }
    );
    lovRefDataService = TestBed.get(LovRefDataService) as LovRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: RefDataResolver = TestBed.get(RefDataResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([RefDataResolver], (service: RefDataResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(lovRefDataService, 'getListOfValues').and.returnValue(of(dataRef));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
      category: HearingCategory.Priority
    };
    service.resolve(route).subscribe((refData: LovRefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(lovRefDataService.getListOfValues).toHaveBeenCalled();
      expect(mockSessionStorageService.setItem).toHaveBeenCalled();
      expect(refData).toEqual([]);
    });
  }));

  it('resolves reference data from session', inject([RefDataResolver], (service: RefDataResolver) => {
    spyOn(service, 'getLovSessionKey').and.returnValue('lov-BBA3-PartyChannel');
    spyOn(service, 'getLovRefDataFromSession').and.returnValue(dataRef);
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
      category: HearingCategory.Priority
    };
    service.resolve(route).subscribe((refData: LovRefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(lovRefDataService.getListOfValues).toHaveBeenCalledTimes(0);
      expect(mockSessionStorageService.setItem).toHaveBeenCalledTimes(0);
      expect(refData).toEqual([]);
    });
  }));

  it('should call router navigate if error', inject([RefDataResolver], (service: RefDataResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(lovRefDataService, 'getListOfValues').and.returnValue(Observable.throwError('mocked api error'));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
      category: HearingCategory.Priority
    };
    service.resolve(route).subscribe((refData: LovRefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(lovRefDataService.getListOfValues).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/hearings/error']);
    });
  }));
});
