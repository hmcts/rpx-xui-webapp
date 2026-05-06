export function isPageClosingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return (
    message.includes('Target page, context or browser has been closed') ||
    message.includes('Execution context was destroyed') ||
    message.includes('Test ended')
  );
}

function normalizeCellValue(value: string): string {
  return value.replaceAll(/\s+/g, ' ').trim().toLowerCase();
}

export function rowMatchesExpected(row: Record<string, string>, expected: Record<string, string>): boolean {
  return Object.entries(expected).every(([key, value]) => {
    return normalizeCellValue(row[key] ?? '') === normalizeCellValue(value);
  });
}
