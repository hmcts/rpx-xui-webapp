import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { HearingsRefDataService } from 'src/hearings/services/hearings-ref-data.service';
import { metaReducers } from '../../../app/app.module';
import { reducers } from '../../../app/store';
import { RefDataModel } from '../../../hearings/models/refData.model';
import * as fromHearingStore from '../../../hearings/store';
import { PriorityResolver } from './priority.resolve';

describe('Priority Resolver', () => {
  let hearingsDataService: HearingsRefDataService;
  let store: Store<fromHearingStore.State>;
  const dataRef: RefDataModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
      ],
      providers: [
        PriorityResolver,
        HearingsRefDataService,
        { provide: APP_BASE_HREF, useValue: '/' }
      ]
    }
    );
    hearingsDataService = TestBed.get(HearingsRefDataService) as HearingsRefDataService;
    store = TestBed.get(Store) as Store<fromHearingStore.State>;
  });

  it('should be created', () => {
    const service: PriorityResolver = TestBed.get(PriorityResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([PriorityResolver], (service: PriorityResolver) => {
    spyOn(store, 'pipe').and.returnValue(of('serviceName'));
    spyOn(hearingsDataService, 'getRefData').and.returnValue(of(dataRef));
    service.resolve().subscribe((refData: RefDataModel[]) => {
      expect(refData).toEqual([]);
    });
  }));
});
