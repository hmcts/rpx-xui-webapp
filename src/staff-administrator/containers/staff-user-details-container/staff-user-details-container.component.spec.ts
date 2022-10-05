import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StaffStatusComponent } from '../../../staff-administrator/components/staff-status/staff-status.component';
import { StaffUserDetailsContainerComponent } from './staff-user-details-container.component';

describe('StaffUserDetailsContainerComponent', () => {
  let component: StaffUserDetailsContainerComponent;
  let fixture: ComponentFixture<StaffUserDetailsContainerComponent>;

  @Component({selector: 'exui-app-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'exui-app-footer', template: ''})
  class FooterStubComponent {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffUserDetailsContainerComponent,
        StaffStatusComponent,
        HeaderStubComponent,
        FooterStubComponent
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
