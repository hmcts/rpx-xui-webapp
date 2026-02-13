export function isPlaywrightContextClosedError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Target page, context or browser has been closed') ||
    message.includes('Execution context was destroyed') ||
    message.includes('Test ended')
  );
}

export function rowMatchesExpectedColumns(row: Record<string, string>, expected: Record<string, string>): boolean {
  return Object.entries(expected).every(([key, value]) => {
    return (row[key] ?? '').trim() === value.trim();
  });
}
