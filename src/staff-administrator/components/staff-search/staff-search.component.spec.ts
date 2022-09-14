import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';
import { StaffDataFilterService } from '../../services/staff-data-filter.service';
import { StaffSearchComponent } from './staff-search.component';

describe('StaffSearchComponent', () => {
  let component: StaffSearchComponent;
  let fixture: ComponentFixture<StaffSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSearchComponent ],
      imports: [
        HttpClientTestingModule,
        ExuiCommonLibModule,
        ReactiveFormsModule
      ],
      providers: [StaffDataFilterService, StaffDataAccessService]
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
