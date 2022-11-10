import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffUserCheckAnswersContainerComponent } from './staff-user-check-answers-container.component';

describe('StaffUserCheckAnswersContainerComponent', () => {
  let component: StaffUserCheckAnswersContainerComponent;
  let fixture: ComponentFixture<StaffUserCheckAnswersContainerComponent>;

  @Component({selector: 'exui-app-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'exui-app-footer', template: ''})
  class FooterStubComponent {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffUserCheckAnswersContainerComponent,
        HeaderStubComponent,
        FooterStubComponent
       ],
       imports: [
        RouterTestingModule,
        ExuiCommonLibModule
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserCheckAnswersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
