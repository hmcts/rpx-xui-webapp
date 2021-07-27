import { ExclusionState } from '.';

export interface Answer {
  label: string;
  value: string;
  action: ExclusionState;
}
