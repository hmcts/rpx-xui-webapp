export function stringifyCaseTypeId(caseTypeId: unknown): string {
  if (typeof caseTypeId === 'string') {
    return caseTypeId;
  }
  if (typeof caseTypeId === 'number') {
    return `${caseTypeId}`;
  }
  if (caseTypeId && typeof caseTypeId === 'object') {
    const candidate = (caseTypeId as { id?: unknown }).id;
    if (typeof candidate === 'string') {
      return candidate;
    }
    return JSON.stringify(caseTypeId);
  }
  return '';
}
