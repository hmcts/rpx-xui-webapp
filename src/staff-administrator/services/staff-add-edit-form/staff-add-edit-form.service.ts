import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupOptions, RefDataRegion } from '@hmcts/rpx-xui-common-lib';
import { map, startWith } from 'rxjs/operators';
import { StaffFilterOption } from '../../models/staff-filter-option.model';
import { StaffUserIDAMStatus } from '../../models/staff-user-idam-status.enum';
import { StaffUser } from '../../models/staff-user.model';
import { buildCheckboxArray, filterItemsByBoolean } from '../../utils/form/staff-form.utils';
import { noPrimaryLocationValidator } from '../../utils/form/validators/no-primary-location.validator';

@Injectable()
export class StaffAddEditFormService {
  public staffFilterOptions: {
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[],
    regions: RefDataRegion[]
  };

  public formGroup: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {
    this.staffFilterOptions = {
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services,
      regions: this.activatedRoute.snapshot.data.regions
    };

    this.formGroup = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email_id: new FormControl(null, [Validators.required, Validators.email]),
      region_id: new FormControl(null, Validators.required),
      services: new FormArray([], Validators.required),
      base_locations: new FormControl([], [noPrimaryLocationValidator()]),
      user_type: new FormControl(null, Validators.required),
      task_supervisor: new FormControl(false), // Roles heading
      case_allocator: new FormControl(false), // Roles
      staff_admin: new FormControl(false), // Roles heading
      roles: new FormArray([], Validators.required), // Job title heading
      skills: new FormGroup({}),
      suspended: new FormControl(false),
      up_idam_status: new FormControl(StaffUserIDAMStatus.PENDING)
    });

    // Services
    const serviceFormArray = buildCheckboxArray(this.staffFilterOptions.services, 1, 225);
    this.formGroup.setControl('services', serviceFormArray);

    // Job titles
    const jobTitlesFormArray = buildCheckboxArray(this.staffFilterOptions.jobTitles, 1, 225);
    this.formGroup.setControl('roles', jobTitlesFormArray); // Roles are corresponding to the job titles form controls

    // Skills
    const skillsFormGroup = new FormGroup({});
    this.staffFilterOptions.skills.forEach((item) => {
      const newFormArray = new FormArray([]);
      item.options.forEach(() => {
        newFormArray.push(new FormControl(false));
      });
      skillsFormGroup.addControl(item.group, newFormArray);
    });
    this.formGroup.setControl('skills', skillsFormGroup);
  }

  public get selectedServiceCodes$() {
    const servicesFormControl = this.formGroup.get('services') as FormArray;
    return servicesFormControl.valueChanges.pipe(
      startWith([...servicesFormControl.value]),
      map((value) => {
        return filterItemsByBoolean<StaffFilterOption>(this.staffFilterOptions.services, value).map((item) => item.key);
      })
    );
  }

  public get valuesAsStaffUser() {
    const formValues = this.formGroup.value;
    const staffUser = new StaffUser();
    Object.assign(staffUser, formValues);
    staffUser.region_id = Number(staffUser.region_id);
    staffUser.region = this.staffFilterOptions.regions.find((item) => Number(item.region_id) === staffUser.region_id)?.description;
    staffUser.roles = filterItemsByBoolean<StaffFilterOption>(this.staffFilterOptions.jobTitles, formValues.roles)
      .map((item) => ({ role_id: item.key, role: item.label, is_primary: true }));
    staffUser.services = filterItemsByBoolean<StaffFilterOption>(this.staffFilterOptions.services, formValues.services)
      .map((item) => ({ service: item.label, service_code: item.key }));

    const skillGroupIds = Object.keys(formValues.skills);
    const selectedSkills = skillGroupIds.reduce((previousValue, currentValue) => {
      const skillGroupOptions = this.staffFilterOptions.skills.find((item) => item.group === currentValue)?.options;
      const mappedValues = filterItemsByBoolean(skillGroupOptions, formValues.skills[currentValue]);
      return [...previousValue, ...mappedValues];
    }, [] as any[]);
    staffUser.skills = selectedSkills.map((item) => ({ skill_id: item.key, description: item.label }));

    return staffUser;
  }

  public patchFormValues(staffUserDetails: StaffUser) {
    this.formGroup.patchValue({
      ...staffUserDetails
    });

    // Services
    const serviceFormArray = buildCheckboxArray(this.staffFilterOptions.services, 1, 225,
      staffUserDetails.services ? staffUserDetails.services.map((service) => service.service_code) : []
    );
    this.formGroup.setControl('services', serviceFormArray);

    // Job titles
    const jobTitlesFormArray = buildCheckboxArray(this.staffFilterOptions.jobTitles, 1, 225,
      staffUserDetails.roles ? staffUserDetails.roles.map((roles) => roles.role_id) : []
    );
    this.formGroup.setControl('roles', jobTitlesFormArray); // Roles are corresponding to the job titles form controls

    // Skills
    const skillsFormGroup = new FormGroup({});
    this.staffFilterOptions.skills.forEach((item) => {
      const newFormArray = new FormArray([]);
      item.options.forEach((option) => {
        const checked = staffUserDetails.skills ? staffUserDetails.skills.some((skill) => skill.skill_id === Number(option.key)) : false;
        newFormArray.push(new FormControl(checked));
      });
      skillsFormGroup.addControl(item.group, newFormArray);
    });
    this.formGroup.setControl('skills', skillsFormGroup);
    // this.formGroup.mark
  }
}
