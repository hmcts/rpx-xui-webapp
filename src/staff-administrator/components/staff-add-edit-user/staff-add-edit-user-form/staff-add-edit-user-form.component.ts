import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FilterConfig,
  FilterConfigOption,
  GroupOptions, RefDataRegion
} from '@hmcts/rpx-xui-common-lib';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ErrorMessage } from '../../../../app/models';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffAddEditFormService } from '../../../services/staff-add-edit-form.service/staff-add-edit-form.service';
import { getInvalidControlNames } from '../../../utiils/staff.utils';

@Component({
  selector: 'exui-staff-add-edit-user-form',
  templateUrl: './staff-add-edit-user-form.component.html',
  styleUrls: ['./staff-add-edit-user-form.component.scss']
})
export class StaffAddEditUserFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public editMode = false;
  public form: FormGroup;
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: GroupOptions[],
    services: StaffFilterOption[],
    userRoles: StaffFilterOption[],
    regions: RefDataRegion[]
  };
  public filteredSkillsByServices: GroupOptions[];
  public filteredSkillsByServicesCheckbox: FilterConfigOption[];
  public previousSelectedNestedCheckbox: string[] = [];
  public filterConfig: FilterConfig;
  public errors: ErrorMessage | false;
  public submitted = false;
  private regionControlSubscription: Subscription;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    public readonly staffAddEditFormService: StaffAddEditFormService,
  ) {
    this.form = staffAddEditFormService.formGroup;
  }

  public ngOnInit() {
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services,
      regions: this.activatedRoute.snapshot.data.regions,
      userRoles: [
        { key: 'case_allocator', label: 'Case allocator' },
        { key: 'task_supervisor', label: 'Task supervisor' },
        { key: 'staff_admin', label: 'Staff administrator' },
      ]
    };

    this.filterSkillsByServices(this.staffFilterOptions.services.map(service => service.label));
    this.startFilterSkillsByServices(this.form);
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
    this.activatedRoute.fragment
      .pipe(take(1))
      .subscribe(frag => {
      const element = document.getElementById(frag);
      if (element) {
        element.scrollIntoView({behavior: 'auto', block: 'center', inline: 'center'});
        element.focus();
      }
    });
  }

  public filterSkillsByServices(services: string[]) {
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

      const preSelectedSkills: boolean[] = [];

      if(preSelectedSkills.length > 0) {
        preSelectedSkills.forEach((h) => {
          (this.form.get('skills') as FormArray).push(new FormControl(h));
        });
      } else {
        this.filteredSkillsByServicesCheckbox.map(() => {
          (this.form.get('skills') as FormArray).push(new FormControl(false));
        });
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
    form.value['services'].map((service: boolean, index: number) => {
      if (service) {
        console.log(index, 'is service');
        servicesArray.push(this.staffFilterOptions.services[index].key);
      }
    });
    this.filterSkillsByServices(servicesArray);
  }

  public submitForm(form: FormGroup): void {
    this.errors = false;
    this.submitted = true;
    form.markAllAsTouched();
    console.log(this.form);
    console.log('Form Is Valid', this.form.valid);
    console.log('Form Value', this.form.value);
    if (form.valid) {
      this.router.navigate(['check-your-answers'], {relativeTo: this.activatedRoute});
    } else {
      const invalidFormControls = getInvalidControlNames(form);
      this.errors = {
        title: 'There is a problem',
        description: 'Check the form for errors and try again.',
        multiple: true,
        errors: invalidFormControls.map(controlName => ({ error: controlName, name: controlName }))
      };
    }
  }

  public ngOnDestroy() {
    this.regionControlSubscription?.unsubscribe();
  }
}
