import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { BookingCheckType, FilterConfig, FilterFieldOption, FilterService, GenericFilterComponent, GroupOptions } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit {
  // @Input() public formGroup!: FormGroup;
  public formId: string = 'staff-add-edit-user';
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[]
  };
  public roles: StaffFilterOption[] = [
    { key: 'case-allocator', label: 'Case Allocator' },
    { key: 'task-supervisor', label: 'Task Supervisor' },
    { key: 'staff-administrator', label: 'Staff Administrator' },
  ];
  public locations: StaffFilterOption[] = [{key: 'location-x', label: 'Location X'}, {key: 'location-y', label: 'Location Y'}, {key: 'location-z', label: 'Location Z'}];
  public filterConfig: FilterConfig;
  public errors$: Observable<ErrorMessage | undefined>;
  private previousUrl: string;
  private currentNavigation: Navigation;

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
          const checkYourAnswerUrl = '/staff/add-user/check-your-answers';
          if (this.previousUrl !== checkYourAnswerUrl) {
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
          name: 'firstName',
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
          name: 'lastName',
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
          name: 'email',
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
          name: 'region',
          type: 'select',
          title: 'Region',
          titleClasses: 'govuk-label govuk-label--m',
          options: [{ key: 'region-1', label: 'Region 1'}],
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
          minSelected: 1,
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
          options: [...this.locations],
          minSelected: 0,
          maxSelected: 0,
          maxWidth480px: true,
        },
        {
          name: 'userType',
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
          options: [...this.roles],
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
          // options: [],
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

    if (this.currentNavigation.extras && this.currentNavigation.extras.state && this.currentNavigation.extras.state.user && this.previousUrl.indexOf('/staff/users/user-details') >= 0) {
      this.filterConfig.copyFields = (frm: FormGroup): FormGroup => {
        frm.patchValue({
          firstName: null,
          lastName: null,
          email: null,
          region: this.currentNavigation.extras.state.user.region,
          services: this.getSelected(this.staffFilterOptions.services, this.currentNavigation.extras.state.user.services),
          jobTitle: this.getSelected(this.staffFilterOptions.jobTitles, this.currentNavigation.extras.state.user.jobTitle),
          locations:  this.currentNavigation.extras.state.user.locations,
          additionalLocations:  this.currentNavigation.extras.state.user.locations,
          roles: this.getSelected(this.roles, this.currentNavigation.extras.state.user.roles),
          skills: this.getSelectedSkills(this.staffFilterOptions.skills, this.currentNavigation.extras.state.user.skills),
          userType: this.currentNavigation.extras.state.user.userType,
          suspended: this.currentNavigation.extras.state.user.suspended,
          userCategory: this.currentNavigation.extras.state.user.userCategory
        });
        return frm;
      };
    }
  }

  private getSelected(allOptions: StaffFilterOption[], selectedOptions: string[]): boolean[] {
    const selected: boolean[] = [] ;
    allOptions.forEach((el: StaffFilterOption) => {
      if (selectedOptions.filter(s => s === el.key).length > 0 ) {
        selected.push(true);
      } else {
        selected.push(false);
      }
    });
    return selected;
  }

  private getSelectedSkills(allOptions: GroupOptions[], selectedOptions: string[]): boolean[] {
    const selected: boolean[] = [] ;
    allOptions.forEach((el: GroupOptions) => {
      el.options.forEach((op: FilterFieldOption) => {
        const selctedOption = selectedOptions.filter(s => s === op.key)
        if (selctedOption.length > 0 ) {
          selected.push(true);
        } else {
          selected.push(false);
        }
      });
    });
    return selected;
  }

}
