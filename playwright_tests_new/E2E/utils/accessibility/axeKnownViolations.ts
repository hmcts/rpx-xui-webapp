import type { Page, TestInfo } from '@playwright/test';
import { attachAccessibilityEvidence, runAxeAudit } from './axeEvidence';

export interface KnownAxeViolation {
  id: string;
  description: string;
  maxNodes: number;
}

export interface AxeViolationSummary {
  id: string;
  description: string;
  nodeCount: number;
}

interface AxeViolationLike {
  id: string;
  description: string;
  nodes?: unknown[];
}

export function summarizeAxeViolations(violations: AxeViolationLike[]): AxeViolationSummary[] {
  return violations
    .map((violation) => ({
      id: violation.id,
      description: violation.description,
      nodeCount: violation.nodes?.length ?? 0,
    }))
    .sort(compareViolationSummary);
}

export function findUnexpectedAxeViolations(
  actual: AxeViolationSummary[],
  knownViolations: KnownAxeViolation[]
): AxeViolationSummary[] {
  return actual.filter((violation) => {
    const knownViolation = knownViolations.find(
      (known) => known.id === violation.id && known.description === violation.description
    );
    return !knownViolation || violation.nodeCount > knownViolation.maxNodes;
  });
}

export async function auditKnownAxeViolations(page: Page, testInfo?: TestInfo): Promise<AxeViolationSummary[]> {
  const results = await runAxeAudit(page);
  await attachAccessibilityEvidence(page, testInfo, results, 'known-accessibility-baseline');

  return summarizeAxeViolations(results.violations);
}

function compareViolationSummary(left: AxeViolationSummary, right: AxeViolationSummary): number {
  return `${left.id}:${left.description}`.localeCompare(`${right.id}:${right.description}`);
}
