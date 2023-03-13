import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialStateImmutable } from '../hearing.test.data';
import { JudicialUserModel } from '../models/judicialUser.model';
import { JudicialRefDataService } from '../services/judicial-ref-data.service';
import { JudicialUserSearchResolver } from './judicial-user-search-resolver.resolve';

describe('Ref Data Resolver', () => {
  let judicialRefDataService: JudicialRefDataService;
  const dataRef: JudicialUserModel[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([]),
          HttpClientTestingModule,
        ],
        providers: [
          provideMockStore({initialState:initialStateImmutable}),
          JudicialUserSearchResolver,
          JudicialRefDataService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      }
    );
    judicialRefDataService = TestBed.inject(JudicialRefDataService) as JudicialRefDataService;
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    const service: JudicialUserSearchResolver = TestBed.inject(JudicialUserSearchResolver);
    expect(service).toBeTruthy();
  });

  it('resolves reference data', inject([JudicialUserSearchResolver], (service: JudicialUserSearchResolver) => {
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
