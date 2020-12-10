import { Component, Input, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoMessage, InfoMessageType } from './../../enums';
import { WorkAllocationComponentsModule } from './../work-allocation.components.module';
import { InfoMessageComponent } from './info-message.component';

@Component({
  template: `<exui-info-message [type]="type" [message]="message"></exui-info-message>`
})
class WrapperComponent {
  @ViewChild(InfoMessageComponent) public appComponentRef: InfoMessageComponent;
  @Input() public type: InfoMessageType;
  @Input() public message: InfoMessage;
}

describe('WorkAllocation', () => {

  describe('InfoMessageComponent', () => {
    let component: InfoMessageComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ]
      }).compileComponents();
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    /**
     * Due to the assistive text 'Success', 'Warning' or 'information' are part of the innerText.
     *
     * Hence we have to use .contain to check if the info message is part of the innerText.
     */
    it('should take in a message, and show the message to the User.', () => {

      component.type = InfoMessageType.SUCCESS;
      component.message = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessage.TASK_NO_LONGER_AVAILABLE);
    });

    /**
     * We should show the 'information' message visual if the InfoMessageType is 'information',
     * the 'warning' message visual if the InfoMessageType is 'warning', and
     * the 'success' message visual if the InfoMessageType is 'success'.
     */
    it('should take in an info message type ie.\'success\', and the correct Information Message Visual should be shown' +
      'to the user.', () => {

      component.type = InfoMessageType.SUCCESS;
      component.message = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessageType.SUCCESS);

      component.type = InfoMessageType.WARNING;
      component.message = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessageType.WARNING);

      component.type = InfoMessageType.INFO;
      component.message = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessageType.INFO);
    });
  });

});
