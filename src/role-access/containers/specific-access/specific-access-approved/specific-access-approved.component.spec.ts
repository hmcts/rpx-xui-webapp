import { SpecificAccessNavigationEvent } from '../../../models';
import { SpecificAccessApprovedComponent } from './specific-access-approved.component';

describe('SpecificAccessApprovedComponent', () => {
  let component: SpecificAccessApprovedComponent;
  let mockStore: any;
  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new SpecificAccessApprovedComponent(mockStore);
  }));

  describe('navigation', () => {

    it('should correctly navigate on click of return to my tasks button when dispatching the event', () => {
      const navEvent = SpecificAccessNavigationEvent.RETURNTOMYTASKS;
      component.navigationHandler(navEvent);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

  });

});
