import { TaskRole } from '../interfaces/TaskRole';

export const TASK_ROLES: TaskRole[] = [
  {
    'role_category': 'LEGAL_OPERATIONS',
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
    'role_category': 'LEGAL_OPERATIONS',
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
    'role_category': 'JUDICIAL',
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
