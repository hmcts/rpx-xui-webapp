import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { FilterFieldConfig } from '@hmcts/rpx-xui-common-lib/lib/models';
import { StaffFilterOption } from '../../models/staff-filter-option.model';

@Component({
  selector: 'exui-staff-edit-user',
  templateUrl: './staff-edit-user.component.html',
  styleUrls: ['./staff-edit-user.component.scss']
})
export class StaffEditUserComponent implements OnInit {
  @Input() public formGroup: FormGroup;
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: StaffFilterOption[],
    services: StaffFilterOption[]
  };

  public govUiFields: {
    [x: string]: {
      config: GovUiConfigModel, errors: ErrorMessagesModel, items?: { label: string, value: string; id: string }[], validators?: ValidatorFn[]; }
  };

  public locationFieldConfig: { [x: string]: FilterFieldConfig } = {
    primaryLocation: {
      name: 'Primary Location',
      options: [],
      minSelected: 1,
      maxSelected: 1,
      type: 'find-location',
    },
    additionalLocations: {
      name: 'Primary Location',
      options: [],
      minSelected: 0,
      maxSelected: 10,
      type: 'find-location',
    }
  };

  constructor(private route: ActivatedRoute) {
    this.staffFilterOptions = {
      userTypes: this.route.snapshot.data.userTypes,
      jobTitles: this.route.snapshot.data.jobTitles,
      skills: this.route.snapshot.data.skills,
      services: this.route.snapshot.data.services
    };
    this.initFormOptions();
  }

  public ngOnInit() {
  }

  private initFormOptions() {
    this.govUiFields = {
      firstName: {
        config: {
          id: 'firstName',
          name: 'firstName',
          type: 'text',
          label: 'First Name',
          classes: '',
          fullWidth: true,
        },
        errors: {
          isInvalid: false,
          messages: []
        },
        validators: [Validators.maxLength(255)]
      },
      lastName: {
        config: {
          id: 'lastName',
          name: 'lastName',
          type: 'text',
          label: 'Last Name',
          classes: '',
          fullWidth: true,
        },
        errors: {
          isInvalid: false,
          messages: []
        }
      },
      email: {
        config: {
          id: 'email',
          name: 'email',
          type: 'email',
          label: 'Email',
          classes: '',
          fullWidth: true,
        },
        errors: {
          isInvalid: false,
          messages: []
        }
      },
      region: {
        config: {
          id: 'region',
            name: 'region',
            label: 'Region',
            classes: 'govuk-label--m govuk-!-margin-bottom-3',
            fullWidth: true
        },
        items: [
          {id: 'Region', label: 'Region', value: 'Region'}
        ],
          errors: {
          isInvalid: false,
          messages: []
        }
      },
      services: {
        config: {
          id: 'services',
            name: 'services',
            label: 'Services',
            classes: 'govuk-label--m govuk-!-margin-bottom-3',
            rows: 5
        },
        items: [
          ...this.staffFilterOptions.services
        ],
          errors: {
          isInvalid: false,
          messages: []
        },
      },
      userType: {
        config: {
          id: 'userType',
          name: 'userType',
          label: 'User Type',
          classes: 'govuk-label--m govuk-!-margin-bottom-3',
          fullWidth: true
        },
        items: [
          ...this.staffFilterOptions.userTypes
        ],
          errors: {
          isInvalid: false,
          messages: []
        },
      },
      roles: {
        config: {
          id: 'roles',
            name: 'roles',
            label: 'Roles',
            optional: true,
            classes: 'govuk-label--m govuk-!-margin-bottom-3',
        },
        items: [
          { id: 'case-allocator', label: 'Case Allocator', value: 'case-allocator' },
          { id: 'task-supervisor', label: 'Task Supervisor', value: 'task-supervisor' },
          { id: 'staff-administrator', label: 'Staff Administrator', value: 'staff-administrator' },
        ],
        errors: {
          isInvalid: false,
          messages: []
        },
      },
      jobTitle: {
        config: {
          id: 'jobTitle',
            name: 'jobTitle',
            label: 'Job title',
            classes: 'govuk-label--m govuk-!-margin-bottom-3',
            rows: 5
        },
        items: [
          ...this.staffFilterOptions.jobTitles
        ],
        errors: {
          isInvalid: false,
          messages: []
        },
      },
      'skills-scss': {
      config: {
        id: 'skills-scss',
          name: 'skills-scss',
          label: 'SCSS',
          classes: 'govuk-label--s govuk-!-margin-bottom-3',
      },
      items: [
        ...this.staffFilterOptions.skills
      ],
        errors: {
          isInvalid: false,
          messages: []
      },
    },
      'skills-divorce': {
      config: {
        id: 'skills-divorce',
          name: 'skills-divorce',
          label: 'Divorce',
          classes: 'govuk-label--s govuk-!-margin-bottom-3',
      },
      items: [
        { id: 'applications', label: 'Applications', value: 'applications' },
        { id: 'bulk-exceptions', label: 'Bulk Exceptions', value: 'bulk-exceptions' },
        { id: 'bulk-supplementary', label: 'Bulk Supplementary', value: 'bulk-supplementary' },
        { id: 'new-paper-cases', label: 'New Paper Cases', value: 'new-paper-cases' }
      ],
        errors: {
        isInvalid: false,
        messages: []
      },
    },
    };
  }

  public onSubmit() {
  }
}
