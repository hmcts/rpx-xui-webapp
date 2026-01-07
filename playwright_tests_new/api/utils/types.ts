// Shared, permissive schemas and interfaces for API payloads used in Playwright tests.
// Fields are optional to avoid brittleness across environments.
import { z } from 'zod';

export interface UserInfo {
  uid?: string;
  id?: string;
  roles?: string[];
  email?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: unknown;
}

export interface UserDetailsResponse {
  userInfo?: UserInfo;
  roleAssignmentInfo?: RoleAssignment[];
  canShareCases?: boolean;
  sessionTimeout?: {
    idleModalDisplayTime?: number;
    pattern?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface Task {
  id?: string;
  task_state?: string;
  state?: string;
  assignee?: string | null;
  assigned_to?: string | null;
  [key: string]: unknown;
}

export interface TaskListResponse {
  tasks?: Task[];
  total_records?: number;
  [key: string]: unknown;
}

export interface RoleAssignment {
  roleCategory?: string;
  roleName?: string;
  roleId?: string;
  actorId?: string;
  actions?: unknown[];
  [key: string]: unknown;
}

export interface RoleAssignmentContainer {
  roleAssignmentResponse?: RoleAssignment[];
  [key: string]: unknown;
}

export interface CaseShareOrganisation {
  organisationIdentifier?: string;
  name?: string;
  [key: string]: unknown;
}

export interface CaseShareUser {
  userIdentifier?: string;
  email?: string;
  [key: string]: unknown;
}

export interface CaseShareCase {
  caseId?: string;
  sharedWith?: unknown[];
  [key: string]: unknown;
}

export interface CaseShareResponseVariant {
  organisations?: CaseShareOrganisation[];
  users?: CaseShareUser[];
  cases?: CaseShareCase[];
  sharedCases?: CaseShareCase[];
  payload?: CaseShareResponseVariant;
  [key: string]: unknown;
}

export interface AddressLookupResponse {
  results?: Array<{
    DPA?: {
      POSTCODE?: string;
      ADDRESS?: string;
      POST_TOWN?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  }>;
  header?: unknown;
  [key: string]: unknown;
}

// Zod schemas (passthrough to allow extra fields)
export const TaskSchema = z
  .object({
    id: z.string().nonempty().optional(),
    task_state: z.string().optional(),
    state: z.string().optional(),
    assignee: z.string().nullable().optional(),
    assigned_to: z.string().nullable().optional()
  })
  .passthrough();

export const TaskListSchema = z
  .object({
    tasks: z.array(TaskSchema).optional(),
    total_records: z.number().nonnegative().optional()
  })
  .passthrough();

export const RoleAssignmentSchema = z
  .object({
    roleCategory: z.string().optional(),
    roleName: z.string().optional(),
    roleId: z.string().optional(),
    actorId: z.string().optional(),
    actions: z.array(z.unknown()).optional()
  })
  .passthrough();

export const RoleAssignmentContainerSchema = z
  .object({
    roleAssignmentResponse: z.array(RoleAssignmentSchema).optional()
  })
  .passthrough();

export const CaseShareOrganisationSchema = z
  .object({
    organisationIdentifier: z.string().optional(),
    name: z.string().optional()
  })
  .passthrough();

export const CaseShareUserSchema = z
  .object({
    userIdentifier: z.string().optional(),
    email: z.string().optional()
  })
  .passthrough();

export const CaseShareCaseSchema = z
  .object({
    caseId: z.string().optional(),
    sharedWith: z.array(z.unknown()).optional()
  })
  .passthrough();

export const CaseShareResponseSchema = z
  .object({
    organisations: z.array(CaseShareOrganisationSchema).optional(),
    users: z.array(CaseShareUserSchema).optional(),
    cases: z.array(CaseShareCaseSchema).optional(),
    sharedCases: z.array(CaseShareCaseSchema).optional(),
    payload: z.any().optional()
  })
  .passthrough();

export const BookmarkPayloadSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    documentId: z.string().optional(),
    createdBy: z.string().optional(),
    pageNumber: z.number().optional(),
    xCoordinate: z.number().optional(),
    yCoordinate: z.number().optional(),
    parent: z.string().nullable().optional(),
    previous: z.string().nullable().optional()
  })
  .passthrough();

export const AnnotationRectangleSchema = z
  .object({
    id: z.string().optional(),
    x: z.number().optional(),
    y: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional()
  })
  .passthrough();

export const AnnotationPayloadSchema = z
  .object({
    id: z.string().optional(),
    color: z.string().optional(),
    comments: z.array(z.unknown()).optional(),
    page: z.number().optional(),
    rectangles: z.array(AnnotationRectangleSchema).optional(),
    type: z.string().optional(),
    documentId: z.string().optional(),
    annotationSetId: z.string().optional()
  })
  .passthrough();

export const AddressLookupResponseSchema = z
  .object({
    results: z
      .array(
        z
          .object({
            DPA: z
              .object({
                POSTCODE: z.string().optional(),
                ADDRESS: z.string().optional(),
                POST_TOWN: z.string().optional()
              })
              .passthrough()
              .optional()
          })
          .passthrough()
      )
      .optional(),
    header: z.unknown().optional()
  })
  .passthrough();

export interface AnnotationRectangle {
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

export interface AnnotationPayload {
  id?: string;
  color?: string;
  comments?: unknown[];
  page?: number;
  rectangles?: AnnotationRectangle[];
  type?: string;
  documentId?: string;
  annotationSetId?: string;
  [key: string]: unknown;
}

export interface BookmarkPayload {
  id?: string;
  name?: string;
  documentId?: string;
  createdBy?: string;
  pageNumber?: number;
  xCoordinate?: number;
  yCoordinate?: number;
  parent?: string | null;
  previous?: string | null;
  [key: string]: unknown;
}

export function isTaskList(payload: unknown): payload is TaskListResponse {
  return !!payload && typeof payload === 'object' && Array.isArray((payload as any).tasks);
}

export function extractCaseShareEntries(payload: CaseShareResponseVariant, property: string): unknown[] {
  if (!payload || typeof payload !== 'object') return [];
  const direct = (payload as any)[property];
  if (Array.isArray(direct)) return direct;
  const nested = (payload as any).payload;
  if (nested && typeof nested === 'object' && Array.isArray((nested as any)[property])) {
    return (nested as any)[property];
  }
  return [];
}
