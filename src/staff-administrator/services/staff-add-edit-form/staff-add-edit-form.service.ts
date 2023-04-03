import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GroupOptions, RefDataRegion } from '@hmcts/rpx-xui-common-lib';
import { map, startWith } from 'rxjs/operators';
import { StaffFilterOption } from '../../models/staff-filter-option.model';
import { StaffUser } from '../../models/staff-user.model';
import { buildCheckboxArray, filterItemsByBoolean } from '../../utils/staff-form.utils';

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
      regions: this.activatedRoute.snapshot.data.regions,
    };

    this.formGroup = new FormGroup({
      first_name: new FormControl(null, Validators.required),
      last_name: new FormControl(null, Validators.required),
      email_id: new FormControl(null, [Validators.required, Validators.email]),
      region_id: new FormControl(null, Validators.required),
      services: new FormArray([], Validators.required),
      base_locations: new FormControl([], Validators.required),
      user_type: new FormControl(null, Validators.required),
      task_supervisor: new FormControl(false), // Roles heading
      case_allocator: new FormControl(false), // Roles
      staff_admin: new FormControl(false), // Roles heading
      roles: new FormArray([], Validators.required), // Job title heading
      skills: new FormArray([], Validators.required),
      suspended: new FormControl(false),
    });

    // Services
    const serviceFormArray = buildCheckboxArray(this.staffFilterOptions.services, 1, 225);
    this.formGroup.setControl('services', serviceFormArray);

    // Job titles
    const jobTitlesFormArray = buildCheckboxArray(this.staffFilterOptions.jobTitles, 1, 225);
    this.formGroup.setControl('roles', jobTitlesFormArray); // Roles are corresponding to the job titles form controls

    // Skills
    const skillsFormArray = buildCheckboxArray(
      this.staffFilterOptions.skills.map(a => a.options).reduce((a, b) => a.concat(b)),
      0, 10);
    this.formGroup.setControl('skills', skillsFormArray);
  }

  public get serviceCodes$() {
    const servicesFormControl = this.formGroup.get('services') as FormArray;
    return servicesFormControl.valueChanges.pipe(
      startWith([...servicesFormControl.value]),
      map((value) => {
        return filterItemsByBoolean<StaffFilterOption>(this.staffFilterOptions.services, value).map(item => item.key);
      })
    );
  }

  public get valuesAsStaffUser() {
    const formValues = this.formGroup.value;
    const staffUser = new StaffUser();
    Object.assign(staffUser, formValues);
    staffUser.region_id = Number(staffUser.region_id);
    staffUser.region = this.staffFilterOptions.regions.find(item => Number(item.region_id) === staffUser.region_id)?.description;
    staffUser.roles = filterItemsByBoolean<StaffFilterOption>(this.staffFilterOptions.jobTitles, formValues.roles)
      .map(item => ({ role_id: item.key, role: item.label, is_primary: true }));
    staffUser.skills = filterItemsByBoolean<StaffFilterOption>(
      this.staffFilterOptions.skills.map(a => a.options).reduce((a, b) => a.concat(b)),
      formValues.skills
    ).map((item) => ({ skill_id: Number(item.key), description: item.label }));
    staffUser.services = filterItemsByBoolean<StaffFilterOption>(this.staffFilterOptions.services, formValues.services)
      .map(item => ({ service: item.label, service_code: item.key }));

    return staffUser;
  }

  public patchFormValues(staffUserDetails: StaffUser) {
    this.formGroup.patchValue({
      ...staffUserDetails
    });

    // Services
    const serviceFormArray = buildCheckboxArray(this.staffFilterOptions.services, 1, 225,
      staffUserDetails ? staffUserDetails.services.map(service => service.service_code) : []
    );
    this.formGroup.setControl('services', serviceFormArray);

    // Job titles
    const jobTitlesFormArray = buildCheckboxArray(this.staffFilterOptions.jobTitles, 1, 225,
      staffUserDetails ? staffUserDetails.roles.map(roles => roles.role_id) : []
    );
    this.formGroup.setControl('roles', jobTitlesFormArray); // Roles are corresponding to the job titles form controls

    // Skills
    const skillsFormArray = buildCheckboxArray(
      this.staffFilterOptions.skills.map(a => a.options).reduce((a, b) => a.concat(b)),
      0, 10, staffUserDetails ? staffUserDetails.skills.map(skill => skill.skill_id) : []);
    this.formGroup.setControl('skills', skillsFormArray);
  }
}
