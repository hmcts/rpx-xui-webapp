import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HmctsBannerComponent } from '@hmcts/rpx-xui-common-lib';
import { StaffSuspendedBannerComponent } from './staff-suspended-banner.component';

describe('StaffSuspendedBannerComponent', () => {
  let component: StaffSuspendedBannerComponent;
  let fixture: ComponentFixture<StaffSuspendedBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSuspendedBannerComponent, HmctsBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSuspendedBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
