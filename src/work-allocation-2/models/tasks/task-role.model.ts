export interface TaskRole {
  role_category: string;
  role_name: string;
  permissions: string[];
  authorisations: string[];
}

export enum Permissions {
  Own= 'OWN',
  Execute= 'EXECUTE',
  Read= 'READ',
  Manage= 'MANAGE',
  Cancel= 'CANCEL',
}
