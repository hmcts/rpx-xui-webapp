import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'exui-staff-add-edit-user',
  templateUrl: './staff-add-user.component.html',
  styleUrls: ['./staff-add-user.component.scss']
})
export class StaffAddUserComponent {
  public formGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    email: new FormControl('', [Validators.required]),

    services: new FormControl(null, [Validators.required]),
    region: new FormControl('', [Validators.required]),

    primaryLocation: new FormControl(null, [Validators.required]),
    additionalLocations: new FormControl(null),

    userType: new FormControl(null, [Validators.required]),
    roles: new FormControl(null),
    jobTitle: new FormControl(null, [Validators.required]),
    'skills-scss': new FormControl(null),
    'skills-divorce': new FormControl(null)
  });

  constructor() {}
}
