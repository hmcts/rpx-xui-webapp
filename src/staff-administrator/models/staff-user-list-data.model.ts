import { StaffUsersFilterResult } from './staff-users-filter-result.model';

export interface StaffUserListData {
  items: StaffUsersFilterResult[];
  pageNumber: number;
  pageSize: number;
  totalItems: number;
}
