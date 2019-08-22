import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseListComponent } from './case-list.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromCaseSearchStore from '../../store';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../app/store/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { of } from 'rxjs';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { mockedSearchResultPayload, mockedSearchResultResult, JURISDICTION_1 } from '../../mock/search-filter.mock';
import { ApplySearchFilterSuccess } from '../../store';

describe('CaseListComponent', () => {
  let fixture: ComponentFixture<CaseListComponent>;
  let component: CaseListComponent;
  let store: Store<fromCaseSearchStore.SearchState>;
  let storePipeMock: any;
  let storeDispatchMock: any;

  const appConfigMock = {
    getPaginationPageSize: () => 10
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromCaseSearchStore.reducers),
        }),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        CaseListComponent
      ],
      providers: [
        { provide: AppConfig, useValue: appConfigMock }
      ]
    }).compileComponents();

    localStorage.setItem('savedQueryParams', JSON.stringify({
      jurisdiction_id: JURISDICTION_1.id,
      case_type_id: JURISDICTION_1.caseTypes[0].id,
      state_id: JURISDICTION_1.caseTypes[0].states[0]
    }));

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');
    storeDispatchMock = spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    component.jurisdiction$ = storePipeMock.and.returnValue(of(new Jurisdiction()));
    component.caseType$ = storePipeMock.and.returnValue(of(new CaseType()));
    component.caseState$ = storePipeMock.and.returnValue(of(new CaseState()));
    component.resultView$ = storePipeMock.and.returnValue(of(new SearchResultView()));
    component.paginationMetadata$ = storePipeMock.and.returnValue(of(new PaginationMetadata()));
    component.metadataFields$ = storePipeMock.and.returnValue(of([]));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('savedQueryParams');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
