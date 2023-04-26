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
      infoMessageChangeEmitted$: of([{ type: InfoMessageType.SUCCESS, message: InfoMessage.ASSIGNED_TASK }] as InformationMessage[]),
      removeAllMessages: () => {
        return undefined;
      }
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [InfoMessageContainerComponent],
        imports: [
          RouterTestingModule],
        providers: [
          { provide: InfoMessageCommService, useValue: mockMessageService },
          { provide: Router, useClass: MockRouteServices }
        ]
      })
        .compileComponents();

      fixture = TestBed.createComponent(InfoMessageContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
