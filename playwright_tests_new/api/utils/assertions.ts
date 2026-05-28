import { expect } from '@playwright/test';
import {
  AnnotationPayloadSchema,
  BookmarkPayloadSchema,
  CaseShareResponseSchema,
  RoleAssignmentSchema,
  TaskListSchema,
  AddressLookupResponseSchema,
} from './types';

export function expectTaskList(payload: unknown) {
  const parsed = TaskListSchema.parse(payload);
  expect(parsed).toBeTruthy();
  expect(typeof parsed).toBe('object');
  const tasks = parsed.tasks;
  expect(Array.isArray(tasks)).toBe(true);
  if (Array.isArray(tasks) && tasks.length > 0) {
    expect(tasks[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        task_state: expect.any(String),
      })
    );
  }
  return parsed;
}

export function expectRoleAssignmentShape(role: unknown) {
  const parsed = RoleAssignmentSchema.parse(role);
  expect(parsed).toEqual(
    expect.objectContaining({
      roleCategory: expect.any(String),
      roleName: expect.any(String),
    })
  );
  if (parsed.actorId !== undefined) {
    expect(typeof parsed.actorId).toBe('string');
  }
  if (parsed.actions !== undefined) {
    expect(Array.isArray(parsed.actions)).toBe(true);
  }
  return parsed;
}

export function expectBookmarkShape(bookmark: unknown) {
  const parsed = BookmarkPayloadSchema.parse(bookmark);
  expect(parsed).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      documentId: expect.any(String),
    })
  );
  return parsed;
}

export function expectAnnotationShape(annotation: unknown) {
  const parsed = AnnotationPayloadSchema.parse(annotation);
  expect(parsed).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      documentId: expect.any(String),
      annotationSetId: expect.any(String),
    })
  );
  return parsed;
}

export function expectCaseShareShape(payload: unknown, property: string) {
  const parsed = CaseShareResponseSchema.parse(payload);
  switch (property) {
    case 'organisations':
      expect(parsed).toEqual(
        expect.objectContaining({
          organisations: expect.arrayContaining([
            expect.objectContaining({
              organisationIdentifier: expect.any(String),
              name: expect.any(String),
            }),
          ]),
        })
      );
      break;
    case 'users':
      expect(parsed).toEqual(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({
              userIdentifier: expect.any(String),
              email: expect.any(String),
            }),
          ]),
        })
      );
      break;
    case 'cases':
    case 'sharedCases':
      expect(parsed).toEqual(
        expect.objectContaining({
          [property]: expect.arrayContaining([
            expect.objectContaining({
              caseId: expect.any(String),
              sharedWith: expect.any(Array),
            }),
          ]),
        })
      );
      break;
    default:
      break;
  }
  return parsed;
}

export function expectAddressLookupShape(response: unknown) {
  const parsed = AddressLookupResponseSchema.parse(response);
  expect(parsed).toHaveProperty('results');
  expect(parsed).toHaveProperty('header');
  const results = parsed.results;
  expect(Array.isArray(results)).toBe(true);
  if (Array.isArray(results) && results.length > 0) {
    const dpa = results[0].DPA;
    expect(dpa).toBeTruthy();
    expect(dpa).toEqual(
      expect.objectContaining({
        POSTCODE: expect.any(String),
        ADDRESS: expect.any(String),
        POST_TOWN: expect.any(String),
      })
    );
  }
  return parsed;
}
