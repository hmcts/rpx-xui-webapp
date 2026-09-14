export function dependencyBodyForError(body: string): string {
  if (process.env.PW_CIVIL_DEBUG_DEPENDENCY_BODIES === 'true') {
    return ` Body='${body.slice(0, 500)}'.`;
  }

  return '';
}

export function civilDependencyError(message: string, body: string): string {
  return `${message}${dependencyBodyForError(body)}`;
}
