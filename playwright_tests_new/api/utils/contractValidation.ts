/**
 * API Contract Validation Utilities
 * Validates response structures against expected schemas to ensure backward compatibility
 */

import { expect } from '@playwright/test';
import { createLogger } from '@hmcts/playwright-common';

const logger = createLogger({ serviceName: 'contract-validation', format: 'pretty' });

/**
 * JSON Schema validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: Array<{ path: string; message: string }>;
  warnings: Array<{ path: string; message: string }>;
}

/**
 * Schema definition for API responses
 */
export interface Schema {
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  properties?: Record<string, Schema>;
  items?: Schema;
  required?: string[];
  enum?: unknown[];
  nullable?: boolean;
  deprecated?: boolean;
  minItems?: number;
  maxItems?: number;
}

/**
 * Contract test options
 */
export interface ContractTestOptions {
  /** Whether to fail test on schema violations (default: true) */
  strict?: boolean;
  /** Whether to log warnings for deprecated fields (default: true) */
  logDeprecations?: boolean;
  /** Additional context for logging */
  context?: Record<string, unknown>;
}

type ValidationIssue = { path: string; message: string };

function formatValue(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  try {
    return JSON.stringify(value);
  } catch {
    return '[unserializable]';
  }
}

function formatEnumValues(values: unknown[]): string {
  return values.map((value) => formatValue(value)).join(', ');
}

function resolveActualType(value: unknown): Schema['type'] | 'undefined' {
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  const t = typeof value;
  if (t === 'string' || t === 'number' || t === 'boolean') {
    return t;
  }
  return t === 'object' ? 'object' : 'undefined';
}

function validateObject(
  obj: Record<string, unknown>,
  schemaNode: Schema,
  currentPath: string,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
): void {
  if (schemaNode.required) {
    for (const requiredField of schemaNode.required) {
      if (!(requiredField in obj)) {
        errors.push({ path: `${currentPath}.${requiredField}`, message: 'Required field is missing' });
      }
    }
  }

  if (schemaNode.properties) {
    for (const [key, propSchema] of Object.entries(schemaNode.properties)) {
      if (key in obj) {
        validateValue(obj[key], propSchema, `${currentPath}.${key}`, errors, warnings);
      }
    }
  }
}

function validateArray(
  arr: unknown[],
  schemaNode: Schema,
  currentPath: string,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
): void {
  if (schemaNode.minItems !== undefined && arr.length < schemaNode.minItems) {
    errors.push({ path: currentPath, message: `Array has ${arr.length} items but minimum is ${schemaNode.minItems}` });
  }
  if (schemaNode.maxItems !== undefined && arr.length > schemaNode.maxItems) {
    errors.push({ path: currentPath, message: `Array has ${arr.length} items but maximum is ${schemaNode.maxItems}` });
  }

  const itemSchema = schemaNode.items;
  if (itemSchema) {
    arr.forEach((item, index) => {
      validateValue(item, itemSchema, `${currentPath}[${index}]`, errors, warnings);
    });
  }
}

function validateEnum(value: unknown, schemaNode: Schema, currentPath: string, errors: ValidationIssue[]): void {
  const allowed = schemaNode.enum;
  if (allowed && !allowed.includes(value)) {
    errors.push({ path: currentPath, message: `Value must be one of: ${formatEnumValues(allowed)}` });
  }
}

function validateValue(
  value: unknown,
  schemaNode: Schema,
  currentPath: string,
  errors: ValidationIssue[],
  warnings: ValidationIssue[]
): void {
  if (value === null || value === undefined) {
    if (!schemaNode.nullable) {
      const actual = value === null ? 'null' : 'undefined';
      errors.push({ path: currentPath, message: `Expected ${schemaNode.type} but got ${actual}` });
    }
    return;
  }

  if (schemaNode.deprecated) {
    warnings.push({ path: currentPath, message: 'Field is deprecated and may be removed in future versions' });
  }

  const actualType = resolveActualType(value);
  if (actualType !== schemaNode.type) {
    errors.push({ path: currentPath, message: `Expected type ${schemaNode.type} but got ${actualType}` });
    return;
  }

  if (schemaNode.type === 'object') {
    validateObject(value as Record<string, unknown>, schemaNode, currentPath, errors, warnings);
  } else if (schemaNode.type === 'array') {
    validateArray(value as unknown[], schemaNode, currentPath, errors, warnings);
  }

  validateEnum(value, schemaNode, currentPath, errors);
}

function formatContractErrors(errors: ValidationIssue[]): string {
  return errors.map((error) => `${error.path}: ${error.message}`).join('\n');
}

/**
 * Validate response data against JSON schema
 */
export function validateSchema(data: unknown, schema: Schema, path = 'root'): ValidationResult {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  validateValue(data, schema, path, errors, warnings);

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Assert that response matches contract schema
 */
export function assertContract(data: unknown, schema: Schema, options: ContractTestOptions = {}): void {
  const { strict = true, logDeprecations = true, context = {} } = options;

  const result = validateSchema(data, schema);

  // Log deprecation warnings
  if (logDeprecations && result.warnings.length > 0) {
    logger.warn('Contract deprecation warnings detected', {
      warnings: result.warnings,
      operation: 'contract-validation',
      ...context,
    });
  }

  // Log and/or throw validation errors
  if (!result.valid) {
    logger.error('Contract validation failed', {
      errors: result.errors,
      warnings: result.warnings,
      operation: 'contract-validation',
      ...context,
    });

    if (strict) {
      const errorMessage = result.errors.map((e) => `${e.path}: ${e.message}`).join('\n');
      throw new Error(`Contract validation failed:\n${errorMessage}`);
    }
  }
}

/**
 * Expect response to match contract schema (Playwright assertion)
 */
export function expectContract(data: unknown, schema: Schema, options: ContractTestOptions = {}): void {
  const result = validateSchema(data, schema);

  const errorMessage = formatContractErrors(result.errors);
  expect(result.valid, `Contract validation failed:\n${errorMessage}`).toBe(true);

  // Log warnings even if validation passes
  if (options.logDeprecations !== false && result.warnings.length > 0) {
    logger.warn('Contract deprecation warnings', {
      warnings: result.warnings,
      operation: 'contract-validation',
      ...options.context,
    });
  }
}

/**
 * Pre-defined schemas for common Work Allocation API responses
 */
export const WorkAllocationSchemas = {
  Location: {
    type: 'object' as const,
    required: ['id', 'locationName'],
    properties: {
      id: { type: 'string' as const },
      locationName: { type: 'string' as const },
      services: { type: 'array' as const, items: { type: 'string' as const }, nullable: true },
    },
  },

  LocationList: {
    type: 'array' as const,
    items: {
      type: 'object' as const,
      required: ['id', 'locationName'],
      properties: {
        id: { type: 'string' as const },
        locationName: { type: 'string' as const },
        services: { type: 'array' as const, items: { type: 'string' as const }, nullable: true },
      },
    },
  },

  Task: {
    type: 'object' as const,
    required: ['id', 'task_state', 'task_title'],
    properties: {
      id: { type: 'string' as const },
      task_state: { type: 'string' as const, enum: ['assigned', 'unassigned', 'completed', 'cancelled'] },
      task_title: { type: 'string' as const },
      assignee: { type: 'string' as const, nullable: true },
      case_id: { type: 'string' as const, nullable: true },
      case_name: { type: 'string' as const, nullable: true },
      location_name: { type: 'string' as const, nullable: true },
      created_date: { type: 'string' as const, nullable: true },
      due_date: { type: 'string' as const, nullable: true },
    },
  },

  TaskList: {
    type: 'object' as const,
    required: ['tasks'],
    properties: {
      tasks: {
        type: 'array' as const,
        items: {
          type: 'object' as const,
          required: ['id', 'task_state'],
          properties: {
            id: { type: 'string' as const },
            task_state: { type: 'string' as const },
            task_title: { type: 'string' as const, nullable: true },
            assignee: { type: 'string' as const, nullable: true },
          },
        },
      },
      total_records: { type: 'number' as const, nullable: true },
    },
  },

  UserDetails: {
    type: 'object' as const,
    required: ['userInfo'],
    properties: {
      userInfo: {
        type: 'object' as const,
        required: ['id'],
        properties: {
          id: { type: 'string' as const },
          uid: { type: 'string' as const, nullable: true },
          email: { type: 'string' as const, nullable: true },
          name: { type: 'string' as const, nullable: true },
        },
      },
      roleAssignmentInfo: { type: 'array' as const, nullable: true },
    },
  },
};

/**
 * Pre-defined schemas for Search and Ref Data API responses
 */
export const SearchSchemas = {
  GlobalSearchServices: {
    type: 'array' as const,
    items: {
      type: 'object' as const,
      required: ['serviceId', 'serviceName'],
      properties: {
        serviceId: { type: 'string' as const },
        serviceName: { type: 'string' as const },
      },
    },
  },

  SupportedJurisdictions: {
    type: 'array' as const,
    items: { type: 'string' as const },
    minItems: 0,
  },

  LocationsRefData: {
    type: 'array' as const,
    items: {
      type: 'object' as const,
      properties: {
        epimms_id: { type: 'string' as const, nullable: true },
        site_name: { type: 'string' as const, nullable: true },
        court_name: { type: 'string' as const, nullable: true },
      },
    },
  },
};
