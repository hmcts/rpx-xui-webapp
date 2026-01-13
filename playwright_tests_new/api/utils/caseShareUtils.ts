export function resolveEntries(data: any, property: string): any[] {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data[property])) {
    return data[property];
  }
  const nested = data?.payload;
  if (nested && Array.isArray(nested[property])) {
    return nested[property];
  }
  return [];
}
