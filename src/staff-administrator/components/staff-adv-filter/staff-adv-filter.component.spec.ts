import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffAdvFilterComponent } from './staff-adv-filter.component';
import { ActivatedRoute } from '@angular/router';
import { StaffFilterOptions } from '../../test-data/staff-filter-options.test.data';

describe('StaffAdvFilterComponent', () => {
  let component: StaffAdvFilterComponent;
  let fixture: ComponentFixture<StaffAdvFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffAdvFilterComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ExuiCommonLibModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                staffFilters: StaffFilterOptions
              }
            },
          }
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAdvFilterComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
