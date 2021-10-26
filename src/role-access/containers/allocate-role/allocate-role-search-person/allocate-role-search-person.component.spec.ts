import { FormControl } from '@angular/forms';
import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';

import { of } from 'rxjs';
import {
  Actions,
  AllocateRoleNavigationEvent,
  AllocateRoleState,
  AllocateRoleStateData,
  AllocateTo,
  DurationOfRole, RoleCategory
} from '../../../models';
import { ChoosePersonAndGo } from '../../../store';
import { AllocateRoleSearchPersonComponent } from './allocate-role-search-person.component';

describe('AllocateRolePersonComponent', () => {
  let component: AllocateRoleSearchPersonComponent;
  let mockStore: any;
  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new AllocateRoleSearchPersonComponent(mockStore);
  }));

  it('navigationHandler raises invalid Error when person not selected', () => {
    expect(component).toBeTruthy();
    const continueEvent = AllocateRoleNavigationEvent.CONTINUE;
    component.navigationHandler(continueEvent);
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('navigationHandler validates when person selected', () => {
    const control = new FormControl();
    const examplePerson = { id: 'id123', name: 'full Name', email: 'test@email.com', domain: 'Caseworker'};
    component.person = examplePerson;
    control.setValue(examplePerson);
    component.formGroup.addControl('findPersonControl', control);
    const continueEvent = AllocateRoleNavigationEvent.CONTINUE;
    component.navigationHandler(continueEvent);
    expect(component.formGroup.valid).toBeTruthy();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new ChoosePersonAndGo({person: examplePerson, allocateRoleState: AllocateRoleState.CHOOSE_DURATION}));
  });

  it('should set person correctly when given by child component', () => {
    const firstPerson: Person = {
      id: '123',
      name: 'Person 1',
      email: 'P1@something.com',
      domain: PersonRole.ADMIN
    };
    const secondPerson: Person = {
      id: '456',
      name: 'Person 2',
      email: 'P2@something.com',
      domain: PersonRole.JUDICIAL
    };
    component.selectedPerson(firstPerson);
    expect(component.person).toBe(firstPerson);
    component.selectedPerson(secondPerson);
    expect(component.person).toBe(secondPerson);
  });

  it('should set data in ngOnInit', () => {
    const ALLOCATE_ROLE_STATE_DATA: AllocateRoleStateData = {
      caseId: '1111111111111111',
      assignmentId: 'a123456',
      state: AllocateRoleState.CHOOSE_ALLOCATE_TO,
      typeOfRole: {id: 'lead-judge', name: 'Lead judge'},
      allocateTo: AllocateTo.RESERVE_TO_ME,
      personToBeRemoved: {
        id: 'p111111',
        name: 'test1',
        domain: '',
      },
      person: {
        id: 'p222222',
        name: 'test2',
        domain: '',
      },
      durationOfRole: DurationOfRole.SEVEN_DAYS,
      action: Actions.Allocate,
      period: {
        startDate: new Date(),
        endDate: new Date(),
      },
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
    };
    mockStore.pipe.and.returnValue(of(ALLOCATE_ROLE_STATE_DATA));
    component.ngOnInit();
    expect(component.title).toBe('Allocate a lead judge');
    expect(component.personName).toBe('test2');
    expect(component.roleType).toEqual({id: 'lead-judge', name: 'Lead judge'});
  });
});
