import { expect, test } from '@playwright/test';

import { validateSchema, WorkAllocationSchemas } from '../utils/contractValidation';

test('types of work contract accepts mapped entries and rejects malformed success bodies', () => {
  expect(validateSchema([{ key: 'work-type', label: 'Work type' }], WorkAllocationSchemas.TypesOfWork).valid).toBe(true);
  expect(validateSchema([], WorkAllocationSchemas.TypesOfWork).valid).toBe(true);

  for (const payload of [{ unexpected: 'shape' }, [{ id: 'work-type' }], [{ key: 42, label: 'Work type' }]]) {
    expect(validateSchema(payload, WorkAllocationSchemas.TypesOfWork).valid).toBe(false);
  }
});
