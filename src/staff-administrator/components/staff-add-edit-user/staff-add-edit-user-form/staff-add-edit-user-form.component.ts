import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Navigation, Router } from '@angular/router';
import { BookingCheckType, FilterConfig, FilterFieldOption, FilterService, GenericFilterComponent, GroupOptions, LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StaffSkill, StaffUser } from './../../../models/staff-user.model';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit, AfterViewInit {
  // @Input() public formGroup!: FormGroup;
  public formId: string = 'staff-add-edit-user';
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[],
    locations: LocationByEPIMMSModel[];
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
  public backLink: string;

  @ViewChild(GenericFilterComponent) public genericFilterComponent: GenericFilterComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private filterService: FilterService,
    private router: Router
  ) {
    this.currentNavigation = this.router.getCurrentNavigation();
    if (this.currentNavigation) {
      const previousNavigation = this.currentNavigation.previousNavigation;
      if (previousNavigation) {
        this.previousUrl = previousNavigation.finalUrl.toString();
      }
    }
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services,
      locations: this.activatedRoute.snapshot.data.locations
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
    this.backLink = this.filterConfig.copyFields? this.previousUrl: '/staff';
  }

  public resetForm() {
    this.filterService.clearSessionAndLocalPersistance(this.formId);
    this.filterService.givenErrors.next(null);
  }

  public initFormConfig() {
    const regionOptions = [{ key: 'region-1', label: 'Region 1'}]
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
          options: regionOptions,
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
      const copyUser: StaffUser = this.currentNavigation.extras.state.user;

      this.filterConfig.copyFields = (frm: FormGroup): FormGroup => {
        const selectedRegion = regionOptions.map(region => {
          if(region.label.toString() === copyUser.region.toString())
          {
            return region.key
          }
        });

        frm.patchValue({
          firstName: null,
          lastName: null,
          email: null,
          region: selectedRegion,
          'user-services': this.getSelectedByLabel(this.staffFilterOptions.services, copyUser.services),
          jobTitle: this.getSelectedByKey(this.staffFilterOptions.jobTitles, copyUser.role.map(role => role.role_id)),
          roles: this.getSelectedRoles(copyUser.case_allocator, copyUser.task_supervisor, copyUser.staff_admin),
          'user-skills': this.staffFilterOptions.skills,
          userType: this.getSelectedByName(this.staffFilterOptions.userTypes, copyUser.userType),
        });
        const additionalLocations = copyUser.additionalLocations;
        const primaryLocation = copyUser.primaryLocation;
        if(additionalLocations.length > 0) {
          const addLoc = (frm.controls['additionalLocations'] as FormArray);
          addLoc.push(new FormControl(this.getSelectedLocation(this.staffFilterOptions.locations, copyUser.additionalLocations)));
        }
        if(primaryLocation) {
          const primLoc = (frm.controls['primaryLocation'] as FormArray);
          primLoc.push(new FormControl(this.getSelectedLocation(this.staffFilterOptions.locations, [copyUser.primaryLocation])));
        }

        return frm;
      };

      this.filterConfig.preSelectedNestedCheckbox = copyUser.skills.map(skill => skill.skill_id);
    }
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

  private getSelectedLocation(allLocations: LocationByEPIMMSModel[],selectedLocations: any) {
    let locationsObject;
    allLocations.map(location => {
      selectedLocations.map(selectedLocation => {
        const selectedLoc = selectedLocation.location? selectedLocation.location.toString().toLowerCase(): selectedLocation.toString().toLowerCase();
        if(location.site_name.toString().toLowerCase() === selectedLoc) {
          locationsObject = location;
        }
      });
     });
     return locationsObject;
  }

  private getSelectedByName(allOptions: StaffFilterOption[], selectedOption: string) {
    let selectedKey: string;
    allOptions.forEach((el: StaffFilterOption) => {
      if(selectedOption.toString() === el.label.toString()) {
        selectedKey = el.key;
      }
    });
    return selectedKey;
  }

  private getSelectedRoles(selectedCaseAllocator: string, selectedTaskSupervisor: string, selectedStaffAdmin: string) {
    let task_supervisor_flag = false;
    let case_allocator_flag = false;
    let staff_admin_flag = false;
    case_allocator_flag = selectedCaseAllocator === 'Y'? true: false;
    task_supervisor_flag = selectedTaskSupervisor === 'Y'? true: false;
    staff_admin_flag = selectedStaffAdmin === 'Y'? true: false;

    return [case_allocator_flag, task_supervisor_flag, staff_admin_flag];
  }

  private getSelectedByKey(allOptions: StaffFilterOption[], selectedOptions: string[]): boolean[] {
    const selected: boolean[] = [] ;
    if (!Array.isArray(selectedOptions)) {
      selectedOptions = new Array(selectedOptions);
    }
    allOptions.forEach((el: StaffFilterOption) => {
      if (selectedOptions.filter(s => s.toString() === el.key.toString()).length > 0 ) {
        selected.push(true);
      } else {
        selected.push(false);
      }
    });
    return selected;
  }

  private getSelectedByLabel(allOptions: StaffFilterOption[], selectedOptions: string[]): boolean[] {
    const selected: boolean[] = [] ;
    if (!Array.isArray(selectedOptions)) {
      selectedOptions = new Array(selectedOptions);
    }
    allOptions.forEach((el: StaffFilterOption) => {
      if (selectedOptions.filter(s => s.toString() === el.label.toString()).length > 0 ) {
        selected.push(true);
      } else {
        selected.push(false);
      }
    });
    return selected;
  }
}
