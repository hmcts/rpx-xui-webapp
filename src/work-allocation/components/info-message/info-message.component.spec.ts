import { Component, Input, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {InfoMessage, InfoMessageType} from './../../enums';
import { WorkAllocationComponentsModule } from './../work-allocation.components.module';
import { InfoMessageComponent } from './info-message.component';

@Component({
  template: `<exui-info-message [infoMessageType]="infoMessageType" [infoMessage]="infoMessage"></exui-info-message>`
})
class WrapperComponent {
  @ViewChild(InfoMessageComponent) public appComponentRef: InfoMessageComponent;
  @Input() public infoMessageType: InfoMessageType;
  @Input() public infoMessage: InfoMessage;
}

describe('WorkAllocation', () => {

  describe('InfoMessageComponent', () => {
    let component: InfoMessageComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [ WorkAllocationComponentsModule ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      fixture.detectChanges();
    });

    /**
     * Due to the assistive text 'Success', 'Warning' or 'information' are part of the innerText.
     *
     * Hence we have to use .contain to check if the info message is part of the innerText.
     */
    it('should take in a message, and show the message to the User.', () => {

      component.infoMessageType = InfoMessageType.SUCCESS;
      component.infoMessage = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessage.TASK_NO_LONGER_AVAILABLE);
    });

    /**
     * We should show the Information Message visual if the InfoMessageType is 'information',
     * the Warning Message visual if the InfoMessageType is 'warning', and
     * the Success Message visual if the InfoMessageType is 'success'.
     */
    it('should take in an info message type ie.\'success\', and the correct Information Message Visual should be shown' +
      'to the user.', () => {

      component.infoMessageType = InfoMessageType.SUCCESS;
      component.infoMessage = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessageType.SUCCESS);

      component.infoMessageType = InfoMessageType.WARNING;
      component.infoMessage = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessageType.WARNING);

      component.infoMessageType = InfoMessageType.INFO;
      component.infoMessage = InfoMessage.TASK_NO_LONGER_AVAILABLE;

      fixture.detectChanges();

      expect(fixture.debugElement.nativeElement.innerText).toContain(InfoMessageType.INFO);
    });
  });

});
