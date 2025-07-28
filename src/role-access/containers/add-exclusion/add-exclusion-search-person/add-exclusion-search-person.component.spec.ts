import { FormControl } from '@angular/forms';
import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { UpdatePersonExclusion } from '../../../store/actions';
import { AddExclusionSearchPersonComponent } from './add-exclusion-search-person.component';

describe('AddExclusionSearchPersonComponent', () => {
  let component: AddExclusionSearchPersonComponent;
  let mockStore: any;

  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new AddExclusionSearchPersonComponent(mockStore);
  }));

  it('navigationHandler raises invalid Error when person not selected', () => {
    expect(component).toBeTruthy();
    const continueEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(continueEvent);
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('navigationHandler validates when person selected', () => {
    const control = new FormControl();
    const person = { id: 'id123', name: 'full Name', email: 'test@email.com', domain: 'Caseworker' };
    component.person = person;
    control.setValue(person);
    component.formGroup.addControl('findPersonControl', control);
    const continueEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(continueEvent);
    expect(component.formGroup.valid).toBeTruthy();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new UpdatePersonExclusion(ExclusionState.DESCRIBE_EXCLUSION, person));
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

  it('selectedPerson with no domain', () => {
    component.personRole = PersonRole.JUDICIAL;
    component.selectedPerson({ id: '1234', name: 'name', email: null, domain: null, knownAs: null });
    expect(component.person.id).toEqual('1234');
    expect(component.person.name).toEqual('name');
    expect(component.person.domain).toEqual(PersonRole.JUDICIAL);
  });

  it('selectedPerson with domain', () => {
    component.personRole = PersonRole.JUDICIAL;
    component.selectedPerson({ id: '1234', name: 'name', email: null, domain: PersonRole.LEGAL_OPERATIONS, knownAs: null });
    expect(component.person.id).toEqual('1234');
    expect(component.person.name).toEqual('name');
    expect(component.person.domain).toEqual(PersonRole.LEGAL_OPERATIONS);
  });
});
