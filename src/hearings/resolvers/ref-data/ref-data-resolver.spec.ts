import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { HearingCategory } from 'src/hearings/models/hearings.enum';
import { HearingsRefDataService } from 'src/hearings/services/hearings-ref-data.service';
import { metaReducers } from '../../../app/app.module';
import { reducers } from '../../../app/store';
import { RefDataModel } from '../../models/refData.model';
import * as fromHearingStore from '../../store';
import { RefDataResolver } from './ref-data-resolver.resolve';

fdescribe('Priority Resolver', () => {
  let hearingsDataService: HearingsRefDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: RefDataModel[] = [];
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        RefDataResolver,
        {
          provide: ActivatedRoute,
          useValue: { paramMap: convertToParamMap({
            data: {
              title: 'HMCTS Manage cases | Request Hearing | Date Priority Hearing',
              category: HearingCategory.Priority
            }})}
        },
        HearingsRefDataService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }
    );
    hearingsDataService = TestBed.get(HearingsRefDataService) as HearingsRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: RefDataResolver = TestBed.get(RefDataResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([RefDataResolver], (service: RefDataResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(hearingsDataService, 'getRefData').and.returnValue(of(dataRef));
    service.resolve().subscribe((refData: RefDataModel[]) => {
      expect(refData).toEqual([]);
    });
  }));
});
