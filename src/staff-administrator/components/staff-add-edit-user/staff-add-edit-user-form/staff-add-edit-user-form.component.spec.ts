import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { staffFilterOptionsTestData } from '../../../test-data/staff-filter-options.test.data';
import { StaffAddEditUserFormComponent } from './staff-add-edit-user-form.component';

@Component({selector: 'exui-staff-main-container', template: ''})
class StaffMainContainerStubComponent {}


describe('StaffAddEditUserFormComponent', () => {
  let component: StaffAddEditUserFormComponent;
  let fixture: ComponentFixture<StaffAddEditUserFormComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StaffAddEditUserFormComponent, StaffMainContainerStubComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'staff', component: StaffMainContainerStubComponent }
        ]),
        ReactiveFormsModule,
        HttpClientTestingModule,
        ExuiCommonLibModule
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
                services: staffFilterOptionsTestData.services,
              },
            },
          },
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(StaffAddEditUserFormComponent);
    component = fixture.componentInstance;

    router.initialNavigation();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call initForm which sets filterConfig on ngOnInit', () => {
    const spyOnInitForm = spyOn(component,  'initFormConfig');
    component.ngOnInit();
    expect(spyOnInitForm).toHaveBeenCalled();
    expect(component.filterConfig).toBeDefined();
  });

  it('should navigate to /staff when calling the cancelCallback from the form config', fakeAsync(() => {
    component.initFormConfig();
    component.filterConfig.cancelButtonCallback();
    tick();

    expect(location.path()).toBe('/staff');
    flush();
  }));
});
