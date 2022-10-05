import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { StaffEditUserComponent } from './staff-edit-user.component';

describe('StaffEditUserComponent', () => {
  let component: StaffEditUserComponent;
  let fixture: ComponentFixture<StaffEditUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffEditUserComponent ],
      imports: [
        ReactiveFormsModule,
        ExuiCommonLibModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditUserComponent);
    component = fixture.componentInstance;
    component.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      email: new FormControl('', [Validators.required]),

      services: new FormControl(null, [Validators.required]),
      region: new FormControl(null, [Validators.required]),

      primaryLocation: new FormControl(null, [Validators.required]),
      additionalLocations: new FormControl(null),

      userType: new FormControl(null, [Validators.required]),
      roles: new FormControl(null),
      jobTitle: new FormControl(null, [Validators.required]),
      'skills-scss': new FormControl(null),
      'skills-divorce': new FormControl(null)
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
