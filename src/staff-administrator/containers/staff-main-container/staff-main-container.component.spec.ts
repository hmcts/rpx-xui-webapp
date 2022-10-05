import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffStatusComponent } from 'src/staff-administrator/components/staff-status/staff-status.component';
import { ErrorMessageComponent } from '../../../app/components';
import { StaffAdvFilterComponent } from '../../components/staff-adv-filter/staff-adv-filter.component';
import { StaffSearchComponent } from '../../components/staff-search/staff-search.component';
import { StaffUserListComponent } from '../../components/staff-user-list/staff-user-list.component';
import { StaffDataAccessService } from '../../services/staff-data-access/staff-data-access.service';
import { StaffDataFilterService } from '../../services/staff-data-filter.service';
import { staffFilterOptionsTestData } from '../../test-data/staff-filter-options.test.data';
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
        StaffAdvFilterComponent,
        StaffUserListComponent,
        ErrorMessageComponent,
        StaffStatusComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ExuiCommonLibModule,
        CdkTableModule,
        ReactiveFormsModule,
      ],
      providers: [
        StaffDataFilterService,
        StaffDataAccessService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                staffFilters: staffFilterOptionsTestData
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
