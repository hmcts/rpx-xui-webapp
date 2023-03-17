import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BookingCheckType,
  FilterConfig,
  FilterService,
  GenericFilterComponent,
  GroupOptions
} from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { STAFF_REGIONS } from '../../../models/staff-regions';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public editMode = false;
  public formId: string = '';
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[],
    locations: LocationByEPIMMSModel[];
  };
  public roles: StaffFilterOption[] = [
    { key: 'case-allocator', label: 'Case allocator' },
    { key: 'task-supervisor', label: 'Task supervisor' },
    { key: 'staff-administrator', label: 'Staff administrator' },
  ];
  public filterConfig: FilterConfig;
  public errors$: Observable<ErrorMessage | undefined>;
  private filterStreamSubscription: Subscription;

  @ViewChild(GenericFilterComponent) public genericFilterComponent: GenericFilterComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private filterService: FilterService,
  ) {}

  public ngOnInit() {
    this.formId = this.activatedRoute.snapshot.data.formId;
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services,
      locations: this.activatedRoute.snapshot.data.locations
    };

    this.initFormConfig();
    this.filterStreamSubscription = this.filterService.getStream(this.formId).subscribe(data => {
      if (data) {
        if (data.reset) {
          this.resetForm();
        } else {
          if (this.genericFilterComponent?.submitted) {
            this.router.navigate(['check-your-answers'], { relativeTo: this.activatedRoute });
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
      }),
      tap((errors) => {
        if (errors) {
          window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
        }
      })
    );
  }

  public ngOnDestroy() {
    this.filterStreamSubscription?.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public fragmentFocus(): void {
    this.activatedRoute.fragment.subscribe(frag => {
      const element = document.getElementById(frag);
      if (element) {
        element.scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});
        element.focus();
      }
    });
  }

  public resetForm() {
    this.filterService.clearSessionAndLocalPersistance(this.formId);
    this.filterService.givenErrors.next(null);
  }

  public initFormConfig() {
    console.log(...this.staffFilterOptions.services);
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
          readonly: this.editMode
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
          options: [],
          enableAddButton: true,
          minSelected: 0,
          maxSelected: 0,
          maxWidth480px: true,
        },
        {
          name: 'user_type',
          type: 'select',
          title: 'User type',
          titleClasses: 'govuk-label govuk-label--m',
          options: [...this.staffFilterOptions.userTypes.map(item => ({key: item.label, label: item.label}))],
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
      applyButtonText: this.editMode ? 'Save changes' : 'Continue',
      cancelButtonText: 'Cancel',
      enableDisabledButton: false,
      showCancelFilterButton: true,
      cancelButtonCallback: () => {
        this.router.navigateByUrl('/staff');
      }
    };
  }
}
