import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {HearingCategory} from 'src/hearings/models/hearings.enum';
import {metaReducers} from '../../app/app.module';
import {reducers} from '../../app/store';
import {LovRefDataModel} from '../models/lovRefData.model';
import {LovRefDataService} from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import {RefDataResolver} from './ref-data-resolver.resolve';

describe('Ref Data Resolver', () => {
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
          RefDataResolver,
          LovRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'}
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
      expect(refData).toEqual([]);
    });
  }));
});
