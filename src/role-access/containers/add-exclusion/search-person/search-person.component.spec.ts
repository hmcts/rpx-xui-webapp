
import { SearchPersonComponent } from './search-person.component';
import { ExclusionNavigationEvent, ExclusionState } from '../../../models';
import { FormControl } from '@angular/forms';
import { UpdatePersonExclusion } from 'src/role-access/store';

describe('SearchPersonComponent', () => {
  let component: SearchPersonComponent;
  let mockStore: any;
  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new SearchPersonComponent(mockStore);
  }));

  it('navigationHandler raises invalid Error when person not selected', () => {
    expect(component).toBeTruthy();
    const continueEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(continueEvent);
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('navigationHandler validates when person selected', () => {
    const control = new FormControl();
    const person = { id: 'id123', name: 'full Name', email: 'test@email.com', domain: 'Caseworker'};
    component.person = person;
    control.setValue(person);
    component.formGroup.addControl('findPersonControl', control);
    const continueEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(continueEvent);
    expect(component.formGroup.valid).toBeTruthy();
    expect(mockStore.dispatch).toHaveBeenCalledWith(new UpdatePersonExclusion(ExclusionState.DESCRIBE_EXCLUSION, person));
  });
});
