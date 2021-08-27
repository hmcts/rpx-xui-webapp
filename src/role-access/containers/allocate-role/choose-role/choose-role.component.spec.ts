import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { UserRole } from '../../../../app/models';
import { ChooseRadioOptionComponent } from '../../../components';
import { CHOOSE_A_ROLE } from '../../../constants';
import { AllocateRoleNavigationEvent, AllocateRoleStateData } from '../../../models';
import { AllocateRoleService } from '../../../services';
import { ChooseRoleComponent } from './choose-role.component';

const firstRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

const firstRoleOptions = [{ optionId: '1', optionValue: 'Role 1' },
      { optionId: '2', optionValue: 'Role 2' },
      { optionId: '3', optionValue: 'Role 3' }];

const secondRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

const mockAllocateRoleStateData: AllocateRoleStateData = {
  caseId: '1234',
  state: null,
  typeOfRole: null,
  allocateTo: null,
  person: null,
  durationOfRole: null,
  period: null
};

describe('ChooseRoleComponent', () => {
  const radioOptionControl: FormControl = new FormControl('');
  const formGroup: FormGroup = new FormGroup({[CHOOSE_A_ROLE]: radioOptionControl});

  let component: ChooseRoleComponent;
  let fixture: ComponentFixture<ChooseRoleComponent>;
  const mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);

  const allocateRoleService = {
    validRoles: firstRoles
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ ChooseRadioOptionComponent, ChooseRoleComponent ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              queryParams: {
                userType: 'judicial'
              }
            },
          }
        },
        { provide: AllocateRoleService, useValue: allocateRoleService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoleComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroup;
    mockStore.pipe.and.returnValue(of(mockAllocateRoleStateData));
    fixture.detectChanges();
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = AllocateRoleNavigationEvent.CONTINUE;
    component.dispatchEvent(navEvent, UserRole.Judicial);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should have correctly defined the roles', () => {
    expect(component.caption).toBe('Allocate a judicial role');
    expect(component.radioOptionControl).toBeDefined();
    expect(component.formGroup).toBeDefined();
    expect(component.optionsList).toEqual(firstRoleOptions);
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
