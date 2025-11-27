import { expect } from '@playwright/test';
import {
  AnnotationPayload,
  BookmarkPayload,
  RoleAssignment,
  TaskListResponse,
  CaseShareResponseVariant,
  AddressLookupResponse
} from './types';

export function expectTaskList(payload: TaskListResponse) {
  expect(payload).toBeTruthy();
  expect(typeof payload).toBe('object');
  expect(Array.isArray(payload.tasks)).toBe(true);
  expect(typeof payload.total_records).toBe('number');
  if ((payload.tasks?.length ?? 0) > 0) {
    expect(payload.tasks![0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        task_state: expect.any(String)
      })
    );
  }
}

export function expectRoleAssignmentShape(role: RoleAssignment) {
  expect(role).toEqual(
    expect.objectContaining({
      roleCategory: expect.any(String),
      roleName: expect.any(String)
    })
  );
  if (role.actorId !== undefined) {
    expect(typeof role.actorId).toBe('string');
  }
  if (role.actions !== undefined) {
    expect(Array.isArray(role.actions)).toBe(true);
  }
}

export function expectBookmarkShape(bookmark: BookmarkPayload) {
  expect(bookmark).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      documentId: expect.any(String)
    })
  );
}

export function expectAnnotationShape(annotation: AnnotationPayload) {
  expect(annotation).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      documentId: expect.any(String),
      annotationSetId: expect.any(String)
    })
  );
}

export function expectCaseShareShape(payload: CaseShareResponseVariant, property: string) {
  switch (property) {
    case 'organisations':
      expect(payload).toEqual(
        expect.objectContaining({
          organisations: expect.arrayContaining([
            expect.objectContaining({
              organisationIdentifier: expect.any(String),
              name: expect.any(String)
            })
          ])
        })
      );
      break;
    case 'users':
      expect(payload).toEqual(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({
              userIdentifier: expect.any(String),
              email: expect.any(String)
            })
          ])
        })
      );
      break;
    case 'cases':
    case 'sharedCases':
      expect(payload).toEqual(
        expect.objectContaining({
          [property]: expect.arrayContaining([
            expect.objectContaining({
              caseId: expect.any(String),
              sharedWith: expect.any(Array)
            })
          ])
        })
      );
      break;
    default:
      break;
  }
}

export function expectAddressLookupShape(response: AddressLookupResponse) {
  expect(response).toHaveProperty('results');
  expect(response).toHaveProperty('header');
  expect(Array.isArray(response.results)).toBe(true);
  if ((response.results?.length ?? 0) > 0) {
    const dpa = response.results![0]?.DPA;
    expect(dpa).toBeTruthy();
    expect(dpa).toEqual(
      expect.objectContaining({
        POSTCODE: expect.any(String),
        ADDRESS: expect.any(String),
        POST_TOWN: expect.any(String)
      })
    );
  }
}
