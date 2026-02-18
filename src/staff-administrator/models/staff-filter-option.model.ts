export interface StaffFilterOption {
  key: string;
  label: string;
  selectAll?: true;
  options?: {
    key: string;
    label: string;
  }[];
}
