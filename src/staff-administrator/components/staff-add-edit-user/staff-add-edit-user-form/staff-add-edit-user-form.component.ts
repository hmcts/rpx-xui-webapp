import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupOptions, RefDataRegion } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffAddEditFormService } from '../../../services/staff-add-edit-form/staff-add-edit-form.service';
import { getFormValidationErrorMessages, groupItemsByGroupSize, setLocationErrorMessages } from '../../../utils/form/staff-form.utils';
import { StaffAddEditUserFormValidationMessages } from './staff-add-edit-user-form-validation-messages.enum';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit, AfterViewInit {
  public updateMode = false;
  public form: FormGroup;
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[],
    regions: RefDataRegion[]
  };

  public errors: ErrorMessage | false;
  public submitted = false;
  public VALIDATION_ERROR_MESSAGES = StaffAddEditUserFormValidationMessages;
  public skillOptionGroups$: Observable<GroupOptions[]>;
  public groupItemsByGroupSize = groupItemsByGroupSize;
  public wrongLocationError;
  private selectedServiceCodes = [];

  constructor(
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public readonly staffAddEditFormService: StaffAddEditFormService,
  ) {}

  public get baseLocationsFormControl() {
    return this.form?.get('base_locations') as FormControl;
  }

  public ngOnInit() {
    this.form = this.staffAddEditFormService.formGroup;
    this.updateMode = this.activatedRoute.snapshot.data.isUpdateMode;
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services,
      regions: this.activatedRoute.snapshot.data.regions
    };

    this.skillOptionGroups$ = this.staffAddEditFormService.selectedServiceCodes$.pipe(
      tap((selectedServiceCodes) => {
        this.selectedServiceCodes = selectedServiceCodes;
        const skillsControl = this.form.get('skills') as FormGroup;
        const allSkillGroups = Object.keys(skillsControl?.controls);

        for (const serviceCode of allSkillGroups) {
          if (!selectedServiceCodes.includes(serviceCode)) {
            // Set all to false if service is not selected
            const formControl = skillsControl?.get(serviceCode);
            formControl.setValue(formControl.value.map(() => false));
          }
        }
      }),
      map((serviceCodes) => this.staffFilterOptions.skills.filter((group) => serviceCodes.includes(group.group)))
    );
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  private locationsIncorrectForServices(): string[] {
    const selectedLocationList = this.baseLocationsFormControl.value[0] === null ? [] : this.baseLocationsFormControl.value;
    const primaryLocation = selectedLocationList.find((location) => location.is_primary);
    if (primaryLocation) {
      // if there is a primary location we know there should not be an error
      this.baseLocationsFormControl.setErrors(null);
    }
    const serviceList = this.selectedServiceCodes;
    const incorrectLocationList = [];
    selectedLocationList.forEach((location) => {
      const uneligibleLocation = location && location.service_codes ? location.service_codes.filter((serviceCode) => serviceList.includes(serviceCode)).length === 0 : true;
      if (uneligibleLocation) {
        incorrectLocationList.push(location.location);
      }
    });
    return incorrectLocationList;
  }

  public submitForm(form: FormGroup): void {
    this.errors = false;
    this.submitted = true;
    form.markAllAsTouched();
    this.wrongLocationError = null;
    const incorrectLocations = this.locationsIncorrectForServices();
    if (form.valid && incorrectLocations.length === 0) {
      this.router.navigate(['check-your-answers'], { relativeTo: this.activatedRoute });
    } else {
      if (incorrectLocations.length > 0) {
        this.wrongLocationError = setLocationErrorMessages(incorrectLocations);
        this.baseLocationsFormControl.setErrors({ 'incorrect': true });
      }
      this.errors = {
        title: 'There is a problem',
        description: 'Check the form for errors and try again.',
        multiple: true,
        errors: getFormValidationErrorMessages(form, incorrectLocations)
      };
      window.scrollTo(0, 0);
    }
  }

  public getServiceLabelFromKey(key: string): string {
    return this.staffFilterOptions.services.find((service) => service.key === key)?.label;
  }

  private fragmentFocus(): void {
    this.activatedRoute.fragment
      .pipe(take(1))
      .subscribe((frag) => {
        const element = document.getElementById(frag);
        if (element) {
          element.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
          element.focus();
        }
      });
  }
}
