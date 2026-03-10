type RuntimeUserCredentials = {
  email: string;
  password: string;
};

const runtimeUserCredentials = new Map<string, RuntimeUserCredentials>();

function normalizeUserIdentifier(userIdentifier: string): string {
  return userIdentifier.trim().toUpperCase();
}

export function getRuntimeUserCredentials(userIdentifier: string): RuntimeUserCredentials | undefined {
  return runtimeUserCredentials.get(normalizeUserIdentifier(userIdentifier));
}

export function setRuntimeUserCredentials(userIdentifier: string, credentials: RuntimeUserCredentials): void {
  runtimeUserCredentials.set(normalizeUserIdentifier(userIdentifier), credentials);
}

export function clearRuntimeUserCredentials(userIdentifier: string): void {
  runtimeUserCredentials.delete(normalizeUserIdentifier(userIdentifier));
}
