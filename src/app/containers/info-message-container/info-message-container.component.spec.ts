import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';

import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoMessageContainerComponent } from './info-message-container.component';
import { of } from 'rxjs';
import { InfoMessage } from '../../shared/enums/info-message';
import { InfoMessageType } from '../../shared/enums/info-message-type';
import { InformationMessage } from '../../shared/models';

class MockRouteServices {
  // Router
  public events = of(new NavigationEnd(0, 'http://localhost:4200/login', 'http://localhost:4200/login'));
}

describe('WorkAllocation', () => {
  describe('InfoMessageContainerComponent', () => {
    let component: InfoMessageContainerComponent;
    let fixture: ComponentFixture<InfoMessageContainerComponent>;
    const mockMessageService = {
      infoMessageChangeEmitted$: undefined,
      removeAllMessages: () => {
        return undefined;
      },
    };
    beforeEach(() => {
      mockMessageService.infoMessageChangeEmitted$ = of([]);

      TestBed.configureTestingModule({
        declarations: [InfoMessageContainerComponent],
        imports: [RouterTestingModule],
        providers: [
          { provide: InfoMessageCommService, useValue: mockMessageService },
          { provide: Router, useClass: MockRouteServices },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(InfoMessageContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });

    it('should show emitted messages when no state message is present', () => {
      const assignedMessage = { type: InfoMessageType.SUCCESS, message: InfoMessage.ASSIGNED_TASK } as InformationMessage;
      spyOnProperty(window, 'history', 'get').and.returnValue({
        state: null,
      } as History);
      mockMessageService.infoMessageChangeEmitted$ = of([assignedMessage]);

      component.getInfoMessages();

      expect(component.infoMessages).toEqual([assignedMessage]);
      expect(component.showInfoMessage).toBeTrue();
    });

    it('should remove duplicate messages after appending state message', () => {
      const assignedMessage = { type: InfoMessageType.SUCCESS, message: InfoMessage.ASSIGNED_TASK } as InformationMessage;
      spyOnProperty(window, 'history', 'get').and.returnValue({
        state: { showMessage: true, message: assignedMessage },
      } as History);
      mockMessageService.infoMessageChangeEmitted$ = of([assignedMessage]);

      component.getInfoMessages();

      expect(component.infoMessages).toEqual([assignedMessage]);
      expect(component.showInfoMessage).toBeTrue();
    });
  });
});
