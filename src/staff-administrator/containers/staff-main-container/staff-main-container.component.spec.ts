import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffAdvFilterComponent } from '../../components/staff-adv-filter/staff-adv-filter.component';
import { StaffSearchComponent } from '../../components/staff-search/staff-search.component';
import { StaffUserListComponent } from '../../components/staff-user-list/staff-user-list.component';
import { StaffFilterOptions } from '../../test-data/staff-filter-options.test.data';
import { StaffMainContainerComponent } from './staff-main-container.component';

describe('StaffMainContainerComponent', () => {
  let component: StaffMainContainerComponent;
  let fixture: ComponentFixture<StaffMainContainerComponent>;

  @Component({selector: 'exui-app-header', template: ''})
  class HeaderStubComponent {
  }

  @Component({selector: 'exui-app-footer', template: ''})
  class FooterStubComponent {
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StaffMainContainerComponent,
        HeaderStubComponent,
        FooterStubComponent,
        StaffSearchComponent,
        StaffUserListComponent,
        StaffAdvFilterComponent
      ],
      imports: [
        HttpClientTestingModule,
        ExuiCommonLibModule,
        CdkTableModule,
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
    fixture = TestBed.createComponent(StaffMainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
