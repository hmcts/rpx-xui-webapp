import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BookingCheckType,
  FilterConfig,
  FilterConfigOption,
  FilterFieldConfig,
  FilterService,
  GenericFilterComponent,
  GroupOptions
} from '@hmcts/rpx-xui-common-lib';
import { LocationByEPIMMSModel } from '@hmcts/rpx-xui-common-lib/lib/models/location.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SessionStorageService } from 'src/app/services';
import { ErrorMessage } from '../../../../app/models';
import { Region } from '../../../../work-allocation/models/dtos';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { getValues, maxSelectedValidator, minSelectedValidator } from '../../../utiils/staff.utils';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public editMode = false;
  public formId: string = '';
  public form: FormGroup;
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[],
    locations: LocationByEPIMMSModel[];
  };
  public regions: FilterConfigOption[] = [];
  public newRegions: Region[] = [];
  public roles: StaffFilterOption[] = [
    { key: 'case-allocator', label: 'Case allocator' },
    { key: 'task-supervisor', label: 'Task supervisor' },
    { key: 'staff-administrator', label: 'Staff administrator' },
  ];
  public filteredSkillsByServices: GroupOptions[];
  public filteredSkillsByServicesCheckbox: FilterConfigOption[];
  public previousSelectedNestedCheckbox: string[] = [];
  public filterConfig: FilterConfig;
  public errors$: Observable<ErrorMessage | undefined>;
  private filterStreamSubscription: Subscription;
  public formSubmissionEvent$ = new Subject<void>();
  public submitted = false;
  public locationField = {
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
    findLocationField: 'user-services'
  }
  public additionalLocationField = {
    name: 'primaryLocation',
    type: 'find-location',
    title: 'Additional Locations',
    subTitle: 'A user can only have one primary location.',
    locationTitle: 'Enter a location name',
    options: [],
    minSelected: 0,
    maxSelected: 1,
    displayMinSelectedError: true,
    minSelectedError: 'Select at least one location',
    bookingCheckType: BookingCheckType.NO_CHECK,
    maxWidth480px: true,
    findLocationField: 'user-services'
  }
  public newFilterConfig : FilterFieldConfig[] = [
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
        options: [...this.regions],
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
        options: null,
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
        findLocationField: 'user-services',
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
      }
    ];

  private static addFormValidators(min: number, max: number): Validators {
    const validators = [];
    if (min && min > 0) {
      validators.push(minSelectedValidator(min));
    }

    if (max && max > 0) {
      validators.push(maxSelectedValidator(max));
    }

    return validators;
  }

  @ViewChild(GenericFilterComponent) public genericFilterComponent: GenericFilterComponent;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private filterService: FilterService,
    private sessionStorageService: SessionStorageService
  ) {}

  public ngOnInit() {
    this.formId = this.activatedRoute.snapshot.data.formId;
    this.form = this.fb.group({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email_id: new FormControl(null, Validators.required),
      select_region_id: new FormControl(null, Validators.required),
      select_user_type_id: new FormControl(null, Validators.required)
    });
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services,
      locations: this.activatedRoute.snapshot.data.locations
    };
    this.newRegions = this.activatedRoute.snapshot.data.regions;
    console.log(this.newRegions, 'are regions');
    this.newRegions.forEach(region => {
      const thisRegion = {key: region.region_id, label: region.description};
      this.regions.push(thisRegion);
    });
    console.log(this.staffFilterOptions.services);
    const serviceFormArray = this.buildCheckboxArray('service', this.staffFilterOptions.services, 1, 225);
    this.form.addControl('service', serviceFormArray);
    const rolesFormArray = this.buildCheckboxArray('roles', this.roles, 0, 99);
    this.form.addControl('roles', rolesFormArray);
    const jobTitleFormArray = this.buildCheckboxArray('jobTitle', this.staffFilterOptions.jobTitles, 1, 99);
    this.form.addControl('jobTitle', jobTitleFormArray);
    const skillsFormArray = this.buildCheckboxArray('skills', this.staffFilterOptions.skills.map(a => a.options).reduce((a, b) => a.concat(b)), 0, 10);
    this.form.addControl('skills', skillsFormArray);
    this.initFormConfig();
    console.log(this.staffFilterOptions.services.map(service => service.label))
    this.filterSkillsByServices(this.staffFilterOptions.services.map(service => service.label));
    this.startFilterSkillsByServices(this.form);
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

  private buildCheckboxArray(name: string, options: StaffFilterOption[], min: number, max: number): FormArray {
    const validators = StaffAddEditUserFormComponent.addFormValidators(min, max);
    const formArray = this.fb.array([], validators);
    let defaultValues;
    // will need to set default values at some point
    /* if (settings && settings.fields) {
      defaultValues = settings.fields.find((f) => f.name === field.name);
    } */
    for (const option of options) {
      let checked = false;
      if (defaultValues && Array.isArray(defaultValues.value)) {
        checked = !!defaultValues.value.find((value) => value === option.key);
      }
      formArray.push(new FormControl(checked));
    }

    return formArray;
  }

  public ngOnDestroy() {
    this.filterStreamSubscription?.unsubscribe();
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public toggleSelectServices(event: any, form: FormGroup, item: { key: string; label: string; selectAll?: true }): void {
    this.startFilterSkillsByServices(form);
  }

  public toggleSelectSkills(event: any, form: FormGroup, item: { key: string; label: string; selectAll?: true }): void {
    const isChecked = event.target.checked;
    const formArray: FormArray = form.get('skills') as FormArray;
    if (isChecked) {
      const selectedIndex = this.staffFilterOptions.skills.map(a => a.options).reduce((a, b) => a.concat(b)).findIndex(option => Number(option.key) === Number(event.target.value));
      const selectedCheckbox = this.form.get('skills').value;
      selectedCheckbox[selectedIndex] = true;
      this.form.get('skills').setValue(selectedCheckbox);
      this.previousSelectedNestedCheckbox.push(event.target.value);
    } else {
      const index = this.previousSelectedNestedCheckbox.indexOf(event.target.value);
      if (index !== -1) {
        this.previousSelectedNestedCheckbox.splice(index, 1);
      }
    }
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

  public inputChanged() {
    console.log('input changed');
  }

  public filterSkillsByServices(services: string[]) {
    console.log(services, 'are services');
    this.filteredSkillsByServices = [];
    this.filteredSkillsByServicesCheckbox = [];
    const userSkills = this.staffFilterOptions.skills;
    if (!services || services.length === 0) {
      this.filteredSkillsByServices = userSkills;
    } else {
      services.forEach(s => {
        const groupOption = userSkills.find(u => u.group.toLowerCase() === s.toLowerCase());
        if (groupOption) {
          this.filteredSkillsByServices.push(groupOption);
        }
      });
      this.filteredSkillsByServicesCheckbox = this.filteredSkillsByServices.map(skill => {
        return skill.options;
      }).reduce((a, b) => {
        return a.concat(b);
      }, []);

      this.form.setControl('skills', new FormArray([]));

      if (false) {
      // if copying fields, will work this out later
/*       if (!this._config.copyFields) {
        this.filteredSkillsByServicesCheckbox.forEach(() => {
          (this.form.get('skills') as FormArray).push(new FormControl(false));
        });

        const prevValues = this.filteredSkillsByServicesCheckbox.map(skill => {
          let selected = false;
          if (this.settings && this.settings.fields) {
            if (this.previousSelectedNestedCheckbox.length > 0) {
              selected = this.previousSelectedNestedCheckbox.includes(skill.key);
            }
            let isSelectedUserSkill: number;
            const selectedUserSkills = this.settings.fields.find(setting => setting.name === 'user-skills');
            if (selectedUserSkills && selectedUserSkills.value && selectedUserSkills.value.length > 0) {
              isSelectedUserSkill = selectedUserSkills.value.findIndex(val => Number(val) === Number(skill.key));
              selected = isSelectedUserSkill !== -1;
            }
            if (this.previousSelectedNestedCheckbox.length > 0) {
              // Pick up from previous selected
              selected = this.previousSelectedNestedCheckbox.includes(String(skill.key));
            }
          }

          return selected;
        });

        this.form.get('user-skills').setValue(prevValues); */
      } else {
        const preSelectedSkills: boolean[] = [];

        // presumably adds pre-selected skills but preselectednestedcheckbox not being used currently
        /* this.filteredSkillsByServicesCheckbox.map((skillsByServices, index) => {
          for(let i = 0; i<this._config.preSelectedNestedCheckbox.length; i++) {
            const skillCopyValue = this._config.preSelectedNestedCheckbox[i];

            if(skillCopyValue.toString() === skillsByServices.key.toString()) {
              preSelectedSkills[index] = true;
              break;
            } else {
              preSelectedSkills[index] = false;
            }
          }
        }); */

        if(preSelectedSkills.length > 0) {
          preSelectedSkills.forEach((h) => {
            (this.form.get('skills') as FormArray).push(new FormControl(h));
          });
        } else {
          this.filteredSkillsByServicesCheckbox.map(() => {
            (this.form.get('skills') as FormArray).push(new FormControl(false));
          });
        }
      }
      return this.filteredSkillsByServicesCheckbox;
    }

    this.filteredSkillsByServices = this.sortGroupOptions(this.filteredSkillsByServices);

    return this.filteredSkillsByServices;
  }

  private sortGroupOptions(groupOptions: GroupOptions[]): GroupOptions[] {
    const sortedResults: GroupOptions[] = [];
    const groups = groupOptions.map(go => go.group);
    groups.sort().forEach(g => {
      const options = groupOptions.find((go: any) => go.group === g).options;
      const sortedOptions = options.sort((a, b) => {
        return a.label.toLowerCase() > b.label.toLowerCase() ? 1 : (b.label.toLowerCase() > a.label.toLowerCase() ? -1 : 0);
      });
      const result = {
        group : g,
        options: sortedOptions
      };
      sortedResults.push(result);
    });
    return sortedResults;
  }

  private startFilterSkillsByServices(form: FormGroup) {
    const servicesArray: string[] = [];
    console.log(this.form, 'is form');
    form.value['service'].map((service: boolean, index: number) => {
      if (service) {
        console.log(index, 'is service')
        servicesArray.push(this.staffFilterOptions.services[index].key);
      }
    });
    this.filterSkillsByServices(servicesArray);
  }

  public applyForm(form: FormGroup): void {
    this.formSubmissionEvent$.next();
    this.submitted = true;
    form.markAsTouched();
    if (form.valid) {
      const settings = {
        id: 'add-user',
        idamId: this.filterService.getUserId(),
        fields: this.getSelectedValues(form.value)
      };
      this.filterService.givenErrors.next(null);
      const sessionSettings = {...settings, reset: false};
      this.sessionStorageService.setItem('add-user', JSON.stringify(sessionSettings));
    } else {
      // this.emitFormErrors(form);
    }

  }

  private getSelectedValues(formValues: any): any {
    console.log('selected values')
    /* return Object.keys(formValues).map((name: string) => {
      const values = formValues[name];
      if (Array.isArray(values)) {
        if (form === 'find-location' || field.type === 'find-service') {
          return {value: values, name};
        } else {
          return {value: getValues(field.options, values), name};
        }
      } else {
        return {value: [values], name};
      }
    }); */
  }

  public cancelForm(): void {
    /* this.buildForm(this.config, this.settings, true);
    if (this.config && this.config.cancelSetting) {
      this._settings.fields = JSON.parse(JSON.stringify(this.config.cancelSetting.fields));
    }
    const settings = {...this.settings, reset: true};
    this.filterService.persist(settings, this.config.persistence);
    this.filterService.givenErrors.next(null);
    this.submitted = false;

    if (this.config.cancelButtonCallback) {
      this.config.cancelButtonCallback();
    } */
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
          options: [...this.regions],
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
          findLocationField: 'user-services',
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
