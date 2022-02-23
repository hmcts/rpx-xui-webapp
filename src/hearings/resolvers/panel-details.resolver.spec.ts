import {APP_BASE_HREF} from '@angular/common';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {Store, StoreModule} from '@ngrx/store';
import {of} from 'rxjs';
import {metaReducers} from '../../app/app.module';
import {reducers} from '../../app/store';
import { JudicialUserModel } from '../models/judicialUser.model';
import {LovRefDataService} from '../services/lov-ref-data.service';
import * as fromHearingStore from '../store';
import { PanelDetailsResolver } from './panel-details.resolver';
import { provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../hearing.test.data';

describe('Panel details Resolver', () => {
  let lovRefDataService: LovRefDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: JudicialUserModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          StoreModule.forRoot(reducers, {metaReducers}),
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          provideMockStore({ initialState }),
          PanelDetailsResolver,
          LovRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    lovRefDataService = TestBed.get(LovRefDataService) as LovRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: PanelDetailsResolver = TestBed.get(PanelDetailsResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data for the panel details', inject([PanelDetailsResolver], (service: PanelDetailsResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(service, 'getReferenceData$').and.callThrough();
    const route = new ActivatedRouteSnapshot();
    route.data = {
      title: 'HMCTS Hearings | Request Hearing | Hearing Stage'
    };
    service.resolve(route).subscribe((refData: JudicialUserModel[]) => {
      expect(service.getReferenceData$).toHaveBeenCalled();
      expect(refData).toEqual([]);
    });
  }));
});
