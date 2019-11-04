import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseState, CaseType, Jurisdiction, PaginationMetadata, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import * as fromRoot from '../../../app/store/reducers';
import * as fromCaseSearchStore from '../../store';
import { CaseSearchComponent } from './case-search.component';

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: Store<fromCaseSearchStore.SearchState>;
  let storePipeMock: any;

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
        CaseSearchComponent
      ],
      providers: [
        { provide: AppConfig, useValue: appConfigMock }
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');

    fixture = TestBed.createComponent(CaseSearchComponent);
    component = fixture.componentInstance;
    component.jurisdiction$ = storePipeMock.and.returnValue(of(new Jurisdiction()));
    component.caseType$ = storePipeMock.and.returnValue(of(new CaseType()));
    component.caseState$ = storePipeMock.and.returnValue(of(new CaseState()));
    component.resultView$ = storePipeMock.and.returnValue(of(new SearchResultView()));
    component.paginationMetadata$ = storePipeMock.and.returnValue(of(new PaginationMetadata()));
    component.metadataFields$ = storePipeMock.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
