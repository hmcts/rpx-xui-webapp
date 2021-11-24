import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import * as fromActions from '../../../app/store';
import { CaseReferenceSearchBoxComponent } from './case-reference-search-box.component';
import { NavItemsModel } from '../../models/nav-item.model';

describe('ExuiCaseReferenceSearchBoxComponent', () => {
  let component: CaseReferenceSearchBoxComponent;
  let fixture: ComponentFixture<CaseReferenceSearchBoxComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let store: Store<fromActions.State>;
  const storeMock = jasmine.createSpyObj('Store', [
    'dispatch'
  ]);
  const formBuilder = new FormBuilder();
  const item: NavItemsModel = {
    text: 'Find',
    href: '',
    active: true
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseReferenceSearchBoxComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
      imports: [ HttpClientModule, RouterTestingModule.withRoutes([]) ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseReferenceSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	  mockRouter = TestBed.get(Router);
    store = TestBed.get(Store);
  });

  fit('should create', () => {
    component.item = item;
    expect(component).toBeTruthy();
  });
});
