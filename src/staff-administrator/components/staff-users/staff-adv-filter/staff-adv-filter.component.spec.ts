import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { staffFilterOptionsTestData } from '../../../test-data/staff-filter-options.test.data';
import { StaffAdvFilterComponent } from './staff-adv-filter.component';

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
                userTypes: staffFilterOptionsTestData.userTypes,
                jobTitles: staffFilterOptionsTestData.jobTitles,
                skills: staffFilterOptionsTestData.skills,
                services: staffFilterOptionsTestData.services
              }
            },
          }
        },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffAdvFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have All by default in job title', () => {
    const field = component.filterConfig.fields.find(f => f.name === 'user-job-title');
    expect(field.defaultOption.key).toBe('All');
    const element = fixture.debugElement.nativeElement;
    const userJobTitle = element.querySelector('#select_user-job-title');
    expect(userJobTitle.value).toBe('All');
  });

  it('should have All by default in user type', () => {
    const field = component.filterConfig.fields.find(f => f.name === 'user-type');
    expect(field.defaultOption.key).toBe('All');
    const element = fixture.debugElement.nativeElement;
    const userJobTitle = element.querySelector('#select_user-type');
    expect(userJobTitle.value).toBe('All');
  });
});
