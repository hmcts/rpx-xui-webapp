import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FilterService
} from '@hmcts/rpx-xui-common-lib';
import { Roles } from 'src/staff-administrator/models/roles.enum';
import { StaffDataAccessService } from '../../../../staff-administrator/services/staff-data-access/staff-data-access.service';
import { StaffFilterOption } from '../../../models/staff-filter-option.model';
import { StaffJobTitles } from '../../../models/staff-job-titles';

@Component({
  selector: 'exui-staff-user-check-answers',
  templateUrl: './staff-user-check-answers.component.html',
  styleUrls: ['./staff-user-check-answers.component.scss']
})

export class StaffUserCheckAnswersComponent implements OnInit {
  public formId: string = 'staff-add-edit-user';
  public addUserData: {
    name: string;
    value: string[];
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
  public region: string[];
  public services: string[];
  public primaryLocations;
  public additionalLocations;
  public userType: string[];
  public roles: string[];
  public skills: string[];
  public servicePayload;
  public rolesPayload = [];
  public jobTitlesPayload = [];
  public regionPayload = [];
  public userTypesPayload = [];
  public skillsPayload;

  constructor(
    private filterService: FilterService,
    private router: Router,
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
      if (this.addUserData) {
        this.firstName = this.addUserData[0].value[0];
        this.lastName = this.addUserData[1].value[0];
        this.email = this.addUserData[2].value[0];
        this.region = this.addUserData[3].value;
        this.primaryLocations = this.addUserData[5].value[0];
        this.additionalLocations = this.addUserData[6].value;
        this.userType = this.addUserData[7].value;
        this.roles = this.addUserData[8].value;
        this.skills = this.addUserData[10].value;

        this.prepareServicesPayload();
        this.prepareJobTitlesPayload();
        this.prepareUserTypePayload();
        this.prepareRolesPayload();
        this.prepareRegionPayload();
        this.prepareSkillsPayload();
      }
    });
  }

  private prepareServicesPayload() {
    const selectedServices = [];
    this.addUserData[4].value.map(service => {
      selectedServices.push(this.staffFilterOptions.services.find(services => services.key === service));
    });
    this.servicePayload = selectedServices.map(service => {
      return {
        service: service.label,
        service_code: service.key
      }
    });
  }

  private prepareJobTitlesPayload() {
    const jobTitlesNamePayload = [];
    this.addUserData[9].value.map(jobTitle => {
      jobTitlesNamePayload.push(this.staffFilterOptions.jobTitles.find(jobTitles => jobTitles.key.toString() === jobTitle.toString()));
    });

    jobTitlesNamePayload.map(jobTitleName => {
      this.jobTitlesPayload.push(StaffJobTitles.jobTitles.find(jobTitle => jobTitle.role === jobTitleName.label));
    });
  }

  private prepareUserTypePayload() {
    this.userType.map(userType => {
      this.userTypesPayload.push(this.staffFilterOptions.userTypes.find(userTypes => userTypes.key.toString() === userType.toString()));
    });
  }

  private prepareLocationPayload() {
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
    return locationPayload;
  }

  private prepareRolesPayload() {
    const roleObj = [
      { key: 'case-allocator', label: 'Case Allocator' },
      { key: 'task-supervisor', label: 'Task Supervisor' },
      { key: 'staff-administrator', label: 'Staff Administrator' }
    ];
    this.roles.map(role => {
      this.rolesPayload.push(roleObj.find(roles => roles.key === role));
    })
  }

  private prepareRegionPayload() {
    const regionObj = [
      { key: 'region-1', label: 'Region 1'}
    ];

    this.region.map(region => {
      this.regionPayload.push(regionObj.find(regions => regions.key === region));
    })
  }

  private prepareSkillsPayload() {
    const skillsPayload = [[]];
    let nonEmptySkillsPayload = [[]];
    this.skills.map(skill => {
      this.staffFilterOptions.skills.map(skillgroup => {
        skillsPayload.push(skillgroup.options.filter(skills => skills.key === skill));
      });
    });

    nonEmptySkillsPayload = skillsPayload.filter(skill => skill.length > 0);

    this.skillsPayload = nonEmptySkillsPayload.reduce((a, b) => {
      return a.concat(b);
    }, []);
  }

  public addNewUser() {
    let task_supervisor_flag = false;
    let case_allocator_flag = false;
    let staff_admin_flag = false;
    this.roles.map(role => {
      if (role === Roles.TaskSupervisor) {
        task_supervisor_flag = true;
        return;
      }
      if (role === Roles.CaseAllocator) {
        case_allocator_flag = true;
        return;
      }
      if (role === Roles.StaffAdmin) {
        staff_admin_flag = true;
        return;
      }
    });

    const addNewUserPayload = {
      email_id: this.email,
      first_name: this.firstName,
      last_name: this.lastName,
      services: this.servicePayload,
      region: this.regionPayload.length ? this.regionPayload[0].label : '' ,
      region_id: 1,
      roles: this.jobTitlesPayload,
      task_supervisor: task_supervisor_flag,
      case_allocator: case_allocator_flag,
      staff_admin: staff_admin_flag,
      suspended: false,
      base_locations: this.prepareLocationPayload(),
      user_type: this.userTypesPayload[0].label,
      skills: this.skillsPayload
    };

    this.staffDataAccessService.addNewUser(addNewUserPayload).subscribe(res => {
      // success banner
    }, error => {
      this.router.navigateByUrl('/service-down');
    });
  }

  public cancel() {
    this.resetForm();
    this.router.navigateByUrl('/staff');
  }

  private resetForm(): void {
    this.filterService.clearSessionAndLocalPersistance(this.formId);
    this.filterService.givenErrors.next(null);
  }
}
