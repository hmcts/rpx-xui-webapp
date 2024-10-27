import { mergeTests } from '@playwright/test';
import { test as create } from './create-fixture';

export const test = mergeTests(create);
