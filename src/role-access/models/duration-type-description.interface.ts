import { DurationType } from './enums/duration-type';

export interface DurationTypeDescription {
  id: string;
  duration: DurationType;
  description: string;
  checked: boolean;
}
