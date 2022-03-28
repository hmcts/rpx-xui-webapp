import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SpecificAccessNavigationEvent } from '../../../models';
import { SpecificAccessInformationComponent } from './specific-access-information.component';

fdescribe('DescribeExclusionComponent', () => {
  let component: SpecificAccessInformationComponent;
  let mockStore: any;

  beforeEach(async(() => {
    mockStore = jasmine.createSpyObj('mockFormBuilder', ['pipe', 'dispatch']);
    component = new SpecificAccessInformationComponent(mockStore);
  }));

  describe('navigation', () => {

    it('should correctly navigate on click of back link in the navigation handler', () => {
      component.navigationHandler(SpecificAccessNavigationEvent.BACK);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('should correctly navigate on click of back link when dispatching the event', () => {
      const navEvent = SpecificAccessNavigationEvent.BACK;
      component.dispatchEvent(navEvent);
      expect(mockStore.dispatch).toHaveBeenCalled();
    });

    it('should not navigate if attempting to click the return to my tasks button', () => {
      const navEvent = SpecificAccessNavigationEvent.RETURNTOMYTASKS;
      expect(function () { component.dispatchEvent(navEvent) }).toThrowError('Not yet implemented');
    });

  });

  describe('onDestroy()', () => {
    it('should unsubscribe', () => {
      component.subscription = new Observable().subscribe();
      spyOn(component.subscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });


});
