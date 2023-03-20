import { FilterSetting, GroupOptions } from '@hmcts/rpx-xui-common-lib';
import { Roles } from './roles.enum';
import { StaffFilterOption } from './staff-filter-option.model';
import { STAFF_REGIONS } from './staff-regions';

export class StaffUser {
  public email_id: string;
  public first_name: string;
  public last_name: string;
  public suspended: 'true' | 'false';
  public user_type: string;
  public userCategory: string;

  public task_supervisor: 'Y' | 'N';
  public case_allocator: 'Y' | 'N';
  public staff_admin: 'Y' | 'N';

  public idam_roles: string[];

  public role: {
    role_id: number,
    role: string,
    is_primary: boolean,
    created_time?: Date,
    last_updated_time?: Date,
  }[];

  public skills: {
    skill_id: number;
    description: string;
    skill_code: string
  }[];

  public work_area: {
    area_of_work: string;
    service_code: string;
    created_time?: Date;
    last_updated_time?: Date;
  }[];

  public base_location: {
    created_time?: Date,
    last_updated_time?: Date,
    location_id: number,
    location: string,
    is_primary: boolean
  }[];

  public region: string;
  public region_id: number;

  public static from(json: any) {
    return Object.assign(new StaffUser(), json);
  }

  public fromGenericFilter(
    filterSettings: FilterSetting,
    staffFilterOptions: {
      userTypes: StaffFilterOption[],
      jobTitles: StaffFilterOption[],
      skills: GroupOptions[],
      services: StaffFilterOption[]
    }
  ) {
    const fieldsData = filterSettings.fields;
    const roles = fieldsData[8].value;

    this.email_id = fieldsData[2].value[0];
    this.first_name = fieldsData[0].value[0];
    this.last_name = fieldsData[1].value[0];
    this.suspended = 'false';
    this.user_type = fieldsData[7].value[0];

    this.task_supervisor = roles.includes(Roles.TaskSupervisor) ? 'Y' : 'N';
    this.case_allocator = roles.includes(Roles.CaseAllocator) ? 'Y' : 'N';
    this.staff_admin = roles.includes(Roles.StaffAdmin) ? 'Y' : 'N';

    this.role = fieldsData[9].value
      .map(jobTitle => staffFilterOptions.jobTitles.find(jobTitles => jobTitles.key === jobTitle))
      .map(role => {
        return {
          role_id: Number(role.key),
          role: role.label,
          is_primary: true
        };
      });

    this.skills = (() => {
      const selectedSkillsIds = fieldsData[10].value;

      const allSkills = staffFilterOptions.skills.reduce(
        (previousValue, currentValue) => {
          return previousValue.concat(currentValue.options);
        }, []);

      const selectedSkills = allSkills.filter(item => selectedSkillsIds.includes(item.key));

      return selectedSkills.map(item => {
        return {
          skill_id: item.key,
          description: item.label,
          skill_code: item.label
        };
      });
    })();

    this.work_area = (() => {
      const selectedServices = [];
      fieldsData[4].value.map(service => {
        selectedServices.push(staffFilterOptions.services.find(services => services.key === service));
      });

      return selectedServices.map(service => {
        return {
          area_of_work: service.label,
          service_code: service.key
        };
      });
    })();

    this.base_location = (() => {
      const primaryLocations = fieldsData[5].value[0];
      const additionalLocations = fieldsData[6].value;

      const locationPayload = [];
      locationPayload.push({
        location_id: primaryLocations.epimms_id,
        location: primaryLocations.site_name,
        is_primary: true
      });

      additionalLocations.map(location => {
        locationPayload.push({
          location_id: location.epimms_id,
          location: location.site_name,
          is_primary: false
        });
      });

      return locationPayload;
    })();

    this.region_id = fieldsData[3].value[0];
    this.region = (() => {
      const region = STAFF_REGIONS.find(item => item.key === String(this.region_id));
      return region ? region.label : '';
    })();
  }

  public toDto() {
    // Needs some modifications due to inconsistency of property names and types
    // in POST 'users/fetchUsersById', PUT/POST 'profile'
    return {
      base_locations: this.base_location,
      email_id: this.email_id,
      first_name: this.first_name,
      last_name: this.last_name,
      region: this.region,
      region_id: this.region_id,
      roles: this.role,
      services: this.work_area.map(item => ({service: item.area_of_work, service_code: item.service_code})),
      skills: this.skills,
      user_type: this.user_type,
      staff_admin: this.staff_admin === 'Y',
      task_supervisor: this.task_supervisor === 'Y',
      case_allocator: this.case_allocator === 'Y',
      suspended: this.suspended === 'true',
      work_area: this.work_area
    };
  }
}
