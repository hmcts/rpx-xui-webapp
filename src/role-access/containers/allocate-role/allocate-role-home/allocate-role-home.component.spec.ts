import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AllocateRoleHomeComponent } from './allocate-role-home.component';

describe('AllocateRoleHomeComponent', () => {
  let component: AllocateRoleHomeComponent;
  let fixture: ComponentFixture<AllocateRoleHomeComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  let mockAppStore: any;
  let mockStore: any;

  beforeEach(async(() => {
    mockAppStore = jasmine.createSpyObj('appStore', ['dispatch', 'pipe']);
    mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
    mockAppStore.pipe.and.returnValue(of());
    mockStore.pipe.and.returnValue(of());
    TestBed.configureTestingModule({
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      declarations: [ AllocateRoleHomeComponent ],
      providers: [
        provideMockStore(),
        {
          provide: Router,
          useValue: routerMock
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleHomeComponent);
    component = fixture.componentInstance;
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
