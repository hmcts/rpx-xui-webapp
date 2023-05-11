import { TaskRole } from '../interfaces/TaskRole';

export const TASK_ROLES: TaskRole[] = [
  {
    'role_category': 'LEGAL_OPERATIONS',
    'role_name': 'tribunal-caseworker',
    'permissions': [
      'Own',
      'Execute',
      'Read',
      'Manage',
      'Cancel'
    ],
    'authorisations': [
      'IAC',
      'SSCS'
    ]
  },
  {
    'role_category': 'LEGAL_OPERATIONS',
    'role_name': 'case-manager',
    'permissions': [
      'Execute',
      'Read',
      'Manage',
      'Cancel'
    ],
    'authorisations': [
      'IAC',
      'SSCS'
    ]
  },
  {
    'role_category': 'JUDICIAL',
    'role_name': 'judge',
    'permissions': [
      'Execute',
      'Read'
    ],
    'authorisations': [
      'IAC'
    ]
  }
];
