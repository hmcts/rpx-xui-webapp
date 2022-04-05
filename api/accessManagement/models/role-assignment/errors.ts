export interface RoleAssignmentError {
  code: number;
  description: string;
}

const MANAGED_RESPONSE_STATUS: RoleAssignmentError[] = [
  {
    code: 400,
    description: 'Invalid role name in the request'
  },
  {
    code: 422,
    description: 'Unprocessable entity as request has been rejected'
  },
  {
    code: 201,
    description: 'Created'
  }
];
