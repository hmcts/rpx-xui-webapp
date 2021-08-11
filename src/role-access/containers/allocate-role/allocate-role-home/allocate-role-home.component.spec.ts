import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import * as fromStore from '../../../store';
import { AllocateRoleHomeComponent } from './allocate-role-home.component';

describe('AllocateRoleHomeComponent', () => {
  let component: AllocateRoleHomeComponent;
  let fixture: ComponentFixture<AllocateRoleHomeComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  let store: Store<fromStore.State>;
  let storePipeMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [
        AllocateRoleHomeComponent
      ],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');
    fixture = TestBed.createComponent(AllocateRoleHomeComponent);
    component = fixture.componentInstance;
    storePipeMock.and.returnValue(of(0));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
