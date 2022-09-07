import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffSearchComponent } from './staff-search.component';

describe('StaffSearchComponent', () => {
  let component: StaffSearchComponent;
  let fixture: ComponentFixture<StaffSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSearchComponent ],
      imports: [
        HttpClientTestingModule,
        ExuiCommonLibModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
