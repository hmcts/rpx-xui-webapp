import { State } from './../../../app/store/reducers/index';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {CaseListComponent} from './case-list.component';
import {AppConfig} from '../../../app/services/ccd-config/ccd-case.config';
import { Store} from '@ngrx/store';
import {AppConfigService} from '../../../app/services/config/configuration.services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let store: MockStore<State>;

  const mockService = jasmine.createSpy();
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseListComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AppConfigService,
          useClass: mockService
        },
        {
          provide: AppConfig,
          useClass: mockService
        },
        provideMockStore(),
      ]
    });
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).not.toBeUndefined();
  });
});
