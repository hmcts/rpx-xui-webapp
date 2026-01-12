/**
 * API Contract Validation Utilities
 * Validates response structures against expected schemas to ensure backward compatibility
 * 
 * @hmcts-audit-metadata
 * {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "v1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "last_audit": "2026-01-12"
 * }
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

/**
 * Validate response data against JSON schema
 */
export function validateSchema(data: unknown, schema: Schema, path = 'root'): ValidationResult {
  const errors: Array<{ path: string; message: string }> = [];
  const warnings: Array<{ path: string; message: string }> = [];

  function validate(value: unknown, schemaNode: Schema, currentPath: string): void {
    // Handle nullable types
    if (value === null || value === undefined) {
      if (!schemaNode.nullable) {
        errors.push({ path: currentPath, message: `Expected ${schemaNode.type} but got ${value}` });
      }
      return;
    }

    // Check deprecated fields
    if (schemaNode.deprecated) {
      warnings.push({ path: currentPath, message: 'Field is deprecated and may be removed in future versions' });
    }

    // Type validation
    const actualType = Array.isArray(value) ? 'array' : typeof value;
    if (actualType !== schemaNode.type) {
      errors.push({ path: currentPath, message: `Expected type ${schemaNode.type} but got ${actualType}` });
      return;
    }

    // Object validation
    if (schemaNode.type === 'object' && typeof value === 'object') {
      const obj = value as Record<string, unknown>;

      // Check required fields
      if (schemaNode.required) {
        for (const requiredField of schemaNode.required) {
          if (!(requiredField in obj)) {
            errors.push({ path: `${currentPath}.${requiredField}`, message: 'Required field is missing' });
          }
        }
      }

      // Validate properties
      if (schemaNode.properties) {
        for (const [key, propSchema] of Object.entries(schemaNode.properties)) {
          if (key in obj) {
            validate(obj[key], propSchema, `${currentPath}.${key}`);
          }
        }
      }
    }

    // Array validation
    if (schemaNode.type === 'array' && Array.isArray(value)) {
      // Check array size constraints
      if (schemaNode.minItems !== undefined && value.length < schemaNode.minItems) {
        errors.push({ path: currentPath, message: `Array has ${value.length} items but minimum is ${schemaNode.minItems}` });
      }
      if (schemaNode.maxItems !== undefined && value.length > schemaNode.maxItems) {
        errors.push({ path: currentPath, message: `Array has ${value.length} items but maximum is ${schemaNode.maxItems}` });
      }

      // Validate array items
      if (schemaNode.items) {
        value.forEach((item, index) => {
          validate(item, schemaNode.items!, `${currentPath}[${index}]`);
        });
      }
    }

    // Enum validation
    if (schemaNode.enum && !schemaNode.enum.includes(value)) {
      errors.push({ path: currentPath, message: `Value must be one of: ${schemaNode.enum.join(', ')}` });
    }
  }

  validate(data, schema, path);

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Assert that response matches contract schema
 */
export function assertContract(
  data: unknown,
  schema: Schema,
  options: ContractTestOptions = {}
): void {
  const { strict = true, logDeprecations = true, context = {} } = options;

  const result = validateSchema(data, schema);

  // Log deprecation warnings
  if (logDeprecations && result.warnings.length > 0) {
    logger.warn('Contract deprecation warnings detected', {
      warnings: result.warnings,
      operation: 'contract-validation',
      ...context
    });
  }

  // Log and/or throw validation errors
  if (!result.valid) {
    logger.error('Contract validation failed', {
      errors: result.errors,
      warnings: result.warnings,
      operation: 'contract-validation',
      ...context
    });

    if (strict) {
      const errorMessage = result.errors
        .map((e) => `${e.path}: ${e.message}`)
        .join('\n');
      throw new Error(`Contract validation failed:\n${errorMessage}`);
    }
  }
}

/**
 * Expect response to match contract schema (Playwright assertion)
 */
export function expectContract(data: unknown, schema: Schema, options: ContractTestOptions = {}): void {
  const result = validateSchema(data, schema);

  expect(result.valid, `Contract validation failed:\n${result.errors.map((e) => `${e.path}: ${e.message}`).join('\n')}`).toBe(true);

  // Log warnings even if validation passes
  if (options.logDeprecations !== false && result.warnings.length > 0) {
    logger.warn('Contract deprecation warnings', {
      warnings: result.warnings,
      operation: 'contract-validation',
      ...options.context
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
      services: { type: 'array' as const, items: { type: 'string' as const }, nullable: true }
    }
  },

  LocationList: {
    type: 'array' as const,
    items: {
      type: 'object' as const,
      required: ['id', 'locationName'],
      properties: {
        id: { type: 'string' as const },
        locationName: { type: 'string' as const },
        services: { type: 'array' as const, items: { type: 'string' as const }, nullable: true }
      }
    }
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
      due_date: { type: 'string' as const, nullable: true }
    }
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
            assignee: { type: 'string' as const, nullable: true }
          }
        }
      },
      total_records: { type: 'number' as const, nullable: true }
    }
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
          name: { type: 'string' as const, nullable: true }
        }
      },
      roleAssignmentInfo: { type: 'array' as const, nullable: true }
    }
  }
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
        serviceName: { type: 'string' as const }
      }
    }
  },

  SupportedJurisdictions: {
    type: 'array' as const,
    items: { type: 'string' as const },
    minItems: 0
  },

  LocationsRefData: {
    type: 'array' as const,
    items: {
      type: 'object' as const,
      properties: {
        epimms_id: { type: 'string' as const, nullable: true },
        site_name: { type: 'string' as const, nullable: true },
        court_name: { type: 'string' as const, nullable: true }
      }
    }
  }
};
