// model to hold specific roles - e.g. lead/hearing judge
export interface SpecificRole {
  id: string;
  name?: string;
}

export const DEFINED_ROLES: SpecificRole[] = [
  { id: 'lead-judge', name: 'Lead judge' },
  { id: 'hearing-judge', name: 'Hearing judge' },
  { id: 'case-manager', name: 'Case manager' }
];
