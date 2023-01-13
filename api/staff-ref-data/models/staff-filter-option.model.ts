export interface StaffFilterOption {
  key: string;
  label: string;
}

export interface GroupOption {
  group: string;
  options: StaffFilterOption[];
}
