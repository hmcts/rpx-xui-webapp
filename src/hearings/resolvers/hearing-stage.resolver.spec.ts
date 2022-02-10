import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {metaReducers} from '../../app/app.module';
import {reducers} from '../../app/store';
import {RefDataModel} from '../models/refData.model';
import {HearingsRefDataService} from '../services/hearings-ref-data.service';
import * as fromHearingStore from '../store';
import {HearingStageResolver} from './hearing-stage.resolver';

describe('HearingStage Resolver', () => {
  let hearingsDataService: HearingsRefDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: RefDataModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          HearingStageResolver,
          HearingsRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    hearingsDataService = TestBed.get(HearingsRefDataService) as HearingsRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: HearingStageResolver = TestBed.get(HearingStageResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data for the facility list', inject([HearingStageResolver], (service: HearingStageResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(hearingsDataService, 'getRefData').and.returnValue(of(dataRef));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing'
    };
    service.resolve(route).subscribe((refData: RefDataModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(hearingsDataService.getRefData).toHaveBeenCalled();
      expect(refData).toEqual([]);
    });
  }));
});