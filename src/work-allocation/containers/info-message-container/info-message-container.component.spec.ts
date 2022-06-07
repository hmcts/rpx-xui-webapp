import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { InfoMessageComponent } from '../../components/info-message/info-message.component';
import { InfoMessageCommService } from '../../services';
import { getMockInfoMessages } from '../../tests/utils.spec';
import { InfoMessageContainerComponent } from './info-message-container.component';


@Component({
  template: `<exui-info-message-container></exui-info-message-container>`
})
class WrapperComponent {
  @ViewChild(InfoMessageContainerComponent, {static: true}) public appComponentRef: InfoMessageContainerComponent;
}

describe('WorkAllocation', () => {

  describe('InfoMessageContainerComponent', () => {
    let component: InfoMessageContainerComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    const mockInfoMessageCommService = jasmine.createSpyObj('mockInfoMessageCommService', ['removeAllMessages']);

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule.withRoutes([
          ])
        ],
        declarations: [ WrapperComponent, InfoMessageContainerComponent, InfoMessageComponent ],
        providers: [{provide: InfoMessageCommService, useValue: mockInfoMessageCommService}]
      })
      .compileComponents();

      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      const mockInfoMessages = getMockInfoMessages();
      component.infoMessageChangeEmitted$ = of(mockInfoMessages);
      fixture.detectChanges();
    });

    /**
     * Container component should have ability to remove all messages from message service and should make call to do so
     */
    it('should remove all messages when necessary', () => {
      component.resetMessages();
      expect(mockInfoMessageCommService.removeAllMessages).toHaveBeenCalled();
    });

    /**
     * Container component should correctly define properties
     */
    it('should properly define the infoMessages and showInfoMessage', () => {
      expect(component.infoMessages).toEqual(getMockInfoMessages());
      expect(component.showInfoMessage).toBeTruthy();

      component.infoMessageChangeEmitted$ = of([]);
      component.subscribeToInfoMessageCommService();
      fixture.detectChanges();
      expect(component.infoMessages).toEqual([]);
      expect(component.showInfoMessage).toBeFalsy();
    });
  });

});
