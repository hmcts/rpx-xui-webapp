const GLOBAL_SEARCH_SERVICE_ERROR = /Global search returned "Something went wrong"/i;

export function isGlobalSearchServiceError(error: unknown): boolean {
  return error instanceof Error && GLOBAL_SEARCH_SERVICE_ERROR.test(error.message);
}

export async function runGlobalSearchWithOneServiceRetry(search: () => Promise<void>): Promise<void> {
  try {
    await search();
  } catch (error) {
    if (!isGlobalSearchServiceError(error)) {
      throw error;
    }
    await search();
  }
}
