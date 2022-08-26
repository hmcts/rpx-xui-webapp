import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { StaffRefDataHomeComponent } from './staff-ref-data-home.component';

describe('StaffRefDataHomeComponent', () => {
  let component: StaffRefDataHomeComponent;
  let fixture: ComponentFixture<StaffRefDataHomeComponent>;

  @Component({selector: 'exui-app-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'exui-app-footer', template: ''})
  class FooterStubComponent {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRefDataHomeComponent, HeaderStubComponent, FooterStubComponent ],
      imports: [
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRefDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
