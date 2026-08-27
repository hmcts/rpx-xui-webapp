import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const registry = require('./identityPoolRegistry.cjs') as {
  resolveConfiguredPoolIdentities: (
    env?: NodeJS.ProcessEnv,
    requirements?: IdentityCompatibilityRequirements
  ) => IdentityPoolIdentity[];
  resolveConfiguredSessionPoolCapacities: (
    env?: NodeJS.ProcessEnv,
    requirements?: IdentityCompatibilityRequirements
  ) => Record<string, number>;
};

export type IdentityCompatibilityRequirements = {
  pool?: string;
  tags?: string[];
  role?: string;
  organisation?: string;
  jurisdiction?: string;
  concurrencyMode?: 'reusable' | 'exclusive';
};

export type IdentityPoolIdentity = {
  pool: string;
  userIdentifier: string;
  email: string;
  tags: string[];
  role: string;
  organisation: string;
  jurisdictions: string[];
  concurrencyMode: 'reusable' | 'exclusive';
};

export const resolveConfiguredPoolIdentities = registry.resolveConfiguredPoolIdentities;
export const resolveConfiguredSessionPoolCapacities = registry.resolveConfiguredSessionPoolCapacities;
