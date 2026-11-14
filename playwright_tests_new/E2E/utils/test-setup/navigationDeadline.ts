export function remainingNavigationTimeout(deadlineMs: number, context: string): number {
  const remainingMs = deadlineMs - Date.now();
  if (remainingMs <= 0) {
    throw new Error(`Timed out while ${context}.`);
  }
  return remainingMs;
}
