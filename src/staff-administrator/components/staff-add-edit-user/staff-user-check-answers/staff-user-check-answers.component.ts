import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilterService } from '@hmcts/rpx-xui-common-lib';
import { StaffDataAccessService } from '../../../../staff-administrator/services/staff-data-access/staff-data-access.service';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';

@Component({
  selector: 'exui-staff-user-check-answers',
  templateUrl: './staff-user-check-answers.component.html',
  styleUrls: ['./staff-user-check-answers.component.scss']
})
export class StaffUserCheckAnswersComponent implements OnInit {
  public formId: string = 'staff-add-edit-user';
  public addUserData: {
    name: string;
    value: any[];
  }[];
  public staffFilterOptions: {
    userTypes: StaffFilterOption[],
    jobTitles: StaffFilterOption[],
    skills: StaffFilterOption[],
    services: StaffFilterOption[]
  };
  public firstName: string;
  public lastName: string;
  public email: string;
  public region: string;
  public services: string[];
  public primaryLocations;
  public additionalLocations;
  public userType: string;
  public roles: string[];
  public jobTitles: string[];
  public skills: string[];
  public servicePayload;
  public rolesPayload;

  constructor(
    private filterService: FilterService,
    private activatedRoute: ActivatedRoute,
    private staffDataAccessService: StaffDataAccessService
  ) {
    this.staffFilterOptions = {
      userTypes: this.activatedRoute.snapshot.data.userTypes,
      jobTitles: this.activatedRoute.snapshot.data.jobTitles,
      skills: this.activatedRoute.snapshot.data.skills,
      services: this.activatedRoute.snapshot.data.services
    };
  }

  public ngOnInit() {
    this.filterService.getStream(this.formId).subscribe(data => {
      this.addUserData = data.fields;
      console.log(this.addUserData);
      this.firstName = this.addUserData[0].value[0];
      this.lastName = this.addUserData[1].value[0];
      this.email = this.addUserData[2].value[0];
      this.region = this.addUserData[3].value[0];
      this.primaryLocations = this.addUserData[5].value[0];
      this.additionalLocations = this.addUserData[6].value;
      this.userType = this.addUserData[7].value[0];
      this.roles = this.addUserData[8].value;
      this.jobTitles = this.addUserData[9].value;
      this.skills = this.addUserData[10].value;
    });

    const selectedServices = [];
    this.addUserData[4].value.map(service => {
      selectedServices.push(this.staffFilterOptions.services.find(services => services.key === service))
    });
    this.servicePayload = selectedServices.map(service => {
      return {
        service: service.label,
        service_code: service.key
      }
    });
    console.log(selectedServices);
    console.log(this.servicePayload);
  }

  public addNewUser() {
    const locationPayload = [];
    locationPayload.push({
      location_id: this.primaryLocations.court_venue_id,
      location: this.primaryLocations.site_name,
      is_primary: true
    });
    this.additionalLocations.map(location => {
      locationPayload.push({
        location_id: location.court_venue_id,
        location: location.site_name,
        is_primary: false
      });
    });
    console.log(locationPayload);
    let task_supervisor_flag;
    let case_allocator_flag;
    let staff_admin_flag;
    this.roles.map(role => {
      task_supervisor_flag = role === 'task-supervisor';
      case_allocator_flag = role === 'case-allocator';
      staff_admin_flag = role === 'staff-administrator';
    });

    // let rolesPayload = [];
    // this.staffJobTitles.map(jobTitle => {
    //   this.staffFilterOptions.jobTitles.find(jobTitles => jobTitles.key === jobTitle);
    // });


    const addNewUserPayload = {
      email_id: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      services: this.servicePayload,
      region: this.region,
      region_id: 1,
      roles: [
        {
          role_id: '1',
          role: 'Senior Legal Caseworker',
          is_primary: true
        },
        {
          role_id: '2',
          role: 'Legal Caseworker',
          is_primary: false
        }
      ],
      task_supervisor: task_supervisor_flag,
      case_allocator: case_allocator_flag,
      staff_admin: staff_admin_flag,
      suspended: false,
      base_locations: locationPayload,
      user_type: this.userType,
      skills: [
        {
          skill_id: 1,
          description: this.skills
        }
      ]
    };

    this.staffDataAccessService.addNewUser(addNewUserPayload)
  }
}
