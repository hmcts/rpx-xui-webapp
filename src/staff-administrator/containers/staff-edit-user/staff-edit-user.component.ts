import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorMessagesModel, GovUiConfigModel } from '@hmcts/rpx-xui-common-lib/lib/gov-ui/models';
import { FilterFieldConfig } from '@hmcts/rpx-xui-common-lib/lib/models';

@Component({
  selector: 'exui-staff-edit-user',
  templateUrl: './staff-edit-user.component.html',
  styleUrls: ['./staff-edit-user.component.scss']
})
export class StaffEditUserComponent implements OnInit {
  @Input() public formGroup: FormGroup;

  public govUiFields: {
    [x: string]: { config: GovUiConfigModel, errors: ErrorMessagesModel, items?: { label: string, value: string; id: string; }[]; }
  } = {
    firstName: {
      config: {
        id: 'firstName',
        name: 'firstName',
        type: 'text',
        label: 'First Name',
        classes: '',
        fullWidth: true
      },
      errors: {
        isInvalid: false,
        messages: []
      },
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
        { id: 'family-public-law', label: 'Family Public Law', value: 'family-public-law' },
        { id: 'family-private-law', label: 'Family Private Law', value: 'family-private-law' },
        { id: 'adoption', label: 'Adoption', value: 'adoption' },
        { id: 'employment-tribunals', label: 'Employment Tribunals', value: 'employment-tribunals' },
        { id: 'financial-remedy', label: 'Financial Remedy', value: 'financial-remedy' },
        { id: 'immigration-and-asylum', label: 'Immigration and Asylum', value: 'immigration-and-asylum' },
        { id: 'civil', label: 'Civil', value: 'civil' },
        { id: 'special-tribunals', label: 'Special Tribunals', value: 'special-tribunals' },
        { id: 'divorce', label: 'Divorce', value: 'divorce' },
        { id: 'social-security-and-child-support', label: 'Social security and child support', value: 'social-security-and-child-support' },
        { id: 'housing-possessions', label: 'Housing Possessions', value: 'housing-possessions' },
        { id: 'probate', label: 'Probate', value: 'probate' },
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
        {id: 'userType', label: 'Select a user type', value: null}
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
        { id: 'senior-legal-caseworker', label: 'Senior Legal Caseworker', value: 'senior-legal-caseworker' },
        { id: 'legal-caseworker', label: 'Legal Caseworker', value: 'legal-caseworker' },
        { id: 'hearing-centre-team-leader', label: 'Hearing Centre Team Leader', value: 'hearing-centre-team-leader' },
        { id: 'hearing-centre-administrator', label: 'hearing Centre Administrator', value: 'hearing-centre-administrator' },
        { id: 'court-clerk', label: 'Court Clerk', value: 'court-clerk' },
        { id: 'national-business-centre-team-leader', label: 'National Business Centre Team Leader', value: 'national-business-centre-team-leader' },
        { id: 'national-business-centre-administrator', label: 'National Business Centre Administrator', value: 'national-business-centre-administrator' },
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
        { id: 'interloc-work', label: 'Interloc work', value: 'interloc-work' },
        { id: 'reasonable-adjustment-process', label: 'Reasonable Adjustment Process', value: 'reasonable-adjustment-process' },
        { id: 'using-optic', label: 'Using Optic', value: 'using-optic' },
        { id: 'welsh-cases', label: 'Welsh Cases', value: 'welsh-cases' }
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

  public fieldConfig: { [x: string]: FilterFieldConfig } = {
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
  constructor() { }

  public ngOnInit() {
  }
}
