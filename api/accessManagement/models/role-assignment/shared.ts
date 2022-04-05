import { ContractType } from './enums';
export interface Note {
  userId: string;
  time: string;
  comment: string;
}

export interface Attributes {
  jurisdiction: string;
  caseType: string;
  caseId: string;
  region: string;
  location: string;
  contractType: ContractType;
}