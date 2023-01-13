import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingCheckType, FilterConfig, FilterService, GenericFilterComponent, GroupOptions } from '@hmcts/rpx-xui-common-lib';
import { FilterFieldOption } from '@hmcts/rpx-xui-common-lib/lib/models/filter.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffUser } from '../../../models/staff-user.model';
import { STAFF_REGIONS } from './staff-regions';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit, AfterViewInit {
  public formId: string = 'staff-add-edit-user';
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[]
  };
  public filterConfig: FilterConfig;
  public errors$: Observable<ErrorMessage | undefined>;
  private previousUrl: string;
  private userDetails: StaffUser | undefined;

  @ViewChild(GenericFilterComponent) public genericFilterComponent: GenericFilterComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private router: Router
  ) {
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation) {
      const previousNavigation = currentNavigation.previousNavigation;
      if (previousNavigation) {
        this.previousUrl = previousNavigation.finalUrl.toString();
      }
    }

    this.userDetails = this.router.getCurrentNavigation().extras.state &&
      this.router.getCurrentNavigation().extras.state.userDetails;

    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services
    };
  }

  public ngOnInit() {
    this.initFormConfig();

    this.filterService.getStream(this.formId).subscribe(data => {
      if (data) {
        if (data.reset) {
          this.resetForm();
        } else {
          if (this.genericFilterComponent.submitted) {
            const checkYourAnswerUrl = '/staff/add-edit-user/check-your-answers';
            this.router.navigateByUrl(checkYourAnswerUrl);
          }
        }
      }
    });

    this.errors$ = this.filterService.givenErrors.pipe(
      map((errors) => {
        if (errors) {
          return {
            title: 'There is a problem',
            description: '',
            multiple: true,
            errors
          };
        } else {
          return;
        }
      })
    );
  }

  public ngAfterViewInit() {
    if (this.userDetails) {
      const modifySelectedIndexes = (selectedKeys: string[] | number[], options: any[], previousValues: boolean[]) => {
        const trueIndexes = [];
        options.forEach((item, index) => {
          // @ts-ignore
          if (selectedKeys.includes(item.key)) {
            trueIndexes.push(index);
          }
        });

        const updatedValues = previousValues;
        trueIndexes.forEach(item => {
          updatedValues[item] = true;
        });

        return updatedValues;
      };

      const formValues = this.genericFilterComponent.form.value;

      const userServices = modifySelectedIndexes(
        this.userDetails.services.map(item => item.service_code),
        this.staffFilterOptions.services,
        formValues['user-services']
      );
      const userJobTitles = modifySelectedIndexes(
        this.userDetails.roles.map(item => Number(item.role_id)),
        this.staffFilterOptions.jobTitles,
        formValues['jobTitle']
      );

      const userSkills = modifySelectedIndexes(
        this.userDetails.skills.map(item => Number(item.skill_id)),
        this.staffFilterOptions.skills.reduce((prevValue: FilterFieldOption[], currentValue) => {
          prevValue.push(...currentValue.options);
          return prevValue;
        }, []),
        formValues['user-skills']
      );
      this.genericFilterComponent.form.patchValue({
        ...this.userDetails,
        'user-services': userServices,
        roles: [
          this.userDetails.case_allocator,
          this.userDetails.task_supervisor,
          this.userDetails.staff_admin,
        ],
        jobTitle: userJobTitles,
        'user-skills': userSkills,
      });

      const primaryLocation = this.userDetails.base_locations.find(item => item.is_primary);
      (this.genericFilterComponent.form.get('primaryLocation') as FormArray).push(new FormControl(
        {
          epimms_id: primaryLocation.location_id,
          site_name: primaryLocation.location
        }
      ));

      const additionalLocations = this.userDetails.base_locations.filter(item => !item.is_primary);
      additionalLocations.forEach(location => {
        const singleAdditionalLocationControl = new FormControl(
          {
            epimms_id: location.location_id,
            site_name: location.location
          }
        );

        (this.genericFilterComponent.form.get('additionalLocations') as FormArray).push(singleAdditionalLocationControl);
      });
    }
  }

  public resetForm() {
    this.filterService.clearSessionAndLocalPersistance(this.formId);
    this.filterService.givenErrors.next(null);
  }

  public initFormConfig() {
    this.filterConfig = {
      id: this.formId,
        fields: [
        {
          name: 'Personal Information',
          type: 'group-title',
          options: [],
          minSelected: 0,
          maxSelected: 0
        },
        {
          name: 'first_name',
          type: 'text-input',
          title: 'First Name',
          titleClasses: 'govuk-label',
          minSelected: 1,
          maxSelected: 255,
          displayMinSelectedError: true,
          minSelectedError: 'Enter the user’s first name',
          subTitle: '',
          options: [],
          maxWidth480px: true,
          maxlength: 255,
        },
        {
          name: 'last_name',
          type: 'text-input',
          title: 'Last Name',
          titleClasses: 'govuk-label',
          minSelected: 1,
          maxSelected: 255,
          displayMinSelectedError: true,
          minSelectedError: 'Enter the user’s last name',
          subTitle: '',
          options: [],
          maxWidth480px: true,
          maxlength: 255,
        },
        {
          name: 'email_id',
          type: 'email-input',
          title: 'Email',
          titleClasses: 'govuk-label',
          minSelected: 1,
          maxSelected: 255,
          displayMinSelectedError: true,
          minSelectedError: 'Enter an email address',
          emailError: 'Enter an email address in the correct format, like name@example.com',
          subTitle: '',
          options: [],
          maxWidth480px: true,
        },
        {
          name: 'region_id',
          type: 'select',
          title: 'Region',
          titleClasses: 'govuk-label govuk-label--m',
          options: [...STAFF_REGIONS],
          minSelected: 1,
          maxSelected: 10,
          minSelectedError: 'Select at least one region',
          displayMinSelectedError: true,
          lineBreakBefore: true,
          maxWidth480px: true,
        },
        {
          name: 'user-services',
          type: 'checkbox',
          title: 'Services',
          titleClasses: 'govuk-label govuk-label--m',
          minSelected: 1,
          maxSelected: 255,
          displayMinSelectedError: true,
          minSelectedError: 'Select at least one service',
          subTitle: '',
          options: [...this.staffFilterOptions.services],
          lineBreakBefore: true,
        },
        {
          name: 'Locations',
          type: 'group-title',
          titleClasses: 'govuk-label govuk-label--m govuk-!-margin-bottom-6',
          options: [],
          minSelected: 0,
          maxSelected: 0,
          lineBreakBefore: true,
        },
        {
          name: 'primaryLocation',
          type: 'find-location',
          title: 'Primary Location',
          subTitle: 'A user can only have one primary location.',
          locationTitle: 'Enter a location name',
          options: [],
          minSelected: 0,
          maxSelected: 1,
          displayMinSelectedError: true,
          minSelectedError: 'Select at least one location',
          bookingCheckType: BookingCheckType.NO_CHECK,
          maxWidth480px: true,
        },
        {
          name: 'additionalLocations',
          type: 'find-location',
          title: 'Additional locations',
          titleHint: '(optional)',
          locationTitle: 'Enter a location name',
          enableAddButton: true,
          options: [{key: 'location-1', label: 'Location 1'}, {key: 'location-2', label: 'Location 2'}],
          minSelected: 0,
          maxSelected: 0,
          maxWidth480px: true,
        },
        {
          name: 'user_type',
          type: 'select',
          title: 'User type',
          titleClasses: 'govuk-label govuk-label--m',
          options: [...this.staffFilterOptions.userTypes],
          minSelected: 1,
          maxSelected: 1,
          minSelectedError: 'Select at least one user type',
          displayMinSelectedError: true,
          lineBreakBefore: true,
          maxWidth480px: true,
        },
        {
          name: 'roles',
          type: 'checkbox',
          title: 'Roles',
          titleHint: '(optional)',
          titleClasses: 'govuk-label govuk-label--m',
          options: [
            { key: 'case-allocator', label: 'Case Allocator' },
            { key: 'task-supervisor', label: 'Task Supervisor' },
            { key: 'staff-administrator', label: 'Staff Administrator' },
          ],
          minSelected: 0,
          maxSelected: 99,
          lineBreakBefore: true,
          maxWidth480px: true,
        },
        {
          name: 'jobTitle',
          type: 'checkbox',
          title: 'Job title',
          titleClasses: 'govuk-label govuk-label--m',
          options: [...this.staffFilterOptions.jobTitles],
          minSelected: 1,
          maxSelected: 99,
          displayMinSelectedError: true,
          minSelectedError: 'Select at least one job title',
          maxWidth480px: true,
          lineBreakBefore: true,
        },
        {
          name: 'user-skills',
          type: 'nested-checkbox',
          title: 'Skills',
          titleHint: '(optional)',
          titleClasses: 'govuk-label govuk-label--m',
          options: [...this.staffFilterOptions.skills.map(a => a.options).reduce((a, b) => a.concat(b))],
          groupOptions: this.staffFilterOptions.skills,
          minSelected: 0,
          maxSelected: 10,
          maxWidth480px: true,
          lineBreakBefore: true,
        },
      ],
      persistence: 'session',
      applyButtonText: 'Continue',
      cancelButtonText: 'Cancel',
      enableDisabledButton: false,
      showCancelFilterButton: true,
      cancelButtonCallback: () => {
        this.router.navigateByUrl('/staff');
      }
    };
  }
}
