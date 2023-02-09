export interface StaffFilterOption {
  key: string;
  label: string;
}

export interface GropuOption {
  group: string;
  options: StaffFilterOption[];
}

export interface Service {
  service: string;
  serviceCodes: string[];
}
