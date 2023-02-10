import { SpecificAccessNavigationEvent } from '../../../models';
import { SpecificAccessApprovedComponent } from './specific-access-approved.component';

describe('SpecificAccessApprovedComponent', () => {
  let component: SpecificAccessApprovedComponent;
  let mockStore: any;
  beforeEach((() => {
    mockStore = jasmine.createSpyObj('mockStore', ['pipe', 'dispatch']);
    component = new SpecificAccessApprovedComponent(mockStore);
  }));

  describe('navigationHandler', () => {

    it('should correctly navigate on click of return to my tasks button when dispatching the event', () => {
      const navEvent = SpecificAccessNavigationEvent.RETURNTOMYTASKS;
      component.navigationHandler(navEvent);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('should throw an error if navEvent case is not handled', () => {
      expect(() => {
        component.navigationHandler(null);
      }).toThrow(new Error('Invalid case'));
    })

  });

});
