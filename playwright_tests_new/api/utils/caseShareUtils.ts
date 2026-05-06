import { expect } from '@playwright/test';

import { CaseShareResponseVariant } from './types';

export type CaseShareSchema = ((payload: CaseShareResponseVariant, property: string) => void) | object;

export function resolveEntries(data: any, property: string): any[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data[property])) {
    return data[property];
  }
  const nested = data?.payload;
  if (nested && Array.isArray(nested[property])) {
    return nested[property];
  }
  return [];
}

export function assertCaseShareEntries(data: any, property: string, schema: CaseShareSchema) {
  const entries = resolveEntries(data, property);
  expect(Array.isArray(entries)).toBe(true);
  if (entries.length > 0) {
    if (typeof schema === 'function') {
      schema(data as CaseShareResponseVariant, property);
    } else {
      expect(entries[0]).toEqual(schema);
    }
  }
}
