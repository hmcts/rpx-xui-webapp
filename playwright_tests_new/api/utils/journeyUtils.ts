import { expectStatus } from './apiTestUtils';

export interface ApiResponse<T = unknown> {
  status: number;
  data?: T;
}

export interface JourneyStepDefinition<T = unknown> {
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint: string;
  allowedStatuses?: ReadonlyArray<number>;
  warnMs?: number;
  execute: () => Promise<ApiResponse<T>>;
}

export interface JourneyStepResult<T = unknown> {
  name: string;
  method: string;
  endpoint: string;
  status: number;
  durationMs: number;
  allowedStatuses: number[];
  warnMs: number;
  response: ApiResponse<T>;
}

export interface JourneyLatencyPolicy {
  stepWarnMs: number;
  totalWarnMs: number;
  stepFailMs?: number;
  totalFailMs?: number;
}

export interface JourneySummary {
  steps: JourneyStepResult[];
  totalDurationMs: number;
  maxStepDurationMs: number;
  slowestStep?: JourneyStepResult;
  slowSteps: JourneyStepResult[];
  overTotalWarnThreshold: boolean;
}

function parsePositiveInteger(value?: string): number | undefined {
  if (!value) {
    return undefined;
  }
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return undefined;
  }
  return parsed;
}

export function resolveJourneyLatencyPolicy(env: NodeJS.ProcessEnv = process.env): JourneyLatencyPolicy {
  const defaultStepWarnMs = parsePositiveInteger(env.API_SLOW_THRESHOLD_MS) ?? 5000;
  const stepWarnMs = parsePositiveInteger(env.API_JOURNEY_STEP_WARN_MS) ?? defaultStepWarnMs;
  const totalWarnMs = parsePositiveInteger(env.API_JOURNEY_TOTAL_WARN_MS) ?? stepWarnMs * 6;
  const stepFailMs = parsePositiveInteger(env.API_JOURNEY_STEP_FAIL_MS);
  const totalFailMs = parsePositiveInteger(env.API_JOURNEY_TOTAL_FAIL_MS);

  return {
    stepWarnMs,
    totalWarnMs,
    stepFailMs,
    totalFailMs,
  };
}

export async function executeJourneyStep<T>(
  definition: JourneyStepDefinition<T>,
  defaultWarnMs: number
): Promise<JourneyStepResult<T>> {
  const startedAt = Date.now();
  const response = await definition.execute();
  const durationMs = Date.now() - startedAt;
  const allowedStatuses = [...(definition.allowedStatuses ?? [200])];
  const warnMs = definition.warnMs ?? defaultWarnMs;

  expectStatus(
    response.status,
    allowedStatuses,
    `${definition.name} failed: ${definition.method} ${definition.endpoint} returned ${response.status}`
  );

  return {
    name: definition.name,
    method: definition.method,
    endpoint: definition.endpoint,
    status: response.status,
    durationMs,
    allowedStatuses,
    warnMs,
    response,
  };
}

export function summarizeJourney(steps: JourneyStepResult[], policy: JourneyLatencyPolicy): JourneySummary {
  let totalDurationMs = 0;
  let maxStepDurationMs = 0;
  let slowestStep: JourneyStepResult | undefined;
  const slowSteps: JourneyStepResult[] = [];

  for (const step of steps) {
    totalDurationMs += step.durationMs;
    if (step.durationMs > maxStepDurationMs) {
      maxStepDurationMs = step.durationMs;
      slowestStep = step;
    }
    if (step.durationMs > step.warnMs) {
      slowSteps.push(step);
    }
  }

  return {
    steps,
    totalDurationMs,
    maxStepDurationMs,
    slowestStep,
    slowSteps,
    overTotalWarnThreshold: totalDurationMs > policy.totalWarnMs,
  };
}

function formatStepStatus(step: JourneyStepResult): string {
  return `${step.method} ${step.endpoint} -> status=${step.status}, duration=${step.durationMs}ms, warn>${step.warnMs}ms`;
}

export function toJourneyReportText(summary: JourneySummary, policy: JourneyLatencyPolicy): string {
  const lines: string[] = [
    'API Journey Latency Report',
    `Total duration: ${summary.totalDurationMs}ms (warn>${policy.totalWarnMs}ms)`,
    `Slowest step: ${summary.slowestStep ? `${summary.slowestStep.name} (${summary.maxStepDurationMs}ms)` : 'n/a'}`,
    `Slow steps: ${summary.slowSteps.length}`,
    '',
    'Steps:',
    ...summary.steps.map((step) => `- ${step.name}: ${formatStepStatus(step)}`),
  ];

  if (summary.slowSteps.length > 0) {
    lines.push('', 'Steps above warning threshold:');
    lines.push(...summary.slowSteps.map((step) => `- ${step.name}: ${step.durationMs}ms`));
  }

  return lines.join('\n');
}

export function toJourneyReportJson(summary: JourneySummary, policy: JourneyLatencyPolicy): string {
  return JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      policy,
      totalDurationMs: summary.totalDurationMs,
      maxStepDurationMs: summary.maxStepDurationMs,
      slowestStep: summary.slowestStep
        ? {
            name: summary.slowestStep.name,
            endpoint: summary.slowestStep.endpoint,
            durationMs: summary.slowestStep.durationMs,
            status: summary.slowestStep.status,
          }
        : null,
      slowStepCount: summary.slowSteps.length,
      steps: summary.steps.map((step) => ({
        name: step.name,
        method: step.method,
        endpoint: step.endpoint,
        status: step.status,
        durationMs: step.durationMs,
        warnMs: step.warnMs,
      })),
    },
    null,
    2
  );
}
