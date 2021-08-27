import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { AllocateRoleService } from '../../../services';
import * as fromStore from '../../../store';
import { AllocateRoleHomeComponent } from './allocate-role-home.component';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

describe('AllocateRoleHomeComponent', () => {
  let component: AllocateRoleHomeComponent;
  let fixture: ComponentFixture<AllocateRoleHomeComponent>;
  const routerMock = jasmine.createSpyObj('Router', [
    'navigateByUrl'
  ]);
  const allocateRoleService = jasmine.createSpyObj('AllocateRoleService', ['getValidRoles']);
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
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                validRoles: mockRoles,
              },
              queryParams: {
                caseId: '111111',
                userType: 'Judicial'
              }
            }
          }
        },
        {
          provide: AllocateRoleService,
          useValue: allocateRoleService
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
