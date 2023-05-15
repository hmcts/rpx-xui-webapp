export interface StaffAdvancedSearchFilters {
  serviceCode: string[];
  location: string[];
  userType: string;
  jobTitle: string;
  skill: string[];
  role: string[];
}
export interface StaffSearchFilters {
  partialName?: string;
  advancedSearchFilters?: StaffAdvancedSearchFilters;
  pageSize: number;
  pageNumber: number;
}
