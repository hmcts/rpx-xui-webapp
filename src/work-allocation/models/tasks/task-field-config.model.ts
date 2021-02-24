import { TaskFieldType } from './../../enums';

export default interface TaskFieldConfig {
  name: string;          // as returned by task api
  type: TaskFieldType;
  columnLabel: string;   // can be null for no column header
  views: number;         // bitwise or of the TaskViews that this field is to appear in
  sourceColumn?: string; // column to be matched with
  matchValue?: any;      // value to be matched with
}
