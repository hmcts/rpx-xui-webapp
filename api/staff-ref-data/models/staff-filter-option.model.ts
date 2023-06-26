export interface StaffFilterOption {
  key: string;
  label: string;
}

export interface GroupOption {
  group: string;
  options: StaffFilterOption[];
}

export interface Service {
  service: string;
  serviceCodes: string[];
}
