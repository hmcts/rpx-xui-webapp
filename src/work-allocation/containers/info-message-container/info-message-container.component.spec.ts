import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InfoMessageContainerComponent } from '..';
import { InfoMessageCommService } from '../../../app/shared/services/info-message-comms.service';
import { WorkAllocationComponentsModule } from '../../components/work-allocation.components.module';

@Component({
  template: `<exui-info-message-container></exui-info-message-container>`
})
class WrapperComponent {
  @ViewChild(InfoMessageContainerComponent, {static: true}) public appComponentRef: InfoMessageContainerComponent;
}

describe('WorkAllocation', () => {
  describe('InfoMessageContainerComponent', () => {
    let router: Router;
    let component: InfoMessageContainerComponent;
    let wrapper: WrapperComponent;
    let fixture: ComponentFixture<WrapperComponent>;

    const mockMessageService = jasmine.createSpyObj('messageService', ['infoMessageChangeEmitted$']);

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ WrapperComponent ],
        imports: [
          RouterTestingModule, WorkAllocationComponentsModule ],
        providers: [ { provide: InfoMessageCommService, useValue: mockMessageService } ]
      })
      .compileComponents();

      fixture = TestBed.createComponent(WrapperComponent);
      wrapper = fixture.componentInstance;
      component = wrapper.appComponentRef;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    xit('should create', () => {
      expect(component).toBeDefined();
    });
  });
});
