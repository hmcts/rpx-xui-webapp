import { TaskRole } from '../interfaces/TaskRole';

export const TASK_ROLES: TaskRole[] = [
  {
    'role_category': 'legal-ops',
    'role_name': 'tribunal-caseworker',
    'permissions': [
      'OWN',
      'EXECUTE',
      'READ',
      'MANAGE',
      'CANCEL',
    ],
    'authorisations': [
      'IAC',
      'SSCS',
    ],
  },
  {
    'role_category': 'legal-ops',
    'role_name': 'case-manager',
    'permissions': [
      'EXECUTE',
      'READ',
      'MANAGE',
      'CANCEL',
    ],
    'authorisations': [
      'IAC',
      'SSCS',
    ],
  },
  {
    'role_category': 'judiciary',
    'role_name': 'judge',
    'permissions': [
      'EXECUTE',
      'READ',
    ],
    'authorisations': [
      'IAC',
    ],
  },
];
