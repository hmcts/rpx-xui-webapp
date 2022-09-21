import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffEditUserComponent } from '../staff-edit-user/staff-edit-user.component';
import { StaffAddUserComponent } from './staff-add-user.component';

describe('StaffAddUserComponent', () => {
  let component: StaffAddUserComponent;
  let fixture: ComponentFixture<StaffAddUserComponent>;

  @Component({selector: 'exui-app-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'exui-app-footer', template: ''})
  class FooterStubComponent {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffAddUserComponent,
        HeaderStubComponent,
        FooterStubComponent,
        StaffEditUserComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ExuiCommonLibModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
