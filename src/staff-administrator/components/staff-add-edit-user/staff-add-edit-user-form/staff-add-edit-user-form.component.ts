import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupOptions, RefDataRegion } from '@hmcts/rpx-xui-common-lib';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffAddEditFormService } from '../../../services/staff-add-edit-form/staff-add-edit-form.service';
import { getFormValidationErrorMessages, groupItemsByGroupSize } from '../../../utils/form/staff-form.utils';
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

  public submitForm(form: FormGroup): void {
    this.errors = false;
    this.submitted = true;
    form.markAllAsTouched();
    if (form.valid) {
      this.router.navigate(['check-your-answers'], { relativeTo: this.activatedRoute });
    } else {
      this.errors = {
        title: 'There is a problem',
        description: 'Check the form for errors and try again.',
        multiple: true,
        errors: getFormValidationErrorMessages(form)
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
