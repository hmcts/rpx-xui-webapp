import { TaskFieldType } from './../../enums';

export default interface TaskFieldConfig {
  disableSort?: boolean; // optional, disable sorting only when set as true
  name: string;          // as returned by task api
  type: TaskFieldType;
  columnLabel: string;   // can be null for no column header
  views: number;         // bitwise or of the TaskViews that this field is to appear in
  sortName?: string;     // for the purpose of sorting (data names not 100% matching)
  sourceColumn?: string; // column to be matched with
  matchValue?: any;      // value to be matched with
}
