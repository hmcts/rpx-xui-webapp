import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseSearchComponent } from './case-search.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromCaseSearchStore from '../../store';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../app/store/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { of } from 'rxjs';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: Store<fromCaseSearchStore.SearchState>;
  let storePipeMock: any;
  let storeDispatchMock: any;
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['isEnabled']);

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
        { provide: AppConfig, useValue: appConfigMock },
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService
        }
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');
    storeDispatchMock = spyOn(store, 'dispatch');
    mockFeatureToggleService.isEnabled.and.returnValue(of(true));

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
