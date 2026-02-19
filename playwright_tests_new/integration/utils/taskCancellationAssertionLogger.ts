type CancellationAssertionInput = {
  scenario: string;
  expectedPath: string;
  actualPath: string;
  hasCancellationProcessQuery: boolean;
  hasCompletionProcessQuery: boolean;
  expectedPayload: Record<string, unknown>;
  actualPayload: Record<string, unknown> | null;
};

type CancellationAssertionResult = {
  omissionOfCancellationProcess: boolean;
  omissionOfCompletionProcess: boolean;
  payloadMatch: boolean;
  allChecksPassed: boolean;
};

const ansi = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  yellowBg: '\x1b[43m',
  black: '\x1b[30m',
};

function status(value: boolean): string {
  return value ? `${ansi.green}PASS${ansi.reset}` : `${ansi.red}FAIL${ansi.reset}`;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightExpectedPairsInActual(
  expectedPayload: Record<string, unknown>,
  actualPayload: Record<string, unknown> | null
): string {
  const prettyActual = JSON.stringify(actualPayload, null, 2);
  if (!actualPayload) {
    return prettyActual;
  }

  let highlighted = prettyActual;
  for (const [key, value] of Object.entries(expectedPayload)) {
    const valueAsJson = JSON.stringify(value);
    const pairRegex = new RegExp(`"${escapeRegExp(key)}"\\s*:\\s*${escapeRegExp(valueAsJson)}`, 'g');
    highlighted = highlighted.replace(pairRegex, `${ansi.yellowBg}${ansi.black}${ansi.bold}$&${ansi.reset}`);
  }
  return highlighted;
}

export function logTaskCancellationAssertion(input: CancellationAssertionInput): CancellationAssertionResult {
  const omissionOfCancellationProcess = !input.hasCancellationProcessQuery;
  const omissionOfCompletionProcess = !input.hasCompletionProcessQuery;
  const payloadMatch = JSON.stringify(input.expectedPayload) === JSON.stringify(input.actualPayload);
  const allChecksPassed = omissionOfCancellationProcess && omissionOfCompletionProcess && payloadMatch;
  const expectedPayloadPretty = JSON.stringify(input.expectedPayload, null, 2);
  const actualPayloadWithHighlights = highlightExpectedPairsInActual(input.expectedPayload, input.actualPayload);

  const highlightedHeader = `${ansi.yellowBg}${ansi.black}${ansi.bold} EXUI-3662 Assertion Evidence ${ansi.reset}`;
  const lines = [
    highlightedHeader,
    `${ansi.cyan}Scenario:${ansi.reset} ${input.scenario}`,
    `${ansi.cyan}Expected Path:${ansi.reset} ${input.expectedPath}`,
    `${ansi.cyan}Actual Path:${ansi.reset} ${input.actualPath}`,
    `${ansi.cyan}Expected Payload:${ansi.reset}\n${expectedPayloadPretty}`,
    `${ansi.cyan}Actual Payload (expected key/value highlighted):${ansi.reset}\n${actualPayloadWithHighlights}`,
    `Check omit cancellation_process: ${status(omissionOfCancellationProcess)}`,
    `Check omit completion_process: ${status(omissionOfCompletionProcess)}`,
    `Check payload exact match: ${status(payloadMatch)}`,
    `${ansi.bold}Overall:${ansi.reset} ${status(allChecksPassed)}`,
  ];

  // Visible in Playwright list/dot stdout so engineers can prove EXUI-3662 behavior from logs.
  console.log(lines.join('\n'));

  return {
    omissionOfCancellationProcess,
    omissionOfCompletionProcess,
    payloadMatch,
    allChecksPassed,
  };
}
