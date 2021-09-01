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
import { Actions, AllocateRoleNavigationEvent, AllocateRoleStateData, RoleCategory } from '../../../models';
import { AllocateRoleService } from '../../../services';
import { ChooseRoleComponent } from './choose-role.component';

const firstRoleOptions = [{ optionId: 'lead-judge', optionValue: 'Lead judge' },
      { optionId: 'hearing-judge', optionValue: 'Hearing judge' }];

const personRoles = [
  {roleId: 'lead-judge', roleName: 'Lead judge', roleCategory: 'JUDICIAL'},
  {roleId: 'hearing-judge', roleName: 'Hearing judge', roleCategory: 'JUDICIAL'}];

const mockAllocateRoleStateData: AllocateRoleStateData = {
  action: Actions.Allocate,
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

  const mockAllocateRoleService = jasmine.createSpyObj('allocateRoleService', ['getValidRoles']);

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
        { provide: AllocateRoleService, useValue: mockAllocateRoleService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoleComponent);
    component = fixture.componentInstance;
    component.formGroup = formGroup;
    mockStore.pipe.and.returnValue(of(mockAllocateRoleStateData));
    mockAllocateRoleService.getValidRoles.and.returnValue(of(personRoles));
    fixture.detectChanges();
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = AllocateRoleNavigationEvent.CONTINUE;
    component.dispatchEvent(navEvent, RoleCategory.JUDICIAL, UserRole.Judicial);
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
