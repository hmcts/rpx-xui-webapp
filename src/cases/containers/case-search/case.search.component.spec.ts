import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseSearchComponent } from './case-search.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromCaseSearchStore from '../../store';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../app/store/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConfig } from 'src/app/services/ccd-config/ccd-case.config';

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: Store<fromCaseSearchStore.SearchState>;
  let storePipeMock: any;
  let storeDispatchMock: any;

  const appConfigMock = {
    getPaginationPageSize: () => 10
  };

  beforeEach((() => {
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
    storeDispatchMock = spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(CaseSearchComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have ngOnInit', () => {
    expect(component.ngOnInit).toBeTruthy();
  });

});
