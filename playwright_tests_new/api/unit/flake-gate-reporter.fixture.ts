import { createRequire } from 'node:module';

type FlakeGateResult = { status: string } | undefined;
type FlakeGateReporterInstance = {
  onTestEnd: (testCase: unknown, result: unknown) => void;
  onEnd: () => FlakeGateResult;
};

const require = createRequire(import.meta.url);
const FlakeGateReporter = require('../../common/reporters/flake-gate.reporter.cjs') as new () => FlakeGateReporterInstance;

const GATE_ENV_KEYS = ['PW_FLAKE_GATE', 'PW_MAX_FLAKY_TESTS', 'PW_MAX_FLAKY_RATE'] as const;

type RunOutcome = { output: string; exitCode: typeof process.exitCode; result: FlakeGateResult };

export const runGate = (
  env: Partial<Record<(typeof GATE_ENV_KEYS)[number], string>>,
  flakyTests: number,
  totalTests: number
): RunOutcome => {
  const savedEnv = Object.fromEntries(GATE_ENV_KEYS.map((key) => [key, process.env[key]]));
  const savedExitCode = process.exitCode;
  const savedWrite = process.stdout.write.bind(process.stdout);
  let output = '';
  GATE_ENV_KEYS.forEach((key) => delete process.env[key]);
  Object.assign(process.env, env);
  process.exitCode = undefined;
  process.stdout.write = ((chunk: string) => {
    output += chunk;
    return true;
  }) as typeof process.stdout.write;
  try {
    const reporter = new FlakeGateReporter();
    for (let index = 0; index < totalTests; index += 1) {
      const flaky = index < flakyTests;
      reporter.onTestEnd(
        { id: `test-${index}`, outcome: () => (flaky ? 'flaky' : 'expected') },
        { status: 'passed', retry: flaky ? 1 : 0 }
      );
    }
    const result = reporter.onEnd();
    return { output, exitCode: process.exitCode, result };
  } finally {
    process.stdout.write = savedWrite;
    process.exitCode = savedExitCode;
    GATE_ENV_KEYS.forEach((key) => {
      if (savedEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = savedEnv[key];
      }
    });
  }
};
