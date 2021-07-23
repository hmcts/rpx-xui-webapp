import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChooseRadioOptionComponent } from '../../../components';
import { PERSON_ROLE } from '../../../constants';
import { ExclusionNavigationEvent } from '../../../models';
import { RoleExclusionsService } from '../../../services';
import { ChoosePersonRoleComponent } from './choose-person-role.component';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

const mockRoleOptions = [{ optionId: '1', optionValue: 'Role 1' },
      { optionId: '2', optionValue: 'Role 2' },
      { optionId: '3', optionValue: 'Role 3' }];

describe('ChoosePersonRoleComponent', () => {
  const RADIO_OPTION_CONTROL: FormControl = new FormControl('');
  const FORM_GROUP: FormGroup = new FormGroup({[PERSON_ROLE]: RADIO_OPTION_CONTROL});

  let component: ChoosePersonRoleComponent;
  let fixture: ComponentFixture<ChoosePersonRoleComponent>;
  const mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
  const mockRoleExclusionsService = jasmine.createSpyObj('roleExclusionsService', ['getRolesCategory']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRadioOptionComponent, ChoosePersonRoleComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: RoleExclusionsService, useValue: mockRoleExclusionsService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePersonRoleComponent);
    component = fixture.componentInstance;
    component.formGroup = FORM_GROUP;
    mockRoleExclusionsService.getRolesCategory.and.returnValue(of(mockRoles));
    mockStore.pipe.and.returnValue(of(mockRoleOptions[1].optionValue));
    component.roles$ = of(mockRoles);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(navEvent);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should have correctly defined the roles', () => {
    expect(component.optionsList).toEqual(mockRoleOptions);
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
