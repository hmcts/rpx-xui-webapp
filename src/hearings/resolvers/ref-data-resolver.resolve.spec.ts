import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {provideMockStore} from '@ngrx/store/testing';
import {Observable, of} from 'rxjs';
import {SessionStorageService} from '../../app/services';
import {initialState} from '../hearing.test.data';
import {HearingCategory} from '../models/hearings.enum';
import {LovRefDataModel} from '../models/lovRefData.model';
import {LovRefDataService} from '../services/lov-ref-data.service';
import {RefDataResolver} from './ref-data-resolver.resolve';

describe('Ref Data Resolver', () => {
  let lovRefDataService: LovRefDataService;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockSessionStorageService = jasmine.createSpyObj('mockSessionStorageService', ['getItem', 'setItem']);
  const dataRef: LovRefDataModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          provideMockStore({initialState}),
          RefDataResolver,
          LovRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'},
          {provide: Router, useValue: mockRouter},
          {provide: SessionStorageService, useValue: mockSessionStorageService}
        ]
      }
    );
    lovRefDataService = TestBed.get(LovRefDataService) as LovRefDataService;
  });

  it('should be created', () => {
    const service: RefDataResolver = TestBed.get(RefDataResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([RefDataResolver], (service: RefDataResolver) => {
    spyOn(lovRefDataService, 'getListOfValues').and.returnValue(of(dataRef));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
      category: HearingCategory.HearingPriority
    };
    service.resolve(route).subscribe((refData: LovRefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(lovRefDataService.getListOfValues).toHaveBeenCalled();
      expect(mockSessionStorageService.setItem).toHaveBeenCalled();
      expect(refData).toEqual([]);
    });
  }));

  it('should call router navigate if error', inject([RefDataResolver], (service: RefDataResolver) => {
    spyOn(lovRefDataService, 'getListOfValues').and.returnValue(Observable.throwError('mocked api error'));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
      category: HearingCategory.HearingPriority
    };
    service.resolve(route).subscribe((refData: LovRefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(lovRefDataService.getListOfValues).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/hearings/error']);
    });
  }));
});
