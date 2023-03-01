import { FilterSetting, GroupOptions } from '@hmcts/rpx-xui-common-lib';
import { Roles } from './roles.enum';
import { StaffFilterOption } from './staff-filter-option.model';
import { STAFF_REGIONS } from './staff-regions';

export class StaffUser {
  public email_id: string;
  public first_name: string;
  public last_name: string;
  public suspended: boolean;
  public user_type: string;
  public userCategory: string;

  public task_supervisor: boolean;
  public case_allocator: boolean;
  public staff_admin: boolean;

  public roles: {
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

  public services: {
    service: string;
    service_code: string;
  }[];

  public base_locations: {
    created_time?: Date,
    last_updated_time?: Date,
    location_id: number,
    location: string,
    is_primary: boolean
  }[];

  public region: string;
  public region_id: number;

  constructor() {}

  public initFromGenericFilter(
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
    this.suspended = false;
    this.user_type = staffFilterOptions.userTypes.find(item => item.key === fieldsData[7].value[0]).label;

    this.task_supervisor = roles.includes(Roles.TaskSupervisor);
    this.case_allocator = roles.includes(Roles.CaseAllocator);
    this.staff_admin = roles.includes(Roles.StaffAdmin);

    this.roles = fieldsData[9].value
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

    this.services = (() => {
      const selectedServices = [];
      fieldsData[4].value.map(service => {
        selectedServices.push(staffFilterOptions.services.find(services => services.key === service));
      });

      return selectedServices.map(service => {
        return {
          service: service.label,
          service_code: service.key
        };
      });
    })();

    this.base_locations = (() => {
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
}

export interface StaffLocation {
  id: string;
  is_primary: boolean;
  location?: string;
}

export interface StaffRole {
  id: string;
  is_primary: boolean;
  role: string;
}
